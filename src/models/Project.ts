import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  description: string;
  detailedDescription?: string;
  category: string;
  subcategory?: string;
  technologies: string[];
  imageUrl: string;
  images?: string[];
  demoUrl?: string;
  githubUrl?: string;
  status: 'draft' | 'published' | 'archived';
  featured: boolean;
  clientName?: string;
  completionDate?: Date;
  duration?: string;
  teamSize?: number;
  features?: string[];
  challenges?: string[];
  solutions?: string[];
  results?: string[];
  testimonial?: {
    text: string;
    author: string;
    position: string;
    company?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    detailedDescription: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    subcategory: {
      type: String,
      trim: true,
    },
    technologies: {
      type: [String],
      default: [],
    },
    imageUrl: {
      type: String,
      required: [true, 'Image URL is required'],
    },
    images: {
      type: [String],
      default: [],
    },
    demoUrl: {
      type: String,
      trim: true,
    },
    githubUrl: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
      default: 'published',
    },
    featured: {
      type: Boolean,
      default: false,
    },
    clientName: {
      type: String,
      trim: true,
    },
    completionDate: {
      type: Date,
    },
    duration: {
      type: String,
      trim: true,
    },
    teamSize: {
      type: Number,
    },
    features: {
      type: [String],
      default: [],
    },
    challenges: {
      type: [String],
      default: [],
    },
    solutions: {
      type: [String],
      default: [],
    },
    results: {
      type: [String],
      default: [],
    },
    testimonial: {
      text: String,
      author: String,
      position: String,
      company: String,
    },
  },
  {
    timestamps: true,
  }
);

// Indexes for better query performance
ProjectSchema.index({ category: 1 });
ProjectSchema.index({ subcategory: 1 });
ProjectSchema.index({ status: 1 });
ProjectSchema.index({ featured: -1 });
ProjectSchema.index({ createdAt: -1 });
ProjectSchema.index({ title: 'text', description: 'text' });

const Project = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);

export default Project;
