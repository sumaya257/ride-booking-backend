import { Request, Response } from 'express';
import { AuthService } from './auth.service';

export class AuthController {
  static async register(req: Request, res: Response) {
    try {
      const user = await AuthService.register(req.body);
      return res.status(201).json({ message: 'User registered', user: { id: user._id, email: user.email, role: user.role } });
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const { token, user } = await AuthService.login(req.body);
      return res.status(200).json({
        message: 'Login successful',
        token,
        user: { id: user._id, email: user.email, role: user.role },
      });
    } catch (err: any) {
      return res.status(400).json({ message: err.message });
    }
  }
}
