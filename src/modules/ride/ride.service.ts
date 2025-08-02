import { RideModel } from './ride.model';
import { IRide, RideStatus } from './ride.interface';
import { Types } from 'mongoose';
import { UserModel } from '../user/user.model';

export class RideService {
  static async requestRide(
    riderId: string,
    pickupLocation: { address: string; lat: number; lng: number },
    destinationLocation: { address: string; lat: number; lng: number }
  ): Promise<IRide> {
    // Check if rider has active ride
    const activeRide = await RideModel.findOne({
      rider: new Types.ObjectId(riderId),
      status: { $in: ['requested', 'accepted', 'picked_up', 'in_transit'] },
    });
    if (activeRide) throw new Error('You already have an active ride');

    const ride = new RideModel({
      rider: new Types.ObjectId(riderId),
      pickupLocation,
      destinationLocation,
      status: 'requested',
      timestamps: { requestedAt: new Date() },
    });

    await ride.save();
    return ride;
  }

  static async cancelRide(rideId: string, userId: string, userRole: string): Promise<IRide | null> {
    const ride = await RideModel.findById(rideId);
    if (!ride) throw new Error('Ride not found');

    if (ride.status === 'completed' || ride.status === 'canceled') {
      throw new Error('Cannot cancel completed or canceled rides');
    }

    // Cancellation allowed only if ride is still 'requested' or 'accepted' but only rider can cancel before accepted
    if (ride.status === 'accepted' && userRole === 'rider') {
      throw new Error('Cannot cancel ride after it is accepted by driver');
    }

    if (userRole === 'rider' && ride.rider.toString() !== userId) {
      throw new Error('You can only cancel your own rides');
    }

    if (userRole === 'driver' && ride.driver?.toString() !== userId) {
      throw new Error('Driver can only cancel assigned rides');
    }

    ride.status = 'canceled';
    ride.timestamps.canceledAt = new Date();
    ride.canceledBy = userRole === 'rider' ? 'rider' : 'driver';
    await ride.save();

    return ride;
  }

//   static async getRideHistory(userId: string, role: string): Promise<IRide[]> {
//     if (role === 'rider') {
//       return RideModel.find({ rider: userId }).sort({ createdAt: -1 });
//     } else if (role === 'driver') {
//       return RideModel.find({ driver: userId }).sort({ createdAt: -1 });
//     } else {
//       // Admin can see all rides
//       return RideModel.find().sort({ createdAt: -1 });
//     }
//   }

//    

  static async assignDriverToRide(rideId: string, driverId: string) {
    const ride = await RideModel.findById(rideId);
    if (!ride) throw new Error('Ride not found');
    if (ride.status !== 'requested') throw new Error('Ride is not available for acceptance');
    if (ride.driver) throw new Error('Ride already has a driver assigned');

    // Check if driver is approved and online
    const driver = await UserModel.findById(driverId);
    if (!driver || driver.role !== 'driver') throw new Error('Invalid driver');
    if (!driver.driverProfile?.approved) throw new Error('Driver not approved');
    if (!driver.driverProfile?.online) throw new Error('Driver is not online');

    ride.driver = new Types.ObjectId(driverId)
    ride.status = 'accepted';
    ride.timestamps.acceptedAt = new Date();
    await ride.save();
    return ride;
  }
}
