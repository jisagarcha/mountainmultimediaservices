import { getProductBySlugFromDb } from "@/lib/db/queries";
import { notFound } from "next/navigation";
import SiteNavbar from "@/components/SiteNavbar";
import SiteFooter from "@/components/SiteFooter";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { ArrowRight, Phone, ShieldCheck, Printer } from "lucide-react";
import Link from "next/link";

import { Metadata } from "next";

export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const match = await getProductBySlugFromDb(slug);
  if (!match) return { title: "Product Not Found | Mountain Multimedia" };

  const { product, category } = match;
  return {
    title: `${product.name} - Fast Printing & Specs | Mountain Multimedia Bhaktapur`,
    description: `Order ${product.name} (${category.name}) with custom specifications & paper options at Mountain Multimedia Service in Dugure, Malpot Road, Bhaktapur. 1-click WhatsApp orders available.`,
  };
}

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const match = await getProductBySlugFromDb(slug);
  if (!match) {
    notFound();
  }

  const { product, subcategory, category } = match;

  const brandingList = await db.select().from(schema.branding).limit(1);
  const branding = brandingList[0] || {};

  const whatsAppText = encodeURIComponent(
    `Hello Mountain Press! I would like to order:\n• Product: ${product.name}\n• Category: ${category.name} > ${subcategory.name}\n• Spec: ${product.paperSpec || "Standard"}\nPlease confirm delivery time for Bhaktapur!`
  );

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "description": product.description || `Custom ${product.name} printing in Bhaktapur, Nepal.`,
    "image": product.imageUrl ? (product.imageUrl.startsWith("http") ? product.imageUrl : `https://sagarsandha.com.np${product.imageUrl}`) : "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80",
    "category": `${category.name} > ${subcategory.name}`,
    "brand": {
      "@type": "Brand",
      "name": "Mountain Multimedia Service"
    },
    "offers": {
      "@type": "Offer",
      "url": `https://sagarsandha.com.np/product/${product.slug}`,
      "priceCurrency": "NPR",
      "price": product.price || "0.00",
      "itemCondition": "https://schema.org/NewCondition",
      "availability": "https://schema.org/InStock",
      "seller": {
        "@type": "LocalBusiness",
        "name": "Mountain Multimedia Service",
        "telephone": "+977-9841693181",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Dugure, Malpot Road",
          "addressLocality": "Bhaktapur",
          "addressCountry": "NP"
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }}
      />
      <SiteNavbar branding={branding} />

      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-semibold text-slate-500 flex-wrap">
          <Link href="/" className="hover:text-slate-900">Home</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-slate-900">Services</Link>
          <span>/</span>
          <span className="text-slate-700">{category.name}</span>
          <span>/</span>
          <Link href={`/subcategory/${subcategory.slug}`} className="hover:text-slate-900">{subcategory.name}</Link>
          <span>/</span>
          <span className="text-rose-600 font-bold">{product.name}</span>
        </div>
      </div>

      {/* Main Detail Container */}
      <section className="max-w-7xl mx-auto px-6 py-16 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Specs */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-extrabold text-slate-600 uppercase tracking-widest bg-slate-100 border border-slate-200 px-3 py-1 rounded-full">
                  {category.name} &gt; {subcategory.name}
                </span>
                {product.hasCustomSizesNote && (
                  <span className="text-xs font-extrabold text-amber-800 bg-amber-100 border border-amber-300 px-3 py-1 rounded-full">
                    + Other custom sizes available upon request
                  </span>
                )}
              </div>

              <h1 className="text-3xl sm:text-5xl font-black text-slate-950">
                {product.name}
              </h1>

              <p className="text-base text-slate-600 font-medium leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Specifications Card (No Turnaround box) */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 space-y-6 shadow-md shadow-slate-200/50">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Printer className="w-5 h-5 text-rose-500" />
                <span>Product Specifications & Details</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-slate-500 block text-[11px] font-bold uppercase">Paper Stock & Material</span>
                  <span className="font-bold text-slate-900">{product.paperSpec || "Standard Commercial Stock"}</span>
                </div>

                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-slate-500 block text-[11px] font-bold uppercase">Press Calibration</span>
                  <span className="font-bold text-slate-900">Tok Offset CMYK High-Definition 2400 DPI</span>
                </div>
              </div>

              {product.hasCustomSizesNote && (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-900 font-medium">
                  <span className="font-bold block mb-0.5">Custom Size Variations Note:</span>
                  <span>This item supports custom size variations (e.g. custom dimensions, cuts, or fold options). Mention your required size when placing your order on WhatsApp!</span>
                </div>
              )}
            </div>
          </div>

          {/* Right Action Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 space-y-6 sticky top-24">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs text-slate-500 uppercase font-semibold">Service Ordering</span>
                <div className="text-xl font-black text-slate-950 mt-1">
                  Custom Quotation On Request
                </div>
              </div>

              <div className="space-y-3">
                <a
                  href={`https://wa.me/9779841693181?text=${whatsAppText}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-lg shadow-emerald-600/20 transition flex items-center justify-center gap-2"
                >
                  <span>Order Product on WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="tel:9841693181"
                  className="w-full py-3.5 px-6 rounded-2xl bg-slate-950 hover:bg-rose-600 text-white font-extrabold text-xs transition flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-rose-400" />
                  <span>Call 9841693181 Direct</span>
                </a>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2 text-[11px] text-slate-500 font-medium">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Quality & Print Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Printer className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>Printed in Dugure, Malpot Road, Bhaktapur</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Subcategory Related Products */}
        {subcategory.products.length > 1 && (
          <div className="pt-12 border-t border-slate-100 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900">
                More in {subcategory.name}
              </h3>
              <Link
                href={`/subcategory/${subcategory.slug}`}
                className="text-xs font-extrabold text-rose-600 hover:underline"
              >
                View All {subcategory.name} Products
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {subcategory.products
                .filter((p) => p.slug !== product.slug)
                .slice(0, 3)
                .map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/product/${rel.slug}`}
                    className="bg-white border border-slate-100 rounded-2xl p-5 hover:border-rose-200 shadow-sm transition group"
                  >
                    <h4 className="font-bold text-slate-900 text-sm group-hover:text-rose-600 transition">{rel.name}</h4>
                    <p className="text-xs text-slate-500 line-clamp-2 mt-1">{rel.description}</p>
                  </Link>
                ))}
            </div>
          </div>
        )}
      </section>

      <SiteFooter branding={branding} />
    </div>
  );
}
