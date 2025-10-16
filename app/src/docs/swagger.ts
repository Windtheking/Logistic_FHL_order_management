/*
 * Swagger Configuration
 * ---------------------
 * This file configures the automatic API documentation
 * using `swagger-jsdoc` and `swagger-ui-express`.
 *
 * - Generates an OpenAPI (3.0.0) schema.
 * - Extracts documentation from JSDoc annotations in `src/routes/*.ts`.
 * - Global components/schemas are centralized in `docs/swagger/components.schemas.ts` and imported via env config.
 *
 * Documentation access:
 *  - The generated spec is consumed by `swagger-ui-express`.
 *  - Available at `/api/docs` (see `server.ts`).
 */

import swaggerJSDoc from "swagger-jjsdoc";
import { swaggerConfig } from "../config/env";

/**
 * swagger-jsdoc options.
 *
 * `definition`:
 *  - OpenAPI version, API info, servers, and global components (schemas) from env config.
 *
 * `apis`:
 *  - Path to files with JSDoc annotations describing endpoints (here, the route files).
 */
const options = {
  definition: swaggerConfig,
  apis: ["./src/routes/*.ts"], // Escanea las rutas para extraer anotaciones Swagger
};

/**
 * Dynamically generated Swagger/OpenAPI specification.
 * This object is exported and used by `swagger-ui-express`.
 */
export const swaggerSpec = swaggerJSDoc(options);
