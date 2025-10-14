/**
 * This middlewware function works as a middle point to prevent mistaken 
 * information or errors that ocurred during data transference objects 
 * from the server side
 * 
 * @example
 * 
 * return async (req: Request, res: Response, next: NextFunction) => {
        const dtoObject = plainToInstance(dtoClass, req.body);
        const errors = await validate(dtoObject);
        if (errors.length > 0) {
            return res.status(400).json({
                message: 'Validation failed',
                errors: errors.map(err => ({
                    property: err.property,
                    constraints: err.constraints,
                })),
            });
        }
        next();
    }

 *
 * This part of the function targets the information given 
 * and uses the response of the server to parse it into json and then into a DTO class
 */

// app/src/middleware/validate.dto.middleware.ts
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export function validateDtoMiddleware(dtoClass: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const dtoObject = plainToInstance(dtoClass, req.body);
        const errors = await validate(dtoObject);
        if (errors.length > 0) {
            return res.status(400).json({
                message: 'Validation failed',
                errors: errors.map((err: any) => ({
                    property: err.property,
                    constraints: err.constraints,
                })),
            });
        }
        next();
    }
};