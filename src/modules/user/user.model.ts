import mongoose, { Schema } from 'mongoose';
import { IUser } from './user.interface';

const DriverProfileSchema = new Schema(
  {
    approved: { type: Boolean, default: false },
    online: { type: Boolean, default: false },
    vehicleInfo: { type: String },
  },
  { _id: false }
);

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['admin', 'rider', 'driver'], required: true },
    isBlocked: { type: Boolean, default: false },
    driverProfile: { type: DriverProfileSchema, default: null },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<IUser>('User', UserSchema);
