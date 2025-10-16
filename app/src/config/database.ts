/**
 * Sequelize configuration for PostgreSQL
 * -------------------------------------
 * This module initializes and exports a Sequelize instance,
 * configured with environment variables defined in `.env` or `docker-compose`.
 *
 * Main usage:
 *  - Establish connection to the PostgreSQL database.
 *  - To be imported by models and utilities that need to interact with Sequelize.
 *
 * Environment variables used:
 *  - POSTGRES_DB: Database name.
 *  - POSTGRES_USER: Database user.
 *  - POSTGRES_PASSWORD: Database user password.
 *  - POSTGRES_HOST: Database host (default is `db` for docker-compose).
 *  - POSTGRES_PORT: Connection port (default is `5432`).
 */

import { Sequelize } from "sequelize";

/**
 * Sequelize instance configured for PostgreSQL.
 * Connects using credentials and parameters defined in environment variables.
 */
const sequelize = new Sequelize(
  process.env.POSTGRES_DB as string,
  process.env.POSTGRES_USER as string,
  process.env.POSTGRES_PASSWORD as string,
  {
    host: process.env.POSTGRES_HOST || "db", // In docker-compose, the DB service is called "db"
    port: parseInt(process.env.POSTGRES_PORT || "5432", 10),
    dialect: "postgres",
    logging: false, // Disables SQL logs in console (useful in production)
  }
);

export default sequelize;