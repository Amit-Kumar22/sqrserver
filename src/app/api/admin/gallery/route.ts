import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Gallery from '@/models/Gallery';
import { verifyAuth } from '@/lib/auth';

// GET - Fetch all gallery images
export async function GET(req: NextRequest) {
  try {
    const authResult = await verifyAuth(req);
    if (!authResult.isValid) {
      return NextResponse.json({ error: authResult.error }, { status: 401 });
    }

    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get('category');
    const isActive = searchParams.get('isActive');

    const filter: any = {};
    if (category) filter.category = category;
    if (isActive !== null) filter.isActive = isActive === 'true';

    const images = await Gallery.find(filter)
      .sort({ order: 1, createdAt: -1 })
      .lean();

    return NextResponse.json({ 
      success: true, 
      images,
      total: images.length 
    });

  } catch (error) {
    console.error('Error fetching gallery images:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Add new gallery image
export async function POST(req: NextRequest) {
  try {
    const authResult = await verifyAuth(req);
    if (!authResult.isValid) {
      return NextResponse.json({ error: authResult.error }, { status: 401 });
    }

    await connectToDatabase();

    const body = await req.json();
    const { title, description, imageUrl, category, isActive, order } = body;

    if (!title || !imageUrl) {
      return NextResponse.json(
        { error: 'Title and image URL are required' },
        { status: 400 }
      );
    }

    const newImage = await Gallery.create({
      title,
      description,
      imageUrl,
      category: category || 'other',
      isActive: isActive !== undefined ? isActive : true,
      order: order || 0,
      uploadedBy: authResult.user?.email,
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Image added successfully',
        image: newImage 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error adding gallery image:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// DELETE - Delete gallery image
export async function DELETE(req: NextRequest) {
  try {
    const authResult = await verifyAuth(req);
    if (!authResult.isValid) {
      return NextResponse.json({ error: authResult.error }, { status: 401 });
    }

    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Image ID is required' },
        { status: 400 }
      );
    }

    const deletedImage = await Gallery.findByIdAndDelete(id);

    if (!deletedImage) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Image deleted successfully' 
    });

  } catch (error) {
    console.error('Error deleting gallery image:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
