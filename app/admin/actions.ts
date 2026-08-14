"use server";

import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq, desc, asc } from "drizzle-orm";
import { revalidatePath } from "next/cache";

async function requireAuth() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || !session.user) {
    throw new Error("Unauthorized. Please log in to access admin functions.");
  }
  return session;
}

// ==========================================
// BRANDING ACTIONS
// ==========================================

export async function getBranding() {
  const result = await db.select().from(schema.branding).limit(1);
  if (result.length === 0) {
    const [inserted] = await db
      .insert(schema.branding)
      .values({
        siteName: "Mountain Multimedia Service",
        tagline: "A Complete Design & Printing Solution",
        logoUrl: "",
        faviconUrl: "",
        heroImageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80",
        gradientPreset: "rose-emerald",
        primaryColor: "#0f172a",
        secondaryColor: "#0284c7",
        accentColor: "#e11d48",
        contactEmail: "mdigitalpress1@gmail.com",
        contactPhone: "9841693181, 9861550233, 9849425342",
        address: "Dugure, Malpot Road, Bhaktapur, Nepal",
        openingHours: "Open Daily: 8:00 AM – 7:00 PM",
      })
      .returning();
    return inserted;
  }
  return result[0];
}

export async function updateBranding(data: {
  siteName: string;
  tagline: string;
  logoUrl?: string;
  faviconUrl?: string;
  heroImageUrl?: string;
  gradientPreset?: string;
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  contactEmail: string;
  contactPhone: string;
  address: string;
  openingHours?: string;
}) {
  await requireAuth();

  const current = await getBranding();
  await db
    .update(schema.branding)
    .set({
      ...data,
      logoUrl: data.logoUrl || "",
      faviconUrl: data.faviconUrl || "",
      heroImageUrl: data.heroImageUrl || "",
      gradientPreset: data.gradientPreset || "rose-emerald",
      openingHours: data.openingHours || "Open Daily: 8:00 AM – 7:00 PM",
      updatedAt: new Date(),
    })
    .where(eq(schema.branding.id, current.id));

  revalidatePath("/", "layout");
  return { success: true };
}

// ==========================================
// FULL DYNAMIC CATALOG ACTIONS (Category > Subcategory > Product)
// ==========================================

export async function getFullCatalog() {
  const cats = await db.select().from(schema.categories).orderBy(asc(schema.categories.displayOrder));
  const subs = await db.select().from(schema.subcategories).orderBy(asc(schema.subcategories.displayOrder));
  const prods = await db.select().from(schema.products).orderBy(asc(schema.products.displayOrder));

  return cats.map((cat) => {
    const catSubs = subs
      .filter((s) => s.categoryId === cat.id)
      .map((sub) => {
        const subProds = prods.filter((p) => p.subcategoryId === sub.id);
        return {
          ...sub,
          products: subProds,
        };
      });
    return {
      ...cat,
      subcategories: catSubs,
    };
  });
}

// Category CRUD
export async function createCategory(data: {
  name: string;
  slug?: string;
  description?: string;
  iconName?: string;
  imageUrl?: string;
  displayOrder?: number;
  isActive?: boolean;
}) {
  await requireAuth();

  const slug = data.slug || data.name.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-");
  const [created] = await db
    .insert(schema.categories)
    .values({
      name: data.name,
      slug,
      description: data.description || "",
      iconName: data.iconName || "Printer",
      imageUrl: data.imageUrl || "",
      displayOrder: data.displayOrder ?? 0,
      isActive: data.isActive ?? true,
    })
    .returning();

  revalidatePath("/", "layout");
  return created;
}

export async function updateCategory(
  id: number,
  data: {
    name: string;
    slug: string;
    description?: string;
    iconName?: string;
    imageUrl?: string;
    displayOrder?: number;
    isActive?: boolean;
  }
) {
  await requireAuth();

  await db
    .update(schema.categories)
    .set({
      name: data.name,
      slug: data.slug,
      description: data.description || "",
      iconName: data.iconName || "Printer",
      imageUrl: data.imageUrl || "",
      displayOrder: data.displayOrder ?? 0,
      isActive: data.isActive ?? true,
    })
    .where(eq(schema.categories.id, id));

  revalidatePath("/", "layout");
  return { success: true };
}

export async function deleteCategory(id: number) {
  await requireAuth();

  await db.delete(schema.categories).where(eq(schema.categories.id, id));
  revalidatePath("/", "layout");
  return { success: true };
}

