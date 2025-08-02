import mongoose, { Schema } from 'mongoose';
import { IRide } from './ride.interface';

const LocationSchema = new Schema(
  {
    address: { type: String, required: true },
    lat: { type: Number, required: true },
    lng: { type: Number, required: true },
  },
  { _id: false }
);

const RideSchema = new Schema<IRide>(
  {
    rider: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    driver: { type: Schema.Types.ObjectId, ref: 'User', default: null },
    pickupLocation: { type: LocationSchema, required: true },
    destinationLocation: { type: LocationSchema, required: true },
    status: {
      type: String,
      enum: ['requested', 'accepted', 'picked_up', 'in_transit', 'completed', 'canceled'],
      default: 'requested',
    },
    timestamps: {
      requestedAt: { type: Date, default: Date.now },
      acceptedAt: Date,
      pickedUpAt: Date,
      inTransitAt: Date,
      completedAt: Date,
      canceledAt: Date,
    },
    fare: { type: Number, default: 0 },
    canceledBy: { type: String, enum: ['rider', 'driver', null], default: null },
  },
  { timestamps: true }
);

export const RideModel = mongoose.model<IRide>('Ride', RideSchema);
