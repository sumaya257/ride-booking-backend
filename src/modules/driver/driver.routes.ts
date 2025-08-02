import { Router } from 'express';
import { authenticateJWT, authorizeRoles } from '../../middlewares/auth.middleware';
import { DriverController } from './driver.controller';
import { body } from 'express-validator';
import { validateRequest } from '../../middlewares/validate.middleware';

const router = Router();

// Admin approves or suspends a driver
router.patch(
  '/approve/:id',
  authenticateJWT,
  authorizeRoles('admin'),
  [body('approve').isBoolean()],
  validateRequest,
  DriverController.approveDriver
);

// Driver sets availability online/offline
router.patch(
  '/availability',
  authenticateJWT,
  authorizeRoles('driver'),
  [body('online').isBoolean()],
  validateRequest,
  DriverController.setAvailability
);

export default router;
