import { getSubcategoryBySlug } from "@/lib/servicesData";
import { notFound } from "next/navigation";
import SiteNavbar from "@/components/SiteNavbar";
import SiteFooter from "@/components/SiteFooter";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { ArrowRight, Printer } from "lucide-react";
import Link from "next/link";

export const revalidate = 0;

export default async function SubcategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const match = getSubcategoryBySlug(slug);
  if (!match) {
    notFound();
  }

  const { subcategory, category } = match;

  const brandingList = await db.select().from(schema.branding).limit(1);
  const branding = brandingList[0] || {};

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <SiteNavbar branding={branding} />

      {/* Breadcrumb */}
      <div className="bg-slate-50 border-b border-slate-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center gap-2 text-xs font-semibold text-slate-500">
          <Link href="/" className="hover:text-slate-900">Home</Link>
          <span>/</span>
          <Link href="/services" className="hover:text-slate-900">Services</Link>
          <span>/</span>
          <span className="text-slate-700">{category.name}</span>
          <span>/</span>
          <span className="text-rose-600 font-bold">{subcategory.name}</span>
        </div>
      </div>

      {/* Header Banner */}
      <section className="bg-slate-50 border-b border-slate-100 px-6 py-12">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="space-y-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-extrabold text-rose-600 uppercase tracking-widest block">
                {category.name} Subcategory
              </span>
              {subcategory.hasCustomSizesNote && (
                <span className="text-xs font-extrabold text-amber-800 bg-amber-100 border border-amber-300 px-3 py-0.5 rounded-full">
                  + Other custom sizes available upon request
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-slate-950">
              {subcategory.name} Printing Services
            </h1>
            <p className="text-slate-500 text-sm max-w-2xl">
              Select any product for paper stock specifications and 1-click WhatsApp order.
            </p>
          </div>
        </div>
      </section>

      {/* Product List Grid (No Number Counts) */}
      <section className="max-w-7xl mx-auto px-6 py-16 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {subcategory.products.map((prod) => (
            <div
              key={prod.id}
              className="bg-white border border-slate-100 rounded-2xl p-6 shadow-md shadow-slate-200/50 hover:shadow-xl hover:border-rose-200 transition duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600">
                    <Printer className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-slate-900 mb-2">{prod.name}</h3>
                <p className="text-xs text-slate-500 leading-relaxed mb-6">
                  {prod.description}
                </p>

                {prod.paperSpec && (
                  <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs font-medium text-slate-700 mb-4">
                    <span className="text-slate-400 block text-[10px] uppercase font-bold">Paper Spec:</span>
                    <span>{prod.paperSpec}</span>
                  </div>
                )}
              </div>

              <div className="border-t border-slate-100 pt-4 flex items-center justify-between">
                <Link
                  href={`/product/${prod.slug}`}
                  className="text-xs font-extrabold text-rose-600 hover:text-rose-700 flex items-center gap-1 bg-rose-50 border border-rose-100 px-3.5 py-2 rounded-xl"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>

                <a
                  href={`https://wa.me/9779841693181?text=${encodeURIComponent(`Hello Mountain Press! I want to order '${prod.name}'.`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-extrabold text-emerald-600 hover:underline"
                >
                  WhatsApp Order
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Back Link */}
        <div className="pt-6 border-t border-slate-100 text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-xs font-extrabold text-slate-900 hover:text-rose-600"
          >
            <span>← Back to All Categories</span>
          </Link>
        </div>
      </section>

      <SiteFooter branding={branding} />
    </div>
  );
}
