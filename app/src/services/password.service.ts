/**
 * Password Service
 * ---------------
 * This service handles password encryption and validation operations.
 * 
 * It provides:
 *  - Password hashing using bcrypt
 *  - Password comparison for authentication
 *  - Password strength validation
 * 
 * This service follows security best practices for password handling.
 */

import bcrypt from 'bcryptjs';
import { envConfig } from '../config/env';

/**
 * Hashes a plain text password using bcrypt.
 * 
 * @param password - Plain text password to hash
 * @returns Promise<string> - Hashed password
 * 
 * @example
 * const hashedPassword = await hashPassword('mySecurePassword123');
 * console.log(hashedPassword); // $2a$12$...
 */
export const hashPassword = async (password: string): Promise<string> => {
  try {
    const salt = await bcrypt.genSalt(envConfig.BCRYPT_SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    throw new Error(`Error hashing password: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Compares a plain text password with a hashed password.
 * 
 * @param password - Plain text password to compare
 * @param hashedPassword - Hashed password to compare against
 * @returns Promise<boolean> - True if passwords match, false otherwise
 * 
 * @example
 * const isValid = await comparePassword('myPassword', '$2a$12$...');
 * if (isValid) {
 *   console.log('Password is correct');
 * }
 */
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  try {
    const isValid = await bcrypt.compare(password, hashedPassword);
    return isValid;
  } catch (error) {
    throw new Error(`Error comparing password: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
};

/**
 * Validates password strength according to security requirements.
 * 
 * @param password - Password to validate
 * @returns object with validation result and errors
 * 
 * @example
 * const validation = validatePasswordStrength('weak');
 * if (!validation.isValid) {
 *   console.log('Password errors:', validation.errors);
 * }
 */
export const validatePasswordStrength = (password: string): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  // Minimum length check
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  // Maximum length check
  if (password.length > 128) {
    errors.push('Password must be no more than 128 characters long');
  }
  
  // Contains uppercase letter
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  // Contains lowercase letter
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  // Contains number
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  // Contains special character
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  // Check for common weak patterns
  const commonPatterns = [
    /(.)\1{2,}/, // Repeated characters
    /123456/, // Sequential numbers
    /password/i, // Common words
    /qwerty/i,
    /abc123/i
  ];
  
  for (const pattern of commonPatterns) {
    if (pattern.test(password)) {
      errors.push('Password contains common patterns and is not secure');
      break;
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

/**
 * Generates a random password with specified criteria.
 * 
 * @param length - Length of the password (default: 12)
 * @param includeSpecialChars - Whether to include special characters (default: true)
 * @returns string - Generated password
 * 
 * @example
 * const randomPassword = generateRandomPassword(16, true);
 * console.log(randomPassword); // Random secure password
 */
export const generateRandomPassword = (length: number = 12, includeSpecialChars: boolean = true): string => {
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const numbers = '0123456789';
  const specialChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  let charset = lowercase + uppercase + numbers;
  if (includeSpecialChars) {
    charset += specialChars;
  }
  
  let password = '';
  
  // Ensure at least one character from each required category
  password += lowercase[Math.floor(Math.random() * lowercase.length)];
  password += uppercase[Math.floor(Math.random() * uppercase.length)];
  password += numbers[Math.floor(Math.random() * numbers.length)];
  
  if (includeSpecialChars) {
    password += specialChars[Math.floor(Math.random() * specialChars.length)];
  }
  
  // Fill the rest randomly
  for (let i = password.length; i < length; i++) {
    password += charset[Math.floor(Math.random() * charset.length)];
  }
  
  // Shuffle the password
  return password.split('').sort(() => Math.random() - 0.5).join('');
};
