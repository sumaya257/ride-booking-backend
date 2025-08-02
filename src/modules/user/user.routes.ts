import { Router } from 'express';
import { authenticateJWT, authorizeRoles } from '../../middlewares/auth.middleware';
import { UserController } from './user.controller';
import { body } from 'express-validator';
import { validateRequest } from '../../middlewares/validate.middleware';

const router = Router();

// Admin blocks/unblocks user
router.patch(
  '/block/:id',
  authenticateJWT,
  authorizeRoles('admin'),
  [body('block').isBoolean()],
  validateRequest,
  UserController.blockUser
);

// Admin gets all users or by role
router.get('/', authenticateJWT, authorizeRoles('admin'), UserController.getAllUsers);

export default router;
