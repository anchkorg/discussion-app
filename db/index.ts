// import { PrismaClient } from "@/app/generated/prisma/client"; 
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from "@prisma/client";
import { Pool } from 'pg';

const pool = new Pool({ 
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: true,  // 驗證伺服器證書
  }
});

const adapter = new PrismaPg(pool);

export const db = new PrismaClient({
  adapter
});