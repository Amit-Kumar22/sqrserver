import { NextRequest, NextResponse } from 'next/server';
import { verifyToken } from '@/lib/auth';
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

// Send approval notification email  
const sendApprovalEmail = async (email: string, name: string, approved: boolean) => {
  const transporter = createTransporter();
  
  const emailContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
      <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #22c55e; margin: 0; font-size: 28px;">SquareServer</h1>
          <p style="color: #6b7280; margin: 5px 0 0 0;">Admin Account ${approved ? 'Approved' : 'Rejected'}</p>
        </div>
        
        <h2 style="color: #1f2937; margin-bottom: 20px; text-align: center;">
          ${approved ? '✅ Account Approved' : '❌ Account Rejected'}
        </h2>
        
        <p style="color: #374151; line-height: 1.6;">
          Dear <strong>${name}</strong>,
        </p>
        
        <p style="color: #374151; line-height: 1.6;">
          ${approved 
            ? 'Great news! Your admin account has been approved by an administrator. You can now log in to the admin panel and start managing projects and research content.'
            : 'We regret to inform you that your admin account request has been rejected. If you believe this is an error, please contact our support team for further assistance.'
          }
        </p>
        
        ${approved ? `
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXTAUTH_URL}/admin/login" 
             style="background-color: #22c55e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
            Access Admin Panel
          </a>
        </div>
        ` : ''}
        
        <div style="${approved ? 'background-color: #d1fae5;' : 'background-color: #fee2e2;'} padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: ${approved ? '#065f46;' : '#991b1b;'} margin-top: 0;">
            ${approved ? '🎉 What you can do now:' : '📞 Need help?'}
          </h3>
          ${approved ? `
          <ul style="color: #047857; line-height: 1.6; margin: 10px 0;">
            <li>Create and manage projects</li>
            <li>Publish research content</li>
            <li>View analytics and insights</li>
            <li>Manage other admin accounts</li>
          </ul>
          ` : `
          <p style="color: #991b1b; line-height: 1.6; margin: 10px 0;">
            If you have questions about this decision, please contact our support team at 
            <a href="mailto:${process.env.EMAIL_FROM}" style="color: #991b1b; text-decoration: underline;">
              ${process.env.EMAIL_FROM}
            </a>
          </p>
          `}
        </div>
        
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280;">
          <p>This notification was sent regarding your admin account status.</p>
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
    subject: `Admin Account ${approved ? 'Approved' : 'Rejected'} - SquareServer`,
    html: emailContent,
  });
};

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

// POST - Approve or reject admin account
export async function POST(request: NextRequest, { params }: RouteParams) {
  try {
    await dbConnect();
    
    // Await params for Next.js 15 compatibility
    const { id } = await params;
    
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
    
    const { action } = await request.json();
    
    if (!['approve', 'reject'].includes(action)) {
      return NextResponse.json(
        { error: 'Invalid action. Must be "approve" or "reject"' },
        { status: 400 }
      );
    }
    
    // Find the admin to approve/reject
    const adminToUpdate = await User.findById(id);
    if (!adminToUpdate) {
      return NextResponse.json(
        { error: 'Admin not found' },
        { status: 404 }
      );
    }
    
    // Prevent self-approval/rejection
    if (adminToUpdate._id.toString() === currentUser._id.toString()) {
      return NextResponse.json(
        { error: 'You cannot approve or reject your own account' },
        { status: 400 }
      );
    }
    
    // Update the admin's approval status
    const updateData: any = {
      approvalStatus: action === 'approve' ? 'approved' : 'rejected',
    };
    
    if (action === 'approve') {
      updateData.approvedBy = currentUser.email;
      updateData.approvedAt = new Date();
      // Clear any previous rejection data
      updateData.rejectedBy = undefined;
      updateData.rejectedAt = undefined;
    } else {
      updateData.rejectedBy = currentUser.email;
      updateData.rejectedAt = new Date();
      // Clear any previous approval data
      updateData.approvedBy = undefined;
      updateData.approvedAt = undefined;
    }
    
    await User.findByIdAndUpdate(id, updateData);
    
    // Send notification email
    try {
      await sendApprovalEmail(
        adminToUpdate.email,
        adminToUpdate.name,
        action === 'approve'
      );
    } catch (emailError) {
      console.error('Failed to send approval email:', emailError);
      // Don't fail the entire request if email fails
    }
    
    return NextResponse.json({
      message: `Admin account ${action === 'approve' ? 'approved' : 'rejected'} successfully`,
      admin: {
        id: adminToUpdate._id.toString(),
        name: adminToUpdate.name,
        email: adminToUpdate.email,
        approvalStatus: action === 'approve' ? 'approved' : 'rejected',
      }
    }, { status: 200 });
    
  } catch (error) {
    console.error('Admin approval/rejection error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}