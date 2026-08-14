"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var migrate_exports = {};
__export(migrate_exports, {
  initDb: () => initDb
});
module.exports = __toCommonJS(migrate_exports);
var import_better_sqlite3 = __toESM(require("better-sqlite3"));
var import_path = __toESM(require("path"));
var import_fs = __toESM(require("fs"));
try {
  if (typeof process.loadEnvFile === "function") {
    process.loadEnvFile();
  }
} catch (e) {
}
function initDb(customPath) {
  const dbPath = customPath || process.env.DATABASE_PATH || "./data/app.db";
  const dir = import_path.default.dirname(import_path.default.resolve(dbPath));
  if (!import_fs.default.existsSync(dir)) {
    import_fs.default.mkdirSync(dir, { recursive: true });
  }
  const sqlite = new import_better_sqlite3.default(dbPath);
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
      site_name TEXT NOT NULL DEFAULT 'Mountain Multimedia',
      tagline TEXT NOT NULL DEFAULT 'Capturing Heights. Elevating Stories.',
      logo_url TEXT,
      primary_color TEXT NOT NULL DEFAULT '#0f172a',
      secondary_color TEXT NOT NULL DEFAULT '#0284c7',
      accent_color TEXT NOT NULL DEFAULT '#f59e0b',
      contact_email TEXT NOT NULL DEFAULT 'contact@mountainmultimedia.com',
      contact_phone TEXT NOT NULL DEFAULT '+1 (555) 839-2041',
      address TEXT NOT NULL DEFAULT 'Aspen & Rocky Mountain Region, CO',
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
  `);
  console.log("\u2705 SQLite Database schema initialized at:", dbPath);
  sqlite.close();
}
initDb();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  initDb
});
