"use client";

import { Printer, Sparkles, CheckCircle2, RotateCw } from "lucide-react";

interface TokPressAnimationProps {
  variant?: "hero" | "header" | "compact";
  title?: string;
  subtitle?: string;
}

export default function TokPressAnimation({
  variant = "hero",
  title = "TOK 4-COLOR OFFSET PRESS",
  subtitle = "High-Speed Industrial CMYK Printing Machine",
}: TokPressAnimationProps) {
  if (variant === "compact" || variant === "header") {
    return (
      <div className="relative rounded-2xl p-4 border border-slate-200 bg-white shadow-md overflow-hidden group">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-20 transition duration-500"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80')`,
          }}
        />

        <div className="relative z-10 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-rose-50 border border-rose-100 text-rose-600">
              <Printer className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="font-extrabold text-xs text-slate-900 flex items-center gap-2">
                <span>{title}</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-[9px] uppercase font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" /> ACTIVE
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">{subtitle}</p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] font-bold">
            <span className="px-2 py-1 rounded-lg bg-cyan-50 text-cyan-700 border border-cyan-200">C</span>
            <span className="px-2 py-1 rounded-lg bg-pink-50 text-pink-700 border border-pink-200">M</span>
            <span className="px-2 py-1 rounded-lg bg-amber-50 text-amber-700 border border-amber-200">Y</span>
            <span className="px-2 py-1 rounded-lg bg-slate-100 text-slate-800 border border-slate-300">K</span>
          </div>
        </div>
      </div>
    );
  }

  // Hero Full Tok Machine Backdrop Component with Light Theme
  return (
    <div className="relative rounded-3xl p-6 sm:p-8 border border-slate-200 bg-white shadow-xl overflow-hidden group">
      {/* Background Industrial Machine Image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15 group-hover:scale-105 transition duration-700 pointer-events-none"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1920&q=80')`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-white via-white/90 to-white/70 pointer-events-none" />

      <div className="relative z-10 space-y-6">
        {/* Machine Header Status */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-100 text-rose-600 shadow-sm">
              <Printer className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 flex items-center gap-2">
                <span>{title}</span>
                <span className="text-[10px] uppercase font-mono font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-700">
                  4-COLOR TOK OFFSET
                </span>
              </h3>
              <p className="text-xs text-slate-500">{subtitle}</p>
            </div>
          </div>

          <span className="px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 font-mono text-xs font-bold flex items-center gap-1.5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>RUNNING AT 12,000 IMP/HR</span>
          </span>
        </div>

        {/* 4 Ink Cylinder Gauge Indicators */}
        <div className="grid grid-cols-4 gap-3">
          <div className="p-3 rounded-2xl bg-slate-50 border border-cyan-200 text-center relative overflow-hidden">
            <div className="flex items-center justify-between text-[10px] font-mono font-bold text-cyan-700 mb-1">
              <span>CYAN</span>
              <span>100%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden my-1">
              <div className="h-full bg-cyan-500 w-full animate-pulse" />
            </div>
            <span className="text-[9px] font-mono text-slate-500 uppercase block mt-1">Cylinder 01</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-pink-200 text-center relative overflow-hidden">
            <div className="flex items-center justify-between text-[10px] font-mono font-bold text-pink-700 mb-1">
              <span>MAGENTA</span>
              <span>100%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden my-1">
              <div className="h-full bg-pink-500 w-full animate-pulse" style={{ animationDelay: "150ms" }} />
            </div>
            <span className="text-[9px] font-mono text-slate-500 uppercase block mt-1">Cylinder 02</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-amber-200 text-center relative overflow-hidden">
            <div className="flex items-center justify-between text-[10px] font-mono font-bold text-amber-700 mb-1">
              <span>YELLOW</span>
              <span>100%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden my-1">
              <div className="h-full bg-amber-500 w-full animate-pulse" style={{ animationDelay: "300ms" }} />
            </div>
            <span className="text-[9px] font-mono text-slate-500 uppercase block mt-1">Cylinder 03</span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-300 text-center relative overflow-hidden">
            <div className="flex items-center justify-between text-[10px] font-mono font-bold text-slate-800 mb-1">
              <span>BLACK</span>
              <span>100%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-200 rounded-full overflow-hidden my-1">
              <div className="h-full bg-slate-900 w-full animate-pulse" style={{ animationDelay: "450ms" }} />
            </div>
            <span className="text-[9px] font-mono text-slate-500 uppercase block mt-1">Cylinder 04</span>
          </div>
        </div>

        {/* Paper Feed Stage */}
        <div className="h-44 relative bg-slate-900 text-white rounded-2xl border border-slate-800 overflow-hidden p-5 flex flex-col justify-between shadow-inner">
          <div className="flex items-center justify-between text-xs font-mono text-slate-300">
            <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
              <RotateCw className="w-3.5 h-3.5 animate-spin" /> FEEDING 300 GSM ART CARD
            </span>
            <span className="text-slate-400">REGISTRATION: ⌖ 100% PERFECT</span>
          </div>

          <div className="my-auto text-center space-y-1">
            <div className="inline-block bg-gradient-to-r from-rose-500 via-pink-500 to-amber-500 p-0.5 rounded-2xl shadow-xl">
              <div className="bg-slate-950 px-6 py-2.5 rounded-[14px]">
                <span className="text-lg font-black text-white tracking-widest block uppercase">
                  MOUNTAIN MULTIMEDIA PRESS
                </span>
                <span className="text-xs text-rose-300 font-medium block mt-0.5">
                  Dugure, Malpot Road, Bhaktapur, Nepal
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 border-t border-slate-800/80 pt-2">
            <span>TOK OFFSET PASS 1-4 COMPLETED</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> PERFECT COLORTONE MATCH
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
