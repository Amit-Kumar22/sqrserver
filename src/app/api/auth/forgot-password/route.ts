import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import nodemailer from 'nodemailer';

// Create nodemailer transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT as string) || 587,
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Generate 6-digit OTP
const generateOTP = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send password reset OTP email
const sendResetOTPEmail = async (email: string, name: string, otp: string) => {
  const transporter = createTransporter();
  
  const emailContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
      <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #22c55e; margin: 0; font-size: 28px;">SquareServer</h1>
          <p style="color: #6b7280; margin: 5px 0 0 0;">Password Reset Request</p>
        </div>
        
        <h2 style="color: #1f2937; margin-bottom: 20px; text-align: center;">
          🔒 Reset Your Password
        </h2>
        
        <p style="color: #374151; line-height: 1.6;">
          Dear <strong>${name}</strong>,
        </p>
        
        <p style="color: #374151; line-height: 1.6;">
          We received a request to reset your admin account password. To proceed with the password reset, 
          please use the verification code below:
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <div style="background-color: #fef2f2; border: 2px dashed #ef4444; padding: 20px; border-radius: 10px; display: inline-block;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">Password Reset Code</p>
            <h1 style="margin: 10px 0; color: #ef4444; font-size: 36px; letter-spacing: 8px; font-weight: bold;">${otp}</h1>
          </div>
        </div>
        
        <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #d97706; margin-top: 0;">⚠️ Security Information</h3>
          <ul style="color: #92400e; line-height: 1.6; margin: 10px 0;">
            <li>This code will expire in <strong>15 minutes</strong></li>
            <li>Enter this code exactly as shown (6 digits)</li>
            <li>Do not share this code with anyone</li>
            <li>If you didn't request this reset, please ignore this email</li>
            <li>Your current password remains unchanged until you complete the reset</li>
          </ul>
        </div>
        
        <div style="background-color: #fee2e2; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ef4444;">
          <p style="margin: 0; color: #991b1b; font-size: 14px;">
            <strong>Didn't request this?</strong> If you didn't request a password reset, your account is still secure. 
            You can safely ignore this email.
          </p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <p style="color: #6b7280; font-size: 14px;">
            If you're having trouble with password reset, please contact our support team.
          </p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280;">
          <p>This password reset email was sent for admin account security.</p>
          <p><strong>Time:</strong> ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}</p>
          <p style="font-size: 12px; margin-top: 10px;">
            © ${new Date().getFullYear()} SquareServer. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: email,
    subject: `🔒 Password Reset Request - Your Code: ${otp}`,
    html: emailContent,
  });
};

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const { email } = await request.json();
    
    // Validate input
    if (!email) {
      return NextResponse.json(
        { error: 'Email is required' },
        { status: 400 }
      );
    }
    
    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      // For security reasons, we don't reveal if the email exists or not
      return NextResponse.json(
        { 
          message: 'If an account with this email exists, you will receive a password reset code shortly.',
        },
        { status: 200 }
      );
    }
    
    // Check if user is verified
    if (!user.isVerified) {
      return NextResponse.json(
        { error: 'Please verify your email address first before resetting password.' },
        { status: 400 }
      );
    }
    
    // Generate reset OTP
    const resetOtp = generateOTP();
    const resetOtpExpiry = new Date();
    resetOtpExpiry.setMinutes(resetOtpExpiry.getMinutes() + 15); // Reset OTP expires in 15 minutes
    
    // Update user with reset OTP
    await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      {
        resetOtp: resetOtp,
        resetOtpExpiry: resetOtpExpiry,
      }
    );
    
    // Send reset OTP email
    try {
      await sendResetOTPEmail(email, user.name, resetOtp);
      console.log('Reset OTP email sent successfully to:', email);
      
      return NextResponse.json(
        {
          message: 'If an account with this email exists, you will receive a password reset code shortly.',
          email: email.toLowerCase(),
        },
        { status: 200 }
      );
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      return NextResponse.json(
        { error: 'Failed to send reset email. Please try again later.' },
        { status: 500 }
      );
    }
    
  } catch (error) {
    console.error('Forgot password error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}