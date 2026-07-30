import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Project from '@/models/Project';

export async function GET(request: NextRequest) {
  try {
    // Try to connect to database, but don't fail if it's not available
    let projects = [];
    let total = 0;
    
    try {
      await connectDB();
      
      const { searchParams } = new URL(request.url);
      const page = parseInt(searchParams.get('page') || '1');
      const limit = parseInt(searchParams.get('limit') || '10');
      const category = searchParams.get('category');
      const subcategory = searchParams.get('subcategory');
      const status = searchParams.get('status');
      const search = searchParams.get('search');
      const featured = searchParams.get('featured');
      
      const skip = (page - 1) * limit;
      
      // Build filter object
      const filter: any = {};
      
      if (category) {
        filter.category = category;
      }
      
      if (subcategory) {
        filter.subcategory = subcategory;
      }
      
      if (status) {
        filter.status = status;
      }
      
      if (featured === 'true') {
        filter.featured = true;
      }
      
      if (search) {
        filter.$or = [
          { title: { $regex: search, $options: 'i' } },
          { description: { $regex: search, $options: 'i' } },
          { technologies: { $in: [new RegExp(search, 'i')] } }
        ];
      }
      
      // Get projects from database
      projects = await Project.find(filter)
        .sort({ createdAt: -1, featured: -1 })
        .skip(skip)
        .limit(limit);
      
      total = await Project.countDocuments(filter);
    } catch {
      console.log('Database not available, returning empty projects list');
      // Database not available, return empty list
      projects = [];
      total = 0;
    }
    
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const totalPages = Math.ceil(total / limit);
    
    return Response.json({
      projects,
      pagination: {
        total,
        page,
        limit,
        totalPages,
      },
    });
  } catch (error) {
    console.error('Error fetching projects:', error);
    // Return empty list instead of error to prevent UI crashes
    return Response.json({
      projects: [],
      pagination: {
        total: 0,
        page: 1,
        limit: 10,
        totalPages: 0,
      },
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const data = await request.json();
    
    // Validate required fields
    if (!data.title || !data.description || !data.category || !data.subcategory) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Create new project in database
    const newProject = await Project.create(data);
    
    return NextResponse.json(
      { message: 'Project created successfully', project: newProject },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create project error:', error);
    if (error instanceof Error && error.message && error.message.includes('connect')) {
      return NextResponse.json(
        { error: 'Database not available. Please set up MongoDB to add projects.' },
        { status: 503 }
      );
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}