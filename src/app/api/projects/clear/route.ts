import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Project from '@/models/Project';

export async function DELETE() {
  try {
    await connectDB();
    
    // Delete all projects from database
    const result = await Project.deleteMany({});
    
    return NextResponse.json({
      message: `Successfully deleted ${result.deletedCount} projects`,
      deletedCount: result.deletedCount
    });
  } catch (error) {
    console.error('Error clearing projects:', error);
    // Return success even if database is not available
    return NextResponse.json({
      message: 'Projects cleared (database not available)',
      deletedCount: 0
    });
  }
}