import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

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
    await User.findOneAndUpdate(
      { email: email.toLowerCase() },
      {
        isVerified: true,
        $unset: { otp: 1, otpExpiry: 1 }
      }
    );
    
    console.log('User verified successfully:', email);
    
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