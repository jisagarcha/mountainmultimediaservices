import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import * as schema from "./schema";
import path from "path";
import fs from "fs";

try {
  if (typeof process.loadEnvFile === "function") {
    process.loadEnvFile();
  }
} catch (e) {
  // Ignore if .env doesn't exist
}

const dbPath = process.env.DATABASE_PATH || "./data/app.db";

// Ensure the directory exists for SQLite storage
const dir = path.dirname(path.resolve(/*turbopackIgnore: true*/ dbPath));
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

const sqlite = new Database(dbPath);
// Enable WAL mode for better concurrency and performance
sqlite.pragma("journal_mode = WAL");

export const db = drizzle(sqlite, { schema });
