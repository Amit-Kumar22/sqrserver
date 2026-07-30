import mongoose, { Document, Schema } from 'mongoose';

export interface IGallery extends Document {
  title: string;
  description?: string;
  imageUrl: string;
  category: string;
  isActive: boolean;
  order: number;
  uploadedBy?: string;
  createdAt: Date;
  updatedAt: Date;
}

const GallerySchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required'],
    },
    category: {
      type: String,
      default: 'other',
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    uploadedBy: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
GallerySchema.index({ category: 1 });
GallerySchema.index({ isActive: 1 });
GallerySchema.index({ order: 1 });

const Gallery = mongoose.models.Gallery || mongoose.model<IGallery>('Gallery', GallerySchema);

export default Gallery;
