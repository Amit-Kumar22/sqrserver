import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Rating from '@/models/Rating';
import { verifyAuth } from '@/lib/auth';

export async function GET(req: NextRequest) {
  try {
    const authResult = await verifyAuth(req);
    if (!authResult.isValid) {
      return NextResponse.json({ error: authResult.error }, { status: 401 });
    }

    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const limit = parseInt(searchParams.get('limit') || '50');

    const ratings = await Rating.find()
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json({ 
      success: true, 
      ratings 
    });

  } catch (error) {
    console.error('Error fetching recent ratings:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
