import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import ResearchContent from '@/models/ResearchContent';
import mongoose from 'mongoose';

// GET /api/research/[id] - Get single research content (public - published only unless admin)
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    
    const { id } = await params;
    const { searchParams } = new URL(request.url);
    const admin = searchParams.get('admin');
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid research ID' },
        { status: 400 }
      );
    }
    
    const query: any = { _id: id };
    if (admin !== 'true') {
      query.published = true;
    }
    
    const research = await ResearchContent.findOne(query).lean();
    
    if (!research) {
      return NextResponse.json(
        { error: 'Research content not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ research }, { status: 200 });
  } catch (error) {
    console.error('Get research error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// PUT /api/research/[id] - Update research content (admin only)
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    
    const { id } = await params;
    const updateData = await request.json();
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid research ID' },
        { status: 400 }
      );
    }
    
    // If publishing for the first time, set publishedDate
    const existingResearch = await ResearchContent.findById(id);
    if (updateData.published && !existingResearch?.published) {
      updateData.publishedDate = new Date();
    }
    
    const research = await ResearchContent.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!research) {
      return NextResponse.json(
        { error: 'Research content not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: 'Research content updated successfully', research },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Update research error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map((err: any) => err.message);
      return NextResponse.json(
        { error: 'Validation error', details: errors },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/research/[id] - Delete research content (admin only)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectToDatabase();
    
    const { id } = await params;
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json(
        { error: 'Invalid research ID' },
        { status: 400 }
      );
    }
    
    const research = await ResearchContent.findByIdAndDelete(id);
    
    if (!research) {
      return NextResponse.json(
        { error: 'Research content not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { message: 'Research content deleted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Delete research error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}