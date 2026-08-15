import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { getDbCatalog } from "@/lib/db/queries";
import ClientLandingPage from "@/components/ClientLandingPage";

import { Metadata } from "next";

export const revalidate = 0; // Dynamic server rendering with SQLite

export const metadata: Metadata = {
  title: "Mountain Multimedia",
  description: "10-minute passport photos, 300 GSM business cards, PVC plastic ID cards, 3D LED glow signboards & commercial printing press in Dugure, Malpot Road, Bhaktapur.",
};

export default async function Page() {
  const catalog = await getDbCatalog();

  // 1. Fetch Branding
  const brandingList = await db.select().from(schema.branding).limit(1);
  const branding = brandingList[0] || {
    siteName: "Mountain Multimedia Service",
    tagline: "A Complete Design & Printing Solution",
    primaryColor: "#0f172a",
    secondaryColor: "#0284c7",
    accentColor: "#84cc16",
    contactEmail: "mdigitalpress1@gmail.com",
    contactPhone: "9841693181, 9861550233, 9849425342",
    address: "Dugure, Malpot Road, Bhaktapur, Nepal",
  };

  // 2. Fetch Active Services
  const services = await db
    .select()
    .from(schema.services)
    .orderBy(schema.services.displayOrder);

  // 3. Fetch Gallery Items
  const gallery = await db
    .select()
    .from(schema.gallery)
    .orderBy(schema.gallery.displayOrder);

  // 4. Fetch Testimonials
  const testimonials = await db
    .select()
    .from(schema.testimonials)
    .orderBy(schema.testimonials.displayOrder);

  // 5. Fetch Page Sections
  const pageSections = await db
    .select()
    .from(schema.pageSections)
    .orderBy(schema.pageSections.displayOrder);

  return (
    <ClientLandingPage
      branding={branding}
      catalog={catalog}
      services={services}
      gallery={gallery}
      testimonials={testimonials}
      pageSections={pageSections}
    />
  );
}

