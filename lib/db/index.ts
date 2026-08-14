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

// Safe auto-migration for newly added columns in SQLite
try {
  const columns = sqlite.prepare("PRAGMA table_info(branding)").all().map((c: any) => c.name);
  if (columns.length > 0) {
    if (!columns.includes("favicon_url")) {
      sqlite.exec("ALTER TABLE branding ADD COLUMN favicon_url TEXT;");
    }
    if (!columns.includes("hero_image_url")) {
      sqlite.exec("ALTER TABLE branding ADD COLUMN hero_image_url TEXT;");
    }
    if (!columns.includes("gradient_preset")) {
      sqlite.exec("ALTER TABLE branding ADD COLUMN gradient_preset TEXT DEFAULT 'rose-emerald';");
    }
  }
} catch (err) {
  console.error("Auto-migration check notice:", err);
}

export const db = drizzle(sqlite, { schema });
