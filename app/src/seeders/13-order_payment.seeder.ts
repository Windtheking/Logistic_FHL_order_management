// app/src/seeders/13-order_payment.seeder.ts

/**
 * Order Payment Seeder
 * -----------------
 * This file contains the seeder for the OrderPayment entity.
 * 
 * It contains:
 * - Initial order payment data for completed transactions.
 * - Sample payments linked to orders and payment methods.
 * - Logic to prevent duplicate entries.
 * 
 * This seeder depends on orders and payment methods.
 */

import OrderPayment from "../models/order_payment.model";
import Order from "../models/order.model";
import PaymentMethod from "../models/payment_method.model";
import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';

/**
 * Seeds the order payment table with initial payment records.
 * 
 * Creates sample order payments if they don't already exist.
 * Prevents duplicate entries by checking existing records.
 */
export const seedOrderPayments = async (): Promise<void> => {
  const orders = await Order.findAll();
  const paymentMethods = await PaymentMethod.findAll();

  if (orders.length === 0 || paymentMethods.length === 0) {
    console.log("❌ Orders or payment methods not found. Run orders and payment methods seeders first.");
    return;
  }

  return new Promise((resolve, reject) => {
    const csvPath = path.join(__dirname, '../data/order_payments.csv');
    const rows: any[] = [];
    
    fs.createReadStream(csvPath)
      .pipe(csv())
      .on('data', (row) => {
        rows.push(row);
      })
      .on('end', async () => {
        let count = 0;
        try {
          for (const row of rows) {
            const order = orders[parseInt(row.order_index)];
            const paymentMethod = paymentMethods.find(pm => pm.name === row.payment_method);
            
            if (!order || !paymentMethod) continue;

            const existing = await OrderPayment.findOne({ 
              where: { 
                order_id: order.id_order,
                id_payment_method: paymentMethod.id_payment_method
              } 
            });
            if (!existing) {
              await OrderPayment.create({
                order_id: order.id_order,
                id_payment_method: paymentMethod.id_payment_method,
                amount: parseFloat(row.amount),
                payment_date: new Date(row.payment_date),
                is_active: true
              });
              count++;
              console.log(`✓ Order Payment created: ${paymentMethod.name} - $${row.amount}`);
            }
          }
          console.log(`✅ ${count} order payments processed from CSV`);
          resolve();
        } catch (error) {
          reject(error);
        }
      })
      .on('error', reject);
  });
};