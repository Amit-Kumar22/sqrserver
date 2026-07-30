import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import ChatLead from '@/models/ChatLead';
import FAQ from '@/models/FAQ';

// Generate a unique session ID
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

// AI-powered response matcher
function findBestMatch(userMessage: string, faqs: any[]): any | null {
  const message = userMessage.toLowerCase().trim();
  
  // Direct keyword matching with scoring
  let bestMatch = null;
  let highestScore = 0;

  for (const faq of faqs) {
    let score = 0;

    // Check if any keyword matches
    for (const keyword of faq.keywords) {
      if (message.includes(keyword.toLowerCase())) {
        score += 10;
      }
    }

    // Check question similarity
    const questionWords = faq.question.toLowerCase().split(' ');
    const messageWords = message.split(' ');
    
    for (const word of messageWords) {
      if (word.length > 3 && questionWords.includes(word)) {
        score += 5;
      }
    }

    // Add priority bonus
    score += faq.priority;

    if (score > highestScore) {
      highestScore = score;
      bestMatch = faq;
    }
  }

  // Only return if confidence is high enough
  return highestScore > 15 ? bestMatch : null;
}

// Get contextual greeting based on time
function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

// Default welcome message
const WELCOME_MESSAGE = `${getGreeting()}! 👋 Welcome to SquareServer!\n\nI'm your AI assistant here to help you with:\n• Website Development\n• Mobile App Development\n• E-commerce Solutions\n• SEO Services\n• Custom Software Development\n\nHow can I assist you today?`;

// Fallback responses for unmatched queries
const FALLBACK_RESPONSES = [
  "That's a great question! While I don't have a specific answer for that, our team would love to help you personally. Would you like to share your contact details so we can get back to you?",
  "I'm not quite sure about that specific detail, but our experts can definitely help! Would you like to connect with our team directly?",
  "That's an interesting query! To give you the most accurate information, I'd recommend speaking with our team. Can I collect your contact information?",
];

// GET - Get quick question suggestions
export async function GET() {
  try {
    await connectToDatabase();

    // Get top priority FAQs for quick questions
    const quickQuestions = await FAQ.find({ isActive: true })
      .sort({ priority: -1 })
      .limit(8)
      .select('question category')
      .lean();

    return NextResponse.json({
      success: true,
      questions: quickQuestions
    });
  } catch (error) {
    console.error('Error fetching quick questions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch quick questions' },
      { status: 500 }
    );
  }
}

// POST - Handle chat messages
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { sessionId, message, source = 'homepage' } = body;

    // Validate input
    if (!message || message.trim().length === 0) {
      return NextResponse.json(
        { error: 'Message is required' },
        { status: 400 }
      );
    }

    // Get or create session
    let currentSessionId = sessionId;
    if (!currentSessionId) {
      currentSessionId = generateSessionId();
    }

    // Get client information
    const ipAddress = request.headers.get('x-forwarded-for') || 
                      request.headers.get('x-real-ip') || 
                      'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Find or create chat session
    let chatLead = await ChatLead.findOne({ sessionId: currentSessionId });
    
    if (!chatLead) {
      chatLead = new ChatLead({
        sessionId: currentSessionId,
        conversation: [],
        leadInfo: {},
        status: 'active',
        source,
        ipAddress,
        userAgent,
        lastMessageAt: new Date()
      });
    }

    // Add user message to conversation
    chatLead.conversation.push({
      sender: 'user',
      message: message.trim(),
      timestamp: new Date()
    });

    // Handle first message with welcome
    if (chatLead.conversation.length === 1) {
      chatLead.conversation.push({
        sender: 'bot',
        message: WELCOME_MESSAGE,
        timestamp: new Date()
      });
      chatLead.lastMessageAt = new Date();
      await chatLead.save();

      return NextResponse.json({
        success: true,
        sessionId: currentSessionId,
        response: WELCOME_MESSAGE,
        suggestedQuestions: [
          'How much does a business website cost?',
          'How long does website development take?',
          'Do you provide eCommerce website development?',
          'Do you offer SEO services?'
        ]
      });
    }

    // Fetch all active FAQs
    const faqs = await FAQ.find({ isActive: true }).lean();

    // Find best matching FAQ
    const bestMatch = findBestMatch(message, faqs);

    let botResponse = '';
    let suggestedQuestions: string[] = [];

    if (bestMatch) {
      botResponse = bestMatch.answer;
      
      // Get related questions from the same category
      const relatedFAQs = await FAQ.find({
        isActive: true,
        category: bestMatch.category,
        _id: { $ne: bestMatch._id }
      })
        .sort({ priority: -1 })
        .limit(3)
        .select('question')
        .lean();

      suggestedQuestions = relatedFAQs.map(faq => faq.question);
    } else {
      // Use fallback response
      botResponse = FALLBACK_RESPONSES[Math.floor(Math.random() * FALLBACK_RESPONSES.length)];
      
      // Suggest popular questions
      const popularFAQs = await FAQ.find({ isActive: true })
        .sort({ priority: -1 })
        .limit(4)
        .select('question')
        .lean();

      suggestedQuestions = popularFAQs.map(faq => faq.question);
    }

    // Add bot response to conversation
    chatLead.conversation.push({
      sender: 'bot',
      message: botResponse,
      timestamp: new Date()
    });

    chatLead.lastMessageAt = new Date();
    await chatLead.save();

    return NextResponse.json({
      success: true,
      sessionId: currentSessionId,
      response: botResponse,
      suggestedQuestions
    });

  } catch (error) {
    console.error('Error in chatbot API:', error);
    return NextResponse.json(
      {
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' 
          ? (error instanceof Error ? error.message : 'Unknown error')
          : undefined
      },
      { status: 500 }
    );
  }
}
