import { Router } from 'express';
import { body } from 'express-validator';
import { AuthController } from './authController';
import { validateRequest } from '../../middlewares/validate.middleware';

const router = Router();

router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Email is invalid'),
    body('password').isLength({ min: 6 }).withMessage('Password min length 6'),
    body('role').isIn(['admin', 'rider', 'driver']).withMessage('Role must be admin, rider, or driver'),
  ],
  validateRequest,
  AuthController.register
);

router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email is invalid'),
    body('password').notEmpty().withMessage('Password is required'),
  ],
  validateRequest,
  AuthController.login
);

export default router;
