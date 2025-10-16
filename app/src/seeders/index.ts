// app/src/seeders/index.ts

/**
 * Seeders Index
 * -----------------
 * Main entry point for database seeding operations.
 * 
 * Executes all seeders in the correct order to maintain referential integrity.
 */

import { seedSellers } from "./10-seller.seeder";

import { seedOrderPayments } from "./13-order_payment.seeder";

/**
 * Run all seeders in correct order
 */
export const runAllSeeders = async () => {
  try {
    console.log("🌱 Starting database seeding...");
    
    // Dependent entities
    await seedSellers(); // depends on access
    await seedOrderPayments(); // depends on orders and payment methods
    
    console.log("✅ Database seeding completed successfully!");
  } catch (error) {
    console.error("❌ Error during seeding:", error + error.message);
    throw error;
  }
};

/**
 * Run individual seeders
 */
export {
  seedSellers,
  seedOrderPayments
};