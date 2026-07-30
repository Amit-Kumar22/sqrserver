import mongoose, { Document, Schema } from 'mongoose';

export interface IFAQ extends Document {
  question: string;
  answer: string;
  category: string;
  keywords: string[];
  priority: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  createdBy?: string;
  updatedBy?: string;
}

const FAQSchema: Schema = new Schema(
  {
    question: {
      type: String,
      required: [true, 'Question is required'],
      trim: true
    },
    answer: {
      type: String,
      required: [true, 'Answer is required'],
      trim: true
    },
    category: {
      type: String,
      required: true,
      enum: [
        'pricing',
        'timeline',
        'services',
        'technology',
        'support',
        'general',
        'ecommerce',
        'seo',
        'mobile',
        'redesign',
        'contact'
      ],
      default: 'general'
    },
    keywords: {
      type: [String],
      default: []
    },
    priority: {
      type: Number,
      default: 5,
      min: 1,
      max: 10
    },
    isActive: {
      type: Boolean,
      default: true
    },
    createdBy: {
      type: String
    },
    updatedBy: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

// Indexes for efficient searching
FAQSchema.index({ category: 1, isActive: 1 });
FAQSchema.index({ keywords: 1 });
FAQSchema.index({ priority: -1 });

export default mongoose.models.FAQ || mongoose.model<IFAQ>('FAQ', FAQSchema);
