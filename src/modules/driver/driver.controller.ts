import { Request, Response } from 'express';
import { DriverService } from './driver.service';

export class DriverController {
  static async approveDriver(req: Request, res: Response) {
    try {
      const driverId = req.params.id;
      const { approve } = req.body;
      const driver = await DriverService.approveDriver(driverId, approve);
      res.status(200).json({ message: `Driver ${approve ? 'approved' : 'suspended'}`, driver });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async setAvailability(req: Request, res: Response) {
    try {
      const driverId = req.user?.id!;
      const { online } = req.body;
      const driver = await DriverService.setAvailability(driverId, online);
      res.status(200).json({ message: `Driver is now ${online ? 'online' : 'offline'}`, driver });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }
}
