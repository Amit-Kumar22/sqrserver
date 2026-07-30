import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import ChatLead from '@/models/ChatLead';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

// Verify admin authentication
async function verifyAdmin(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;
    
    if (!token) return false;
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: string; role: string };
    return decoded.role === 'admin';
  } catch {
    return false;
  }
}

// GET - Fetch all chat leads
export async function GET(request: NextRequest) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50');
    const page = parseInt(searchParams.get('page') || '1');
    
    const query: any = {};
    if (status) query.status = status;

    const skip = (page - 1) * limit;

    const [leads, total] = await Promise.all([
      ChatLead.find(query)
        .sort({ lastMessageAt: -1 })
        .limit(limit)
        .skip(skip)
        .lean(),
      ChatLead.countDocuments(query)
    ]);

    return NextResponse.json({
      success: true,
      leads,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Error fetching chat leads:', error);
    return NextResponse.json(
      { error: 'Failed to fetch chat leads' },
      { status: 500 }
    );
  }
}

// PUT - Update lead status
export async function PUT(request: NextRequest) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json(
        { error: 'ID and status are required' },
        { status: 400 }
      );
    }

    const updatedLead = await ChatLead.findByIdAndUpdate(
      id,
      { $set: { status } },
      { new: true }
    );

    if (!updatedLead) {
      return NextResponse.json(
        { error: 'Lead not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Lead status updated',
      lead: updatedLead
    });

  } catch (error) {
    console.error('Error updating lead:', error);
    return NextResponse.json(
      { error: 'Failed to update lead' },
      { status: 500 }
    );
  }
}
