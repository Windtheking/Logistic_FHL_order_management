/**
 * Error base de la aplicación.
 * - code: identificador estable p/ clientes (NOT_FOUND, CONFLICT, etc.)
 * - status: HTTP status code
 * - message: mensaje legible para humanos
 * - details: info adicional (opcional)
 */
export class AppError extends Error {
    public readonly code: string;
    public readonly status: number;
    public readonly details?: unknown;

    constructor(
        code: string,
        message: string,
        status = 400,
        details?: unknown
    ) {
        super(message);

        // Mantener el nombre de la clase en el stack
        this.name = new.target.name;

        this.code = code;
        this.status = status;
        this.details = details;

        // Fija el prototipo para herencia correcta en TS/Node
        Object.setPrototypeOf(this, new.target.prototype);

        // Captura stack sin incluir el constructor actual
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, new.target);
        }
    }

    /**
     * Serializa a un objeto plano (útil para logs o respuestas).
     */
    toJSON() {
        return {
            code: this.code,
            message: this.message,
            status: this.status,
            details: this.details ?? null,
            // El stack no se expone por defecto; se puede incluir condicionalmente en dev
        };
    }
}

/** 401 */
export class UnauthorizedError extends AppError {
    constructor(message = 'Unauthorized', details?: unknown) {
        super('UNAUTHORIZED', message, 401, details);
    }
}

/** 403 */
export class ForbiddenError extends AppError {
    constructor(message = 'Forbidden', details?: unknown) {
        super('FORBIDDEN', message, 403, details);
    }
}

/** 404 */
export class NotFoundError extends AppError {
    constructor(message = 'Resource not found', details?: unknown) {
        super('NOT_FOUND', message, 404, details);
    }
}

/** 409 */
export class ConflictError extends AppError {
    constructor(message = 'Conflict', details?: unknown) {
        super('CONFLICT', message, 409, details);
    }
}

/** 422 */
export class ValidationError extends AppError {
    constructor(message = 'Validation Error', details?: unknown) {
        super('VALIDATION_ERROR', message, 422, details);
    }
}