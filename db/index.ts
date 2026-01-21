// import { PrismaClient } from "@/app/generated/prisma/client"; 
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import { PrismaClient } from "@prisma/client";


// ✅ Pass an object with the 'url' property
const adapter = new PrismaBetterSqlite3({ 
  url: 'file:./dev.db' 
});

export const db = new PrismaClient({ 
  adapter 
});
