import { db } from "@/lib/db";
import * as schema from "@/lib/db/schema";
import SiteNavbar from "@/components/SiteNavbar";
import SiteFooter from "@/components/SiteFooter";
import {
  Check,
  Printer,
  Clock3,
  MapPin,
  Layers,
  CreditCard,
  Gift,
  FileText,
  BookOpen,
  Briefcase,
  Flag,
  Shirt,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Wrench,
  Camera,
} from "lucide-react";
import Link from "next/link";

import { getDbCatalog } from "@/lib/db/queries";

export const revalidate = 0;

export default async function AboutPage() {
  const catalog = await getDbCatalog();
  const brandingList = await db.select().from(schema.branding).limit(1);
  const branding = brandingList[0] || {};

  const pageSections = await db.select().from(schema.pageSections);
  const aboutSection = pageSections.find((s) => s.sectionKey === "about") || {
    title: "High Precision Printing Press & Digital Studio",
    subtitle: "Serving Dugure, Malpot Road & Greater Bhaktapur with Quality & Speed",
    content: "Mountain Multimedia Service is Bhaktapur's premier complete printing solution. From instant passport photo studio services and high-volume offset catalog printing to customized gift sublimation and outdoor flex banners, we operate advanced in-house production equipment right in Dugure, Malpot Road.",
    imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80",
  };

  const serviceCategories = [
    {
      title: "1. Photo Printing & Frames",
      icon: Camera,
      description: "HD photo printing in all standard market sizes (4x6\", 5x7\", 8x10\", 12x18\", 16x24\", 20x30\") and matching synthetic wooden, glass & wall frames.",
      link: "/services#photo-printing-and-frames",
      highlights: ["All Market Sizes (4R to 20x30\")", "Matching Wooden & Glass Frames", "Passport & Visa Photo Sheet"],
    },
    {
      title: "2. Commercial Press",
      icon: Printer,
      description: "Heavy duty Star Flex outdoor banners, roll-up standees, NCR 2-ply/3-ply duplicate invoice bill pads & corporate wall/desk calendars.",
      link: "/services#commercial-printing-press",
      highlights: ["Star Flex Banners", "NCR Invoice Bill Pads", "Wall & Desk Calendars"],
    },
    {
      title: "3. Business Cards",
      icon: CreditCard,
      description: "Single & double-sided 300 GSM art card, metallic textured, matte/gloss lamination & spot varnish.",
      link: "/services#business-card",
      highlights: ["300 GSM Art Card", "Metallic Textured", "Double-Sided Offset"],
    },
    {
      title: "4. Gifts & Promotions",
      icon: Gift,
      description: "Customized photo mugs, magic heat-sensitive mugs, satin cushions, water bottles, keyrings, pin badges & metallic sheet photo prints.",
      link: "/services#gifts-and-promotions",
      highlights: ["Sublimation Mugs", "Metallic Sheet Prints", "Plush Cushions"],
    },
    {
      title: "5. Digital Print & Copies",
      icon: Printer,
      description: "High-speed A4 black & white/color laser document printing, duplex copies & 12x18 inch paper stickers.",
      link: "/services#digital-print",
      highlights: ["A4 Color Laser", "12x18 Stickers", "Same-Day Copies"],
    },
    {
      title: "6. Marketing Tools",
      icon: FileText,
      description: "Tri-fold A4 promotional brochures, A4 & A5 flyers, handbills & custom marketing materials.",
      link: "/services#marketing-tools",
      highlights: ["Tri-Fold Creasing", "Gloss Art Paper", "Custom Sizes"],
    },
    {
      title: "7. Stationary & ID Cards",
      icon: BookOpen,
      description: "Waterproof plastic PVC ID cards, 20mm digital neck lanyards, school exercise notebooks, envelopes, certificates & letterheads.",
      link: "/services#stationary",
      highlights: ["CR80 PVC Cards", "Digital Lanyards", "School Notebooks"],
    },
    {
      title: "8. Business Essentials",
      icon: Briefcase,
      description: "Wire-bound notebooks, 16-page product catalogues, self-inking stamps, NCR carbonless 2-ply & 3-ply duplicate bill pads.",
      link: "/services#business-essentials",
      highlights: ["NCR Carbonless Pads", "Pre-Inked Stamps", "Presentation Folders"],
    },
    {
      title: "9. Banners & Signages",
      icon: Flag,
      description: "Heavy duty outdoor flex printing, roll-up standees, acrylic glow signboards & shop front banners.",
      link: "/services#signages-and-banners",
      highlights: ["Outdoor Flex", "Roll-Up Standees", "Glow Boards"],
    },
    {
      title: "10. Apparel & Merchandise",
      icon: Shirt,
      description: "Custom photo & logo printed T-shirts, caps, promotional hoodies & customized fabric printing.",
      link: "/services#apparel-custom-merchandise",
      highlights: ["Custom T-Shirts", "Caps & Hoodies", "Sublimation Fabric"],
    },
  ];

  const faqList = [
    {
      q: "Where can I print business cards, passport photos, and flex banners in Bhaktapur Nepal?",
      a: "Mountain Multimedia Service provides urgent passport photos, 300 GSM business cards, flex signboards, PVC plastic ID cards, and commercial offset press printing in Dugure, Malpot Road, Bhaktapur. Call +977-9841693181 or order online via WhatsApp.",
    },
    {
      q: "How much does flex banner and signboard printing cost in Nepal?",
      a: "Heavy-duty outdoor Star Flex banner printing starts at affordable market rates at Mountain Multimedia Service in Bhaktapur, with same-day printing and optional eyelet mounting installation available.",
    },
    {
      q: "Does Mountain Multimedia Service deliver outside Bhaktapur?",
      a: "Yes, Mountain Multimedia Service delivers printed products, business cards, signboards, and custom merchandise across Bhaktapur, Kathmandu, Lalitpur, and major cities across Nepal via courier services.",
    },
    {
      q: "What is the turnaround time for custom T-shirts, mugs, and bill pads?",
      a: "Passport photo prints take under 10 minutes. Customized mugs, T-shirts, PVC ID cards, and flex banners are completed on the same day or within 24 hours. Commercial offset press bill pads take 2 to 3 business days.",
    },
    {
      q: "Can I order Star Flex signboards and PVC plastic ID cards online in Nepal?",
      a: "Yes, you can order Star Flex signboards, acrylic 3D glow boards, PVC plastic ID cards, and neck lanyards directly through 1-click WhatsApp order buttons on the Mountain Multimedia Service website at sagarsandha.com.np.",
    },
  ];

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqList.map((item) => ({
      "@type": "Question",
      "name": item.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.a,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <SiteNavbar branding={branding} />

      {/* Page Header Banner */}
      <section className="bg-slate-50 border-b border-slate-100 px-6 py-12">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-extrabold text-rose-600 uppercase tracking-widest block">
              ABOUT MOUNTAIN MULTIMEDIA SERVICE
            </span>
            <h1 className="text-3xl sm:text-5xl font-black text-slate-950">
              Bhaktapur's Complete Design, Studio & Printing Workshop
            </h1>
            <p className="text-slate-500 text-sm max-w-3xl leading-relaxed">
              Located conveniently in Dugure, Malpot Road, Bhaktapur, Mountain Multimedia Service combines industrial 4-color offset printing machinery, high-speed digital laser presses, sublimation transfer equipment, and a digital photo studio under one roof.
            </p>
          </div>
        </div>
      </section>

      {/* Story & Workshop Overview Container */}
      <section className="max-w-7xl mx-auto px-6 py-16 space-y-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-extrabold text-teal-700 bg-teal-50 border border-teal-200 px-3 py-1 rounded-md inline-block uppercase">
              HIGH PRECISION PRINTING PRESS
            </span>

            <h2 className="text-2xl sm:text-4xl font-black text-slate-950 leading-tight">
              {aboutSection.title}
            </h2>
            <p className="text-base text-rose-600 font-extrabold">{aboutSection.subtitle}</p>
            <p className="text-sm text-slate-600 leading-relaxed font-medium">
              {aboutSection.content}
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs font-bold text-slate-800">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Same-day passport & visa photos (10 minutes instant studio service)</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-bold text-slate-800">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Waterproof CR80 plastic PVC ID cards & 20mm digital neck lanyards</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-bold text-slate-800">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Tok 4-Color CMYK offset press for bulk bill pads, catalogues & business cards</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-bold text-slate-800">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Customized gift sublimation: mugs, magic mugs, cushions, T-shirts & metal sheets</span>
              </div>
            </div>
          </div>

          <div className="relative rounded-3xl overflow-hidden border border-slate-200 shadow-2xl h-[440px]">
            <img
              src={aboutSection.imageUrl || "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80"}
              alt="Mountain Multimedia Service Printing Workshop"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/30 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-slate-200 text-xs text-slate-800 space-y-1 shadow-lg">
              <div className="font-extrabold text-slate-950 text-sm">Mountain Multimedia Service</div>
              <div>Dugure, Malpot Road, Bhaktapur, Nepal</div>
              <div className="text-rose-600 font-extrabold">Hotline: +977-9841693181 / 9861550233 / 9849425342</div>
            </div>
          </div>
        </div>

        {/* In-House Production Equipment & Capabilities */}
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-12 space-y-10 shadow-2xl relative overflow-hidden">
          <div className="max-w-3xl space-y-3 relative z-10">
            <span className="text-xs font-extrabold text-rose-400 uppercase tracking-widest block">
              OUR IN-HOUSE MACHINERY & CAPABILITIES
            </span>
            <h3 className="text-2xl sm:text-4xl font-black tracking-tight text-white">
              Industrial Offset & Digital Technology Under One Roof
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              We operate high-capacity production machinery directly on-site, allowing us to handle urgent short-run digital requests and large commercial offset print orders with equal precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold">
                <Wrench className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-white text-base">Tok 4-Color Offset Press</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Industrial CMYK roller cylinder registration for bulk bill pads, tax invoices, exercise copies, brochures, and commercial flyers.
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center font-bold">
                <Printer className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-white text-base">High-Speed Digital Laser</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Instant high-resolution A4/A3 laser document printing, certificate printing on 300 GSM art card stock, and 12x18 self-adhesive stickers.
              </p>
            </div>

            <div className="bg-slate-800/80 p-6 rounded-2xl border border-slate-700 space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold">
                <Sparkles className="w-6 h-6" />
              </div>
              <h4 className="font-extrabold text-white text-base">Sublimation & Heat Press</h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Vibrant heat transfer equipment for ceramic mugs, magic mugs, plush cushions, aluminum water bottles, metal sheet photo prints & T-shirts.
              </p>
            </div>
          </div>
        </div>

        {/* 9 Specialized Service Categories Grid */}
        <div className="space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-extrabold text-rose-600 uppercase tracking-widest block">
              OUR COMPLETE SERVICES CATALOG
            </span>
            <h3 className="text-3xl font-black text-slate-950">
              {serviceCategories.length} Comprehensive Printing & Studio Categories
            </h3>
            <p className="text-slate-500 text-xs sm:text-sm">
              Explore our complete range of design, photo, gift, office, and large-format printing services.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {serviceCategories.map((cat, idx) => {
              const IconComp = cat.icon;
              return (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-rose-300 transition duration-300 space-y-4 flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="w-12 h-12 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center group-hover:bg-rose-600 group-hover:text-white transition duration-300">
                      <IconComp className="w-6 h-6" />
                    </div>

                    <h4 className="text-lg font-black text-slate-900 group-hover:text-rose-600 transition">
                      {cat.title}
                    </h4>

                    <p className="text-xs text-slate-600 leading-relaxed font-medium">
                      {cat.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {cat.highlights.map((h, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-md bg-slate-100 text-[10px] font-bold text-slate-700"
                        >
                          {h}
                        </span>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={cat.link}
                    className="pt-2 text-xs font-extrabold text-rose-600 hover:text-rose-700 inline-flex items-center gap-1.5 transition"
                  >
                    <span>View Category Products</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>

        {/* Stats Grid matching Pricom Theme */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-md text-center space-y-2">
            <Clock3 className="w-8 h-8 mx-auto text-rose-500" />
            <div className="text-2xl font-black text-slate-950">Fast Turnaround</div>
            <div className="text-xs text-slate-500">Same-Day Studio Photos & PVC Cards</div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-md text-center space-y-2">
            <Printer className="w-8 h-8 mx-auto text-rose-500" />
            <div className="text-2xl font-black text-slate-950">{serviceCategories.length} Categories</div>
            <div className="text-xs text-slate-500">Complete Printing Services Catalog</div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-md text-center space-y-2">
            <Layers className="w-8 h-8 mx-auto text-rose-500" />
            <div className="text-2xl font-black text-slate-950">300 GSM Stock</div>
            <div className="text-xs text-slate-500">Art Cards, Textured & Metallic Paper</div>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-slate-100 shadow-md text-center space-y-2">
            <MapPin className="w-8 h-8 mx-auto text-rose-500" />
            <div className="text-2xl font-black text-slate-950">Dugure Counter</div>
            <div className="text-xs text-slate-500">Malpot Road, Bhaktapur, Nepal</div>
          </div>
        </div>

        {/* Frequently Asked Questions (GEO Optimized) */}
        <div className="space-y-8 pt-8">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <span className="text-xs font-extrabold text-rose-600 uppercase tracking-widest block">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h3 className="text-3xl font-black text-slate-950">
              Got Questions? We Have Instant Answers
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {faqList.map((faq, idx) => (
              <div key={idx} className="bg-slate-50 border border-slate-200/80 p-6 rounded-2xl space-y-2 shadow-sm">
                <h4 className="font-extrabold text-slate-900 text-sm">{faq.q}</h4>
                <p className="text-xs text-slate-600 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter branding={branding} />
    </div>
  );
}
