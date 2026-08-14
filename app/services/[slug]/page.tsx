import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import SiteNavbar from "@/components/SiteNavbar";
import SiteFooter from "@/components/SiteFooter";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { Check, ArrowRight, Phone, ShieldCheck, Printer } from "lucide-react";
import Link from "next/link";

export const revalidate = 0;

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const brandingList = await db.select().from(schema.branding).limit(1);
  const branding = brandingList[0] || {};

  const serviceList = await db
    .select()
    .from(schema.services)
    .where(eq(schema.services.slug, slug))
    .limit(1);

  if (serviceList.length === 0) {
    notFound();
  }

  const service = serviceList[0];
  const features: string[] =
    typeof service.features === "string"
      ? JSON.parse(service.features || "[]")
      : service.features || [];

  const allServices = await db
    .select()
    .from(schema.services)
    .limit(4);
  const relatedServices = allServices.filter((s) => s.slug !== slug).slice(0, 3);

  const whatsAppText = encodeURIComponent(
    `Hello Mountain Multimedia Press! I am interested in ordering '${service.title}' (${service.price}). Please provide paper stock options and delivery timeline for Bhaktapur.`
  );

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
          <span className="text-rose-600 font-bold">{service.title}</span>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-6 py-16 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-extrabold text-rose-600 bg-rose-50 border border-rose-100 px-3 py-1 rounded-full inline-block">
                {service.price}
              </span>
              <h1 className="text-3xl sm:text-5xl font-black text-slate-950">
                {service.title}
              </h1>
              <p className="text-base text-slate-600 leading-relaxed font-medium">
                {service.description}
              </p>
            </div>

            {/* Printing Specs */}
            <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 space-y-6 shadow-md shadow-slate-200/50">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Printer className="w-5 h-5 text-rose-500" />
                <span>Printing & Paper Stock Specifications</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-slate-500 block text-[11px]">Paper Stock & GSM</span>
                  <span className="font-bold text-slate-900">300 GSM Art Card / Heavyweight Vinyl</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-slate-500 block text-[11px]">Color Calibration</span>
                  <span className="font-bold text-rose-600">CMYK 2400 DPI High Definition</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-slate-500 block text-[11px]">Turnaround Time</span>
                  <span className="font-bold text-emerald-700">Same-Day / 24 Hours in Bhaktapur</span>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-1">
                  <span className="text-slate-500 block text-[11px]">Available Finishes</span>
                  <span className="font-bold text-slate-900">Matte, Gloss, Spot UV & Foil Stamp</span>
                </div>
              </div>

              <div className="border-t border-slate-100 pt-6 space-y-3">
                <h4 className="font-bold text-sm text-slate-900">Included Features:</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {features.map((feat, i) => (
                    <div key={i} className="text-xs text-slate-700 flex items-center gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100 font-medium">
                      <Check className="w-4 h-4 text-rose-500 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-slate-100 rounded-3xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 space-y-6 sticky top-24">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-xs text-slate-500 uppercase font-semibold">Ready to Order?</span>
                <div className="text-2xl font-black text-slate-950 mt-1">{service.price}</div>
              </div>

              <div className="space-y-3">
                <a
                  href={`https://wa.me/9779841693181?text=${whatsAppText}`}
                  target="_blank"
                  rel="noreferrer"
                  className="w-full py-4 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-lg shadow-emerald-600/20 transition flex items-center justify-center gap-2"
                >
                  <span>Order Spec on WhatsApp</span>
                  <ArrowRight className="w-4 h-4" />
                </a>

                <a
                  href="tel:+9779841693181"
                  className="w-full py-3.5 px-6 rounded-2xl bg-slate-950 hover:bg-rose-600 text-white font-extrabold text-xs transition flex items-center justify-center gap-2"
                >
                  <Phone className="w-4 h-4 text-rose-400" />
                  <span>Call +977-9841693181 Direct</span>
                </a>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-2 text-[11px] text-slate-500 font-medium">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>100% Quality & Print Replacement Guarantee</span>
                </div>
                <div className="flex items-center gap-2">
                  <Printer className="w-4 h-4 text-rose-500 shrink-0" />
                  <span>Printed locally in Dugure, Malpot Road, Bhaktapur</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {relatedServices.length > 0 && (
          <div className="pt-12 border-t border-slate-100 space-y-6">
            <h3 className="text-xl font-bold text-slate-900">Other Printing Services</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {relatedServices.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/services/${rel.slug}`}
                  className="bg-white border border-slate-100 rounded-2xl p-5 hover:border-rose-200 shadow-sm transition group"
                >
                  <span className="text-xs font-extrabold text-rose-600">{rel.price}</span>
                  <h4 className="font-bold text-slate-900 text-sm mt-2 group-hover:text-rose-600 transition">{rel.title}</h4>
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
