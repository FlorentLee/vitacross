#!/usr/bin/env node

/**
 * Database Verification Script
 * Checks if all required tables exist in the database
 */

import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

async function verifyDatabase() {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL not set');
    process.exit(1);
  }

  console.log('🔍 Verifying database structure...\n');

  const client = new Client({
    connectionString: process.env.DATABASE_URL
  });

  try {
    await client.connect();
    console.log('✓ Connected to database');

    const db = drizzle(client);

    // Check users table
    console.log('\n📋 Checking tables...');
    const userResult = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_name = 'users'
      );
    `);
    if (userResult.rows[0].exists) {
      console.log('  ✓ users table exists');
    } else {
      console.error('  ✗ users table missing');
    }

    // Check patient_consultations table
    const consultationResult = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_name = 'patient_consultations'
      );
    `);
    if (consultationResult.rows[0].exists) {
      console.log('  ✓ patient_consultations table exists');
    } else {
      console.error('  ✗ patient_consultations table missing');
    }

    // Check medical_files table
    const filesResult = await client.query(`
      SELECT EXISTS (
        SELECT FROM information_schema.tables
        WHERE table_name = 'medical_files'
      );
    `);
    if (filesResult.rows[0].exists) {
      console.log('  ✓ medical_files table exists');
    } else {
      console.error('  ✗ medical_files table missing');
    }

    // Check enums
    console.log('\n🔧 Checking enums...');
    const enums = ['role', 'loginMethod', 'status'];
    for (const enumName of enums) {
      const enumResult = await client.query(`
        SELECT EXISTS (
          SELECT 1 FROM pg_type
          WHERE typname = '${enumName}'
        );
      `);
      if (enumResult.rows[0].exists) {
        console.log(`  ✓ ${enumName} enum exists`);
      } else {
        console.error(`  ✗ ${enumName} enum missing`);
      }
    }

    console.log('\n✅ Database verification complete');
  } catch (error) {
    console.error('\n❌ Database verification failed:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

verifyDatabase();
