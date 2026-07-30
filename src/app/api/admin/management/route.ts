import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import User from '@/models/User';

// GET - Fetch all admin accounts with their status
export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    // Verify current user is authenticated and approved
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }
    
    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      );
    }
    
    // Check if current user exists and is approved
    const currentUser = await User.findById(payload.userId);
    if (!currentUser || currentUser.approvalStatus !== 'approved') {
      return NextResponse.json(
        { error: 'Access denied. Admin approval required.' },
        { status: 403 }
      );
    }
    
    // Get URL parameters for filtering
    const url = new URL(request.url);
    const status = url.searchParams.get('status');
    
    // Build query based on status filter
    const query: any = {};
    if (status && ['pending', 'approved', 'rejected'].includes(status)) {
      query.approvalStatus = status;
    }
    
    // Fetch admin accounts (excluding passwords)
    const admins = await User.find(query)
      .select('-password -otp -otpExpiry -resetOtp -resetOtpExpiry')
      .sort({ createdAt: -1 });
    
    return NextResponse.json({
      admins: admins.map(admin => ({
        id: admin._id.toString(),
        name: admin.name,
        email: admin.email,
        role: admin.role,
        isVerified: admin.isVerified,
        approvalStatus: admin.approvalStatus,
        approvedBy: admin.approvedBy,
        approvedAt: admin.approvedAt,
        rejectedBy: admin.rejectedBy,
        rejectedAt: admin.rejectedAt,
        createdAt: admin.createdAt,
        updatedAt: admin.updatedAt,
      }))
    }, { status: 200 });
    
  } catch (error) {
    console.error('Admin management GET error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}