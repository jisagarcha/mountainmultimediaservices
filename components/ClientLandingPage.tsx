"use client";

import { useMemo, useState } from "react";
import {
  Mountain,
  Camera,
  Video,
  Copy,
  Printer,
  Layers,
  Shirt,
  Coffee,
  CreditCard,
  FileText,
  Calendar,
  Heart,
  BookOpen,
  Award,
  Stamp,
  Image as ImageIcon,
  PenTool,
  ArrowRight,
  Check,
  Mail,
  Phone,
  MapPin,
  Menu,
  X,
  Play,
  ExternalLink,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { submitContactForm } from "@/app/admin/actions";
import ServicesMegaMenu from "./ServicesMegaMenu";
import SiteFooter from "./SiteFooter";
import { SERVICES_CATALOG } from "@/lib/servicesData";

interface ClientLandingPageProps {
  branding: any;
  services: any[];
  gallery: any[];
  testimonials: any[];
  pageSections: any[];
}

export default function ClientLandingPage({
  branding,
  services,
  gallery,
  testimonials,
  pageSections,
}: ClientLandingPageProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCategoryIdx, setActiveCategoryIdx] = useState(0);

  // Form states
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [contactSent, setContactSent] = useState(false);

  // Sections
  const heroSection = pageSections.find((s) => s.sectionKey === "hero") || {
    title: "For all your printing requirements",
    subtitle: "What's more, we do it right! A full administration printing background.",
    content: "Your trusted neighborhood printing press, photo studio, and photocopy counter in Dugure, Malpot Road, Bhaktapur. Fast service for passport photos, PVC ID cards, flex printing, visiting cards, and custom media.",
    imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80",
    isVisible: true,
  };

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitContactForm({ name, phone, email, message });
      setContactSent(true);
      setName("");
      setPhone("");
      setEmail("");
      setMessage("");
    } catch (err: any) {
      alert(err.message || "Failed to send inquiry.");
    } finally {
      setSubmitting(false);
    }
  };

  const selectedCategory = SERVICES_CATALOG[activeCategoryIdx] || SERVICES_CATALOG[0];

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-rose-500 selection:text-white">
      {/* NAVBAR WITH MEGA MENU */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-md group-hover:scale-105 transition">
              <Mountain className="w-5 h-5 text-rose-500" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-950 block leading-none">
                {branding.siteName || "Mountain Multimedia"}
              </span>
              <span className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase block mt-1">
                Printing Press & Studio
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-slate-700">
            <Link href="/" className="text-rose-600 font-extrabold">
              Home
            </Link>

            {/* Integrated Services Mega-Menu Dropdown */}
            <ServicesMegaMenu />

            <Link href="/about" className="hover:text-rose-600 transition">
              About
            </Link>
            <Link href="/contact" className="hover:text-rose-600 transition">
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-6">
            <a href="tel:+9779841693181" className="text-right group flex flex-col items-end">
              <span className="text-[10px] font-extrabold text-rose-600 uppercase tracking-widest block">
                HOTLINE:
              </span>
              <span className="text-xs font-extrabold text-slate-900 group-hover:text-rose-600 transition">
                +977-9841693181
              </span>
            </a>

            <Link
              href="/contact"
              className="px-6 py-3 rounded-xl bg-slate-950 hover:bg-rose-600 text-white font-extrabold text-xs shadow-lg shadow-slate-950/10 hover:shadow-rose-600/20 transition duration-300 flex items-center gap-2"
            >
              <span>Contact Us</span>
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-xl bg-slate-100 text-slate-800"
          >
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden pt-4 pb-2 border-t border-slate-100 mt-4 space-y-3 px-2">
            <Link href="/" onClick={() => setMenuOpen(false)} className="block text-sm font-bold text-slate-800 hover:text-rose-600">
              Home
            </Link>
            <Link href="/services" onClick={() => setMenuOpen(false)} className="block text-sm font-bold text-slate-800 hover:text-rose-600">
              Services Catalog (9 Categories)
            </Link>
            <Link href="/about" onClick={() => setMenuOpen(false)} className="block text-sm font-bold text-slate-800 hover:text-rose-600">
              About
            </Link>
            <Link href="/contact" onClick={() => setMenuOpen(false)} className="block text-sm font-bold text-slate-800 hover:text-rose-600">
              Contact Us
            </Link>
          </div>
        )}
      </header>

      {/* HERO SECTION MATCHING PRICOM SCREENSHOT */}
      <section className="relative bg-white px-6 py-16 sm:py-24 overflow-hidden bg-print-dots">
        <span className="w-3 h-3 rounded-full bg-cyan-400 absolute top-12 left-1/4 animate-bounce" style={{ animationDuration: "4s" }} />
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 absolute bottom-16 left-1/3 animate-ping" />
        <span className="w-3.5 h-3.5 rounded-full bg-emerald-400 absolute top-1/3 left-10" />
        <span className="w-3 h-3 rounded-full bg-rose-500 absolute bottom-10 right-1/4" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="inline-block px-3 py-1 rounded-md bg-teal-50 border border-teal-200 text-teal-700 text-xs font-extrabold uppercase tracking-wider">
              PRINTING MADE EASIER
            </div>

            <h1 className="text-4xl sm:text-6xl font-black text-slate-950 tracking-tight leading-[1.1]">
              For all your <br />
              printing <br />
              requirements
            </h1>

            <p className="text-base text-slate-600 font-medium max-w-lg leading-relaxed">
              {heroSection.subtitle}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-sm shadow-xl shadow-rose-600/30 transition duration-300 flex items-center gap-2"
              >
                <span>Let's Talk</span>
              </Link>

              <Link
                href="/services"
                className="px-7 py-3.5 rounded-xl border-2 border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white font-extrabold text-sm transition duration-300 flex items-center gap-2"
              >
                <span>How We Work</span>
                <Play className="w-4 h-4 fill-current" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6 flex justify-center lg:justify-end relative">
            <div className="relative w-full max-w-lg">
              <div className="arch-mask border-8 border-rose-200 p-2 shadow-2xl bg-white">
                <div className="arch-mask overflow-hidden h-[420px] sm:h-[480px] relative">
                  <img
                    src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80"
                    alt="Printing Workshop Designer"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: WE ARE PROFESSIONAL (4-Card White Feature Grid) */}
      <section className="bg-slate-50/70 py-24 px-6 border-y border-slate-100">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-3">
            <span className="text-xs font-extrabold text-rose-600 uppercase tracking-widest block">
              WE ARE PROFESSIONAL
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 leading-tight">
              We're something other than duplicates... <br />
              What's more, <span className="highlight-green">we do it right!</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 max-w-xl mx-auto leading-relaxed pt-2">
              Printing organization mottos. While the internet might assume control of numerous parts of printing, a few things are as yet favored on paper.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-md shadow-slate-200/50 hover:shadow-xl hover:border-rose-200 transition duration-300 text-center space-y-4 group">
              <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-100 text-rose-500 flex items-center justify-center mx-auto group-hover:scale-110 transition">
                <Printer className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Printing Services</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Fast print, flyer, and pamphlet printing. Pleased with our past. Printing for what's to come.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-md shadow-slate-200/50 hover:shadow-xl hover:border-rose-200 transition duration-300 text-center space-y-4 group">
              <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-100 text-rose-500 flex items-center justify-center mx-auto group-hover:scale-110 transition">
                <Camera className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Digital Scanning</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Printing for what's to come. Fast print, flyer, and pamphlet printing. Pleased with our past.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-md shadow-slate-200/50 hover:shadow-xl hover:border-rose-200 transition duration-300 text-center space-y-4 group">
              <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-100 text-rose-500 flex items-center justify-center mx-auto group-hover:scale-110 transition">
                <PenTool className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Design Services</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Fast print, flyer, and pamphlet printing. Pleased with our past. Printing for what's to come.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-md shadow-slate-200/50 hover:shadow-xl hover:border-rose-200 transition duration-300 text-center space-y-4 group">
              <div className="w-16 h-16 rounded-2xl bg-rose-50 border border-rose-100 text-rose-500 flex items-center justify-center mx-auto group-hover:scale-110 transition">
                <Copy className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">Copying Services</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Pleased with our past. Printing for what's to come. Fast print, flyer, and pamphlet printing.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* IMPROVED INTERACTIVE TABBED CATALOG SHOWCASE (BETTER THAN BASIC CARDS) */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-extrabold text-rose-600 uppercase tracking-widest block">
                EXPLORE CATALOG
              </span>
              <h2 className="text-3xl font-black text-slate-950 mt-2">
                Our 9 Specialized Printing Categories
              </h2>
            </div>
            <Link
              href="/services"
              className="px-6 py-3 rounded-xl bg-slate-950 hover:bg-rose-600 text-white font-extrabold text-xs shadow-md transition flex items-center gap-2"
            >
              <span>View Full Directory</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Interactive Category Tabs Switcher */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Tabs List */}
            <div className="lg:col-span-4 bg-slate-50 p-4 rounded-3xl border border-slate-100 space-y-1.5">
              {SERVICES_CATALOG.map((cat, idx) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategoryIdx(idx)}
                  className={`w-full text-left px-4 py-3 rounded-2xl text-xs font-bold transition flex items-center justify-between group ${
                    activeCategoryIdx === idx
                      ? "bg-rose-600 text-white shadow-lg shadow-rose-600/30 font-extrabold"
                      : "bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-900 border border-slate-100"
                  }`}
                >
                  <span className="truncate">{cat.name}</span>
                  <ArrowRight className={`w-3.5 h-3.5 transition ${activeCategoryIdx === idx ? "text-white" : "opacity-0 group-hover:opacity-100 text-rose-500"}`} />
                </button>
              ))}
            </div>

            {/* Right Interactive Showcase Box */}
            <div className="lg:col-span-8 bg-slate-50 p-6 sm:p-8 rounded-3xl border border-slate-100 space-y-6">
              {/* Category Image Header Card */}
              <div className="relative rounded-2xl overflow-hidden h-44 border border-slate-200 shadow-md group">
                <img
                  src={selectedCategory.imageUrl}
                  alt={selectedCategory.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-transparent p-6 flex flex-col justify-end text-white">
                  <span className="text-xs font-extrabold uppercase text-rose-400 tracking-widest block">
                    {selectedCategory.subcategories.length} Subcategories
                  </span>
                  <h3 className="text-2xl font-black">{selectedCategory.name}</h3>
                  <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">{selectedCategory.description}</p>
                </div>
              </div>

              {/* Subcategories & Products Grid (No Prices, No Turnaround) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedCategory.subcategories.map((sub) => (
                  <div key={sub.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3 hover:border-rose-200 transition">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-2">
                      <Link
                        href={`/subcategory/${sub.slug}`}
                        className="font-bold text-slate-900 text-xs hover:text-rose-600 transition uppercase flex items-center gap-1"
                      >
                        <span>{sub.name}</span>
                        <ArrowRight className="w-3 h-3 text-rose-500" />
                      </Link>
                    </div>

                    <div className="space-y-1.5">
                      {sub.products.map((prod) => (
                        <Link
                          key={prod.id}
                          href={`/product/${prod.slug}`}
                          className="p-2 rounded-xl bg-slate-50 hover:bg-rose-50 text-[11px] font-bold text-slate-800 hover:text-rose-600 transition flex items-center justify-between group/item"
                        >
                          <span className="truncate">• {prod.name}</span>
                          <ArrowRight className="w-3 h-3 text-rose-500 opacity-0 group-hover/item:opacity-100 transition" />
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: FAST AND QUALITY SERVICE (Layered Workshop Image Showcase) */}
      <section className="py-24 px-6 bg-slate-50/70 border-t border-slate-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 relative">
            <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl border-4 border-white w-5/6 h-[380px]">
              <img
                src="https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80"
                alt="Tok Offset Press Operator"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -right-2 z-20 w-3/5 h-[220px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80"
                alt="Print Products"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:col-span-6 space-y-6 lg:pl-6">
            <span className="text-xs font-extrabold text-rose-600 uppercase tracking-widest block">
              FAST AND QUALITY SERVICE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-950 leading-tight">
              Best shipping rates for <br />
              <span className="highlight-green">print-on-demand</span> services
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
              Fast print, flyer, and pamphlet printing organization. Pleased with our past. Printing for what's to come. What's more, we do it right! A full administration printing background.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center gap-3 text-xs font-bold text-slate-800">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Top quality prints using the latest technology</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-bold text-slate-800">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Mix and match colors, sizes, and designs</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-bold text-slate-800">
                <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Fast delivery in Dugure, Malpot Road, Bhaktapur</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/services"
                className="px-8 py-3.5 rounded-xl bg-slate-950 hover:bg-rose-600 text-white font-extrabold text-xs shadow-lg transition duration-300 inline-flex items-center gap-2"
              >
                <span>View Full Directory</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* EMBEDDED REAL GOOGLE MAPS LOCATION PIN */}
      <section className="bg-white border-t border-slate-100 px-6 py-16">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-rose-600 uppercase tracking-wider mb-1">
                <MapPin className="w-4 h-4" />
                <span>Pinned Location</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900">Mountain Multimedia Service in Bhaktapur</h3>
              <p className="text-xs text-slate-500">Dugure, Malpot Road, Bhaktapur, Nepal</p>
            </div>
            <a
              href="https://maps.app.goo.gl/WpgFD1Wqa8J7B77J7?g_st=ic"
              target="_blank"
              rel="noreferrer"
              className="px-5 py-2.5 rounded-xl bg-slate-950 hover:bg-rose-600 text-white text-xs font-bold flex items-center gap-2 shadow-md transition"
            >
              <span>Open Pin on Google Maps</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          <div className="w-full h-96 rounded-3xl overflow-hidden border border-slate-200 shadow-xl bg-slate-100">
            <iframe
              title="Mountain Multimedia Location Google Map Pin"
              src="https://maps.google.com/maps?q=Mountain+Multimedia+Service,+Dugure,+Malpot+Road,+Bhaktapur&t=&z=16&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <SiteFooter branding={branding} />
    </div>
  );
}
