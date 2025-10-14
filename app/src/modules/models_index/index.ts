// app/src/models/index.ts

/**
 * index.ts
 * -----------------
 * Main entry point for Sequelize models.
 *
 * Responsibilities:
 * - Import Sequelize instance from configuration.
 * - Import all models from the application.
 * - Apply associations between models.
 * - Provide a utility function to sync the database.
 * - Export Sequelize instance and all models.
 */

import sequelize from "../../config/database";

// Import models
import orderHistory from "../orderHistory/orderHistory.models";
import Client from "../clients/clients.models";
import Order from "../Order/order.models";
import OrderState from "../orderState/orderState.models";
import OrderAddress from "../orderAdress/orderAdress.models";
import Warehouse from "../wareHouses/wareHouses.models";

import {applyAssociations} from "../models_index/associations";
/**
 * Apply associations between models.
 * -----------------
 * This step connects models based on their
 * foreign keys and logical relationships.
 */
applyAssociations()
/**
 * Synchronize database schema.
 * -----------------
 * - Tests database connection with `sequelize.authenticate()`.
 * - Creates/updates tables according to models with `sequelize.sync()`.
 *
 * Notes:
 * - By default uses `sequelize.sync()`.
 * - Can be modified to `sequelize.sync({ alter: true })` or `sequelize.sync({ force: true })`
 *   depending on migration strategy.
 */

export const syncDB = async () => {
  try {
    await sequelize.authenticate();
    console.log(" Connection established with the database.");

    await sequelize.sync();
    console.log(" Tables synchronized correctly.");
  } catch (error) { 
    console.error(" Error synchronizing database:", error);
  }
};

/**
 * Export all models and database utilities
 * -----------------
 * Provides a single access point to:
 * - Sequelize instance.
 * - All models.
 * - `syncDB` function.
 */
export {
  sequelize,
  orderHistory,
  Client,
  Order,
  OrderState,
  OrderAddress,
  Warehouse,
};