#!/usr/bin/env node

// Simple test script to verify email configuration
async function testEmailConfig() {
  console.log('🧪 Testing Nodemailer Configuration for SquareServer...\n');
  
  // Load environment variables
  require('dotenv').config({ path: '.env.local' });
  
  try {
    // Dynamic import of nodemailer (same as API route)
    console.log('📦 Loading nodemailer...');
    const nodemailer = await import('nodemailer');
    console.log('✅ Nodemailer loaded successfully');
    
    // Check environment variables
    const envVars = {
      SMTP_HOST: process.env.SMTP_HOST,
      SMTP_PORT: process.env.SMTP_PORT,
      SMTP_SECURE: process.env.SMTP_SECURE,
      EMAIL_USER: process.env.EMAIL_USER,
      EMAIL_PASS: process.env.EMAIL_PASS ? '***SET***' : 'NOT SET',
      EMAIL_FROM: process.env.EMAIL_FROM,
      CONTACT_EMAIL_RECEIVER: process.env.CONTACT_EMAIL_RECEIVER,
    };
    
    console.log('📋 Environment Variables:');
    Object.entries(envVars).forEach(([key, value]) => {
      console.log(`  ${key}: ${value}`);
    });
    
    // Check for missing variables
    const missing = Object.entries(envVars)
      .filter(([key, value]) => !value || value === 'NOT SET')
      .map(([key]) => key);
    
    if (missing.length > 0) {
      console.log('❌ Missing environment variables:', missing);
      return;
    }
    
    // Create transporter (same logic as API route)
    console.log('\n🔧 Creating email transporter...');
    const config = {
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT) || 465,
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      connectionTimeout: 15000,
      greetingTimeout: 10000,
      socketTimeout: 45000,
      requireTLS: false,
      tls: {
        rejectUnauthorized: false
      }
    };
    
    let transporter;
    
    // Try different ways to access createTransport (same as API route)
    if (nodemailer.default && typeof nodemailer.default.createTransport === 'function') {
      console.log('📧 Using nodemailer.default.createTransport');
      transporter = nodemailer.default.createTransport(config);
    } else if (typeof nodemailer.createTransport === 'function') {
      console.log('📧 Using nodemailer.createTransport');
      transporter = nodemailer.createTransport(config);
    } else {
      console.log('❌ createTransport function not found');
      console.log('Available methods:', Object.keys(nodemailer));
      return;
    }
    
    console.log('✅ Transporter created successfully');
    
    // Test connection
    console.log('\n🔌 Testing SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection verified!');
    
    // Send test email
    console.log('\n📧 Sending test email...');
    const result = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.CONTACT_EMAIL_RECEIVER,
      subject: '🧪 Email Test - SquareServer Contact Form',
      html: `
        <h2>✅ Email Configuration Test Successful!</h2>
        <p>This email confirms that your SquareServer contact form email setup is working correctly.</p>
        <div style="background-color: #f0fdf4; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <h3>Configuration Details:</h3>
          <ul>
            <li><strong>SMTP Host:</strong> ${process.env.SMTP_HOST}</li>
            <li><strong>Port:</strong> ${process.env.SMTP_PORT}</li>
            <li><strong>Secure:</strong> ${process.env.SMTP_SECURE}</li>
            <li><strong>From:</strong> ${process.env.EMAIL_FROM}</li>
            <li><strong>To:</strong> ${process.env.CONTACT_EMAIL_RECEIVER}</li>
            <li><strong>Test Time:</strong> ${new Date().toLocaleString()}</li>
          </ul>
        </div>
        <p><strong>🎉 Your contact form is ready to use!</strong></p>
      `,
    });
    
    console.log('✅ Test email sent successfully!');
    console.log('📧 Message ID:', result.messageId);
    console.log('📬 Check your inbox at:', process.env.CONTACT_EMAIL_RECEIVER);
    console.log('\n🎉 SUCCESS: Email configuration is working perfectly!');
    
  } catch (error) {
    console.log('❌ Email test failed:');
    console.log('Error:', error.message);
    console.log('Stack:', error.stack);
    
    if (error.code) {
      console.log('Error Code:', error.code);
    }
    
    console.log('\n🔧 Troubleshooting tips:');
    console.log('- Verify email password is correct in .env.local');
    console.log('- Check if SMTP is enabled for your Hostinger email account');
    console.log('- Ensure firewall is not blocking port 465/587');
    console.log('- Try running: npm install nodemailer');
  }
}

// Run the test
testEmailConfig();