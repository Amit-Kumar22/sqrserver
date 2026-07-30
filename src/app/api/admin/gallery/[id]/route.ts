import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Gallery from '@/models/Gallery';
import { verifyAuth } from '@/lib/auth';

// PUT - Update gallery image
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const authResult = await verifyAuth(req);
    if (!authResult.isValid) {
      return NextResponse.json({ error: authResult.error }, { status: 401 });
    }

    await connectToDatabase();

    const body = await req.json();
    const { title, description, imageUrl, category, isActive, order } = body;
    const { id } = await params;

    const updatedImage = await Gallery.findByIdAndUpdate(
      id,
      {
        title,
        description,
        imageUrl,
        category,
        isActive,
        order,
      },
      { new: true, runValidators: true }
    );

    if (!updatedImage) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Image updated successfully',
      image: updatedImage,
    });

  } catch (error) {
    console.error('Error updating gallery image:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
