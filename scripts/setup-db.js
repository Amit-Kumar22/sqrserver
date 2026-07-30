const mongoose = require('mongoose');
const bcryptjs = require('bcryptjs');
require('dotenv').config({ path: '.env.local' });

// Import models (Note: In a script context, we need to define schemas directly)
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['admin'], default: 'admin' },
}, { timestamps: true });

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  detailedDescription: { type: String, required: true },
  technologies: [String],
  category: { type: String, required: true },
  status: { type: String, enum: ['completed', 'ongoing', 'planned'], default: 'ongoing' },
  startDate: { type: Date, required: true },
  endDate: Date,
  images: [String],
  demoUrl: String,
  githubUrl: String,
  featured: { type: Boolean, default: false },
}, { timestamps: true });

const ResearchContentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  summary: { type: String, required: true },
  category: { type: String, required: true },
  tags: [String],
  published: { type: Boolean, default: false },
  author: { type: String, required: true },
  publishedDate: Date,
}, { timestamps: true });

const User = mongoose.model('User', UserSchema);
const Project = mongoose.model('Project', ProjectSchema);
const ResearchContent = mongoose.model('ResearchContent', ResearchContentSchema);

async function setupDatabase() {
  try {
    console.log('🔥 Starting database setup...');
    
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Clear existing data (optional - comment out if you want to preserve data)
    console.log('🧹 Clearing existing data...');
    await User.deleteMany({});
    await Project.deleteMany({});
    await ResearchContent.deleteMany({});
    
    // Create admin user
    console.log('👤 Creating admin user...');
    const hashedPassword = await bcryptjs.hash(process.env.ADMIN_PASSWORD || 'admin123', 12);
    const admin = new User({
      email: process.env.ADMIN_EMAIL || 'admin@squareserver.com',
      password: hashedPassword,
      name: 'Admin User',
      role: 'admin',
    });
    await admin.save();
    console.log(`✅ Admin user created: ${admin.email}`);
    
    // Create sample projects
    console.log('📁 Creating sample projects...');
    const sampleProjects = [
      {
        title: 'E-Commerce Platform',
        description: 'Modern e-commerce platform with advanced features and seamless user experience.',
        detailedDescription: `A comprehensive e-commerce platform built with Next.js and Node.js, featuring real-time inventory management, secure payment processing, and advanced analytics.\n\nKey features include:\n- Multi-vendor marketplace support\n- Real-time inventory tracking\n- Advanced search and filtering\n- Secure payment gateway integration\n- Admin dashboard with analytics\n- Responsive design for all devices\n\nThe platform handles high traffic loads and provides an excellent user experience across all touchpoints.`,
        technologies: ['Next.js', 'React', 'Node.js', 'MongoDB', 'Stripe', 'Redis'],
        category: 'web-development',
        status: 'completed',
        startDate: new Date('2023-01-15'),
        endDate: new Date('2023-06-30'),
        featured: true,
        demoUrl: 'https://demo.example.com',
        githubUrl: 'https://github.com/example/ecommerce',
      },
      {
        title: 'Mobile Banking App',
        description: 'Secure mobile banking application with biometric authentication and real-time transactions.',
        detailedDescription: `A state-of-the-art mobile banking application that provides users with secure, convenient access to their financial services. Built with React Native for cross-platform compatibility.\n\nSecurity features:\n- Biometric authentication (fingerprint, face recognition)\n- End-to-end encryption\n- Multi-factor authentication\n- Fraud detection algorithms\n\nFunctionalities:\n- Account balance and transaction history\n- Money transfers and bill payments\n- Investment portfolio management\n- Customer support chat\n- Push notifications for transactions`,
        technologies: ['React Native', 'Node.js', 'PostgreSQL', 'JWT', 'Biometric API'],
        category: 'mobile-app',
        status: 'completed',
        startDate: new Date('2023-03-01'),
        endDate: new Date('2023-09-15'),
        featured: true,
      },
      {
        title: 'AI-Powered Analytics Dashboard',
        description: 'Intelligent analytics dashboard with machine learning insights and predictive analytics.',
        detailedDescription: `An advanced analytics platform that leverages artificial intelligence and machine learning to provide actionable business insights. The dashboard processes large datasets and presents them in intuitive visualizations.\n\nAI Features:\n- Predictive analytics for sales forecasting\n- Anomaly detection in data patterns\n- Natural language query processing\n- Automated report generation\n- Smart recommendations based on trends\n\nTechnical Implementation:\n- Python-based ML models\n- Real-time data processing\n- Interactive visualizations\n- RESTful API architecture\n- Scalable cloud infrastructure`,
        technologies: ['Python', 'TensorFlow', 'React', 'D3.js', 'PostgreSQL', 'Docker'],
        category: 'ai-ml',
        status: 'ongoing',
        startDate: new Date('2023-08-01'),
        featured: false,
      },
      {
        title: 'Blockchain Supply Chain',
        description: 'Decentralized supply chain management system using blockchain technology for transparency.',
        detailedDescription: `A revolutionary supply chain management system built on blockchain technology to ensure transparency, traceability, and authenticity throughout the supply chain process.\n\nBlockchain Features:\n- Immutable transaction records\n- Smart contract automation\n- Multi-party consensus mechanisms\n- Cryptographic security\n- Inter-blockchain communication\n\nSupply Chain Benefits:\n- Product authenticity verification\n- Real-time tracking and monitoring\n- Automated compliance checking\n- Reduced fraud and counterfeiting\n- Enhanced stakeholder trust\n\nThe system integrates with existing ERP systems and provides APIs for third-party integration.`,
        technologies: ['Ethereum', 'Solidity', 'Web3.js', 'React', 'Node.js', 'IPFS'],
        category: 'blockchain',
        status: 'planned',
        startDate: new Date('2024-01-15'),
        featured: false,
      },
    ];
    
    for (const projectData of sampleProjects) {
      const project = new Project(projectData);
      await project.save();
    }
    console.log(`✅ Created ${sampleProjects.length} sample projects`);
    
    // Create sample research content
    console.log('🔬 Creating sample research content...');
    const sampleResearch = [
      {
        title: 'Advancements in Machine Learning for Predictive Analytics',
        summary: 'Exploring cutting-edge machine learning techniques and their applications in predictive analytics across various industries.',
        content: `This research explores the latest advancements in machine learning algorithms and their practical applications in predictive analytics. We examine deep learning architectures, ensemble methods, and their effectiveness in real-world scenarios.\n\n## Introduction\n\nMachine learning has revolutionized the way we approach predictive analytics, enabling organizations to make data-driven decisions with unprecedented accuracy. Recent developments in neural network architectures and optimization techniques have opened new possibilities for solving complex prediction problems.\n\n## Methodology\n\nOur research methodology involves comprehensive analysis of various ML algorithms, including:\n- Deep Neural Networks (DNNs)\n- Convolutional Neural Networks (CNNs)\n- Recurrent Neural Networks (RNNs)\n- Transformer architectures\n- Ensemble methods\n\n## Key Findings\n\n1. **Improved Accuracy**: Modern ML models achieve 15-20% better accuracy compared to traditional methods\n2. **Scalability**: New architectures handle larger datasets more efficiently\n3. **Interpretability**: Recent developments in explainable AI provide better insights into model decisions\n\n## Conclusion\n\nThe integration of advanced machine learning techniques in predictive analytics represents a significant leap forward in business intelligence and decision-making capabilities.`,
        category: 'machine-learning',
        tags: ['machine learning', 'predictive analytics', 'deep learning', 'neural networks'],
        published: true,
        author: 'Dr. Sarah Chen',
        publishedDate: new Date('2023-11-15'),
      },
      {
        title: 'Blockchain Security: Threats and Mitigation Strategies',
        summary: 'Comprehensive analysis of security vulnerabilities in blockchain systems and effective mitigation strategies.',
        content: `This research paper provides an in-depth analysis of security challenges in blockchain technology and presents comprehensive mitigation strategies to address these vulnerabilities.\n\n## Abstract\n\nBlockchain technology has gained significant attention due to its potential to revolutionize various industries. However, security concerns remain a critical challenge that needs to be addressed for widespread adoption.\n\n## Security Threats Analysis\n\n### 1. Smart Contract Vulnerabilities\n- Reentrancy attacks\n- Integer overflow/underflow\n- Access control issues\n- Logic errors\n\n### 2. Consensus Mechanism Attacks\n- 51% attacks\n- Eclipse attacks\n- Selfish mining\n- Nothing-at-stake problem\n\n### 3. Network-Level Threats\n- Sybil attacks\n- DDoS attacks\n- Man-in-the-middle attacks\n\n## Mitigation Strategies\n\n### Smart Contract Security\n1. **Static Analysis Tools**: Automated vulnerability scanning\n2. **Formal Verification**: Mathematical proof of contract correctness\n3. **Security Audits**: Professional security reviews\n4. **Best Practices**: Secure coding patterns\n\n### Consensus Security\n1. **Multi-layer Security**: Combining multiple consensus mechanisms\n2. **Stake-based Penalties**: Economic disincentives for malicious behavior\n3. **Network Monitoring**: Real-time threat detection\n\n## Conclusion\n\nWhile blockchain technology faces various security challenges, proper implementation of mitigation strategies can significantly enhance system security and promote wider adoption.`,
        category: 'blockchain',
        tags: ['blockchain', 'security', 'smart contracts', 'cryptography'],
        published: true,
        author: 'Dr. Amit Patel',
        publishedDate: new Date('2023-10-20'),
      },
    ];
    
    for (const researchData of sampleResearch) {
      const research = new ResearchContent(researchData);
      await research.save();
    }
    console.log(`✅ Created ${sampleResearch.length} sample research articles`);
    
    console.log('\n🎉 Database setup completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`👤 Admin users: ${await User.countDocuments()}`);
    console.log(`📁 Projects: ${await Project.countDocuments()}`);
    console.log(`🔬 Research articles: ${await ResearchContent.countDocuments()}`);
    console.log('\n🔐 Admin Login Credentials:');
    console.log(`📧 Email: ${process.env.ADMIN_EMAIL || 'admin@squareserver.com'}`);
    console.log(`🔑 Password: ${process.env.ADMIN_PASSWORD || 'admin123'}`);
    console.log('\n🌐 You can now start the application with: npm run dev');
    console.log('🔗 Admin Panel: http://localhost:3000/admin/login');
    
  } catch (error) {
    console.error('❌ Error setting up database:', error);
    process.exit(1);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('\n📡 Database connection closed');
    process.exit(0);
  }
}

// Run the setup
setupDatabase();