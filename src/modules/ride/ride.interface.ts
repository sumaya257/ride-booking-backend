import { Document, Types } from 'mongoose';

export type RideStatus = 'requested' | 'accepted' | 'picked_up' | 'in_transit' | 'completed' | 'canceled';

export interface IRide extends Document {
  rider: Types.ObjectId;
  driver?: Types.ObjectId | null;
  pickupLocation: {
    address: string;
    lat: number;
    lng: number;
  };
  destinationLocation: {
    address: string;
    lat: number;
    lng: number;
  };
  status: RideStatus;
  timestamps: {
    requestedAt: Date;
    acceptedAt?: Date;
    pickedUpAt?: Date;
    inTransitAt?: Date;
    completedAt?: Date;
    canceledAt?: Date;
  };
  distance?: number;
  fare?: number;
  canceledBy?: 'rider' | 'driver' | null;
}
