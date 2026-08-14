import Database from "better-sqlite3";
import path from "path";
import fs from "fs";

try {
  if (typeof process.loadEnvFile === "function") {
    process.loadEnvFile();
  }
} catch (e) {
  // Ignore if .env doesn't exist
}

export function initDb(customPath?: string) {
  const dbPath = customPath || process.env.DATABASE_PATH || "./data/app.db";
  const dir = path.dirname(path.resolve(/*turbopackIgnore: true*/ dbPath));

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const sqlite = new Database(dbPath);
  sqlite.pragma("journal_mode = WAL");

  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      email_verified INTEGER NOT NULL DEFAULT 0,
      image TEXT,
      created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
      updated_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now'))
    );

    CREATE TABLE IF NOT EXISTS sessions (
      id TEXT PRIMARY KEY,
      expires_at INTEGER NOT NULL,
      token TEXT NOT NULL UNIQUE,
      created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
      updated_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
      ip_address TEXT,
      user_agent TEXT,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS accounts (
      id TEXT PRIMARY KEY,
      account_id TEXT NOT NULL,
      provider_id TEXT NOT NULL,
      user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
      access_token TEXT,
      refresh_token TEXT,
      id_token TEXT,
      access_token_expires_at INTEGER,
      refresh_token_expires_at INTEGER,
      scope TEXT,
      password TEXT,
      created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now')),
      updated_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now'))
    );

    CREATE TABLE IF NOT EXISTS verifications (
      id TEXT PRIMARY KEY,
      identifier TEXT NOT NULL,
      value TEXT NOT NULL,
      expires_at INTEGER NOT NULL,
      created_at INTEGER,
      updated_at INTEGER
    );

    CREATE TABLE IF NOT EXISTS branding (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      site_name TEXT NOT NULL DEFAULT 'Mountain Multimedia Service',
      tagline TEXT NOT NULL DEFAULT 'A Complete Design & Printing Solution',
      logo_url TEXT,
      primary_color TEXT NOT NULL DEFAULT '#0f172a',
      secondary_color TEXT NOT NULL DEFAULT '#0284c7',
      accent_color TEXT NOT NULL DEFAULT '#84cc16',
      contact_email TEXT NOT NULL DEFAULT 'mdigitalpress1@gmail.com',
      contact_phone TEXT NOT NULL DEFAULT '9841693181, 9861550233, 9849425342',
      address TEXT NOT NULL DEFAULT 'Dugure, Malpot Road, Bhaktapur, Nepal',
      opening_hours TEXT NOT NULL DEFAULT 'Open Daily: 8:00 AM – 7:00 PM',
      updated_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now'))
    );

    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      description TEXT NOT NULL,
      price TEXT NOT NULL,
      icon TEXT NOT NULL DEFAULT 'Camera',
      features TEXT NOT NULL DEFAULT '[]',
      display_order INTEGER NOT NULL DEFAULT 0,
      is_active INTEGER NOT NULL DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS gallery (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      image_url TEXT NOT NULL,
      video_url TEXT,
      description TEXT,
      display_order INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS testimonials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      client_name TEXT NOT NULL,
      client_role TEXT NOT NULL,
      client_company TEXT,
      avatar_url TEXT,
      content TEXT NOT NULL,
      rating INTEGER NOT NULL DEFAULT 5,
      display_order INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS page_sections (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      section_key TEXT NOT NULL UNIQUE,
      title TEXT NOT NULL,
      subtitle TEXT,
      content TEXT,
      image_url TEXT,
      is_visible INTEGER NOT NULL DEFAULT 1,
      display_order INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS contact_messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      phone TEXT,
      email TEXT,
      message TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'unread',
      created_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now'))
    );

    CREATE TABLE IF NOT EXISTS site_settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      key TEXT NOT NULL UNIQUE,
      value TEXT NOT NULL,
      updated_at INTEGER NOT NULL DEFAULT (strftime('%s', 'now'))
    );
  `);

  try {
    sqlite.exec("ALTER TABLE branding ADD COLUMN opening_hours TEXT NOT NULL DEFAULT 'Open Daily: 8:00 AM – 7:00 PM';");
  } catch (e) {
    // Ignore if column already exists
  }

  console.log("✅ SQLite Database schema initialized at:", dbPath);
  sqlite.close();
}

initDb();
