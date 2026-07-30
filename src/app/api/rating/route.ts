import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Rating from '@/models/Rating';

// POST - Submit a new rating
export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();

    const body = await req.json();
    const { rating } = body;

    // Validate rating
    if (!rating || rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Invalid rating. Must be between 1 and 5.' },
        { status: 400 }
      );
    }

    // Get IP address and user agent for analytics (optional)
    const ipAddress = req.headers.get('x-forwarded-for') || 
                     req.headers.get('x-real-ip') || 
                     'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';

    // Create new rating
    const newRating = await Rating.create({
      rating,
      ipAddress,
      userAgent,
    });

    return NextResponse.json(
      { 
        success: true, 
        message: 'Rating submitted successfully',
        rating: newRating.rating 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error('Error submitting rating:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : 'Unknown error') : undefined
      },
      { status: 500 }
    );
  }
}

// GET - Get rating statistics (optional - for admin analytics)
export async function GET() {
  try {
    await connectToDatabase();

    const totalRatings = await Rating.countDocuments();
    
    if (totalRatings === 0) {
      return NextResponse.json({
        totalRatings: 0,
        averageRating: 0,
        distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
      });
    }

    // Calculate average rating
    const ratings = await Rating.aggregate([
      {
        $group: {
          _id: null,
          avgRating: { $avg: '$rating' },
          count: { $sum: 1 }
        }
      }
    ]);

    // Get rating distribution
    const distribution = await Rating.aggregate([
      {
        $group: {
          _id: '$rating',
          count: { $sum: 1 }
        }
      }
    ]);

    const ratingDist: { [key: number]: number } = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    distribution.forEach(item => {
      ratingDist[item._id] = item.count;
    });

    return NextResponse.json({
      totalRatings,
      averageRating: ratings[0]?.avgRating?.toFixed(2) || 0,
      distribution: ratingDist
    });

  } catch (error) {
    console.error('Error fetching rating statistics:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? (error instanceof Error ? error.message : 'Unknown error') : undefined
      },
      { status: 500 }
    );
  }
}
