import { UserModel } from './user.model';

export class UserService {
  static async blockUser(userId: string, block: boolean) {
    const user = await UserModel.findById(userId);
    if (!user) throw new Error('User not found');

    user.isBlocked = block;
    await user.save();
    return user;
  }

  static async getAllUsers(role?: string) {
    const filter = role ? { role } : {};
    return UserModel.find(filter);
  }
}
