import mongoose, { Document, Schema } from 'mongoose';

export interface IRating extends Document {
  rating: number;
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
  updatedAt: Date;
}

const RatingSchema: Schema = new Schema(
  {
    rating: {
      type: Number,
      required: [true, 'Rating is required'],
      min: [1, 'Rating must be at least 1'],
      max: [5, 'Rating must be at most 5'],
    },
    ipAddress: {
      type: String,
      trim: true,
    },
    userAgent: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
RatingSchema.index({ rating: 1 });
RatingSchema.index({ createdAt: -1 });

const Rating = mongoose.models.Rating || mongoose.model<IRating>('Rating', RatingSchema);

export default Rating;
