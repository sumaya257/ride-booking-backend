import mongoose, { Document } from 'mongoose';

export interface IRide extends Document {
  rider: mongoose.Types.ObjectId;
  driver?: mongoose.Types.ObjectId;
  pickupLocation: string;
  destination: string;
  status: 'requested' | 'accepted' | 'picked_up' | 'in_transit' | 'completed' | 'cancelled';
  timestamps: Record<string, Date | null>;
  fare?: number;
}

const rideSchema = new mongoose.Schema<IRide>({
  rider: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  pickupLocation: String,
  destination: String,
  status: {
    type: String,
    enum: ['requested', 'accepted', 'picked_up', 'in_transit', 'completed', 'cancelled'],
    default: 'requested',
  },
  timestamps: {
    requestedAt: { type: Date, default: Date.now },
    acceptedAt: Date,
    pickedUpAt: Date,
    inTransitAt: Date,
    completedAt: Date,
    cancelledAt: Date,
  },
  fare: Number,
}, { timestamps: true });

export const Ride = mongoose.model<IRide>('Ride', rideSchema);