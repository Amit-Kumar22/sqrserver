# AI Chatbot Setup & Usage Guide

## 🚀 Features

✅ **Smart AI-Powered Responses** - Intelligent FAQ matching based on keywords and context
✅ **Premium UI/UX** - Modern, animated chatbot with smooth transitions
✅ **Lead Generation** - Capture visitor information (name, email, phone, requirements)
✅ **Quick Questions** - Pre-defined questions for easy user interaction
✅ **WhatsApp Integration** - Direct WhatsApp chat button
✅ **Fully Responsive** - Works seamlessly on desktop, tablet, and mobile
✅ **Admin Dashboard** - Manage FAQs and view chat leads
✅ **Real-time Conversations** - Session-based conversation tracking
✅ **Professional Animations** - Smooth slide-up, fade, and bounce effects

## 📦 What Was Created

### Models
- **ChatLead Model** (`src/models/ChatLead.ts`) - Stores conversations and lead information
- **FAQ Model** (`src/models/FAQ.ts`) - Stores chatbot questions and answers

### API Endpoints
- **POST /api/chatbot** - Handle chat messages and return AI responses
- **GET /api/chatbot** - Get quick question suggestions
- **POST /api/chatbot/lead** - Capture lead information
- **GET /api/admin/faq** - Fetch all FAQs (admin only)
- **POST /api/admin/faq** - Create new FAQ (admin only)
- **PUT /api/admin/faq** - Update FAQ (admin only)
- **DELETE /api/admin/faq** - Delete FAQ (admin only)
- **GET /api/admin/chatbot/leads** - View all chat leads (admin only)
- **PUT /api/admin/chatbot/leads** - Update lead status (admin only)

### Components
- **AIChatbot Component** (`src/components/AIChatbot.tsx`) - Main chatbot UI

### Admin Pages
- **Chatbot Management** (`/admin/chatbot`) - Manage FAQs
- **Chat Leads** (`/admin/chatbot/leads`) - View and manage leads

### Scripts
- **seed-faq.js** - Populate database with default FAQs

## 🛠️ Setup Instructions

### Step 1: Seed the FAQ Database

Run this command to populate the chatbot with 12 pre-configured FAQs:

```bash
npm run seed-faq
```

This will create FAQs for:
- Pricing questions
- Timeline/delivery questions
- E-commerce services
- SEO services
- Website redesign
- Mobile app development
- Technology stack
- Contact information
- General services
- Support & maintenance
- Development process
- Confidentiality & NDAs

### Step 2: Configure WhatsApp Number

Edit `src/components/AIChatbot.tsx` and update the WhatsApp number:

```typescript
const WHATSAPP_NUMBER = '+919876543210'; // Replace with your WhatsApp number
```

### Step 3: Start the Development Server

```bash
npm run dev
```

### Step 4: Test the Chatbot

