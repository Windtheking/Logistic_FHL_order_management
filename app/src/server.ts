/**
 * It is only responsible for configuring the Express application: middlewares, routes, swagger, etc.
 * It does not start the server or touch the database.
 * This makes the application easily testable, because we can import the app into our tests without having to launch the real server or connect to the database.
*/

import express from "express";
import encryptionRoutes from "./routes/encryption.routes";
import authRoutes from "./routes/auth.routes";
import customerRoutes from "./routes/customer.routes"
import categoryRoutes from "./routes/category.routes";
import orderStatusRoutes from "./routes/order_status.routes";
import paymentMethodRoutes from "./routes/payment_method.routes";
import roleRoutes from "./routes/role.routes";
import genderRoutes from "./routes/gender.routes";
import addressRoutes from "./routes/address.routes";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./docs/swagger";
import { encryptRoutes, productRoutes } from "./routes";

const app = express();

app.use(express.json());

// Router
app.use("/api/auth", authRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/order_status", orderStatusRoutes);
app.use("/api/payments", paymentMethodRoutes);
app.use("/api/role", roleRoutes);
app.use("/api/gender", genderRoutes)
app.use("/api/address", addressRoutes);


// Encrypt and Decrypt
app.use("/api", encryptRoutes);

// Products Route
app.use("/api/products", productRoutes);

// Encrypt and Decrypt
app.use("/api", encryptionRoutes);

// Swagger
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

export default app;
