export interface GradientPreset {
  id: string;
  name: string;
  cssClass: string;
  previewColors: [string, string];
}

export const GRADIENT_PRESETS: GradientPreset[] = [
  {
    id: "rose-emerald",
    name: "Rose & Emerald (Default)",
    cssClass: "from-rose-500 via-amber-500 to-emerald-500",
    previewColors: ["#f43f5e", "#10b981"],
  },
  {
    id: "sunset-flame",
    name: "Sunset Flame",
    cssClass: "from-rose-600 via-orange-500 to-amber-400",
    previewColors: ["#e11d48", "#fbbf24"],
  },
  {
    id: "deep-navy-rose",
    name: "Deep Navy & Rose",
    cssClass: "from-slate-950 via-slate-900 to-rose-600",
    previewColors: ["#090d16", "#e11d48"],
  },
  {
    id: "teal-cyan",
    name: "Teal & Cyan Breeze",
    cssClass: "from-teal-500 via-emerald-400 to-cyan-500",
    previewColors: ["#14b8a6", "#06b6d4"],
  },
  {
    id: "indigo-violet",
    name: "Royal Violet",
    cssClass: "from-violet-600 via-purple-500 to-pink-500",
    previewColors: ["#7c3aed", "#ec4899"],
  },
];

export const THEME_TOKENS = {
  colors: {
    primary: "#0f172a",
    secondary: "#0284c7",
    accent: "#e11d48",
    background: "#ffffff",
    surface: "#f8fafc",
    border: "#e2e8f0",
  },
  styles: {
    card: "bg-white rounded-3xl p-6 sm:p-8 border border-slate-100 shadow-md shadow-slate-200/50 hover:shadow-xl hover:border-rose-200 transition duration-300",
    adminCard: "bg-white rounded-2xl p-6 border border-slate-200 shadow-sm space-y-4 hover:border-rose-300 transition duration-200",
    buttonPrimary: "px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-lg shadow-rose-600/20 transition duration-300 flex items-center gap-2",
    buttonDark: "px-6 py-3 rounded-xl bg-slate-950 hover:bg-rose-600 text-white font-extrabold text-xs shadow-md transition duration-300 flex items-center gap-2",
    buttonSecondary: "px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs transition duration-200",
    input: "w-full bg-white border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-medium text-slate-900 outline-none focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 transition",
    label: "block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-1.5",
    tabActive: "bg-rose-600 text-white shadow-lg shadow-rose-600/25 font-extrabold",
    tabInactive: "bg-white text-slate-700 hover:bg-slate-100 hover:text-slate-950 border border-slate-200 font-bold",
  },
};
