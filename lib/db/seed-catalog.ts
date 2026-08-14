// lib/db/seed-catalog.ts
// Run: npx tsx lib/db/seed-catalog.ts
import { SERVICES_CATALOG } from "../servicesData";
import Database from "better-sqlite3";

const DB_PATH = process.env.DB_PATH || "./data/app.db";
const sqlite = new Database(DB_PATH);

console.log("🔧 Seeding database at:", DB_PATH);

// Clear existing data
sqlite.exec("DELETE FROM products;");
sqlite.exec("DELETE FROM subcategories;");
sqlite.exec("DELETE FROM categories;");

const insertCat = sqlite.prepare(
  "INSERT INTO categories (id, name, slug, description, icon_name, image_url, display_order, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, 1)"
);
const insertSub = sqlite.prepare(
  "INSERT INTO subcategories (id, category_id, name, slug, description, image_url, has_custom_sizes_note, display_order, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)"
);
const insertProd = sqlite.prepare(
  "INSERT INTO products (id, subcategory_id, name, slug, description, paper_spec, price, image_url, has_custom_sizes_note, display_order, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)"
);

// Also seed branding if not exists
sqlite.exec(`INSERT OR IGNORE INTO branding (id, site_name, tagline, gradient_preset, primary_color, secondary_color, accent_color, contact_email, contact_phone, address, opening_hours, updated_at) VALUES (1, 'Mountain Multimedia Service', 'A Complete Design & Printing Solution', 'rose-emerald', '#0f172a', '#0284c7', '#84cc16', 'mdigitalpress1@gmail.com', '9841693181, 9861550233, 9849425342', 'Dugure, Malpot Road, Bhaktapur, Nepal', 'Open Daily: 8:00 AM – 7:00 PM', 0)`);

let catId = 0;
let subId = 0;
let prodId = 0;

const seedAll = sqlite.transaction(() => {
  for (const cat of SERVICES_CATALOG) {
    catId++;
    insertCat.run(catId, cat.name, cat.slug, cat.description, cat.iconName, cat.imageUrl, catId);

    for (const sub of cat.subcategories) {
      subId++;
      insertSub.run(subId, catId, sub.name, sub.slug, sub.description || "", sub.imageUrl || "", sub.hasCustomSizesNote ? 1 : 0, subId);

      for (const prod of sub.products) {
        prodId++;
        insertProd.run(prodId, subId, prod.name, prod.slug, prod.description, prod.paperSpec || "", prod.price || "", prod.imageUrl || "", prod.hasCustomSizesNote ? 1 : 0, prodId);
      }
    }
  }
});

seedAll();

console.log(`✅ Seeded: ${catId} categories, ${subId} subcategories, ${prodId} products`);
sqlite.close();
