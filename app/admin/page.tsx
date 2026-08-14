import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  getBranding,
  getFullCatalog,
  getServices,
  getGallery,
  getTestimonials,
  getPageSections,
  getContactMessages,
  getSiteSettings,
} from "./actions";
import AdminDashboard from "@/app/admin/_components/AdminDashboard";

export default async function AdminPage() {
  const reqHeaders = await headers();
  const session = await auth.api.getSession({
    headers: reqHeaders,
  });

  if (!session || !session.user) {
    redirect("/admin/login");
  }

  const [
    brandingData,
    catalogData,
    servicesData,
    galleryData,
    testimonialsData,
    pageSectionsData,
    messagesData,
    settingsData,
  ] = await Promise.all([
    getBranding(),
    getFullCatalog(),
    getServices(),
    getGallery(),
    getTestimonials(),
    getPageSections(),
    getContactMessages(),
    getSiteSettings(),
  ]);

  return (
    <AdminDashboard
      initialBranding={brandingData}
      initialCatalog={catalogData}
      initialServices={servicesData}
      initialGallery={galleryData}
      initialTestimonials={testimonialsData}
      initialPageSections={pageSectionsData}
      initialMessages={messagesData}
      initialSettings={settingsData}
    />
  );
}

