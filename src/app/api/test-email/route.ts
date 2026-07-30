import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Test email configuration
export async function POST() {
  try {
    // Check if all required environment variables are set
    const requiredEnvVars = {
      SMTP_HOST: process.env.SMTP_HOST,
      SMTP_PORT: process.env.SMTP_PORT,
      EMAIL_USER: process.env.EMAIL_USER,
      EMAIL_PASS: process.env.EMAIL_PASS,
      EMAIL_FROM: process.env.EMAIL_FROM,
      CONTACT_EMAIL_RECEIVER: process.env.CONTACT_EMAIL_RECEIVER,
    };

    const missingVars = Object.entries(requiredEnvVars)
      .filter(([, value]) => !value || value === 'your_email_password_here')
      .map(([key]) => key);

    if (missingVars.length > 0) {
      return NextResponse.json({
        success: false,
        error: 'Missing environment variables',
        missingVars,
        message: 'Please configure all required email environment variables in .env.local'
      }, { status: 400 });
    }

    console.log('🧪 Testing email configuration...');
    console.log('SMTP Host:', process.env.SMTP_HOST);
    console.log('SMTP Port:', process.env.SMTP_PORT);
    console.log('Email User:', process.env.EMAIL_USER);
    console.log('Email From:', process.env.EMAIL_FROM);
    console.log('Contact Receiver:', process.env.CONTACT_EMAIL_RECEIVER);

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT as string),
      secure: process.env.SMTP_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
      connectionTimeout: 10000,
      greetingTimeout: 5000,
      socketTimeout: 30000,
    });

    // Test connection
    console.log('🔌 Testing SMTP connection...');
    await transporter.verify();
    console.log('✅ SMTP connection successful!');

    // Send test email
    console.log('📧 Sending test email...');
    const testEmailResult = await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: process.env.CONTACT_EMAIL_RECEIVER,
      subject: '🧪 Email Configuration Test - SquareServer',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #22c55e;">✅ Email Test Successful!</h2>
          <p>This is a test email to verify that your email configuration is working correctly.</p>
          <div style="background-color: #f0fdf4; padding: 15px; border-radius: 5px; margin: 20px 0;">
            <h3 style="margin-top: 0; color: #15803d;">Configuration Details:</h3>
            <ul>
              <li><strong>SMTP Host:</strong> ${process.env.SMTP_HOST}</li>
              <li><strong>SMTP Port:</strong> ${process.env.SMTP_PORT}</li>
              <li><strong>From Email:</strong> ${process.env.EMAIL_FROM}</li>
              <li><strong>Receiver Email:</strong> ${process.env.CONTACT_EMAIL_RECEIVER}</li>
              <li><strong>Test Time:</strong> ${new Date().toLocaleString()}</li>
            </ul>
          </div>
          <p>If you're receiving this email, your contact form should work perfectly! 🎉</p>
          <hr>
          <p><small>This test was sent from the SquareServer email test endpoint.</small></p>
        </div>
      `,
    });

    console.log('✅ Test email sent successfully!');
    console.log('Message ID:', testEmailResult.messageId);

    return NextResponse.json({
      success: true,
      message: 'Email configuration test successful!',
      details: {
        messageId: testEmailResult.messageId,
        connection: 'SMTP connection verified',
        emailSent: 'Test email sent successfully',
        recipient: process.env.CONTACT_EMAIL_RECEIVER,
      }
    });

  } catch (error: any) {
    console.error('❌ Email test failed:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Email test failed',
      message: error.message || 'Unknown error occurred',
      details: {
        errorType: error.code || 'UNKNOWN',
        errorMessage: error.message || error.toString(),
      }
    }, { status: 500 });
  }
}

// GET method to check configuration without sending email
export async function GET() {
  const requiredEnvVars = {
    SMTP_HOST: process.env.SMTP_HOST,
    SMTP_PORT: process.env.SMTP_PORT,
    EMAIL_USER: process.env.EMAIL_USER,
    EMAIL_PASS: process.env.EMAIL_PASS ? '***SET***' : 'NOT SET',
    EMAIL_FROM: process.env.EMAIL_FROM,
    CONTACT_EMAIL_RECEIVER: process.env.CONTACT_EMAIL_RECEIVER,
  };

  const missingVars = Object.entries(requiredEnvVars)
    .filter(([, value]) => !value || value === 'NOT SET' || (process.env.EMAIL_PASS === 'your_email_password_here'))
    .map(([key]) => key);

  return NextResponse.json({
    configured: missingVars.length === 0,
    environment: requiredEnvVars,
    missingVars,
    message: missingVars.length > 0 ? 'Some environment variables are missing or not configured' : 'All environment variables are configured'
  });
}