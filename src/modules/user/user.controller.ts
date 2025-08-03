import { Request, Response } from 'express';
import { UserService } from './user.service';

export class UserController {
  static async blockUser(req: Request, res: Response) {
    try {
      const userId = req.params.id;
      const { block } = req.body;
      const user = await UserService.blockUser(userId, block);
      res.status(200).json({ message: `User ${block ? 'blocked' : 'unblocked'}`, user });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async getAllUsers(req: Request, res: Response) {
    try {
      const { role } = req.query;
      const users = await UserService.getAllUsers(role as string | undefined);
      res.status(200).json({ users });
    } catch (err: any) {
      res.status(400).json({ message: err.message });
    }
  }

  static async generateReport(req: Request, res: Response) {
    try {
      const report = await UserService.generateReport();
      res.status(200).json({ message: 'Report generated', report });
    } catch (error) {
      res.status(500).json({ message: 'Failed to generate report', error });
    }
  }
}
