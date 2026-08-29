import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

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

// Notify the business inbox with one-click approve/reject links
const sendAdminApprovalRequestEmail = async (
  applicantName: string,
  applicantEmail: string,
  approvalToken: string
) => {
  const transporter = createTransporter();
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';
  const approveUrl = `${baseUrl}/api/auth/verify-admin-approval?token=${approvalToken}&action=approve`;
  const rejectUrl = `${baseUrl}/api/auth/verify-admin-approval?token=${approvalToken}&action=reject`;

  const emailContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
      <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #22c55e; margin: 0; font-size: 28px;">SquareServer</h1>
          <p style="color: #6b7280; margin: 5px 0 0 0;">New Admin Signup Request</p>
        </div>

        <p style="color: #374151; line-height: 1.6;">
          A new admin account has verified their email and is waiting for approval:
        </p>

        <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p style="margin: 4px 0; color: #374151;"><strong>Name:</strong> ${applicantName}</p>
          <p style="margin: 4px 0; color: #374151;"><strong>Email:</strong> ${applicantEmail}</p>
        </div>

        <div style="text-align: center; margin: 30px 0;">
          <a href="${approveUrl}" style="background-color: #22c55e; color: white; padding: 12px 28px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold; margin: 0 8px;">
            ✅ Approve
          </a>
          <a href="${rejectUrl}" style="background-color: #ef4444; color: white; padding: 12px 28px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold; margin: 0 8px;">
            ❌ Reject
          </a>
        </div>

        <p style="color: #9ca3af; font-size: 13px; text-align: center;">
          This link expires in 7 days and works only once. You can also manage requests anytime from
          <a href="${baseUrl}/admin/management">/admin/management</a> after logging in.
        </p>

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280;">
          <p style="font-size: 12px;">© ${new Date().getFullYear()} SquareServer. All rights reserved.</p>
        </div>
      </div>
    </div>
  `;

  await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: process.env.CONTACT_EMAIL_RECEIVER || process.env.EMAIL_FROM,
    subject: `🔔 New Admin Signup Request — ${applicantName}`,
    html: emailContent,
  });
};

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const { email, otp } = await request.json();
    
    if (!email || !otp) {
      return NextResponse.json(
        { error: 'Email and OTP are required' },
        { status: 400 }
      );
    }
    
    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    if (user.isVerified) {
      return NextResponse.json(
        { error: 'User is already verified' },
        { status: 400 }
      );
    }
    
    if (!user.otp || !user.otpExpiry) {
      return NextResponse.json(
        { error: 'No OTP found. Please request a new OTP.' },
        { status: 400 }
      );
    }
    
    // Check if OTP has expired
    if (new Date() > user.otpExpiry) {
      // Clear expired OTP
      await User.findOneAndUpdate(
        { email: email.toLowerCase() },
        {
          $unset: { otp: 1, otpExpiry: 1 }
        }
      );
      
      return NextResponse.json(
        { error: 'OTP has expired. Please request a new OTP.' },
        { status: 400 }
      );
    }
    
    // Check if OTP matches
    if (user.otp !== otp.toString()) {
      return NextResponse.json(
        { error: 'Invalid OTP. Please check and try again.' },
        { status: 400 }
      );
    }
    
    // OTP is valid - verify the user and clear OTP
    const approvalToken = crypto.randomBytes(32).toString('hex');
    const approvalTokenExpiry = new Date();
    approvalTokenExpiry.setDate(approvalTokenExpiry.getDate() + 7);

    await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      {
        isVerified: true,
        approvalToken,
        approvalTokenExpiry,
        $unset: { otp: 1, otpExpiry: 1 }
      }
    );

    console.log('User verified successfully:', email);

    // Only a still-pending account needs an approval request sent out
    if (user.approvalStatus === 'pending') {
      try {
        await sendAdminApprovalRequestEmail(user.name, user.email, approvalToken);
      } catch (emailError) {
        console.error('Failed to send admin approval request email:', emailError);
        // Don't fail verification if this notification email fails
      }
    }

    return NextResponse.json(
      {
        message: 'Email verified successfully! Your admin account is now active.',
        user: {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
          isVerified: true,
        },
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Verify OTP error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}