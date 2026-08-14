"use client";

import { useState } from "react";
import Link from "next/link";
import { SERVICES_CATALOG, ServiceCategory } from "@/lib/servicesData";
import { ChevronDown, ArrowRight, CreditCard, Gift, Printer, FileText, BookOpen, Briefcase, Calendar, Shirt, Layers, Camera, Image } from "lucide-react";

export default function ServicesMegaMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>(SERVICES_CATALOG[0]);

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case "Camera":
      case "Image":
        return <Camera className="w-4 h-4 text-rose-500" />;
      case "CreditCard":
        return <CreditCard className="w-4 h-4 text-rose-500" />;
      case "Gift":
        return <Gift className="w-4 h-4 text-rose-500" />;
      case "Printer":
        return <Printer className="w-4 h-4 text-rose-500" />;
      case "FileText":
        return <FileText className="w-4 h-4 text-rose-500" />;
      case "BookOpen":
        return <BookOpen className="w-4 h-4 text-rose-500" />;
      case "Briefcase":
        return <Briefcase className="w-4 h-4 text-rose-500" />;
      case "Calendar":
        return <Calendar className="w-4 h-4 text-rose-500" />;
      case "Shirt":
        return <Shirt className="w-4 h-4 text-rose-500" />;
      case "Layers":
      default:
        return <Layers className="w-4 h-4 text-rose-500" />;
    }
  };

  return (
    <div className="relative group" onMouseLeave={() => setIsOpen(false)}>
      <button
        onMouseEnter={() => setIsOpen(true)}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1 hover:text-rose-600 transition font-bold uppercase tracking-wider py-2"
      >
        <span>Services</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isOpen ? "rotate-180 text-rose-600" : ""}`} />
      </button>

      {isOpen && (
        <div
          onMouseEnter={() => setIsOpen(true)}
          className="absolute top-full left-1/2 -translate-x-1/2 w-[920px] max-w-[95vw] bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
        >
          <div className="grid grid-cols-12 gap-6">
            {/* Left Column: 9 Categories Menu List (No Number Badges) */}
            <div className="col-span-4 border-r border-slate-100 pr-4 space-y-1.5 max-h-[440px] overflow-y-auto no-scrollbar">
              <div className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest px-3 py-1 mb-1">
                Print Categories
              </div>
              {SERVICES_CATALOG.map((cat) => {
                const isSelected = activeCategory.id === cat.id;

                return (
                  <button
                    key={cat.id}
                    onMouseEnter={() => setActiveCategory(cat)}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-between group ${
                      isSelected
                        ? "bg-rose-50 border border-rose-100 text-rose-600 shadow-sm"
                        : "hover:bg-slate-50 text-slate-700 hover:text-slate-900"
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {getCategoryIcon(cat.iconName)}
                      <span className="truncate">{cat.name}</span>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right Column: Visual Category Showcase Card & Subcategory Grid */}
            <div className="col-span-8 space-y-5 max-h-[440px] overflow-y-auto pl-2 no-scrollbar">
              {/* Category Header Card with High-Res Image Banner */}
              <div className="relative rounded-2xl overflow-hidden h-32 border border-slate-200 shadow-sm group">
                <img
                  src={activeCategory.imageUrl}
                  alt={activeCategory.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/70 to-transparent p-5 flex flex-col justify-end text-white">
                  <h4 className="text-xl font-extrabold tracking-tight mt-0.5">{activeCategory.name}</h4>
                  <p className="text-xs text-slate-300 line-clamp-1 mt-0.5">{activeCategory.description}</p>
                </div>
              </div>

              {/* Subcategories & Products Grid (No Number Badges) */}
              <div className="grid grid-cols-2 gap-4">
                {activeCategory.subcategories.map((sub) => (
                  <div key={sub.id} className="bg-slate-50/80 border border-slate-100 rounded-2xl p-4 space-y-2 hover:border-rose-200 transition">
                    <div className="flex items-center justify-between">
                      <Link
                        href={`/subcategory/${sub.slug}`}
                        onClick={() => setIsOpen(false)}
                        className="font-bold text-slate-900 text-xs hover:text-rose-600 transition flex items-center gap-1 uppercase"
                      >
                        <span>{sub.name}</span>
                        <ArrowRight className="w-3 h-3 text-rose-500" />
                      </Link>
                    </div>

                    {sub.hasCustomSizesNote && (
                      <span className="text-[9px] font-extrabold text-amber-800 bg-amber-100 border border-amber-300 px-2 py-0.5 rounded-full inline-block">
                        + Other custom sizes available
                      </span>
                    )}

                    <ul className="space-y-1 pt-1">
                      {sub.products.map((prod) => (
                        <li key={prod.id}>
                          <Link
                            href={`/product/${prod.slug}`}
                            onClick={() => setIsOpen(false)}
                            className="text-[11px] text-slate-600 hover:text-rose-600 font-medium transition truncate block py-0.5 uppercase"
                          >
                            • {prod.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
