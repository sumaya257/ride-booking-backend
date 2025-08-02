import { Document } from 'mongoose';

export type UserRole = 'admin' | 'rider' | 'driver';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;

  // Driver-specific fields
  driverProfile?: {
    approved: boolean;
    online: boolean;
    vehicleInfo?: string;
  };
}
