const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const FAQSchema = new mongoose.Schema(
  {
    question: { type: String, required: true, trim: true },
    answer: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: ['pricing', 'timeline', 'services', 'technology', 'support', 'general', 'ecommerce', 'seo', 'mobile', 'redesign', 'contact'],
      default: 'general'
    },
    keywords: { type: [String], default: [] },
    priority: { type: Number, default: 5, min: 1, max: 10 },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

const FAQ = mongoose.models.FAQ || mongoose.model('FAQ', FAQSchema);

const faqData = [
  {
    question: 'How much does a business website cost?',
    answer: 'The cost of a business website varies based on complexity and features. A basic business website starts from $500-$1500, while a custom professional website with advanced features ranges from $2000-$5000+. E-commerce websites typically start from $3000. We offer flexible packages and can provide a detailed quote after understanding your specific requirements. Contact us for a free consultation!',
    category: 'pricing',
    keywords: ['cost', 'price', 'pricing', 'budget', 'money', 'expensive', 'cheap', 'affordable', 'quote', 'estimate'],
    priority: 10,
    isActive: true
  },
  {
    question: 'How long does website development take?',
    answer: 'The development timeline depends on project complexity:\n\n• Basic Website: 1-2 weeks\n• Business Website: 2-4 weeks\n• E-commerce Website: 4-8 weeks\n• Custom Enterprise Solution: 8-16 weeks\n\nWe follow an agile development process and keep you updated throughout. After initial consultation, we\'ll provide you with a detailed timeline and milestone breakdown for your specific project.',
    category: 'timeline',
    keywords: ['time', 'duration', 'how long', 'timeline', 'deadline', 'delivery', 'fast', 'quick', 'when', 'complete'],
    priority: 10,
    isActive: true
  },
  {
    question: 'Do you provide eCommerce website development?',
    answer: 'Yes! We specialize in building robust e-commerce solutions with features like:\n\n✓ Shopping cart & secure checkout\n✓ Payment gateway integration (PayPal, Stripe, Razorpay)\n✓ Product catalog management\n✓ Inventory tracking\n✓ Order management system\n✓ Customer accounts & wishlists\n✓ Mobile-responsive design\n✓ SEO optimization\n\nWe work with platforms like Shopify, WooCommerce, and custom solutions. Let\'s discuss your e-commerce needs!',
    category: 'ecommerce',
    keywords: ['ecommerce', 'e-commerce', 'shop', 'store', 'online store', 'shopping', 'cart', 'payment', 'sell online', 'products'],
    priority: 9,
    isActive: true
  },
  {
    question: 'Do you offer SEO services?',
    answer: 'Absolutely! Our SEO services include:\n\n✓ On-page SEO optimization\n✓ Technical SEO audit & fixes\n✓ Keyword research & strategy\n✓ Content optimization\n✓ Meta tags & schema markup\n✓ Site speed optimization\n✓ Mobile optimization\n✓ Local SEO\n✓ Analytics & reporting\n\nAll our websites are built with SEO best practices from the ground up. We can also provide ongoing SEO management to improve your search rankings.',
    category: 'seo',
    keywords: ['seo', 'search engine', 'google', 'ranking', 'optimization', 'traffic', 'keywords', 'visibility', 'search'],
    priority: 9,
    isActive: true
  },
  {
    question: 'Can you redesign my existing website?',
    answer: 'Yes, we offer complete website redesign services! We can:\n\n✓ Modernize your website design\n✓ Improve user experience (UX)\n✓ Make it mobile-responsive\n✓ Enhance performance & speed\n✓ Update content & SEO\n✓ Add new features & functionality\n✓ Migrate to modern platforms\n\nWe\'ll analyze your current website, understand your goals, and create a modern, high-performing website that drives results. Share your website URL with us to get started!',
    category: 'redesign',
    keywords: ['redesign', 'update', 'modernize', 'revamp', 'improve', 'makeover', 'refresh', 'old website', 'upgrade'],
    priority: 8,
    isActive: true
  },
  {
    question: 'Do you provide mobile app development?',
    answer: 'Yes! We develop mobile applications for both iOS and Android:\n\n✓ Native Apps (Swift/Kotlin)\n✓ Cross-platform Apps (React Native, Flutter)\n✓ Progressive Web Apps (PWA)\n✓ App UI/UX design\n✓ API integration\n✓ App Store deployment\n✓ Maintenance & updates\n\nWe build user-friendly, high-performance mobile apps for businesses of all sizes. Let\'s discuss your app idea!',
    category: 'mobile',
    keywords: ['mobile app', 'app development', 'ios', 'android', 'mobile', 'application', 'flutter', 'react native'],
    priority: 8,
    isActive: true
  },
  {
    question: 'What technologies do you use?',
    answer: 'We work with modern, industry-standard technologies:\n\n🖥️ Frontend: React, Next.js, Vue.js, HTML5, CSS3, Tailwind CSS\n⚙️ Backend: Node.js, Python, PHP, .NET\n🗄️ Database: MongoDB, MySQL, PostgreSQL\n📱 Mobile: React Native, Flutter, Swift, Kotlin\n☁️ Cloud: AWS, Azure, Google Cloud\n🛠️ CMS: WordPress, Shopify, Strapi\n🔧 DevOps: Docker, CI/CD, Git\n\nWe choose the best technology stack based on your project requirements to ensure scalability, security, and performance.',
    category: 'technology',
    keywords: ['technology', 'tech stack', 'programming', 'languages', 'frameworks', 'tools', 'platform', 'software', 'code'],
    priority: 7,
    isActive: true
  },
  {
    question: 'How can I contact your team?',
    answer: 'We\'d love to hear from you! You can reach us through:\n\n📧 Email: info@squareserver.com\n📱 Phone: +91 XXXXXXXXXX (available Mon-Sat, 9 AM - 6 PM)\n💬 WhatsApp: Click the WhatsApp button in this chat\n📝 Contact Form: Fill out the form on our Contact page\n🏢 Office: [Your Office Address]\n\nYou can also provide your contact details here in this chat, and we\'ll get back to you within 24 hours!',
    category: 'contact',
    keywords: ['contact', 'reach', 'email', 'phone', 'call', 'message', 'address', 'office', 'location', 'whatsapp'],
    priority: 10,
    isActive: true
  },
  {
    question: 'What services does SquareServer offer?',
    answer: 'SquareServer offers comprehensive digital solutions:\n\n🌐 Web Development: Business websites, e-commerce, custom web apps\n📱 Mobile App Development: iOS, Android, cross-platform apps\n🎨 UI/UX Design: Modern, user-friendly interface design\n🔍 SEO Services: Search engine optimization & digital marketing\n☁️ Cloud Solutions: AWS, Azure deployment & management\n🛡️ Cybersecurity: Security audits & implementation\n🔧 Maintenance & Support: Ongoing website & app maintenance\n📊 Custom Software: Tailored enterprise solutions\n\nWe\'re your one-stop solution for all digital needs!',
    category: 'services',
    keywords: ['services', 'what do you do', 'offerings', 'solutions', 'capabilities', 'provide', 'offer'],
    priority: 9,
    isActive: true
  },
  {
    question: 'Do you provide ongoing support and maintenance?',
    answer: 'Yes! We offer comprehensive support and maintenance packages:\n\n✓ Regular updates & security patches\n✓ Bug fixes & troubleshooting\n✓ Performance monitoring\n✓ Content updates\n✓ Backup & recovery\n✓ Technical support (email/phone)\n✓ Feature enhancements\n✓ Uptime monitoring\n\nWe offer monthly and annual maintenance plans to keep your website running smoothly and securely. All projects include a warranty period, and we\'re always here to help!',
    category: 'support',
    keywords: ['support', 'maintenance', 'help', 'updates', 'fixes', 'assistance', 'ongoing', 'after launch'],
    priority: 7,
    isActive: true
  },
  {
    question: 'What is your development process?',
    answer: 'We follow a proven agile development process:\n\n1️⃣ Discovery & Planning: Understanding your requirements\n2️⃣ Design Phase: Creating wireframes & mockups\n3️⃣ Development: Building your solution with regular updates\n4️⃣ Testing: Rigorous quality assurance\n5️⃣ Deployment: Launching your website/app\n6️⃣ Training: Teaching you how to use your new platform\n7️⃣ Support: Ongoing maintenance & support\n\nYou\'ll have full visibility throughout the process with regular updates and feedback sessions.',
    category: 'general',
    keywords: ['process', 'methodology', 'how you work', 'approach', 'workflow', 'steps', 'procedure'],
    priority: 6,
    isActive: true
  },
  {
    question: 'Do you sign NDAs and protect confidentiality?',
    answer: 'Absolutely! We take confidentiality very seriously:\n\n✓ We sign NDAs (Non-Disclosure Agreements) before project discussions\n✓ All client data is kept strictly confidential\n✓ Secure development practices\n✓ Code ownership is transferred to you\n✓ No third-party data sharing\n\nYour intellectual property and business ideas are completely safe with us. We can sign your NDA or provide our standard confidentiality agreement.',
    category: 'general',
    keywords: ['nda', 'confidential', 'privacy', 'security', 'safe', 'trust', 'agreement', 'intellectual property'],
    priority: 6,
    isActive: true
  }
];

async function seedFAQs() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB successfully!');

    // Clear existing FAQs
    console.log('Clearing existing FAQs...');
    await FAQ.deleteMany({});

    // Insert new FAQs
    console.log('Inserting FAQ data...');
    const result = await FAQ.insertMany(faqData);
    console.log(`✅ Successfully seeded ${result.length} FAQs!`);

    // Display the seeded FAQs
    console.log('\n📋 Seeded FAQs:');
    result.forEach((faq, index) => {
      console.log(`${index + 1}. [${faq.category.toUpperCase()}] ${faq.question}`);
    });

    await mongoose.connection.close();
    console.log('\n✅ Database connection closed. FAQ seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding FAQs:', error);
    await mongoose.connection.close();
    process.exit(1);
  }
}

seedFAQs();
