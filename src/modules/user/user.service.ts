import { RideModel } from '../ride/ride.model';
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

  static async generateReport() {
    const totalRiders = await UserModel.countDocuments({ role: 'rider' });
    const totalDrivers = await UserModel.countDocuments({ role: 'driver' });
    const totalUsers = totalRiders + totalDrivers;
    const totalBlockedUsers = await UserModel.countDocuments({ isBlocked: true });

    const totalRides = await RideModel.countDocuments();
    const pendingRides = await RideModel.countDocuments({ status: 'requested' });
    const activeRides = await RideModel.countDocuments({ status: 'accepted' });
    const completedRides = await RideModel.countDocuments({ status: 'completed' });

    return {
      users: {
        total: totalUsers,
        blocked: totalBlockedUsers,
      },
      riders: {
        total: totalRiders
      },
      drivers: {
        total: totalDrivers,
      },
      rides: {
        total: totalRides,
        pending: pendingRides,
        active: activeRides,
        completed: completedRides,
      },
    };
  }
}
