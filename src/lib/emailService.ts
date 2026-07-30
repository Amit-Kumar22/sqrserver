// Email utility for SquareServer contact form
import nodemailer from 'nodemailer';

export interface EmailData {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  subject: string;
  message: string;
  projectType: string;
  budget?: string;
}

// Create and configure nodemailer transporter
export function createEmailTransporter() {
  const config = {
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT as string) || 465,
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

  console.log('🔧 Creating email transporter:', {
    host: config.host,
    port: config.port,
    secure: config.secure,
    user: config.auth.user
  });

  return nodemailer.createTransport(config);
}

// Send notification email to business
export async function sendBusinessNotification(data: EmailData) {
  const transporter = createEmailTransporter();
  
  const emailContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
      <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h2 style="color: #1f2937; margin-bottom: 20px; border-bottom: 3px solid #22c55e; padding-bottom: 10px;">
          🔔 New Contact Form Submission - SquareServer
        </h2>
        
        <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #15803d; margin-top: 0;">Contact Information</h3>
          <p><strong>Name:</strong> ${data.name}</p>
          <p><strong>Email:</strong> <a href="mailto:${data.email}" style="color: #22c55e;">${data.email}</a></p>
          ${data.company ? `<p><strong>Company:</strong> ${data.company}</p>` : ''}
          ${data.phone ? `<p><strong>Phone:</strong> <a href="tel:${data.phone}" style="color: #22c55e;">${data.phone}</a></p>` : ''}
        </div>
        
        <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #059669; margin-top: 0;">Project Details</h3>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <p><strong>Project Type:</strong> ${data.projectType}</p>
          ${data.budget ? `<p><strong>Budget:</strong> ${data.budget}</p>` : ''}
        </div>
        
        <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #d97706; margin-top: 0;">Message</h3>
          <p style="white-space: pre-wrap;">${data.message}</p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280;">
          <p>This email was sent from the SquareServer website contact form.</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
        </div>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.CONTACT_EMAIL_RECEIVER,
    subject: `🔔 New Contact: ${data.subject} - ${data.name}`,
    html: emailContent,
  });
}

// Send confirmation email to customer
export async function sendCustomerConfirmation(data: EmailData) {
  const transporter = createEmailTransporter();
  
  const emailContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
      <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #22c55e; margin: 0; font-size: 28px;">SquareServer</h1>
          <p style="color: #6b7280; margin: 5px 0 0 0;">Comprehensive Technology Solutions</p>
        </div>
        
        <h2 style="color: #1f2937; margin-bottom: 20px;">
          Thank you for contacting us! 🙏
        </h2>
        
        <p style="color: #374151; line-height: 1.6;">
          Dear <strong>${data.name}</strong>,
        </p>
        
        <p style="color: #374151; line-height: 1.6;">
          We have successfully received your inquiry and appreciate you reaching out to us. 
          Our team will review your requirements and get back to you within 24 hours.
        </p>
        
        <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #15803d; margin-top: 0;">Your Submission Summary</h3>
          <p><strong>Subject:</strong> ${data.subject}</p>
          <p><strong>Project Type:</strong> ${data.projectType}</p>
          ${data.budget ? `<p><strong>Budget Range:</strong> ${data.budget}</p>` : ''}
          <p><strong>Submitted On:</strong> ${new Date().toLocaleDateString('en-IN')} at ${new Date().toLocaleTimeString('en-IN')}</p>
        </div>
        
        <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #059669; margin-top: 0;">Next Steps</h3>
          <ul style="color: #374151; line-height: 1.6;">
            <li>Our technical team will analyze your requirements</li>
            <li>We'll prepare a customized solution proposal</li>
            <li>You'll receive a detailed response within 24 hours</li>
            <li>We may schedule a discovery call to discuss your project further</li>
          </ul>
        </div>
        
        <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #d97706; margin-top: 0;">Contact Information</h3>
          <p><strong>📧 Email:</strong> <a href="mailto:info@squareserver.in" style="color: #22c55e;">info@squareserver.in</a></p>
          <p><strong>📞 Phone:</strong> <a href="tel:+919876543210" style="color: #22c55e;">+91 98765 43210</a></p>
          <p><strong>🏢 Address:</strong> The Cozy Corner, No 9A, Choudhary Lane Road, Vikash Nagar, Balapur, Patna, Bihar 800010</p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280;">
          <p>This is an automated confirmation email. Please do not reply to this email.</p>
          <p>If you have any urgent queries, please call us at <strong>+91 98765 43210</strong></p>
        </div>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: data.email,
    subject: `✅ Thank you for contacting SquareServer - We'll be in touch soon!`,
    html: emailContent,
  });
}