import { UserModel } from '../user/user.model';

export class DriverService {
  static async approveDriver(driverId: string, approve: boolean) {
    const driver = await UserModel.findById(driverId);
    if (!driver || driver.role !== 'driver') {
      throw new Error('Driver not found');
    }

    driver.driverProfile = driver.driverProfile || { approved: false, online: false };
    driver.driverProfile.approved = approve;

    // When suspending (not approving), also set online = false
    if (!approve) driver.driverProfile.online = false;

    await driver.save();
    return driver;
  }

  static async setAvailability(driverId: string, online: boolean) {
    const driver = await UserModel.findById(driverId);
    if (!driver || driver.role !== 'driver') {
      throw new Error('Driver not found');
    }

    if (!driver.driverProfile?.approved) {
      throw new Error('Driver is not approved');
    }

    driver.driverProfile.online = online;
    await driver.save();
    return driver;
  }
}