// Subcategory CRUD
export async function createSubcategory(data: {
  categoryId: number;
  name: string;
  slug?: string;
  description?: string;
  imageUrl?: string;
  hasCustomSizesNote?: boolean;
  displayOrder?: number;
  isActive?: boolean;
}) {
  await requireAuth();

  const slug = data.slug || data.name.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-");
  const [created] = await db
    .insert(schema.subcategories)
    .values({
      categoryId: data.categoryId,
      name: data.name,
      slug,
      description: data.description || "",
      imageUrl: data.imageUrl || "",
      hasCustomSizesNote: data.hasCustomSizesNote ?? false,
      displayOrder: data.displayOrder ?? 0,
      isActive: data.isActive ?? true,
    })
    .returning();

  revalidatePath("/", "layout");
  return created;
}

export async function updateSubcategory(
  id: number,
  data: {
    name: string;
    slug: string;
    description?: string;
    imageUrl?: string;
    hasCustomSizesNote?: boolean;
    displayOrder?: number;
    isActive?: boolean;
  }
) {
  await requireAuth();

  await db
    .update(schema.subcategories)
    .set({
      name: data.name,
      slug: data.slug,
      description: data.description || "",
      imageUrl: data.imageUrl || "",
      hasCustomSizesNote: data.hasCustomSizesNote ?? false,
      displayOrder: data.displayOrder ?? 0,
      isActive: data.isActive ?? true,
    })
    .where(eq(schema.subcategories.id, id));

  revalidatePath("/", "layout");
  return { success: true };
}

export async function deleteSubcategory(id: number) {
  await requireAuth();

  await db.delete(schema.subcategories).where(eq(schema.subcategories.id, id));
  revalidatePath("/", "layout");
  return { success: true };
}

// Product CRUD
export async function createProduct(data: {
  subcategoryId: number;
  name: string;
  slug?: string;
  description?: string;
  paperSpec?: string;
  price?: string;
  imageUrl?: string;
  hasCustomSizesNote?: boolean;
  displayOrder?: number;
  isActive?: boolean;
}) {
  await requireAuth();

  const slug = data.slug || data.name.toLowerCase().trim().replace(/[^\w\s-]/g, "").replace(/[\s_-]+/g, "-");
  const [created] = await db
    .insert(schema.products)
    .values({
      subcategoryId: data.subcategoryId,
      name: data.name,
      slug,
      description: data.description || "",
      paperSpec: data.paperSpec || "",
      price: data.price || "",
      imageUrl: data.imageUrl || "",
      hasCustomSizesNote: data.hasCustomSizesNote ?? false,
      displayOrder: data.displayOrder ?? 0,
      isActive: data.isActive ?? true,
    })
    .returning();

  revalidatePath("/", "layout");
  return created;
}

export async function updateProduct(
  id: number,
  data: {
    name: string;
    slug: string;
    description?: string;
    paperSpec?: string;
    price?: string;
    imageUrl?: string;
    hasCustomSizesNote?: boolean;
    displayOrder?: number;
    isActive?: boolean;
  }
) {
  await requireAuth();

  await db
    .update(schema.products)
    .set({
      name: data.name,
      slug: data.slug,
      description: data.description || "",
      paperSpec: data.paperSpec || "",
      price: data.price || "",
      imageUrl: data.imageUrl || "",
      hasCustomSizesNote: data.hasCustomSizesNote ?? false,
      displayOrder: data.displayOrder ?? 0,
      isActive: data.isActive ?? true,
    })
    .where(eq(schema.products.id, id));

  revalidatePath("/", "layout");
  return { success: true };
}

export async function deleteProduct(id: number) {
  await requireAuth();

  await db.delete(schema.products).where(eq(schema.products.id, id));
  revalidatePath("/", "layout");
  return { success: true };
}

// ==========================================
// LEGACY SERVICES ACTIONS (Retained for compatibility)
// ==========================================

export async function getServices() {
  return await db
    .select()
    .from(schema.services)
    .orderBy(schema.services.displayOrder);
}

export async function createService(data: {
  title: string;
  slug: string;
  description: string;
  price: string;
  icon: string;
  features: string[];
  displayOrder?: number;
  isActive?: boolean;
}) {
  await requireAuth();

  await db.insert(schema.services).values({
    title: data.title,
    slug: data.slug || data.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    description: data.description,
    price: data.price,
    icon: data.icon || "Camera",
    features: JSON.stringify(data.features || []),
    displayOrder: data.displayOrder ?? 0,
    isActive: data.isActive ?? true,
  });

  revalidatePath("/", "layout");
  return { success: true };
}

export async function updateService(
  id: number,
  data: {
    title: string;
    slug: string;
    description: string;
    price: string;
    icon: string;
    features: string[];
    displayOrder?: number;
    isActive?: boolean;
  }
) {
  await requireAuth();

  await db
    .update(schema.services)
    .set({
      title: data.title,
      slug: data.slug,
      description: data.description,
      price: data.price,
      icon: data.icon,
      features: JSON.stringify(data.features),
      displayOrder: data.displayOrder ?? 0,
      isActive: data.isActive ?? true,
    })
    .where(eq(schema.services.id, id));

  revalidatePath("/", "layout");
  return { success: true };
}

