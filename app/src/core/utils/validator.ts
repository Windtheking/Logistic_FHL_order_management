// Helpers reutilizables
import { AppError } from "../errors";

export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

/** Parsea un id numérico o lanza 400 */
export const parseIdOrThrow = (raw: string, field = "id") => {
    const number = Number(raw);
    if (Number.isNaN(number)) {
        throw new AppError("BAD_REQUEST", `${field} must be number`, 400);
    }
    return number;
};
