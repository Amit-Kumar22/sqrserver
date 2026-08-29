import mongoose, { Document, Schema } from 'mongoose';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  role: 'admin';
  isVerified: boolean;
  approvalStatus: 'pending' | 'approved' | 'rejected';
  approvedBy?: string;
  approvedAt?: Date;
  rejectedBy?: string;
  rejectedAt?: Date;
  otp?: string;
  otpExpiry?: Date;
  resetOtp?: string;
  resetOtpExpiry?: Date;
  approvalToken?: string;
  approvalTokenExpiry?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema(
  {
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [6, 'Password must be at least 6 characters'],
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    role: {
      type: String,
      enum: ['admin'],
      default: 'admin',
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    approvalStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    approvedBy: {
      type: String,
      sparse: true,
    },
    approvedAt: {
      type: Date,
      sparse: true,
    },
    rejectedBy: {
      type: String,
      sparse: true,
    },
    rejectedAt: {
      type: Date,
      sparse: true,
    },
    otp: {
      type: String,
      sparse: true,
    },
    otpExpiry: {
      type: Date,
      sparse: true,
    },
    resetOtp: {
      type: String,
      sparse: true,
    },
    resetOtpExpiry: {
      type: Date,
      sparse: true,
    },
    approvalToken: {
      type: String,
      sparse: true,
    },
    approvalTokenExpiry: {
      type: Date,
      sparse: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);