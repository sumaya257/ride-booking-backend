import { UserModel } from '../user/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { IAuthLoginRequest, IAuthRegisterRequest } from './auth.interface';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretkey';
const JWT_EXPIRES_IN = '1d';

export class AuthService {
  static async register(data: IAuthRegisterRequest) {
    const existingUser = await UserModel.findOne({ email: data.email });
    if (existingUser) {
      throw new Error('Email already registered');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = new UserModel({
      ...data,
      password: hashedPassword,
      // driverProfile default null for non-driver roles
      driverProfile: data.role === 'driver' ? { approved: false, online: false } : null,
    });

    await user.save();
    return user;
  }

  static async login(data: IAuthLoginRequest) {
    const user = await UserModel.findOne({ email: data.email });
    if (!user) throw new Error('Invalid credentials');

    if (user.isBlocked) throw new Error('User account blocked');

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) throw new Error('Invalid credentials');

    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    return { token, user };
  }
}
