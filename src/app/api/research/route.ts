import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import ResearchContent from '@/models/ResearchContent';

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const category = searchParams.get('category') || '';
    const featured = searchParams.get('featured') === 'true';

    // Build query
    const query: any = {};
    
    if (category) {
      query.category = category;
    }
    
    if (featured) {
      query.featured = true;
    }

    // Get total count for pagination
    const totalContent = await ResearchContent.countDocuments(query);
    const totalPages = Math.ceil(totalContent / limit);
    
    // Get paginated research content
    const research = await ResearchContent.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .skip((page - 1) * limit)
      .lean();

    return NextResponse.json({
      research,
      pagination: {
        total: totalContent,
        page,
        limit,
        totalPages,
      },
    });
  } catch (error) {
    console.error('Get research content error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDatabase();
    const data = await request.json();
    
    // Create new research content in database
    const newContent = await ResearchContent.create(data);
    
    return NextResponse.json(
      { message: 'Research content created successfully', content: newContent },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create research content error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}