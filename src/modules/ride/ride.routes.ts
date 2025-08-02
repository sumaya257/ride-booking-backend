import { Router } from 'express';
import { RideController } from './ride.controller';
import { authenticateJWT, authorizeRoles } from '../../middlewares/auth.middleware';
import { body } from 'express-validator';
import { validateRequest } from '../../middlewares/validate.middleware';

const router = Router();

// Rider requests a ride
router.post(
  '/request',
  authenticateJWT,
  authorizeRoles('rider'),
  [
    body('pickupLocation.address').notEmpty(),
    body('pickupLocation.lat').isFloat({ min: -90, max: 90 }),
    body('pickupLocation.lng').isFloat({ min: -180, max: 180 }),
    body('destinationLocation.address').notEmpty(),
    body('destinationLocation.lat').isFloat({ min: -90, max: 90 }),
    body('destinationLocation.lng').isFloat({ min: -180, max: 180 }),
  ],
  validateRequest,
  RideController.requestRide
);

// Rider or driver cancels a ride
router.patch('/:id/cancel', authenticateJWT, authorizeRoles('rider', 'driver'), RideController.cancelRide);

// Rider or driver views their rides
router.get('/me', authenticateJWT, authorizeRoles('rider', 'driver'), RideController.getRideHistory);

// Driver accepts a ride
router.patch('/:id/accept', authenticateJWT, authorizeRoles('driver'), RideController.acceptRide);

// Driver updates ride status
router.patch(
  '/:id/status',
  authenticateJWT,
  authorizeRoles('driver'),
  [body('status').isIn(['picked_up', 'in_transit', 'completed'])],
  validateRequest,
  RideController.updateRideStatus
);

export default router;
