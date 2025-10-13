// app/src/seeders/10-seller.seeder.ts

/**
 * Seller Seeder
 * -----------------
 * This file contains the seeder for the Seller entity.
 *
 * It contains:
 * - Initial seller data for system users.
 * - Sample sellers linked to access credentials.
 * - Logic to prevent duplicate entries.
 *
 * This seeder depends on access and should be run after the access seeder.
 */

import { createSeller } from "../dao/seller.dao";
import { CreateSellerDto } from "../dto/seller.dto";
import Access from "../models/access.model";
import Gender from "../models/gender.model";
import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';

/**
 * Seeds the seller table with initial seller profiles.
 *
 * Creates seller profiles if they don't already exist.
 * Prevents duplicate entries by checking existing records.
 */
export const seedSellers = async (): Promise<void> => {
  const accesses = await Access.findAll();
  const genders = await Gender.findAll();
  if (accesses.length === 0) {
    console.log("❌ Access accounts not found. Run access seeder first.");
    return;
  }
  if (genders.length === 0) {
    console.log("❌ Genders not found. Run gender seeder first.");
    return;
  }

  return new Promise((resolve, reject) => {
    const csvPath = path.join(__dirname, '../data/sellers.csv');
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
            const access = accesses.find(a => a.username === row.username);
            if (!access) continue;

            // Find the gender id by name (e.g., row.gender = 'Masculino')
            const gender = genders.find(g => g.name.toLowerCase() === (row.gender || '').toLowerCase());
            if (!gender) {
              console.error(`❌ Gender not found for seller: ${row.fullname}`);
              continue;
            }
            const sellerData: CreateSellerDto = {
              access_id: access.id_access,
              gender_id: gender.id_gender,
              fullname: row.fullname,
              phone: row.phone,
              email: row.email,
              birth_date: new Date(row.birth_date),
              is_active: true
            };

            try {
              await createSeller(sellerData);
              count++;
              console.log(`✓ Seller created: ${row.fullname}`);
            } catch (error: any) {
              if (!error.message?.includes('unique constraint')) {
                console.error(`Error creating seller ${row.email}:`, error.message);
              }
            }
          }
          console.log(`✅ ${count} sellers processed from CSV`);
          resolve();
        } catch (error) {
          reject(error);
        }
      })
      .on('error', reject);
  });
};