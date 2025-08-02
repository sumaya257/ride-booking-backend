import { Request } from 'express';

export interface IAuthLoginRequest {
  email: string;
  password: string;
}

export interface IAuthRegisterRequest {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'rider' | 'driver';
}

export interface AuthenticatedRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}
