import { NextRequest, NextResponse } from 'next/server';
import { generateToken, comparePassword } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const { email, password } = await request.json();
    
    // Validate input
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }
    
    // Find user in database
    const user = await User.findOne({ email: email.toLowerCase() });
    
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Check if user is verified
    if (!user.isVerified) {
      return NextResponse.json(
        { error: 'Please verify your email address before logging in', requiresVerification: true, email: user.email },
        { status: 403 }
      );
    }
    
    // Check if user is approved by an admin
    if (user.approvalStatus !== 'approved') {
      let errorMessage = 'Your account is pending admin approval. Please wait for an administrator to approve your account.';
      
      if (user.approvalStatus === 'rejected') {
        errorMessage = 'Your account has been rejected by an administrator. Please contact support for more information.';
      }
      
      return NextResponse.json(
        { error: errorMessage, approvalStatus: user.approvalStatus },
        { status: 403 }
      );
    }
    
    // Compare password
    const isValidPassword = await comparePassword(password, user.password);
    
    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    
    // Generate token for authenticated user
    const token = generateToken({
      userId: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    });
    
    // Create response with user data
    const response = NextResponse.json(
      {
        message: 'Login successful',
        user: {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      { status: 200 }
    );
    
    // Set HTTP-only cookie with token
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
      path: '/',
    });
    
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}