import mongoose, { Document } from 'mongoose';
import bcrypt from 'bcryptjs';
import { Types } from 'mongoose';

export interface IUser extends Document {
  _id: Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'rider' | 'driver';
  isBlocked: boolean;
  isApproved?: boolean;
  isAvailable?: boolean;
  vehicleInfo?: string;
  matchPassword(password: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>({
  name: String,
  email: { type: String, unique: true },
  password: String,
  role: { type: String, enum: ['admin', 'rider', 'driver'], default: 'rider' },
  isBlocked: { type: Boolean, default: false },
  isApproved: { type: Boolean, default: false },
  isAvailable: { type: Boolean, default: false },
  vehicleInfo: String,
}, { timestamps: true });

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.matchPassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

export const User = mongoose.model<IUser>('User', userSchema);