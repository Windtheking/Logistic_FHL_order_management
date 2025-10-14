import jwt from 'jsonwebtoken';
import { envConfig } from '../config/env';

export interface RefreshTokenPayload {
  id_user: number;
  email: string;
  id_role: number;
  type: 'refresh';
  iat?: number;
  exp?: number;
}

export const generateRefreshToken = (payload: Omit<RefreshTokenPayload, 'iat' | 'exp'>): string => {
  const options: jwt.SignOptions = {
    expiresIn: envConfig.JWT_REFRESH_EXPIRES_IN || '7d' as any,
    issuer: 'ecommerce-api',
    audience: 'ecommerce-client',
  };
  return jwt.sign(
    { ...payload, type: 'refresh' },
    envConfig.JWT_REFRESH_SECRET || envConfig.JWT_SECRET || '',
    options
  );
};

export const verifyRefreshToken = (token: string): RefreshTokenPayload | null => {
  try {
    const decoded = jwt.verify(token, envConfig.JWT_REFRESH_SECRET || envConfig.JWT_SECRET || '', {
      issuer: 'ecommerce-api',
      audience: 'ecommerce-client',
    }) as RefreshTokenPayload;
    if (decoded.type !== 'refresh') return null;
    return decoded;
  } catch {
    return null;
  }
};