export async function deleteService(id: number) {
  await requireAuth();

  await db.delete(schema.services).where(eq(schema.services.id, id));
  revalidatePath("/", "layout");
  return { success: true };
}

// ==========================================
// GALLERY ACTIONS
// ==========================================

export async function getGallery() {
  return await db
    .select()
    .from(schema.gallery)
    .orderBy(schema.gallery.displayOrder);
}

export async function createGalleryItem(data: {
  title: string;
  category: string;
  imageUrl: string;
  videoUrl?: string;
  description?: string;
  displayOrder?: number;
}) {
  await requireAuth();

  await db.insert(schema.gallery).values({
    title: data.title,
    category: data.category,
    imageUrl: data.imageUrl,
    videoUrl: data.videoUrl || "",
    description: data.description || "",
    displayOrder: data.displayOrder ?? 0,
  });

  revalidatePath("/", "layout");
  return { success: true };
}

export async function updateGalleryItem(
  id: number,
  data: {
    title: string;
    category: string;
    imageUrl: string;
    videoUrl?: string;
    description?: string;
    displayOrder?: number;
  }
) {
  await requireAuth();

  await db
    .update(schema.gallery)
    .set({
      title: data.title,
      category: data.category,
      imageUrl: data.imageUrl,
      videoUrl: data.videoUrl || "",
      description: data.description || "",
      displayOrder: data.displayOrder ?? 0,
    })
    .where(eq(schema.gallery.id, id));

  revalidatePath("/", "layout");
  return { success: true };
}

export async function deleteGalleryItem(id: number) {
  await requireAuth();

  await db.delete(schema.gallery).where(eq(schema.gallery.id, id));
  revalidatePath("/", "layout");
  return { success: true };
}

// ==========================================
// TESTIMONIALS ACTIONS
// ==========================================

export async function getTestimonials() {
  return await db
    .select()
    .from(schema.testimonials)
    .orderBy(schema.testimonials.displayOrder);
}

export async function createTestimonial(data: {
  clientName: string;
  clientRole: string;
  clientCompany?: string;
  avatarUrl?: string;
  content: string;
  rating?: number;
  displayOrder?: number;
}) {
  await requireAuth();

  await db.insert(schema.testimonials).values({
    clientName: data.clientName,
    clientRole: data.clientRole,
    clientCompany: data.clientCompany || "",
    avatarUrl: data.avatarUrl || "",
    content: data.content,
    rating: data.rating ?? 5,
    displayOrder: data.displayOrder ?? 0,
  });

  revalidatePath("/", "layout");
  return { success: true };
}

export async function updateTestimonial(
  id: number,
  data: {
    clientName: string;
    clientRole: string;
    clientCompany?: string;
    avatarUrl?: string;
    content: string;
    rating?: number;
    displayOrder?: number;
  }
) {
  await requireAuth();

  await db
    .update(schema.testimonials)
    .set({
      clientName: data.clientName,
      clientRole: data.clientRole,
      clientCompany: data.clientCompany || "",
      avatarUrl: data.avatarUrl || "",
      content: data.content,
      rating: data.rating ?? 5,
      displayOrder: data.displayOrder ?? 0,
    })
    .where(eq(schema.testimonials.id, id));

  revalidatePath("/", "layout");
  return { success: true };
}

export async function deleteTestimonial(id: number) {
  await requireAuth();

  await db.delete(schema.testimonials).where(eq(schema.testimonials.id, id));
  revalidatePath("/", "layout");
  return { success: true };
}

// ==========================================
// PAGE SECTIONS ACTIONS
// ==========================================

