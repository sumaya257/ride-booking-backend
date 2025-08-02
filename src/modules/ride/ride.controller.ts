import { Request, Response } from 'express';
import { RideService } from './ride.service';

export class RideController {
  static async requestRide(req: Request, res: Response) {
    try {
      const riderId = req.user?.id!;
      const { pickupLocation, destinationLocation } = req.body;
      const ride = await RideService.requestRide(riderId, pickupLocation, destinationLocation);
      res.status(201).json({ message: 'Ride requested', ride });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async cancelRide(req: Request, res: Response) {
    try {
      const userId = req.user?.id!;
      const userRole = req.user?.role!;
      const rideId = req.params.id;

      const ride = await RideService.cancelRide(rideId, userId, userRole);
      res.status(200).json({ message: 'Ride canceled', ride });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async getRideHistory(req: Request, res: Response) {
    try {
      const userId = req.user?.id!;
      const role = req.user?.role!;
      const rides = await RideService.getRideHistory(userId, role);
      res.status(200).json({ rides });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async updateRideStatus(req: Request, res: Response) {
    try {
      const driverId = req.user?.id!;
      const rideId = req.params.id;
      const { status } = req.body;

      const updatedRide = await RideService.updateRideStatus(rideId, driverId, status);
      res.status(200).json({ message: 'Ride status updated', ride: updatedRide });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async acceptRide(req: Request, res: Response) {
    try {
      const driverId = req.user?.id!;
      const rideId = req.params.id;

      const ride = await RideService.assignDriverToRide(rideId, driverId);
      res.status(200).json({ message: 'Ride accepted', ride });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
}
