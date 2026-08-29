import { NextRequest, NextResponse } from 'next/server';
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

// Notify the applicant that a decision was made
const sendDecisionEmail = async (email: string, name: string, approved: boolean) => {
  const transporter = createTransporter();
  const baseUrl = process.env.NEXTAUTH_URL || 'http://localhost:3000';

  const emailContent = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9fafb;">
      <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <div style="text-align: center; margin-bottom: 30px;">
          <h1 style="color: #22c55e; margin: 0; font-size: 28px;">SquareServer</h1>
          <p style="color: #6b7280; margin: 5px 0 0 0;">Admin Account ${approved ? 'Approved' : 'Rejected'}</p>
        </div>
        <p style="color: #374151; line-height: 1.6;">Dear <strong>${name}</strong>,</p>
        <p style="color: #374151; line-height: 1.6;">
          ${approved
            ? 'Great news! Your admin account has been approved. You can now log in to the admin panel.'
            : 'Your admin account request has been rejected. If you believe this is an error, please contact support.'}
        </p>
        ${approved ? `
        <div style="text-align: center; margin: 30px 0;">
          <a href="${baseUrl}/admin/login" style="background-color: #22c55e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 8px; display: inline-block; font-weight: bold;">
            Access Admin Panel
          </a>
        </div>` : ''}
        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; color: #6b7280;">
          <p style="font-size: 12px;">© ${new Date().getFullYear()} SquareServer. All rights reserved.</p>
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

const renderPage = (title: string, message: string, tone: 'success' | 'error' | 'info') => {
  const color = tone === 'success' ? '#22c55e' : tone === 'error' ? '#ef4444' : '#6b7280';
  return `
    <!DOCTYPE html>
    <html>
      <head><meta charset="utf-8" /><title>${title}</title></head>
      <body style="font-family: Arial, sans-serif; background: #f9fafb; margin: 0; padding: 60px 20px; text-align: center;">
        <div style="max-width: 480px; margin: 0 auto; background: white; padding: 40px; border-radius: 12px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h1 style="color: ${color}; font-size: 22px; margin: 0 0 12px;">${title}</h1>
          <p style="color: #374151; line-height: 1.6;">${message}</p>
        </div>
      </body>
    </html>
  `;
};

const htmlResponse = (title: string, message: string, tone: 'success' | 'error' | 'info', status: number) => {
  return new NextResponse(renderPage(title, message, tone), {
    status,
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
};

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');
    const action = searchParams.get('action');

    if (!token || !action || !['approve', 'reject'].includes(action)) {
      return htmlResponse('Invalid Link', 'This approval link is malformed. Please use the link from the email exactly as sent.', 'error', 400);
    }

    const user = await User.findOne({ approvalToken: token });

    if (!user) {
      return htmlResponse('Link Expired or Already Used', 'This approval link is no longer valid — it may have already been used, or a newer request may have replaced it.', 'info', 200);
    }

    if (!user.approvalTokenExpiry || new Date() > user.approvalTokenExpiry) {
      await User.findByIdAndUpdate(user._id, { $unset: { approvalToken: 1, approvalTokenExpiry: 1 } });
      return htmlResponse('Link Expired', 'This approval link has expired (links are valid for 7 days). Log in to /admin/management to decide on this request instead.', 'error', 200);
    }

    if (user.approvalStatus !== 'pending') {
      return htmlResponse('Already Decided', `This account was already marked "${user.approvalStatus}" — no further action needed.`, 'info', 200);
    }

    const approve = action === 'approve';
    const updateData: Record<string, unknown> = {
      approvalStatus: approve ? 'approved' : 'rejected',
      $unset: { approvalToken: 1, approvalTokenExpiry: 1 },
    };

    if (approve) {
      updateData.approvedBy = 'email-link';
      updateData.approvedAt = new Date();
    } else {
      updateData.rejectedBy = 'email-link';
      updateData.rejectedAt = new Date();
    }

    await User.findByIdAndUpdate(user._id, updateData);

    try {
      await sendDecisionEmail(user.email, user.name, approve);
    } catch (emailError) {
      console.error('Failed to send decision email:', emailError);
    }

    return htmlResponse(
      approve ? '✅ Account Approved' : '❌ Account Rejected',
      approve
        ? `${user.name} (${user.email}) can now log in to the admin panel.`
        : `${user.name} (${user.email})'s request has been rejected.`,
      approve ? 'success' : 'error',
      200
    );
  } catch (error) {
    console.error('Email-based approval error:', error);
    return htmlResponse('Something Went Wrong', 'An unexpected error occurred. Please try again from /admin/management.', 'error', 500);
  }
}
