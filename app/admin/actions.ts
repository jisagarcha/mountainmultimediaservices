"use server";

import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { eq, desc } from "drizzle-orm";
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
        primaryColor: "#0f172a",
        secondaryColor: "#0284c7",
        accentColor: "#84cc16",
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
      openingHours: data.openingHours || "Open Daily: 8:00 AM – 7:00 PM",
      updatedAt: new Date(),
    })
    .where(eq(schema.branding.id, current.id));

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

// ==========================================
// SERVICES ACTIONS
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

  revalidatePath("/");
  revalidatePath("/admin");
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

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteService(id: number) {
  await requireAuth();

  await db.delete(schema.services).where(eq(schema.services.id, id));

  revalidatePath("/");
  revalidatePath("/admin");
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

  revalidatePath("/");
  revalidatePath("/admin");
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

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteGalleryItem(id: number) {
  await requireAuth();

  await db.delete(schema.gallery).where(eq(schema.gallery.id, id));

  revalidatePath("/");
  revalidatePath("/admin");
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

  revalidatePath("/");
  revalidatePath("/admin");
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

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteTestimonial(id: number) {
  await requireAuth();

  await db.delete(schema.testimonials).where(eq(schema.testimonials.id, id));

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}

// ==========================================
// PAGE SECTIONS ACTIONS
// ==========================================

export async function getPageSections() {
  return await db
    .select()
    .from(schema.pageSections)
    .orderBy(schema.pageSections.displayOrder);
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

  revalidatePath("/");
  revalidatePath("/admin");
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

  revalidatePath("/");
  revalidatePath("/admin");
  return { success: true };
}
