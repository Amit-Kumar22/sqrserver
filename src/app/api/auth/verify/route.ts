import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

// Force dynamic rendering since we use cookies
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('token')?.value;
    
    if (!token) {
      return NextResponse.json(
        { error: 'No token found' },
        { status: 401 }
      );
    }
    
    const payload = verifyToken(token);
    
    // Connect to database and verify user still exists and is approved
    await dbConnect();
    const user = await User.findById(payload.userId);
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 401 }
      );
    }
    
    if (!user.isVerified) {
      return NextResponse.json(
        { error: 'Email not verified' },
        { status: 401 }
      );
    }
    
    if (user.approvalStatus !== 'approved') {
      return NextResponse.json(
        { error: 'Account not approved' },
        { status: 401 }
      );
    }
    
    return NextResponse.json(
      {
        user: {
          id: user._id.toString(),
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Token verification error:', error);
    return NextResponse.json(
      { error: 'Invalid token' },
      { status: 401 }
    );
  }
}