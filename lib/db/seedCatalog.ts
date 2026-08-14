import { db } from "./index";
import * as schema from "./schema";
import { SERVICES_CATALOG } from "../servicesData";
import Database from "better-sqlite3";
import path from "path";

export async function seedCatalog() {
  const dbPath = process.env.DATABASE_PATH || "./data/app.db";
  const sqlite = new Database(dbPath);

  // Ensure tables exist in SQLite
  sqlite.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      description TEXT,
      icon_name TEXT NOT NULL DEFAULT 'Printer',
      image_url TEXT,
      display_order INTEGER NOT NULL DEFAULT 0,
      is_active INTEGER NOT NULL DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS subcategories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category_id INTEGER NOT NULL REFERENCES categories(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      description TEXT,
      image_url TEXT,
      has_custom_sizes_note INTEGER NOT NULL DEFAULT 0,
      display_order INTEGER NOT NULL DEFAULT 0,
      is_active INTEGER NOT NULL DEFAULT 1
    );

    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      subcategory_id INTEGER NOT NULL REFERENCES subcategories(id) ON DELETE CASCADE,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      description TEXT,
      paper_spec TEXT,
      price TEXT,
      image_url TEXT,
      has_custom_sizes_note INTEGER NOT NULL DEFAULT 0,
      display_order INTEGER NOT NULL DEFAULT 0,
      is_active INTEGER NOT NULL DEFAULT 1
    );
  `);

  console.log("🌱 Migration: Ensured categories, subcategories, products tables exist.");

  // Check if categories and subcategories already seeded
  const existingCats = await db.select().from(schema.categories);
  const existingSubs = await db.select().from(schema.subcategories);
  if (existingCats.length > 0 && existingSubs.length > 0) {
    console.log("ℹ️ Catalog already populated in database (Categories:", existingCats.length, "| Subcategories:", existingSubs.length, ")");
    return;
  }

  console.log("📦 Seeding 9 categories, subcategories, and 120+ products into SQLite...");

  let catOrder = 0;
  for (const cat of SERVICES_CATALOG) {
    catOrder++;
    const [insertedCat] = await db
      .insert(schema.categories)
      .values({
        name: cat.name,
        slug: cat.slug,
        description: cat.description,
        iconName: cat.iconName || "Printer",
        imageUrl: cat.imageUrl || "",
        displayOrder: catOrder,
        isActive: true,
      })
      .returning();

    let subOrder = 0;
    for (const sub of cat.subcategories) {
      subOrder++;
      const [insertedSub] = await db
        .insert(schema.subcategories)
        .values({
          categoryId: insertedCat.id,
          name: sub.name,
          slug: sub.slug,
          description: sub.description || "",
          imageUrl: sub.imageUrl || "",
          hasCustomSizesNote: sub.hasCustomSizesNote || false,
          displayOrder: subOrder,
          isActive: true,
        })
        .returning();

      let prodOrder = 0;
      for (const prod of sub.products) {
        prodOrder++;
        await db.insert(schema.products).values({
          subcategoryId: insertedSub.id,
          name: prod.name,
          slug: prod.slug,
          description: prod.description || "",
          paperSpec: prod.paperSpec || "",
          price: "",
          imageUrl: "",
          hasCustomSizesNote: prod.hasCustomSizesNote || false,
          displayOrder: prodOrder,
          isActive: true,
        });
      }
    }
  }

  console.log("✅ Successfully seeded full Service Catalog into SQLite database!");
}

// Run if executed directly
if (require.main === module) {
  seedCatalog().catch((err) => {
    console.error("❌ Catalog seed failed:", err);
    process.exit(1);
  });
}
