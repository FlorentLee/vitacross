#!/usr/bin/env node

/**
 * Database Migration Script
 * This script helps migrate the database schema to PostgreSQL RDS
 */

import { execSync } from 'child_process';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Colors
const GREEN = '\x1b[32m';
const YELLOW = '\x1b[33m';
const RED = '\x1b[31m';
const NC = '\x1b[0m';

console.log('📦 Database Migration Script\n');

// Check if .env exists
const envPath = path.join(__dirname, '..', '.env');
if (!fs.existsSync(envPath)) {
  console.error(`${RED}Error: .env file not found${NC}`);
  console.log(`${YELLOW}Please create .env from .env.example${NC}`);
  process.exit(1);
}

// Check DATABASE_URL
if (!process.env.DATABASE_URL) {
  console.error(`${RED}Error: DATABASE_URL not set in .env${NC}`);
  process.exit(1);
}

console.log(`${GREEN}✓${NC} Environment file found`);
console.log(`${GREEN}✓${NC} DATABASE_URL configured\n`);

try {
  // Step 1: Generate migration files
  console.log(`${YELLOW}[1/3]${NC} Generating migration files...`);
  execSync('npx drizzle-kit generate', {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit'
  });
  console.log(`${GREEN}✓${NC} Migration files generated\n`);

  // Step 2: Push schema to database
  console.log(`${YELLOW}[2/3]${NC} Pushing schema to database...`);
  execSync('npx drizzle-kit push', {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit'
  });
  console.log(`${GREEN}✓${NC} Schema pushed to database\n`);

  // Step 3: Verify tables exist
  console.log(`${YELLOW}[3/3]${NC} Verifying database tables...`);
  execSync('node scripts/verify-db.js', {
    cwd: path.join(__dirname, '..'),
    stdio: 'inherit'
  });
  console.log(`${GREEN}✓${NC} Database verification complete\n`);

  console.log(`${GREEN}✅ Migration completed successfully!${NC}`);
  console.log('\nYou can now start the application with:');
  console.log('  npm run dev (for development)');
  console.log('  npm start (for production)');
} catch (error) {
  console.error(`${RED}❌ Migration failed:${NC}`, error.message);
  process.exit(1);
}
