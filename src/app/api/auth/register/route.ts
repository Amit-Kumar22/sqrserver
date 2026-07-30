import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { hashPassword } from '@/lib/auth';
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

// Send OTP verification email
const sendOTPEmail = async (email: string, name: string, otp: string) => {
  const transporter = createTransporter();
  
  const emailContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
      <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #22c55e; margin: 0; font-size: 28px;">SquareServer</h1>
          <p style="color: #6b7280; margin: 5px 0 0 0;">Admin Account Verification</p>
        </div>
        
        <h2 style="color: #1f2937; margin-bottom: 20px; text-align: center;">
          🔐 Verify Your Admin Account
        </h2>
        
        <p style="color: #374151; line-height: 1.6;">
          Dear <strong>${name}</strong>,
        </p>
        
        <p style="color: #374151; line-height: 1.6;">
          Thank you for registering an admin account with SquareServer. To complete your registration, 
          please use the verification code below:
        </p>
        
        <div style="text-align: center; margin: 30px 0;">
          <div style="background-color: #f0fdf4; border: 2px dashed #22c55e; padding: 20px; border-radius: 10px; display: inline-block;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">Your Verification Code</p>
            <h1 style="margin: 10px 0; color: #22c55e; font-size: 36px; letter-spacing: 8px; font-weight: bold;">${otp}</h1>
          </div>
        </div>
        
        <div style="background-color: #fef3c7; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #d97706; margin-top: 0;">⚠️ Important Notes</h3>
          <ul style="color: #92400e; line-height: 1.6; margin: 10px 0;">
            <li>This code will expire in <strong>10 minutes</strong></li>
            <li>Enter this code exactly as shown (6 digits)</li>
            <li>Do not share this code with anyone</li>
            <li>If you didn't request this, please ignore this email</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <p style="color: #6b7280; font-size: 14px;">
            If you're having trouble with verification, please contact our support team.
          </p>
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280;">
          <p>This verification email was sent for admin account registration.</p>
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
    subject: `🔐 Admin Account Verification - Your OTP: ${otp}`,
    html: emailContent,
  });
};

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const { email, password, name } = await request.json();
    
    // Validate input
    if (!email || !password || !name) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }
    
    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      if (existingUser.isVerified) {
        return NextResponse.json(
          { error: 'User already exists and is verified' },
          { status: 409 }
        );
      } else {
        // User exists but not verified - we can update their details and resend OTP
        const hashedPassword = await hashPassword(password);
        const otp = generateOTP();
        const otpExpiry = new Date();
        otpExpiry.setMinutes(otpExpiry.getMinutes() + 10);
        
        await User.findOneAndUpdate(
          { email: email.toLowerCase() },
          {
            password: hashedPassword,
            name,
            otp: otp,
            otpExpiry: otpExpiry,
          }
        );
        
        // Send OTP email
        try {
          await sendOTPEmail(email, name, otp);
          
          return NextResponse.json(
            {
              message: 'Registration updated. Please check your email for the verification code. Your account will require admin approval before you can access the admin panel.',
              requiresVerification: true,
              email: email.toLowerCase(),
            },
            { status: 200 }
          );
        } catch (emailError) {
          console.error('Email sending error:', emailError);
          return NextResponse.json(
            { error: 'Account created but failed to send verification email. Please try again.' },
            { status: 500 }
          );
        }
      }
    }
    
    // Hash password
    const hashedPassword = await hashPassword(password);
    
    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 10); // OTP expires in 10 minutes
    
    // Create user with unverified status
    const user = new User({
      email: email.toLowerCase(),
      password: hashedPassword,
      name,
      role: 'admin',
      isVerified: false,
      otp: otp,
      otpExpiry: otpExpiry,
    });
    
    await user.save();
    
    // Send OTP email
    try {
      await sendOTPEmail(email, name, otp);
      console.log('OTP email sent successfully to:', email);
      
      return NextResponse.json(
        {
          message: 'Account created successfully! Please verify your email to continue. Your account will require admin approval before you can access the admin panel.',
          requiresVerification: true,
          email: email.toLowerCase(),
        },
        { status: 201 }
      );
    } catch (emailError) {
      console.error('Email sending error:', emailError);
      return NextResponse.json(
        { error: 'Account created but failed to send verification email. Please try again.' },
        { status: 500 }
      );
    }
    
  } catch (error: any) {
    console.error('Registration error:', error);
    
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 409 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}