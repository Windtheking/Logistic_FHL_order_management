/**
 * JWT Service
 * -----------
 * Provides utility functions for working with JSON Web Tokens (JWT) in seller authentication flows.
 *
 * Features:
 *  - Generate JWT tokens with seller data
 *  - Verify and decode JWT tokens
 *  - Extract JWT from HTTP headers
 *  - Check token expiration and get expiration information
 *
 * All tokens are signed and verified using the secret and configuration options from the environment.
 */
//

import jwt from 'jsonwebtoken';
import { envConfig } from '../config/env';

/**
 * JWT payload interface.
 * Defines the structure of the data embedded in the JWT for seller authentication.
 */
export interface JWTPayload {
  id_seller: number;
  username: string;
  role_id: number;
  iat?: number;
  exp?: number;
}

/**
 * Generates a signed JWT token containing seller authentication data.
 *
 * @param payload - The seller data to embed in the token (id_seller, username, role_id)
 * @returns JWT token as string
 *
 * @example
 * const token = generateToken({ id_seller: 1, username: 'seller123', role_id: 2 });
 * console.log(token); // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 */
export const generateToken = (payload: Omit<JWTPayload, 'iat' | 'exp'>): string => {
  try {
    const token = jwt.sign(payload, envConfig.JWT_SECRET || '', {
      expiresIn: envConfig.JWT_EXPIRES_IN,
      issuer: 'ecommerce-api',
      audience: 'ecommerce-client'
    } as jwt.SignOptions);
    return token;
  } catch (error) {
    throw new Error(`Error generating token: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Verifies and decodes a JWT token.
 *
 * @param token - The JWT token to verify
 * @returns The decoded JWTPayload if valid, or null if invalid/expired
 *
 * @example
 * const payload = verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
 * if (payload) {
 *   console.log('Seller ID:', payload.id_seller);
 * }
 */
export const verifyToken = (token: string): JWTPayload | null => {
  try {
    const decoded = jwt.verify(token, envConfig.JWT_SECRET, {
      issuer: 'ecommerce-api',
      audience: 'ecommerce-client'
    }) as JWTPayload;
    return decoded;
  } catch (error) {
    return null;
  }
};

/**
 * Extracts the JWT token from an HTTP Authorization header.
 *
 * @param authHeader - The value of the Authorization header (e.g., 'Bearer <token>')
 * @returns The token string if present, or null if not found/invalid
 *
 * @example
 * const token = extractTokenFromHeader('Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
 * console.log(token); // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 */
export const extractTokenFromHeader = (authHeader: string | undefined): string | null => {
  if (!authHeader) {
    return null;
  }

  const parts = authHeader.split(' ');
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    return null;
  }

  return parts[1];
};

/**
 * Checks if a JWT token is expired (does not throw).
 *
 * @param token - The JWT token to check
 * @returns True if the token is expired, false otherwise
 *
 * @example
 * const isExpired = isTokenExpired('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
 * if (isExpired) {
 *   console.log('Token has expired');
 * }
 */
export const isTokenExpired = (token: string): boolean => {
  try {
    const decoded = jwt.decode(token) as JWTPayload;
    if (!decoded || !decoded.exp) {
      return true;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp < currentTime;
  } catch (error) {
    return true;
  }
};

/**
 * Gets the expiration date of a JWT token.
 *
 * @param token - The JWT token
 * @returns The expiration date as a Date object, or null if invalid
 *
 * @example
 * const expDate = getTokenExpirationDate('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
 * if (expDate) {
 *   console.log('Token expires at:', expDate);
 * }
 */
export const getTokenExpirationDate = (token: string): Date | null => {
  try {
    const decoded = jwt.decode(token) as JWTPayload;
    if (!decoded || !decoded.exp) {
      return null;
    }

    return new Date(decoded.exp * 1000);
  } catch (error) {
    return null;
  }
};

/**
 * Gets the remaining time (in seconds) until a JWT token expires.
 *
 * @param token - The JWT token
 * @returns Number of seconds until expiration (negative if expired)
 *
 * @example
 * const remainingTime = getTokenRemainingTime('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...');
 * console.log(`Token expires in ${remainingTime} seconds`);
 */
export const getTokenRemainingTime = (token: string): number => {
  try {
    const decoded = jwt.decode(token) as JWTPayload;
    if (!decoded || !decoded.exp) {
      return 0;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    return decoded.exp - currentTime;
  } catch (error) {
    return 0;
  }
};