1. Visit any page on your website (e.g., http://localhost:3000)
2. Look for the floating chat icon in the bottom-right corner
3. Click to open the chatbot
4. Try asking:
   - "How much does a website cost?"
   - "Do you provide SEO services?"
   - "What technologies do you use?"

## 🎨 Chatbot Features

### For Visitors

1. **Floating Chat Button**
   - Fixed bottom-right position
   - Green pulse indicator showing online status
   - Smooth open/close animations

2. **Quick Questions**
   - 4 popular questions displayed on first open
   - One-click to ask common questions

3. **Smart Responses**
   - AI-powered keyword matching
   - Context-aware answers
   - Suggested follow-up questions

4. **Lead Capture Form**
   - Click the user icon to open the form
   - Fields: Name, Email, Phone, Project Requirements
   - Automatic lead tracking in database

5. **WhatsApp Integration**
   - Direct WhatsApp chat button in header
   - Pre-filled message template

### For Admins

#### Manage FAQs (`/admin/chatbot`)

1. **View All FAQs**
   - Filter by category
   - See active/inactive status
   - Priority levels

2. **Create New FAQ**
   - Question & Answer
   - Category selection
   - Keywords for matching
   - Priority (1-10)
   - Active/Inactive toggle

3. **Edit FAQ**
   - Update any field
   - Change priority
   - Add/remove keywords

4. **Delete FAQ**
   - Remove outdated questions
   - Confirmation required

5. **Toggle Active Status**
   - Quick activate/deactivate
   - One-click status change

#### View Chat Leads (`/admin/chatbot/leads`)

1. **Lead List**
   - Filter by status (active, converted, abandoned)
   - Sort by last activity
   - Quick overview

2. **Lead Details**
   - Full conversation history
   - Contact information
   - Project requirements
   - Session metadata

3. **Update Lead Status**
   - Mark as converted
   - Mark as abandoned
   - Keep active

## 🎯 FAQ Categories

The chatbot supports these categories:

- **pricing** - Cost and budget questions
- **timeline** - Project duration and deadlines
- **services** - Service offerings
- **technology** - Tech stack and tools
- **support** - Maintenance and support
- **general** - General inquiries
- **ecommerce** - E-commerce specific
- **seo** - SEO services
- **mobile** - Mobile app development
- **redesign** - Website redesign
- **contact** - Contact information

## 📱 Mobile Responsiveness

The chatbot is fully responsive:

- **Desktop**: 380px wide chat window
- **Tablet**: Adapts to screen width
- **Mobile**: Full-width with proper spacing
- **Touch-friendly**: Large tap targets
- **Smooth scrolling**: Optimized for mobile

## 🔧 Customization Options

### Change Chatbot Colors

Edit `src/components/AIChatbot.tsx`:

```typescript
// Primary button color
className="bg-gradient-to-r from-blue-600 to-indigo-600"

// User message bubble
className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white"

// Bot message bubble
className="bg-white text-gray-800"
```

### Change Greeting Message

Edit the `WELCOME_MESSAGE` constant in `src/app/api/chatbot/route.ts`:

```typescript
const WELCOME_MESSAGE = `Your custom greeting message here!`;
```

### Add More Fallback Responses

Edit the `FALLBACK_RESPONSES` array:

```typescript
const FALLBACK_RESPONSES = [
  "Your custom fallback response 1",
  "Your custom fallback response 2",
];
```

### Adjust AI Matching Sensitivity

Edit the `findBestMatch` function confidence threshold:

```typescript
// Current: return highestScore > 15
// Higher number = stricter matching
// Lower number = looser matching
return highestScore > 15 ? bestMatch : null;
```

## 📊 Database Schema

### ChatLead Collection

```javascript
{
  sessionId: "session_1234567890_abc123",
  conversation: [
    {
      sender: "user",
      message: "How much does a website cost?",
      timestamp: "2024-05-14T10:30:00Z"
    },
    {
      sender: "bot",
      message: "Website costs vary...",
      timestamp: "2024-05-14T10:30:01Z"
    }
  ],
  leadInfo: {
    name: "John Doe",
    email: "john@example.com",
    phone: "+1234567890",
    projectRequirements: "Need an e-commerce website"
  },
  status: "converted", // active, converted, abandoned
  source: "homepage",
  ipAddress: "192.168.1.1",
  userAgent: "Mozilla/5.0...",
  lastMessageAt: "2024-05-14T10:35:00Z",
  createdAt: "2024-05-14T10:30:00Z",
  updatedAt: "2024-05-14T10:35:00Z"
}
```

### FAQ Collection

```javascript
{
  question: "How much does a business website cost?",
  answer: "Website costs vary based on complexity...",
  category: "pricing",
  keywords: ["cost", "price", "pricing", "budget"],
  priority: 10, // 1-10
  isActive: true,
  createdAt: "2024-05-14T10:00:00Z",
  updatedAt: "2024-05-14T10:00:00Z"
}
```

## 🔒 Security Features

- **Admin Authentication**: FAQ management requires admin login
- **Session Tracking**: Unique session IDs for each visitor
- **Input Validation**: All user inputs are validated
- **XSS Protection**: Messages are sanitized
- **Rate Limiting**: Consider adding for production

## 🚀 Performance Optimizations

- **Lazy Loading**: Chatbot only loads when opened
- **Efficient Queries**: MongoDB indexes on frequently queried fields
- **Lean Queries**: Uses `.lean()` for faster reads
- **Client-Side Caching**: Session data cached in browser

## 📈 Analytics & Monitoring

Track these metrics in your admin dashboard:

1. **Total Conversations**: Count of ChatLead documents
2. **Conversion Rate**: Converted leads / Total leads
3. **Popular Questions**: Most frequently asked FAQs
4. **Response Time**: Time between user message and bot response
5. **Lead Quality**: Leads with complete contact info

## 🐛 Troubleshooting

### Chatbot Not Appearing

1. Check browser console for errors
2. Verify `AIChatbot` is imported in `ClientLayout`
3. Clear browser cache and reload

### FAQs Not Working

1. Run `npm run seed-faq` to populate database
2. Check MongoDB connection in `.env.local`
3. Verify FAQ isActive status in admin panel

### Lead Form Not Submitting

1. Check browser console for API errors
2. Verify session ID is being passed
3. Check MongoDB connection

### AI Responses Not Matching

1. Review FAQ keywords in admin panel
2. Adjust matching threshold in `findBestMatch()`
3. Add more keywords to FAQs

## 📝 Best Practices

1. **Keep FAQs Updated**: Regularly review and update answers
2. **Monitor Leads**: Check lead dashboard daily
3. **Response Time**: Reply to converted leads within 24 hours
4. **Keyword Optimization**: Add relevant keywords to improve matching
5. **Test Regularly**: Test chatbot on different devices

## 🎉 What's Next?

Consider adding these enhancements:

- [ ] Natural Language Processing (OpenAI API integration)
- [ ] Multi-language support
- [ ] Voice input/output
- [ ] File upload support
- [ ] Appointment scheduling
- [ ] Live chat handoff to human agents
- [ ] Analytics dashboard
- [ ] A/B testing for responses
- [ ] Chat history export
- [ ] Email notifications for new leads

## 📞 Support

If you encounter any issues or need help customizing the chatbot:

1. Check this documentation
2. Review the code comments
3. Contact the development team

---

**Created for SquareServer** - AI-Powered Customer Engagement Solution

Last Updated: May 14, 2026
