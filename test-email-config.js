const nodemailer = require('nodemailer').default || require('nodemailer');
require('dotenv').config({ path: '.env.local' });

async function testEmailConfig() {
  console.log('🧪 Testing Email Configuration for SquareServer...\n');
  
  // Check environment variables
  console.log('📋 Environment Variables:');
  console.log('SMTP_HOST:', process.env.SMTP_HOST);
  console.log('SMTP_PORT:', process.env.SMTP_PORT);
  console.log('EMAIL_USER:', process.env.EMAIL_USER);
  console.log('EMAIL_FROM:', process.env.EMAIL_FROM);
  console.log('CONTACT_EMAIL_RECEIVER:', process.env.CONTACT_EMAIL_RECEIVER);
  console.log('EMAIL_PASS:', process.env.EMAIL_PASS ? '***SET***' : 'NOT SET');
  console.log();
  
  // Check for missing configuration
  const requiredVars = ['SMTP_HOST', 'SMTP_PORT', 'EMAIL_USER', 'EMAIL_PASS', 'EMAIL_FROM'];
  const missing = requiredVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    console.log('❌ Missing required environment variables:', missing);
    return process.exit(1);
  }
  
  try {
    // Create transporter with the exact same config as the API
    console.log('🔌 Creating SMTP transporter...');
    const transporter = nodemailer.createTransporter({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT) || 465, // Default to SSL port
      secure: process.env.SMTP_SECURE === 'true', // SSL connection
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      // Enhanced configuration for Hostinger
      connectionTimeout: 15000, // 15 seconds
      greetingTimeout: 10000, // 10 seconds
      socketTimeout: 45000, // 45 seconds
      // Additional Hostinger-specific settings
      requireTLS: false, // Since we're using SSL on port 465
      tls: {
        rejectUnauthorized: false // Help with some SSL certificate issues
      }
    });
    
    // Test connection
    console.log('🔍 Testing SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection successful!');
    
    // Send test email
    console.log('📧 Sending test email...');
    const result = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.CONTACT_EMAIL_RECEIVER,
      subject: '🧪 Email Test - SquareServer Contact Form',
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f0fdf4;">
          <h2 style="color: #15803d;">✅ Email Configuration Test Successful!</h2>
          <p>Great news! Your email configuration is working perfectly.</p>
          <div style="background-color: white; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3>Configuration Details:</h3>
            <ul>
              <li><strong>SMTP Host:</strong> ${process.env.SMTP_HOST}</li>
              <li><strong>Port:</strong> ${process.env.SMTP_PORT}</li>
              <li><strong>From:</strong> ${process.env.EMAIL_FROM}</li>
              <li><strong>To:</strong> ${process.env.CONTACT_EMAIL_RECEIVER}</li>
              <li><strong>Test Time:</strong> ${new Date().toLocaleString()}</li>
            </ul>
          </div>
          <p><strong>✅ Your contact form is ready to use!</strong></p>
        </div>
      `,
    });
    
    console.log('✅ Test email sent successfully!');
    console.log('📧 Message ID:', result.messageId);
    console.log('📬 Check your inbox at:', process.env.CONTACT_EMAIL_RECEIVER);
    console.log();
    console.log('🎉 SUCCESS: Email configuration is working perfectly!');
    console.log('🚀 Your contact form should now work correctly.');
    
  } catch (error) {
    console.log('❌ Email test failed:');
    console.log('Error Code:', error.code || 'UNKNOWN');
    console.log('Error Message:', error.message);
    console.log();
    console.log('🔧 Common fixes:');
    console.log('- Verify email password is correct');
    console.log('- Check if email account exists in Hostinger');
    console.log('- Ensure SMTP is enabled for your email account');
    console.log('- Try different network if firewall is blocking port 587');
    
    process.exit(1);
  }
}

// Run the test
testEmailConfig().catch(console.error);