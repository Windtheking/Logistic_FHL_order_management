// src/core/utils/password.ts

/**
 * Utilitys for Password Hashing and Verification
 * ------------------------------------------------
 * This file provides utility functions to hash and verify passwords using bcrypt.
 * 
 * Functions:
 *  - hashPassword: Hashes a plain text password.
 *  - verifyPassword: Compares a plain text password with a hashed password.
 * 
 * These functions are used in user authentication processes to ensure secure password handling.
 */
import bcrypt from "bcrypt";

/**
 * Hashes a plain text password using bcrypt.
 * 
 * @param plain - The plain text password to be hashed.
 * @returns A promise that resolves to the hashed password.
 */
export const hashPassword = (plain: string) => bcrypt.hash(plain, 10);

/**
 * Verifies a plain text password against a hashed password.
 * 
 * @param plain - The plain text password to verify.
 * @param hash - The hashed password to compare against.
 * @returns A promise that resolves to `true` if the passwords match, or `false` otherwise.
 */
export const verifyPassword = (plain: string, hash: string) => bcrypt.compare(plain, hash);