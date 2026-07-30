import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import ChatLead from '@/models/ChatLead';

// POST - Capture lead information
export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();

    const body = await request.json();
    const { sessionId, leadInfo } = body;

    // Validate input
    if (!sessionId) {
      return NextResponse.json(
        { error: 'Session ID is required' },
        { status: 400 }
      );
    }

    if (!leadInfo || (!leadInfo.name && !leadInfo.email && !leadInfo.phone)) {
      return NextResponse.json(
        { error: 'At least one contact detail is required' },
        { status: 400 }
      );
    }

    // Validate email format if provided
    if (leadInfo.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(leadInfo.email)) {
        return NextResponse.json(
          { error: 'Invalid email format' },
          { status: 400 }
        );
      }
    }

    // Find the chat session
    const chatLead = await ChatLead.findOne({ sessionId });

    if (!chatLead) {
      return NextResponse.json(
        { error: 'Chat session not found' },
        { status: 404 }
      );
    }

    // Update lead information
    chatLead.leadInfo = {
      name: leadInfo.name?.trim(),
      email: leadInfo.email?.trim().toLowerCase(),
      phone: leadInfo.phone?.trim(),
      projectRequirements: leadInfo.projectRequirements?.trim()
    };

    // Update status to converted if we have contact info
    if (leadInfo.email || leadInfo.phone) {
      chatLead.status = 'converted';
    }

    // Add a confirmation message to conversation
    const confirmationMessage = `Thank you ${leadInfo.name || 'for your interest'}! 🎉\n\nWe've received your information:\n${leadInfo.name ? `• Name: ${leadInfo.name}\n` : ''}${leadInfo.email ? `• Email: ${leadInfo.email}\n` : ''}${leadInfo.phone ? `• Phone: ${leadInfo.phone}\n` : ''}${leadInfo.projectRequirements ? `• Requirements: ${leadInfo.projectRequirements}\n` : ''}\nOur team will get back to you within 24 hours. Looking forward to working with you!`;

    chatLead.conversation.push({
      sender: 'bot',
      message: confirmationMessage,
      timestamp: new Date()
    });

    chatLead.lastMessageAt = new Date();
    await chatLead.save();

    return NextResponse.json({
      success: true,
      message: 'Lead information captured successfully',
      response: confirmationMessage
    });

  } catch (error) {
    console.error('Error capturing lead:', error);
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
