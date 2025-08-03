import { RideModel } from './ride.model';
import { IRide, RideStatus } from './ride.interface';
import { Types } from 'mongoose';
import { UserModel } from '../user/user.model';
import { calculateDistanceInKm } from '../../utils/calculateDistance';
import { calculateFare } from '../../utils/calculateFare';

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

  //calculate distance (in km)
  const distance = calculateDistanceInKm(
    pickupLocation.lat,
    pickupLocation.lng,
    destinationLocation.lat,
    destinationLocation.lng
  );

  //calculate fare
  const fare = calculateFare(distance);

  //Create ride with distance and fare
  const ride = new RideModel({
    rider: new Types.ObjectId(riderId),
    pickupLocation,
    destinationLocation,
    distance, // save distance
    fare,     // save fare
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

  static async getRideHistory(userId: string, role: string): Promise<IRide[]> {
    if (role === 'rider') {
      return RideModel.find({ rider: userId }).sort({ createdAt: -1 });
    } else if (role === 'driver') {
      return RideModel.find({ driver: userId }).sort({ createdAt: -1 });
    } else {
      // Admin can see all rides
      return RideModel.find().sort({ createdAt: -1 });
    }
  }

  static async getAllRides() {
    return RideModel.find()
      .populate('rider', 'name email')   //  rider info
      .populate('driver', 'name email')  //  driver info
      .sort({ createdAt: -1 });          // Latest rides first
  }

  static async updateRideStatus(
    rideId: string,
    driverId: string,
    newStatus: RideStatus
  ): Promise<IRide> {
    const ride = await RideModel.findById(rideId);
    if (!ride) throw new Error('Ride not found');
    if (!ride.driver || ride.driver.toString() !== driverId) {
      throw new Error('Not authorized to update this ride');
    }

    const allowedTransitions: Record<RideStatus, RideStatus[]> = {
      requested: ['accepted', 'canceled'],
      accepted: ['picked_up', 'canceled'],
      picked_up: ['in_transit', 'canceled'],
      in_transit: ['completed', 'canceled'],
      completed: [],
      canceled: [],
    };

    if (!allowedTransitions[ride.status].includes(newStatus)) {
      throw new Error(`Cannot change status from ${ride.status} to ${newStatus}`);
    }

    // Update timestamps accordingly
    switch (newStatus) {
      case 'accepted':
        ride.status = 'accepted';
        ride.timestamps.acceptedAt = new Date();
        break;
      case 'picked_up':
        ride.status = 'picked_up';
        ride.timestamps.pickedUpAt = new Date();
        break;
      case 'in_transit':
        ride.status = 'in_transit';
        ride.timestamps.inTransitAt = new Date();
        break;
      case 'completed':
        ride.status = 'completed';
        ride.timestamps.completedAt = new Date();
        break;
      case 'canceled':
        ride.status = 'canceled';
        ride.timestamps.canceledAt = new Date();
        ride.canceledBy = 'driver';
        break;
    }

    await ride.save();
    return ride;
  }

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
    
    // get earning history
    static async getEarningsHistory(driverId: string) {
    // Fetch completed rides with fare info
    const completedRides = await RideModel.find({
      driver: driverId,
      status: 'completed',
    }).select('fare pickupLocation destinationLocation timestamps.completedAt');

    // Calculate total earnings
    const totalEarnings = completedRides.reduce((sum, ride) => sum + (ride.fare || 0), 0);

    return { totalEarnings, completedRides };
  }
  
  static async getPendingRides() {
  return RideModel.find({ status: 'requested' })
    .populate('rider', 'name email')
    .sort({ createdAt: -1 }); // Latest first
}

}


