import mongoose, { Document, Schema } from 'mongoose';

export interface IResearchContent extends Document {
  title: string;
  content: string;
  summary: string;
  category: string;
  tags: string[];
  published: boolean;
  author: string;
  publishedDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const ResearchContentSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Research title is required'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Research content is required'],
    },
    summary: {
      type: String,
      required: [true, 'Research summary is required'],
      maxlength: [300, 'Summary must be less than 300 characters'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['artificial-intelligence', 'machine-learning', 'blockchain', 'iot', 'cybersecurity', 'cloud-computing', 'other'],
    },
    tags: {
      type: [String],
      default: [],
    },
    published: {
      type: Boolean,
      default: false,
    },
    author: {
      type: String,
      required: [true, 'Author is required'],
      trim: true,
    },
    publishedDate: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.ResearchContent || mongoose.model<IResearchContent>('ResearchContent', ResearchContentSchema);