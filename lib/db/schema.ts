import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// ==========================================
// BETTER AUTH TABLES (SQLite Adapter Schema)
// ==========================================

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: integer("email_verified", { mode: "boolean" }).notNull().default(false),
  image: text("image"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(new Date()),
});

export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(new Date()),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
});

export const accounts = sqliteTable("accounts", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", { mode: "timestamp" }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", { mode: "timestamp" }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(new Date()),
});

export const verifications = sqliteTable("verifications", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" }),
  updatedAt: integer("updated_at", { mode: "timestamp" }),
});

// ==========================================
// APPLICATION SCHEMA
// ==========================================

export const branding = sqliteTable("branding", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  siteName: text("site_name").notNull().default("Mountain Multimedia Service"),
  tagline: text("tagline").notNull().default("A Complete Design & Printing Solution"),
  logoUrl: text("logo_url"),
  primaryColor: text("primary_color").notNull().default("#0f172a"),
  secondaryColor: text("secondary_color").notNull().default("#0284c7"),
  accentColor: text("accent_color").notNull().default("#84cc16"),
  contactEmail: text("contact_email").notNull().default("mdigitalpress1@gmail.com"),
  contactPhone: text("contact_phone").notNull().default("9841693181, 9861550233, 9849425342"),
  address: text("address").notNull().default("Dugure, Malpot Road, Bhaktapur, Nepal"),
  openingHours: text("opening_hours").notNull().default("Open Daily: 8:00 AM – 7:00 PM"),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(new Date()),
});

export const services = sqliteTable("services", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  slug: text("slug").notNull().unique(),
  description: text("description").notNull(),
  price: text("price").notNull(),
  icon: text("icon").notNull().default("Camera"),
  features: text("features").notNull().default("[]"), // JSON string array
  displayOrder: integer("display_order").notNull().default(0),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
});

export const gallery = sqliteTable("gallery", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  category: text("category").notNull(), // 'Photography', 'Printing', 'T-Shirt & Mug', 'ID Cards', 'Wedding Cards'
  imageUrl: text("image_url").notNull(),
  videoUrl: text("video_url"),
  description: text("description"),
  displayOrder: integer("display_order").notNull().default(0),
});

export const testimonials = sqliteTable("testimonials", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  clientName: text("client_name").notNull(),
  clientRole: text("client_role").notNull(),
  clientCompany: text("client_company"),
  avatarUrl: text("avatar_url"),
  content: text("content").notNull(),
  rating: integer("rating").notNull().default(5),
  displayOrder: integer("display_order").notNull().default(0),
});

export const pageSections = sqliteTable("page_sections", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  sectionKey: text("section_key").notNull().unique(), // 'hero', 'about', 'services_header', 'contact_header'
  title: text("title").notNull(),
  subtitle: text("subtitle"),
  content: text("content"),
  imageUrl: text("image_url"),
  isVisible: integer("is_visible", { mode: "boolean" }).notNull().default(true),
  displayOrder: integer("display_order").notNull().default(0),
});

export const contactMessages = sqliteTable("contact_messages", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  phone: text("phone"),
  email: text("email"),
  message: text("message").notNull(),
  status: text("status").notNull().default("unread"), // 'unread' | 'read' | 'replied'
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().default(new Date()),
});

export const siteSettings = sqliteTable("site_settings", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  key: text("key").notNull().unique(),
  value: text("value").notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" }).notNull().default(new Date()),
});
