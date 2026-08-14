"use client";

import { Mountain, MapPin, Phone, Mail, Clock3 } from "lucide-react";
import Link from "next/link";

interface SiteFooterProps {
  branding?: any;
}

export default function SiteFooter({ branding }: SiteFooterProps) {
  const siteName = branding?.siteName || "Mountain Multimedia Service";
  const address = branding?.address || "Dugure, Malpot Road, Bhaktapur, Nepal";
  const email = branding?.contactEmail || "mdigitalpress1@gmail.com";
  const hours = branding?.openingHours || "Sun – Fri: 8:00 AM – 7:00 PM (Closed on Saturday)";

  return (
    <footer className="border-t border-slate-200 bg-slate-50 text-slate-600 text-xs">
      {/* Top Footer Strip */}
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-4 gap-8 border-b border-slate-200">
        <div className="space-y-4 md:col-span-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-md shrink-0 overflow-hidden">
              {branding?.logoUrl ? (
                <img src={branding.logoUrl} alt={siteName} className="w-full h-full object-contain p-1" />
              ) : (
                <Mountain className="w-5 h-5 text-rose-500" />
              )}
            </div>
            <div>
              <span className="font-black text-slate-900 text-base block whitespace-nowrap">{siteName}</span>
              <span className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase block mt-0.5 whitespace-nowrap">
                {branding?.tagline || "Printing Press & Studio"}
              </span>
            </div>
          </div>
          <p className="text-slate-500 text-xs leading-relaxed">
            Bhaktapur's trusted digital photo studio, offset press, and photocopy counter in Dugure, Malpot Road. Fast same-day delivery.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <span className="font-extrabold text-slate-900 uppercase tracking-wider text-xs block">
            Navigation
          </span>
          <ul className="space-y-2.5 font-medium">
            <li>
              <Link href="/" className="hover:text-rose-600 transition">Home Page</Link>
            </li>
            <li>
              <Link href="/services" className="hover:text-rose-600 transition">Services Catalog</Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-rose-600 transition">About</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-rose-600 transition">Contact & Location</Link>
            </li>
          </ul>
        </div>

        {/* Popular Services */}
        <div className="space-y-3">
          <span className="font-extrabold text-slate-900 uppercase tracking-wider text-xs block">
            Printing Services
          </span>
          <ul className="space-y-2.5 font-medium">
            <li>
              <Link href="/services/digital-photo-studio" className="hover:text-rose-600">Passport & Visa Photos</Link>
            </li>
            <li>
              <Link href="/services/pvc-id-cards" className="hover:text-rose-600">PVC Plastic ID Cards</Link>
            </li>
            <li>
              <Link href="/services/flex-print" className="hover:text-rose-600">Outdoor Flex Signboards</Link>
            </li>
            <li>
              <Link href="/services/tshirt-printing" className="hover:text-rose-600">Custom T-Shirt & Mug Printing</Link>
            </li>
            <li>
              <Link href="/services/visiting-cards" className="hover:text-rose-600">Business Cards</Link>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-3">
          <span className="font-extrabold text-slate-900 uppercase tracking-wider text-xs block">
            Shop Contact
          </span>
          <div className="space-y-2.5 text-slate-600 font-medium">
            <div className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <span>{address}</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-rose-500 shrink-0" />
              <a href="tel:+9779841693181" className="hover:underline font-bold text-slate-900">+977-9841693181 / 9861550233</a>
            </div>
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-rose-500 shrink-0" />
              <a href={`mailto:${email}`} className="hover:underline">{email}</a>
            </div>
            <div className="flex items-start gap-2 text-slate-700">
              <Clock3 className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
              <div>
                <span className="block font-bold text-slate-900">Sun – Fri: 8:00 AM – 7:00 PM</span>
                <span className="block text-[11px] font-bold text-rose-600 mt-0.5">(Closed on Saturday)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 font-medium">
        <div>&copy; {new Date().getFullYear()} {siteName}. All rights reserved.</div>
        <div className="flex items-center gap-6">
          <Link href="/contact" className="hover:text-slate-900">Directions & Location Pin</Link>
          <Link href="/services" className="hover:text-slate-900">Services Catalog</Link>
        </div>
        <div>Dugure, Malpot Road, Bhaktapur</div>
      </div>
    </footer>
  );
}
