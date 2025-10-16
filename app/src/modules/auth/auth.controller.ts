// src/modules/auth/auth.controller.ts

import type { Request, Response, NextFunction } from "express";
import * as users from "../clients/clients.dao";
import * as order from "../Order/order.dao";
import { isEmail } from "../../core/utils/validator";
import { hashPassword, verifyPassword } from "../../core/utils/password";
import { ValidationError, ConflictError, UnauthorizedError } from "../../core/errors";



/**
 * Controller for user registration.
 * 
 * Validates input data, checks for duplicate emails, hashes the password,
 * and creates a new user in the database.
 * 
 * @param req - HTTP request object containing `name`, `email`, and `password` in the body.
 * @param res - HTTP response object used to send back the created user (without password).
 * @param next - Next function to pass control to error handling middleware.
 * 
 * @returns {Promise<Response>} - Returns the created user in JSON format with status 201.
 */
export const register = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
        const { name, email, password, role = "analyst" } = req.body ?? {};
        const errors: Array<{ path: string; message: string }> = [];

        if (!name) errors.push({ path: "name", message: "is required" });
        if (!email) errors.push({ path: "email", message: "is required" });
        if (email && !isEmail(email)) errors.push({ path: "email", message: "is not valid" });

        if (errors.length) throw new ValidationError("Invalids inputs", { errors });

        const duplicate = await users.getUserByEmail(email);
        if (duplicate) throw new ConflictError("Email already registered");

        const passwordHash = await hashPassword(password);
        const user = await users.createUser({ name, email, passwordHash, role });

        return res.status(201).json(user);
    } catch (error) {
        return next(error);
    }
};


/**
 * Controller for user login.
 * 
 * Validates input data, checks user credentials, and issues a JWT access token.
 * 
 * @param req - HTTP request object containing `email` and `password` in the body.
 * @param res - HTTP response object used to send back the access token.
 * @param next - Next function to pass control to error handling middleware.
 * 
 * @returns {Promise<Response>} - Returns a JSON object with the access token and its metadata.
 */
export const login = async (req: Request, res: Response, next: NextFunction): Promise<Response> => {
    try {
        const { email, password } = req.body ?? {};
        if (!email || !password) throw new ValidationError("Email and password are required");

        const user = await users.getUserAuthByEmail(email);
        if (!user) throw new UnauthorizedError("Invalid credentials");

        const ok = await verifyPassword(password, user.passwordHash);
        if (!ok) throw new UnauthorizedError("Invalid credentials");

        const token = signAccessToken({ sub: user.id, email: user.email, role: user.role });
        return res.json({ access_token: token, token_type: "Bearer", expires_in: process.env.JWT_EXPIRES_IN || "15m" });
    } catch (error) {
        return next(error);
    }
};


/**
 * Controller to get the authenticated user's info.
 * 
 * Requires the `requireAuth` middleware to have run before, which sets `req.user`.
 * 
 * @param req - HTTP request object, expects `req.user` to be populated by auth middleware.
 * @param res - HTTP response object used to send back the user's info.
 * 
 * @returns {Promise<Response>} - Returns a JSON object with the user's ID and email.
 */
export const me = async (req: Request, res: Response): Promise<Response> => {
    return res.json({ id: req.user!.sub, email: req.user!.email });
};