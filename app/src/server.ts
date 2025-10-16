/**
 * It is only responsible for configuring the Express application: middlewares, routes, swagger, etc.
 * It does not start the server or touch the database.
 * This makes the application easily testable, because we can import the app into our tests without having to launch the real server or connect to the database.
*/

import express from "express";

import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger";
import { encryptRoutes} from "./routes";

const app = express();

    app.use(express.json());

    // Authentication route
    // app.use("/api/auth", authRoutes);

    // Encrypt and Decrypt
    app.use("/api", encryptRoutes);

    // Swagger
    app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    export default app;
