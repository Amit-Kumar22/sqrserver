import { NextRequest, NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import crypto from 'crypto';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ 
        error: 'Invalid file type. Only JPEG, PNG, WebP, and GIF are allowed.' 
      }, { status: 400 });
    }

    // Validate file size (5MB max)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      return NextResponse.json({ 
        error: 'File too large. Maximum size is 5MB.' 
      }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Generate unique filename
    const fileExtension = file.name.split('.').pop() || 'jpg';
    const uniqueId = crypto.randomBytes(16).toString('hex');
    const filename = `${uniqueId}.${fileExtension}`;

    // Create uploads directory path
    const uploadDir = join(process.cwd(), 'public', 'uploads', 'projects');
    const filePath = join(uploadDir, filename);

    try {
      // Ensure upload directory exists
      const fs = require('fs');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      // Save file
      await writeFile(filePath, buffer);

      // Return the URL path (accessible via /uploads/projects/filename)
      const fileUrl = `/uploads/projects/${filename}`;

      return NextResponse.json({ 
        message: 'File uploaded successfully',
        url: fileUrl,
        filename: filename
      }, { status: 200 });

    } catch (writeError) {
      console.error('Error writing file:', writeError);
      return NextResponse.json({ 
        error: 'Failed to save file' 
      }, { status: 500 });
    }

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json({ 
      error: 'Internal server error' 
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const filename = searchParams.get('filename');
    
    if (!filename) {
      return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
    }

    const fs = require('fs');
    const filePath = join(process.cwd(), 'public', 'uploads', 'projects', filename);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return NextResponse.json({ message: 'File deleted successfully' });
    } else {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

  } catch (error) {
    console.error('Delete file error:', error);
    return NextResponse.json({ 
      error: 'Failed to delete file' 
    }, { status: 500 });
  }
}