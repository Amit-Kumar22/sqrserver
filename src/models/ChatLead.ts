import mongoose, { Document, Schema } from 'mongoose';

// Interface for a single message in the conversation
export interface IChatMessage {
  sender: 'user' | 'bot';
  message: string;
  timestamp: Date;
}

// Interface for lead information captured during chat
export interface ILeadInfo {
  name?: string;
  email?: string;
  phone?: string;
  projectRequirements?: string;
}

// Main ChatLead interface
export interface IChatLead extends Document {
  sessionId: string;
  conversation: IChatMessage[];
  leadInfo: ILeadInfo;
  status: 'active' | 'converted' | 'abandoned';
  source: string; // e.g., 'homepage', 'services', etc.
  ipAddress?: string;
  userAgent?: string;
  createdAt: Date;
  updatedAt: Date;
  lastMessageAt: Date;
}

// Message sub-schema
const ChatMessageSchema = new Schema({
  sender: {
    type: String,
    enum: ['user', 'bot'],
    required: true
  },
  message: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
}, { _id: false });

// Lead info sub-schema
const LeadInfoSchema = new Schema({
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    trim: true
  },
  projectRequirements: {
    type: String,
    trim: true
  }
}, { _id: false });

// Main ChatLead schema
const ChatLeadSchema: Schema = new Schema(
  {
    sessionId: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    conversation: {
      type: [ChatMessageSchema],
      default: []
    },
    leadInfo: {
      type: LeadInfoSchema,
      default: {}
    },
    status: {
      type: String,
      enum: ['active', 'converted', 'abandoned'],
      default: 'active'
    },
    source: {
      type: String,
      default: 'homepage'
    },
    ipAddress: {
      type: String
    },
    userAgent: {
      type: String
    },
    lastMessageAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

// Index for efficient querying
ChatLeadSchema.index({ createdAt: -1 });
ChatLeadSchema.index({ status: 1 });
ChatLeadSchema.index({ 'leadInfo.email': 1 });

export default mongoose.models.ChatLead || mongoose.model<IChatLead>('ChatLead', ChatLeadSchema);