export async function getPageSections() {
  const result = await db
    .select()
    .from(schema.pageSections)
    .orderBy(schema.pageSections.displayOrder);

  if (result.length === 0) {
    const defaultSections = [
      {
        sectionKey: "hero",
        title: "Bhaktapur's Premier Design & High Definition Printing Press",
        subtitle: "A Complete Design & Printing Solution in Dugure, Malpot Road",
        content: "From studio photo prints, customized frames, Star Flex signboards, and NCR bill pads to sub-second passport photos. Complete indoor & outdoor media production with fast same-day delivery.",
        imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80",
        isVisible: true,
        displayOrder: 1,
      },
      {
        sectionKey: "about",
        title: "Crafting High-Precision Printing Solutions in Bhaktapur",
        subtitle: "Your local trusted press for quality print, photo studio & outdoor advertising",
        content: "Mountain Multimedia Service is a full-service printing press & digital photo studio located in Dugure, Malpot Road, Bhaktapur. We bring decades of expertise in commercial offset printing, high-speed digital document copies, wedding photo framing, and corporate promotional branding.",
        imageUrl: "https://images.unsplash.com/photo-1562564077-715947276f95?auto=format&fit=crop&w=800&q=80",
        isVisible: true,
        displayOrder: 2,
      },
      {
        sectionKey: "services_header",
        title: "Explore Our Full Printing Services & Studio Catalog",
        subtitle: "9 Specialized Categories, 35+ Subcategories & 120+ Products",
        content: "Browse our complete catalog below to inspect materials, paper GSM specs, sizes, and turnaround times. Select any product to order directly via WhatsApp or phone inquiry.",
        imageUrl: "",
        isVisible: true,
        displayOrder: 3,
      },
      {
        sectionKey: "contact_header",
        title: "Get In Touch or Order Direct via WhatsApp",
        subtitle: "Visit our shop in Dugure, Malpot Road, Bhaktapur or call us directly.",
        content: "We are open Daily from 8:00 AM – 7:00 PM. Call 9841693181 / 9861550233 / 9849425342 or send a message below for instant estimates.",
        imageUrl: "",
        isVisible: true,
        displayOrder: 4,
      },
    ];

    await db.insert(schema.pageSections).values(defaultSections);
    return await db.select().from(schema.pageSections).orderBy(schema.pageSections.displayOrder);
  }

  return result;
}

export async function createPageSection(data: {
  sectionKey: string;
  title: string;
  subtitle?: string;
  content?: string;
  imageUrl?: string;
  isVisible?: boolean;
}) {
  await requireAuth();

  const [created] = await db
    .insert(schema.pageSections)
    .values({
      sectionKey: data.sectionKey.toLowerCase().replace(/[^a-z0-9_-]+/g, "-"),
      title: data.title,
      subtitle: data.subtitle || "",
      content: data.content || "",
      imageUrl: data.imageUrl || "",
      isVisible: data.isVisible ?? true,
      displayOrder: Date.now(),
    })
    .returning();

  revalidatePath("/", "layout");
  return created;
}

export async function updatePageSection(
  id: number,
  data: {
    title: string;
    subtitle?: string;
    content?: string;
    imageUrl?: string;
    isVisible?: boolean;
  }
) {
  await requireAuth();

  await db
    .update(schema.pageSections)
    .set({
      title: data.title,
      subtitle: data.subtitle || "",
      content: data.content || "",
      imageUrl: data.imageUrl || "",
      isVisible: data.isVisible ?? true,
    })
    .where(eq(schema.pageSections.id, id));

  revalidatePath("/", "layout");
  return { success: true };
}

export async function deletePageSection(id: number) {
  await requireAuth();

  await db.delete(schema.pageSections).where(eq(schema.pageSections.id, id));
  revalidatePath("/", "layout");
  return { success: true };
}

// ==========================================
// CONTACT MESSAGES ACTIONS
// ==========================================

export async function submitContactForm(data: {
  name: string;
  phone?: string;
  email?: string;
  message: string;
}) {
  if (!data.name || !data.message) {
    throw new Error("Name and message are required.");
  }

  await db.insert(schema.contactMessages).values({
    name: data.name,
    phone: data.phone || "",
    email: data.email || "",
    message: data.message,
    status: "unread",
    createdAt: new Date(),
  });

  revalidatePath("/admin");
  return { success: true };
}

export async function getContactMessages() {
  await requireAuth();

  return await db
    .select()
    .from(schema.contactMessages)
    .orderBy(desc(schema.contactMessages.createdAt));
}

export async function updateMessageStatus(id: number, status: "unread" | "read" | "replied") {
  await requireAuth();

  await db
    .update(schema.contactMessages)
    .set({ status })
    .where(eq(schema.contactMessages.id, id));

  revalidatePath("/admin");
  return { success: true };
}

export async function deleteContactMessage(id: number) {
  await requireAuth();

  await db.delete(schema.contactMessages).where(eq(schema.contactMessages.id, id));

  revalidatePath("/admin");
  return { success: true };
}

// ==========================================
// SITE SETTINGS ACTIONS
// ==========================================

export async function getSiteSettings() {
  return await db.select().from(schema.siteSettings);
}

export async function updateSiteSetting(key: string, value: string) {
  await requireAuth();

  const existing = await db
    .select()
    .from(schema.siteSettings)
    .where(eq(schema.siteSettings.key, key));

  if (existing.length > 0) {
    await db
      .update(schema.siteSettings)
      .set({ value, updatedAt: new Date() })
      .where(eq(schema.siteSettings.key, key));
  } else {
    await db.insert(schema.siteSettings).values({
      key,
      value,
      updatedAt: new Date(),
    });
  }

  revalidatePath("/", "layout");
  return { success: true };
}
