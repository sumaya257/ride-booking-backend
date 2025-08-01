import { Request, Response } from 'express';
import { User } from '../user/User';
import { generateToken } from '../../utils/generateToken';

export const register = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;

  try {
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: 'Email already exists' });

    // ✅ Use new + save instead of create()
    const user = new User({ name, email, password, role });
    await user.save();

    console.log("✅ Registered user:", {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    res.status(201).json({
      token: generateToken(user._id.toString(), user.role),
      user: { id: user._id, name: user.name, role: user.role },
    });

  } catch (err) {
    console.error("❌ Register error:", err);
    res.status(500).json({ message: 'Register failed' });
  }
};

export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    console.log('🔐 Login Success:', {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      isBlocked: user.isBlocked,
    });

    res.json({
      token: generateToken(user._id.toString(), user.role),
      user: { id: user._id, name: user.name, role: user.role },
    });

  } catch (error) {
    console.error('❌ Login failed:', error);
    res.status(500).json({ message: 'Login failed' });
  }
};
