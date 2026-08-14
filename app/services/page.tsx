import { SERVICES_CATALOG } from "@/lib/servicesData";
import SiteNavbar from "@/components/SiteNavbar";
import SiteFooter from "@/components/SiteFooter";
import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import { ArrowRight, Printer, CreditCard, Gift, FileText, BookOpen, Briefcase, Calendar, Shirt, Layers, Camera } from "lucide-react";
import Link from "next/link";

export const revalidate = 0;

export default async function ServicesPage() {
  const brandingList = await db.select().from(schema.branding).limit(1);
  const branding = brandingList[0] || {};

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Camera":
      case "Image":
        return <Camera className="w-5 h-5 text-rose-500" />;
      case "CreditCard":
        return <CreditCard className="w-5 h-5 text-rose-500" />;
      case "Gift":
        return <Gift className="w-5 h-5 text-rose-500" />;
      case "Printer":
        return <Printer className="w-5 h-5 text-rose-500" />;
      case "FileText":
        return <FileText className="w-5 h-5 text-rose-500" />;
      case "BookOpen":
        return <BookOpen className="w-5 h-5 text-rose-500" />;
      case "Briefcase":
        return <Briefcase className="w-5 h-5 text-rose-500" />;
      case "Calendar":
        return <Calendar className="w-5 h-5 text-rose-500" />;
      case "Shirt":
        return <Shirt className="w-5 h-5 text-rose-500" />;
      case "Layers":
      default:
        return <Layers className="w-5 h-5 text-rose-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <SiteNavbar branding={branding} />

      {/* Header Banner */}
      <section className="bg-slate-50 border-b border-slate-100 px-6 py-12">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-extrabold text-rose-600 uppercase tracking-widest block">
              OUR SERVICES CATALOG
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-950">
              Printing & Studio Services Directory
            </h1>
            <p className="text-slate-500 text-sm max-w-2xl leading-relaxed">
              Explore our specialized printing categories. Select any product to view specifications, materials, and turnaround options.
            </p>
          </div>
        </div>
      </section>

      {/* Visual Category Catalog Section (No Number Counts) */}
      <section className="max-w-7xl mx-auto px-6 py-16 space-y-16">
        {SERVICES_CATALOG.map((cat) => {
          return (
            <div key={cat.id} id={cat.slug} className="space-y-6 scroll-mt-24 border-b border-slate-100 pb-16 last:border-b-0">
              {/* Category Header Card */}
              <div className="relative rounded-3xl overflow-hidden h-40 border border-slate-200 shadow-md group">
                <img
                  src={cat.imageUrl}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/75 to-slate-950/40 p-6 sm:p-8 flex flex-col justify-end text-white">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-black tracking-tight">{cat.name}</h2>
                    <p className="text-xs sm:text-sm text-slate-300 line-clamp-1 mt-1">{cat.description}</p>
                  </div>
                </div>
              </div>

              {/* Subcategories Grid (No Number Counts) */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cat.subcategories.map((sub) => (
                  <div
                    key={sub.id}
                    className="bg-white border border-slate-100 rounded-2xl overflow-hidden shadow-md shadow-slate-200/50 hover:shadow-xl hover:border-rose-200 transition duration-300 flex flex-col justify-between group"
                  >
                    {sub.imageUrl && (
                      <div className="h-36 relative overflow-hidden bg-slate-100">
                        <img
                          src={sub.imageUrl}
                          alt={sub.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute inset-0 bg-slate-950/20" />
                      </div>
                    )}

                    <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                          <Link
                            href={`/subcategory/${sub.slug}`}
                            className="font-bold text-slate-900 text-base hover:text-rose-600 transition flex items-center gap-1.5 uppercase"
                          >
                            <span>{sub.name}</span>
                            <ArrowRight className="w-4 h-4 text-rose-500" />
                          </Link>
                        </div>

                        {sub.hasCustomSizesNote && (
                          <span className="text-[10px] font-extrabold text-amber-800 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full inline-block mb-3">
                            + Other custom sizes available
                          </span>
                        )}

                        <div className="space-y-1.5">
                          {sub.products.map((prod) => (
                            <Link
                              key={prod.id}
                              href={`/product/${prod.slug}`}
                              className="p-2.5 rounded-xl bg-slate-50 hover:bg-rose-50 border border-slate-100 hover:border-rose-200 transition block group/item"
                            >
                              <div className="flex items-center justify-between">
                                <span className="text-xs font-bold text-slate-800 group-hover/item:text-rose-600 transition truncate">
                                  {prod.name}
                                </span>
                                <ArrowRight className="w-3.5 h-3.5 text-rose-500 opacity-0 group-hover/item:opacity-100 transition shrink-0" />
                              </div>
                            </Link>
                          ))}
                        </div>
                      </div>

                      <div className="pt-3">
                        <Link
                          href={`/subcategory/${sub.slug}`}
                          className="w-full py-2.5 px-4 rounded-xl bg-slate-950 hover:bg-rose-600 text-white font-extrabold text-xs transition flex items-center justify-center gap-2"
                        >
                          <span>Explore Subcategory</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      <SiteFooter branding={branding} />
    </div>
  );
}
