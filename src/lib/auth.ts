import jwt from 'jsonwebtoken';
import bcryptjs from 'bcryptjs';
import { NextRequest } from 'next/server';

const JWT_SECRET = process.env.JWT_SECRET!;

if (!JWT_SECRET) {
  throw new Error('Please define the JWT_SECRET environment variable inside .env.local');
}

// Generate JWT token
export const generateToken = (payload: any): string => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};

// Verify JWT token
export const verifyToken = (token: string): any => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    throw new Error('Invalid token');
  }
};

// Verify authentication from request
export const verifyAuth = async (req: NextRequest): Promise<{ isValid: boolean; error?: string; user?: any }> => {
  try {
    const authHeader = req.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { isValid: false, error: 'No authentication token provided' };
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return { isValid: true, user: decoded };
    } catch {
      return { isValid: false, error: 'Invalid or expired token' };
    }
  } catch {
    return { isValid: false, error: 'Authentication failed' };
  }
};

// Hash password
export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 12;
  return await bcryptjs.hash(password, saltRounds);
};

// Compare password
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return await bcryptjs.compare(password, hashedPassword);
};