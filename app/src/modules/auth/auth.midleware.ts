// src/modules/auth/auth.middleware.ts
import type { Request, Response, NextFunction } from "express";
import { verifyAccessToken, JwtPayload } from "./jwt";
import { UnauthorizedError, ForbiddenError } from "../../core/errors";

/**
 * Middleware to protect routes that require authentication.
 * 
 * Verifies the presence and validity of a JWT access token in the
 * `Authorization` header of the request. If valid, attaches the
 * decoded token payload to `req.user` for downstream handlers.
 * 
 * If the token is missing or invalid, it responds with a 401 Unauthorized error.
 * 
 * @param req - HTTP request object.
 * @param res - HTTP response object (not used here).
 * @param next - Next function to pass control to the next middleware or route handler.
 * 
 * @returns Calls `next()` if authentication is successful, otherwise passes an error to `next()`.
 */
export function requireAuth(req: Request, _res: Response, next: NextFunction) {
    const header = req.header("Authorization");
    if (!header?.startsWith("Bearer ")) return next(new UnauthorizedError("Token not provided"));

    const token = header.slice(7);
    try {
        const payload = verifyAccessToken(token);
        req.user = payload;
        return next();
    } catch {
        return next(new UnauthorizedError("Invalid token or expired"));
    }
}


/**
 * Middleware to enforce role-based access control.
 * 
 * Checks if the authenticated user has the required role to access the route.
 * If the user is not authenticated or does not have the required role,
 * it responds with a 401 Unauthorized or 403 Forbidden error respectively.
 * 
 * @param role - The required role to access the route (e.g., "admin", "user").
 * 
 * @returns A middleware function that checks the user's role.
 * 
 */
export const requireRole = (role: string) =>
    (req: Request, _res: Response, next: NextFunction) => {
        if (!req.user) return next(new UnauthorizedError());
        if (req.user.role !== role) return next(new ForbiddenError("Insufficient permissions"));
        next();
};
