"use client";

import { useState } from "react";
import { Mountain, Phone, Menu, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ServicesMegaMenu from "./ServicesMegaMenu";

interface SiteNavbarProps {
  branding?: any;
  catalog?: any[];
}

export default function SiteNavbar({ branding, catalog }: SiteNavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const siteName = branding?.siteName || "Mountain Multimedia";
  const primaryPhone = branding?.contactPhone?.split(",")[0]?.trim() || "9841693181";

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 px-6 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-md shadow-slate-900/10 group-hover:scale-105 transition shrink-0 overflow-hidden">
              {branding?.logoUrl ? (
                <img src={branding.logoUrl} alt={siteName} className="w-full h-full object-contain p-1" />
              ) : (
                <Mountain className="w-5 h-5 text-rose-500" />
              )}
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-950 block leading-none whitespace-nowrap">
                {siteName}
              </span>
              <span className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase block mt-1 whitespace-nowrap">
                {branding?.tagline || "Printing Press & Studio"}
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links including Mega Menu */}
          <nav className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-wider text-slate-700">
            <Link
              href="/"
              className={`hover:text-rose-600 transition ${isActive("/") ? "text-rose-600 font-extrabold" : ""}`}
            >
              Home
            </Link>

            {/* Mega Menu Dropdown */}
            <ServicesMegaMenu catalog={catalog} />

            <Link
              href="/about"
              className={`hover:text-rose-600 transition ${isActive("/about") ? "text-rose-600 font-extrabold" : ""}`}
            >
              About
            </Link>
            <Link
              href="/contact"
              className={`hover:text-rose-600 transition ${isActive("/contact") ? "text-rose-600 font-extrabold" : ""}`}
            >
              Contact
            </Link>
          </nav>

          <div className="hidden md:flex items-center gap-6">
            <a
              href="tel:+9779841693181"
              className="text-right group flex flex-col items-end"
            >
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

        {/* Mobile Dropdown */}
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
    </>
  );
}
