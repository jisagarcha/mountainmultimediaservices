import { db } from "./index";
import * as schema from "./schema";
import { asc, eq } from "drizzle-orm";
import { ServiceCategory, ServiceSubcategory, ServiceProduct } from "../servicesData";

export async function getDbCatalog(): Promise<ServiceCategory[]> {
  try {
    const cats = await db
      .select()
      .from(schema.categories)
      .where(eq(schema.categories.isActive, true))
      .orderBy(asc(schema.categories.displayOrder));

    const subs = await db
      .select()
      .from(schema.subcategories)
      .where(eq(schema.subcategories.isActive, true))
      .orderBy(asc(schema.subcategories.displayOrder));

    const prods = await db
      .select()
      .from(schema.products)
      .where(eq(schema.products.isActive, true))
      .orderBy(asc(schema.products.displayOrder));

    return cats.map((cat) => {
      const catSubs = subs
        .filter((s) => s.categoryId === cat.id)
        .map((sub) => {
          const subProds = prods.filter((p) => p.subcategoryId === sub.id);
          return {
            id: sub.id,
            name: sub.name,
            slug: sub.slug,
            description: sub.description || "",
            imageUrl: sub.imageUrl || "",
            hasCustomSizesNote: Boolean(sub.hasCustomSizesNote),
            products: subProds.map((p) => ({
              id: p.id,
              name: p.name,
              slug: p.slug,
              description: p.description || "",
              paperSpec: p.paperSpec || "",
              price: p.price || "",
              imageUrl: p.imageUrl || "",
              hasCustomSizesNote: Boolean(p.hasCustomSizesNote),
            })),
          };
        });

      return {
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        description: cat.description || "",
        iconName: cat.iconName || "Printer",
        imageUrl: cat.imageUrl || "",
        subcategories: catSubs,
      };
    });
  } catch (e) {
    console.error("Error loading DB catalog:", e);
    return [];
  }
}

export async function getCategoryBySlugFromDb(slug: string): Promise<ServiceCategory | undefined> {
  const catalog = await getDbCatalog();
  return catalog.find((cat) => cat.slug === slug);
}

export async function getSubcategoryBySlugFromDb(
  subSlug: string
): Promise<{ subcategory: ServiceSubcategory; category: ServiceCategory } | undefined> {
  const catalog = await getDbCatalog();
  for (const cat of catalog) {
    const sub = cat.subcategories.find((s) => s.slug === subSlug);
    if (sub) {
      return { subcategory: sub, category: cat };
    }
  }
  return undefined;
}

export async function getProductBySlugFromDb(
  productSlug: string
): Promise<{ product: ServiceProduct; subcategory: ServiceSubcategory; category: ServiceCategory } | undefined> {
  const catalog = await getDbCatalog();
  for (const cat of catalog) {
    for (const sub of cat.subcategories) {
      const prod = sub.products.find((p) => p.slug === productSlug);
      if (prod) {
        return { product: prod, subcategory: sub, category: cat };
      }
    }
  }
  return undefined;
}
