import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import FAQ from '@/models/FAQ';
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

// GET - Fetch all FAQs (with optional filters)
export async function GET(request: NextRequest) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const isActive = searchParams.get('isActive');
    
    const query: any = {};
    if (category) query.category = category;
    if (isActive !== null) query.isActive = isActive === 'true';

    const faqs = await FAQ.find(query)
      .sort({ priority: -1, createdAt: -1 })
      .lean();

    return NextResponse.json({
      success: true,
      faqs,
      count: faqs.length
    });

  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return NextResponse.json(
      { error: 'Failed to fetch FAQs' },
      { status: 500 }
    );
  }
}

// POST - Create new FAQ
export async function POST(request: NextRequest) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    const body = await request.json();
    const { question, answer, category, keywords, priority, isActive } = body;

    // Validate required fields
    if (!question || !answer) {
      return NextResponse.json(
        { error: 'Question and answer are required' },
        { status: 400 }
      );
    }

    const newFAQ = new FAQ({
      question: question.trim(),
      answer: answer.trim(),
      category: category || 'general',
      keywords: keywords || [],
      priority: priority || 5,
      isActive: isActive !== undefined ? isActive : true
    });

    await newFAQ.save();

    return NextResponse.json({
      success: true,
      message: 'FAQ created successfully',
      faq: newFAQ
    });

  } catch (error) {
    console.error('Error creating FAQ:', error);
    return NextResponse.json(
      { error: 'Failed to create FAQ' },
      { status: 500 }
    );
  }
}

// PUT - Update FAQ
export async function PUT(request: NextRequest) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    const body = await request.json();
    const { id, question, answer, category, keywords, priority, isActive } = body;

    if (!id) {
      return NextResponse.json(
        { error: 'FAQ ID is required' },
        { status: 400 }
      );
    }

    const updateData: any = {};
    if (question) updateData.question = question.trim();
    if (answer) updateData.answer = answer.trim();
    if (category) updateData.category = category;
    if (keywords !== undefined) updateData.keywords = keywords;
    if (priority !== undefined) updateData.priority = priority;
    if (isActive !== undefined) updateData.isActive = isActive;

    const updatedFAQ = await FAQ.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedFAQ) {
      return NextResponse.json(
        { error: 'FAQ not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'FAQ updated successfully',
      faq: updatedFAQ
    });

  } catch (error) {
    console.error('Error updating FAQ:', error);
    return NextResponse.json(
      { error: 'Failed to update FAQ' },
      { status: 500 }
    );
  }
}

// DELETE - Delete FAQ
export async function DELETE(request: NextRequest) {
  try {
    const isAdmin = await verifyAdmin();
    if (!isAdmin) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'FAQ ID is required' },
        { status: 400 }
      );
    }

    const deletedFAQ = await FAQ.findByIdAndDelete(id);

    if (!deletedFAQ) {
      return NextResponse.json(
        { error: 'FAQ not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'FAQ deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting FAQ:', error);
    return NextResponse.json(
      { error: 'Failed to delete FAQ' },
      { status: 500 }
    );
  }
}
