import { Request, Response } from 'express';
import { User } from '../models/User';
import { generateToken } from '../utils/generateToken';

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email exists' });
    const user = await User.create({ name, email, password, role });
    res.status(201).json({
      token: generateToken(user._id.toString(), user.role),
      user: { id: user._id, name: user.name, role: user.role },
    });
  } catch {
    res.status(500).json({ message: 'Register failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password)))
      return res.status(401).json({ message: 'Invalid credentials' });
    res.json({
      token: generateToken(user._id.toString(), user.role),
      user: { id: user._id, name: user.name, role: user.role },
    });
  } catch {
    res.status(500).json({ message: 'Login failed' });
  }
};
