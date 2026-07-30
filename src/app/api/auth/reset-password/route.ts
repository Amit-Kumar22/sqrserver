import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';
import { hashPassword } from '@/lib/auth';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const { email, otp, newPassword } = await request.json();
    
    // Validate input
    if (!email || !otp || !newPassword) {
      return NextResponse.json(
        { error: 'Email, OTP, and new password are required' },
        { status: 400 }
      );
    }
    
    if (newPassword.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters long' },
        { status: 400 }
      );
    }
    
    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid request. Please try the password reset process again.' },
        { status: 400 }
      );
    }
    
    // Check if user is verified
    if (!user.isVerified) {
      return NextResponse.json(
        { error: 'Please verify your email address first.' },
        { status: 400 }
      );
    }
    
    // Check if reset OTP exists
    if (!user.resetOtp || !user.resetOtpExpiry) {
      return NextResponse.json(
        { error: 'No password reset request found. Please request a new password reset.' },
        { status: 400 }
      );
    }
    
    // Check if OTP has expired
    if (new Date() > user.resetOtpExpiry) {
      // Clear expired OTP
      await User.findOneAndUpdate(
        { email: email.toLowerCase() },
        {
          $unset: { resetOtp: 1, resetOtpExpiry: 1 }
        }
      );
      
      return NextResponse.json(
        { error: 'Reset code has expired. Please request a new password reset.' },
        { status: 400 }
      );
    }
    
    // Check if OTP matches
    if (user.resetOtp !== otp.toString()) {
      return NextResponse.json(
        { error: 'Invalid reset code. Please check and try again.' },
        { status: 400 }
      );
    }
    
    // Hash new password
    const hashedPassword = await hashPassword(newPassword);
    
    // Update password and clear reset OTP
    await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      {
        password: hashedPassword,
        $unset: { resetOtp: 1, resetOtpExpiry: 1 }
      }
    );
    
    console.log('Password reset successfully for:', email);
    
    return NextResponse.json(
      {
        message: 'Password has been reset successfully! You can now log in with your new password.',
      },
      { status: 200 }
    );
    
  } catch (error) {
    console.error('Reset password error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}