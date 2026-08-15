"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { signOut } from "@/lib/auth-client";
import {
  Palette,
  Briefcase,
  Image as ImageIcon,
  MessageSquareQuote,
  Layout,
  Plus,
  Trash2,
  Edit2,
  Check,
  Save,
  Loader2,
  Eye,
  EyeOff,
  Star,
  Inbox,
  Settings,
  Mail,
  Phone,
  Clock,
  MapPin,
  Mountain,
  Upload,
  ChevronRight,
  ChevronDown,
  Layers,
  ArrowRight,
  Sparkles,
  Search,
  X,
  ExternalLink,
  ShieldCheck,
  Filter,
  CheckCircle2,
  AlertCircle,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import {
  updateBranding,
  createCategory,
  updateCategory,
  deleteCategory,
  createSubcategory,
  updateSubcategory,
  deleteSubcategory,
  createProduct,
  updateProduct,
  deleteProduct,
  updatePageSection,
  createPageSection,
  deletePageSection,
  updateMessageStatus,
  deleteContactMessage,
  updateSiteSetting,
} from "../actions";
import { GRADIENT_PRESETS } from "@/lib/theme";

interface AdminDashboardProps {
  initialBranding: any;
  initialCatalog: any[];
  initialServices: any[];
  initialGallery: any[];
  initialTestimonials: any[];
  initialPageSections: any[];
  initialMessages: any[];
  initialSettings: any[];
}

export default function AdminDashboard({
  initialBranding,
  initialCatalog,
  initialServices,
  initialGallery,
  initialTestimonials,
  initialPageSections,
  initialMessages,
  initialSettings,
}: AdminDashboardProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"branding" | "catalog" | "content" | "inquiries" | "settings">("branding");

  // Sync tab with URL hash / localStorage
  useEffect(() => {
    const hash = typeof window !== "undefined" ? window.location.hash.replace("#", "") : "";
    const saved = typeof window !== "undefined" ? localStorage.getItem("admin_active_tab") : null;
    const tab = hash || saved;
    if (tab && ["branding", "catalog", "content", "inquiries", "settings"].includes(tab)) {
      setActiveTab(tab as any);
    }
  }, []);

  const changeTab = (tab: "branding" | "catalog" | "content" | "inquiries" | "settings") => {
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      window.location.hash = tab;
      localStorage.setItem("admin_active_tab", tab);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/admin/login");
    router.refresh();
  };

  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [msg, setMsg] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // States
  const [branding, setBranding] = useState(initialBranding);
  const [catalog, setCatalog] = useState(initialCatalog);
  const [pageSections, setPageSections] = useState(initialPageSections);
  const [messages, setMessages] = useState(initialMessages);
  const [settings, setSettings] = useState(initialSettings);

  // Active Catalog selections
  const [selectedCatId, setSelectedCatId] = useState<number | string>(initialCatalog[0]?.id || "");
  const [selectedSubId, setSelectedSubId] = useState<number | string>("");

  // Modal / Editing states
  const [categoryModal, setCategoryModal] = useState<any | null>(null);
  const [subcategoryModal, setSubcategoryModal] = useState<any | null>(null);
  const [productModal, setProductModal] = useState<any | null>(null);

  const unreadCount = useMemo(() => messages.filter((m) => m.status === "unread").length, [messages]);

  // Derived Catalog Calculations
  const activeCategory = useMemo(() => {
    return catalog.find((c) => c.id === selectedCatId) || catalog[0] || null;
  }, [catalog, selectedCatId]);

  const activeSubcategory = useMemo(() => {
    if (!activeCategory || !activeCategory.subcategories) return null;
    return activeCategory.subcategories.find((s: any) => s.id === selectedSubId) || activeCategory.subcategories[0] || null;
  }, [activeCategory, selectedSubId]);

  const totalProductsCount = useMemo(() => {
    return catalog.reduce((acc, cat) => {
      const subCount = cat.subcategories ? cat.subcategories.reduce((sAcc: number, s: any) => sAcc + (s.products ? s.products.length : 0), 0) : 0;
      return acc + subCount;
    }, 0);
  }, [catalog]);

  const showNotification = (text: string) => {
    setMsg(text);
    setTimeout(() => setMsg(""), 3500);
  };

  // Helper for native image upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, onSuccess: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.url) {
        onSuccess(data.url);
        showNotification("Image uploaded successfully!");
      } else {
        alert(data.error || "Upload failed");
      }
    } catch (err: any) {
      alert("Error uploading file: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  // BRANDING SAVE
  const handleSaveBranding = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateBranding(branding);
      showNotification("Branding & Design preferences saved!");
    } catch (err: any) {
      alert(err.message || "Failed to update branding.");
    } finally {
      setSaving(false);
    }
  };

  // CATEGORY ACTIONS
  const handleSaveCategory = async (data: any) => {
    setSaving(true);
    try {
      if (data.id) {
        await updateCategory(data.id, data);
        setCatalog(catalog.map((c) => (c.id === data.id ? { ...c, ...data } : c)));
        showNotification("Category updated!");
      } else {
        const created = await createCategory(data);
        setCatalog([...catalog, { ...created, subcategories: [] }]);
        setSelectedCatId(created.id);
        showNotification("New category created!");
      }
      setCategoryModal(null);
    } catch (err: any) {
      alert(err.message || "Operation failed.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    if (!confirm("Are you sure you want to delete this category? All subcategories and products inside will be deleted!")) return;
    try {
      await deleteCategory(id);
      const nextCatalog = catalog.filter((c) => c.id !== id);
      setCatalog(nextCatalog);
      if (nextCatalog[0]) setSelectedCatId(nextCatalog[0].id);
      showNotification("Category deleted.");
    } catch (err: any) {
      alert(err.message || "Failed to delete category.");
    }
  };

  // SUBCATEGORY ACTIONS
  const handleSaveSubcategory = async (data: any) => {
    setSaving(true);
    try {
      if (data.id) {
        await updateSubcategory(data.id, data);
        setCatalog(
          catalog.map((cat) => {
            if (cat.id === activeCategory.id) {
              return {
                ...cat,
                subcategories: cat.subcategories.map((s: any) => (s.id === data.id ? { ...s, ...data } : s)),
              };
            }
            return cat;
          })
        );
        showNotification("Subcategory updated!");
      } else {
        const created = await createSubcategory(data);
        setCatalog(
          catalog.map((cat) => {
            if (cat.id === activeCategory.id) {
              return {
                ...cat,
                subcategories: [...cat.subcategories, { ...created, products: [] }],
              };
            }
            return cat;
          })
        );
        setSelectedSubId(created.id);
        showNotification("New subcategory created!");
      }
      setSubcategoryModal(null);
    } catch (err: any) {
      alert(err.message || "Operation failed.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSubcategory = async (id: number) => {
    if (!confirm("Delete this subcategory and all products inside it?")) return;
    try {
      await deleteSubcategory(id);
      setCatalog(
        catalog.map((cat) => {
          if (cat.id === activeCategory.id) {
            return {
              ...cat,
              subcategories: cat.subcategories.filter((s: any) => s.id !== id),
            };
          }
          return cat;
        })
      );
      showNotification("Subcategory deleted.");
    } catch (err: any) {
      alert(err.message || "Failed to delete subcategory.");
    }
  };

  // PRODUCT ACTIONS
  const handleSaveProduct = async (data: any) => {
    setSaving(true);
    try {
      if (data.id) {
        await updateProduct(data.id, data);
        setCatalog(
          catalog.map((cat) => {
            if (cat.id === activeCategory.id) {
              return {
                ...cat,
                subcategories: cat.subcategories.map((sub: any) => {
                  if (sub.id === activeSubcategory.id) {
                    return {
                      ...sub,
                      products: sub.products.map((p: any) => (p.id === data.id ? { ...p, ...data } : p)),
                    };
                  }
                  return sub;
                }),
              };
            }
            return cat;
          })
        );
        showNotification("Product updated!");
      } else {
        const created = await createProduct(data);
        setCatalog(
          catalog.map((cat) => {
            if (cat.id === activeCategory.id) {
              return {
                ...cat,
                subcategories: cat.subcategories.map((sub: any) => {
                  if (sub.id === activeSubcategory.id) {
                    return {
                      ...sub,
                      products: [...sub.products, created],
                    };
                  }
                  return sub;
                }),
              };
            }
            return cat;
          })
        );
        showNotification("New product created!");
      }
      setProductModal(null);
    } catch (err: any) {
      alert(err.message || "Operation failed.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm("Delete this product?")) return;
    try {
      await deleteProduct(id);
      setCatalog(
        catalog.map((cat) => {
          if (cat.id === activeCategory.id) {
            return {
              ...cat,
              subcategories: cat.subcategories.map((sub: any) => {
                if (sub.id === activeSubcategory.id) {
                  return {
                    ...sub,
                    products: sub.products.filter((p: any) => p.id !== id),
                  };
                }
                return sub;
              }),
            };
          }
          return cat;
        })
      );
      showNotification("Product deleted.");
    } catch (err: any) {
      alert(err.message || "Failed to delete product.");
    }
  };

  // GENERAL CONTENT ACTIONS
  const handleUpdateSection = async (sec: any) => {
    setSaving(true);
    try {
      await updatePageSection(sec.id, sec);
      setPageSections(pageSections.map((s) => (s.id === sec.id ? sec : s)));
      showNotification(`Section copy updated!`);
    } catch (err: any) {
      alert(err.message || "Failed to update section.");
    } finally {
      setSaving(false);
    }
  };

  const handleStatusChange = async (id: number, status: "unread" | "read" | "replied") => {
    try {
      await updateMessageStatus(id, status);
      setMessages(messages.map((m) => (m.id === id ? { ...m, status } : m)));
      showNotification(`Inquiry marked as ${status}.`);
    } catch (err: any) {
      alert(err.message || "Status update failed.");
    }
  };

  const handleDeleteMessage = async (id: number) => {
    if (!confirm("Delete this customer inquiry?")) return;
    try {
      await deleteContactMessage(id);
      setMessages(messages.filter((m) => m.id !== id));
      showNotification("Inquiry deleted.");
    } catch (err: any) {
      alert(err.message || "Failed to delete inquiry.");
    }
  };

  const handleSaveSetting = async (key: string, value: string) => {
    setSaving(true);
    try {
      await updateSiteSetting(key, value);
      showNotification(`Setting '${key}' saved.`);
    } catch (err: any) {
      alert(err.message || "Failed to save setting.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-900 font-sans selection:bg-rose-500 selection:text-white pb-24">
      {/* Toast Notification */}
      {msg && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 text-white font-extrabold px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom duration-200 text-xs border border-rose-500/30">
          <div className="w-6 h-6 rounded-full bg-rose-600 text-white flex items-center justify-center shrink-0">
            <Check className="w-3.5 h-3.5" />
          </div>
          <span>{msg}</span>
        </div>
      )}

      {/* TOPBAR HEADER */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-center shrink-0 overflow-hidden p-1">
              {branding.logoUrl ? (
                <img src={branding.logoUrl} alt="Logo" className="w-full h-full object-contain" />
              ) : (
                <Mountain className="w-5 h-5 text-rose-500" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl font-black tracking-tight text-slate-950 block leading-none whitespace-nowrap">
                  {branding.siteName || "Mountain Multimedia Service"}
                </span>
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-700 text-[10px] font-black uppercase border border-emerald-200 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Live Sync
                </span>
              </div>
              <span className="text-[10px] text-rose-600 font-extrabold tracking-wider uppercase block mt-1 whitespace-nowrap">
                Admin Control Dashboard
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/"
              target="_blank"
              className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-extrabold text-xs transition flex items-center gap-2 border border-slate-200"
            >
              <span>View Public Website</span>
              <ExternalLink className="w-3.5 h-3.5 text-slate-500" />
            </Link>

            <button
              onClick={handleSignOut}
              className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-md shadow-rose-600/20 transition flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <div className="max-w-7xl mx-auto px-6 pt-6 space-y-6">
        {/* STATS CUE BANNER */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-rose-50 border border-rose-100 text-rose-600 flex items-center justify-center shrink-0">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">
                Top Categories
              </span>
              <span className="text-2xl font-black text-slate-950">{catalog.length}</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-100 text-sky-600 flex items-center justify-center shrink-0">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">
                Total Products
              </span>
              <span className="text-2xl font-black text-slate-950">{totalProductsCount}</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">
                Database Status
              </span>
              <span className="text-sm font-black text-emerald-600">SQLite Connected</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-slate-200/80 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 border border-amber-100 text-amber-600 flex items-center justify-center shrink-0">
              <Inbox className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-extrabold text-slate-400 uppercase tracking-wider block">
                Pending Inquiries
              </span>
              <span className="text-2xl font-black text-slate-950">{unreadCount}</span>
            </div>
          </div>
        </div>

        {/* TAB NAVIGATION PILLS */}
        <div className="bg-white p-2 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            onClick={() => changeTab("branding")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-black transition shrink-0 ${
              activeTab === "branding"
                ? "bg-rose-600 text-white shadow-md shadow-rose-600/25"
                : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
            }`}
          >
            <Palette className="w-4 h-4" />
            <span>1. Branding & Theme</span>
          </button>

          <button
            onClick={() => changeTab("catalog")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-black transition shrink-0 ${
              activeTab === "catalog"
                ? "bg-rose-600 text-white shadow-md shadow-rose-600/25"
                : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>2. Catalog Manager ({catalog.length} Categories)</span>
          </button>

          <button
            onClick={() => changeTab("content")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-black transition shrink-0 ${
              activeTab === "content"
                ? "bg-rose-600 text-white shadow-md shadow-rose-600/25"
                : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
            }`}
          >
            <Layout className="w-4 h-4" />
            <span>3. Website Copy & Hero</span>
          </button>

          <button
            onClick={() => changeTab("inquiries")}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-black transition shrink-0 relative ${
              activeTab === "inquiries"
                ? "bg-rose-600 text-white shadow-md shadow-rose-600/25"
                : "text-slate-600 hover:text-slate-950 hover:bg-slate-50"
            }`}
          >
            <Inbox className="w-4 h-4" />
            <span>4. Customer Inquiries ({messages.length})</span>
            {unreadCount > 0 && (
              <span className="px-1.5 py-0.5 text-[10px] bg-amber-400 text-slate-950 rounded-full font-black ml-1">
                {unreadCount}
              </span>
            )}
          </button>
        </div>

        {/* TAB 1: BRANDING & THEME */}
        {activeTab === "branding" && (
          <form onSubmit={handleSaveBranding} className="space-y-6">
            {/* BRANDING MEDIA CARD */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[10px] font-black uppercase text-rose-600 tracking-widest block">
                  BRAND IDENTITY & ASSETS
                </span>
                <h2 className="text-xl font-black text-slate-950">Shop Logo & Favicon Media</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Header Logo Box */}
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4 text-center">
                  <span className="text-xs font-black text-slate-700 uppercase tracking-wider block">
                    Website Header Logo
                  </span>
                  <div className="w-24 h-24 mx-auto rounded-2xl bg-white border border-slate-200 flex items-center justify-center p-2 shadow-md overflow-hidden shrink-0">
                    {branding.logoUrl ? (
                      <img src={branding.logoUrl} alt="Logo Preview" className="w-full h-full object-contain" />
                    ) : (
                      <Mountain className="w-10 h-10 text-rose-500" />
                    )}
                  </div>
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-950 hover:bg-rose-600 text-white font-extrabold text-xs transition">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Logo File</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, (url) => setBranding({ ...branding, logoUrl: url }))}
                    />
                  </label>
                  <input
                    type="text"
                    placeholder="Or paste Logo URL"
                    value={branding.logoUrl || ""}
                    onChange={(e) => setBranding({ ...branding, logoUrl: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-[11px] text-slate-800 outline-none font-mono"
                  />
                </div>

                {/* Site Favicon Box */}
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4 text-center">
                  <span className="text-xs font-black text-slate-700 uppercase tracking-wider block">
                    Browser Favicon / Icon
                  </span>
                  <div className="w-24 h-24 mx-auto rounded-2xl bg-white border border-slate-200 flex items-center justify-center p-3 shadow-inner">
                    {branding.faviconUrl ? (
                      <img src={branding.faviconUrl} alt="Favicon Preview" className="w-full h-full object-contain" />
                    ) : (
                      <Sparkles className="w-10 h-10 text-amber-500" />
                    )}
                  </div>
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-950 hover:bg-rose-600 text-white font-extrabold text-xs transition">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Site Icon</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, (url) => setBranding({ ...branding, faviconUrl: url }))}
                    />
                  </label>
                  <input
                    type="text"
                    placeholder="Or paste Icon URL"
                    value={branding.faviconUrl || ""}
                    onChange={(e) => setBranding({ ...branding, faviconUrl: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-[11px] text-slate-800 outline-none font-mono"
                  />
                </div>

                {/* Hero Banner Box */}
                <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4 text-center">
                  <span className="text-xs font-black text-slate-700 uppercase tracking-wider block">
                    Homepage Hero Image
                  </span>
                  <div className="w-full h-24 rounded-2xl bg-white border border-slate-200 overflow-hidden shadow-inner relative">
                    <img
                      src={branding.heroImageUrl || "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80"}
                      alt="Hero Preview"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-950 hover:bg-rose-600 text-white font-extrabold text-xs transition">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Hero Media</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, (url) => setBranding({ ...branding, heroImageUrl: url }))}
                    />
                  </label>
                  <input
                    type="text"
                    placeholder="Or paste Hero Image URL"
                    value={branding.heroImageUrl || ""}
                    onChange={(e) => setBranding({ ...branding, heroImageUrl: e.target.value })}
                    className="w-full bg-white border border-slate-200 rounded-xl px-3 py-2 text-[11px] text-slate-800 outline-none font-mono"
                  />
                </div>
              </div>
            </div>

            {/* COLOR PALETTE & GRADIENTS */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div>
                  <span className="text-[10px] font-black uppercase text-rose-600 tracking-widest block">
                    VISUAL SYSTEM
                  </span>
                  <h2 className="text-xl font-black text-slate-950">Brand Colors & Presets</h2>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
                    Primary Slate Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={branding.primaryColor || "#0f172a"}
                      onChange={(e) => setBranding({ ...branding, primaryColor: e.target.value })}
                      className="w-12 h-12 rounded-xl cursor-pointer bg-transparent border-0"
                    />
                    <input
                      type="text"
                      value={branding.primaryColor || "#0f172a"}
                      onChange={(e) => setBranding({ ...branding, primaryColor: e.target.value })}
                      className="flex-1 bg-white border border-slate-200 text-slate-900 text-xs font-mono font-bold rounded-xl px-3 py-2 outline-none"
                    />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
                    Secondary Accent Color
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={branding.secondaryColor || "#0284c7"}
                      onChange={(e) => setBranding({ ...branding, secondaryColor: e.target.value })}
                      className="w-12 h-12 rounded-xl cursor-pointer bg-transparent border-0"
                    />
                    <input
                      type="text"
                      value={branding.secondaryColor || "#0284c7"}
                      onChange={(e) => setBranding({ ...branding, secondaryColor: e.target.value })}
                      className="flex-1 bg-white border border-slate-200 text-slate-900 text-xs font-mono font-bold rounded-xl px-3 py-2 outline-none"
                    />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
                  <label className="block text-xs font-black text-slate-700 uppercase tracking-wider">
                    Crimson Rose Accent
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="color"
                      value={branding.accentColor || "#e11d48"}
                      onChange={(e) => setBranding({ ...branding, accentColor: e.target.value })}
                      className="w-12 h-12 rounded-xl cursor-pointer bg-transparent border-0"
                    />
                    <input
                      type="text"
                      value={branding.accentColor || "#e11d48"}
                      onChange={(e) => setBranding({ ...branding, accentColor: e.target.value })}
                      className="flex-1 bg-white border border-slate-200 text-slate-900 text-xs font-mono font-bold rounded-xl px-3 py-2 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* SHOP CONTACT DETAILS */}
            <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <span className="text-[10px] font-black uppercase text-rose-600 tracking-widest block">
                  CONTACT DETAILS
                </span>
                <h2 className="text-xl font-black text-slate-950">Shop Name & Contact Copy</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1">Shop Name</label>
                  <input
                    type="text"
                    value={branding.siteName || ""}
                    onChange={(e) => setBranding({ ...branding, siteName: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-900 outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1">Tagline</label>
                  <input
                    type="text"
                    value={branding.tagline || ""}
                    onChange={(e) => setBranding({ ...branding, tagline: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-900 outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1">Contact Email</label>
                  <input
                    type="email"
                    value={branding.contactEmail || ""}
                    onChange={(e) => setBranding({ ...branding, contactEmail: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-900 outline-none focus:border-rose-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-extrabold uppercase text-slate-700 mb-1">Phone Numbers</label>
                  <input
                    type="text"
                    value={branding.contactPhone || ""}
                    onChange={(e) => setBranding({ ...branding, contactPhone: e.target.value })}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs font-bold text-slate-900 outline-none focus:border-rose-500"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={saving || uploading}
                className="px-8 py-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs shadow-xl shadow-rose-600/30 transition flex items-center gap-2 disabled:opacity-50"
              >
                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                <span>Save Branding Settings</span>
              </button>
            </div>
          </form>
        )}

        {/* TAB 2: CATALOG MANAGER (CLEAN STRUCTURED SPLIT VIEW) */}
        {activeTab === "catalog" && (
          <div className="space-y-6">
            {/* TOP CATEGORIES SELECTOR STRIP */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <span className="text-[10px] font-black uppercase text-rose-600 tracking-widest block">
                  TOP-LEVEL CATEGORIES ({catalog.length})
                </span>
                <button
                  onClick={() =>
                    setCategoryModal({
                      name: "",
                      slug: "",
                      description: "",
                      iconName: "Printer",
                      imageUrl: "https://images.unsplash.com/photo-1562564077-715947276f95?auto=format&fit=crop&w=800&q=80",
                      isActive: true,
                    })
                  }
                  className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-rose-600 text-white font-extrabold text-xs transition flex items-center gap-1.5 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New Top Category</span>
                </button>
              </div>

              {/* Category Pills Bar */}
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
                {catalog.map((cat) => {
                  const isSelected = activeCategory?.id === cat.id;
                  const subCount = cat.subcategories ? cat.subcategories.length : 0;

                  return (
                    <div
                      key={cat.id}
                      onClick={() => {
                        setSelectedCatId(cat.id);
                        if (cat.subcategories && cat.subcategories[0]) {
                          setSelectedSubId(cat.subcategories[0].id);
                        } else {
                          setSelectedSubId("");
                        }
                      }}
                      className={`px-4 py-2.5 rounded-xl border text-xs font-bold cursor-pointer transition flex items-center gap-2 shrink-0 ${
                        isSelected
                          ? "bg-rose-600 text-white border-rose-600 shadow-md"
                          : "bg-slate-50 text-slate-700 border-slate-200/80 hover:bg-slate-100"
                      }`}
                    >
                      <span>{cat.name}</span>
                      <span
                        className={`px-2 py-0.5 rounded-md text-[10px] font-black ${
                          isSelected ? "bg-white/20 text-white" : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {subCount} subs
                      </span>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCategoryModal(cat);
                        }}
                        className="p-1 rounded hover:bg-black/10"
                        title="Edit category"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* SPLIT VIEW WORKSPACE: SUBCATEGORIES (LEFT) & PRODUCTS GRID (RIGHT) */}
            {activeCategory && (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* LEFT COLUMN: SUBCATEGORIES LIST */}
                <div className="lg:col-span-4 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md space-y-4">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <div>
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block">
                        SUBCATEGORIES
                      </span>
                      <h3 className="text-sm font-black text-slate-950">{activeCategory.name}</h3>
                    </div>
                    <button
                      onClick={() =>
                        setSubcategoryModal({
                          categoryId: activeCategory.id,
                          name: "",
                          slug: "",
                          description: "",
                          imageUrl: "",
                          isActive: true,
                        })
                      }
                      className="p-2 rounded-xl bg-rose-50 text-rose-600 hover:bg-rose-600 hover:text-white transition font-bold text-xs flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Sub</span>
                    </button>
                  </div>

                  <div className="space-y-2 max-h-[500px] overflow-y-auto no-scrollbar">
                    {activeCategory.subcategories?.map((sub: any) => {
                      const isSelected = activeSubcategory?.id === sub.id;
                      const prodCount = sub.products ? sub.products.length : 0;

                      return (
                        <div
                          key={sub.id}
                          onClick={() => setSelectedSubId(sub.id)}
                          className={`p-3.5 rounded-2xl border text-xs cursor-pointer transition flex items-center justify-between ${
                            isSelected
                              ? "bg-slate-950 text-white border-slate-950 shadow-md font-bold"
                              : "bg-slate-50 text-slate-800 border-slate-200/80 hover:border-slate-300"
                          }`}
                        >
                          <div>
                            <span className="block truncate font-bold">{sub.name}</span>
                            <span
                              className={`text-[10px] font-mono ${
                                isSelected ? "text-slate-300" : "text-slate-400"
                              }`}
                            >
                              {prodCount} Products
                            </span>
                          </div>

                          <div className="flex items-center gap-1">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setSubcategoryModal(sub);
                              }}
                              className="p-1.5 rounded-lg hover:bg-white/20"
                            >
                              <Edit2 className="w-3 h-3" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteSubcategory(sub.id);
                              }}
                              className="p-1.5 rounded-lg hover:bg-white/20 text-rose-400"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* RIGHT COLUMN: PRODUCTS LIST FOR SELECTED SUBCATEGORY */}
                <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-slate-200/80 shadow-md space-y-6">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                    <div>
                      <span className="text-[10px] font-black uppercase text-rose-600 tracking-widest block">
                        PRODUCTS & SERVICES
                      </span>
                      <h3 className="text-base font-black text-slate-950">
                        {activeSubcategory ? activeSubcategory.name : "Select a Subcategory"}
                      </h3>
                    </div>

                    {activeSubcategory && (
                      <button
                        onClick={() =>
                          setProductModal({
                            subcategoryId: activeSubcategory.id,
                            name: "",
                            slug: "",
                            description: "",
                            paperSpec: "",
                            price: "",
                            isActive: true,
                          })
                        }
                        className="px-4 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-extrabold text-xs shadow-md transition flex items-center gap-1.5"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Add New Product</span>
                      </button>
                    )}
                  </div>

                  {/* PRODUCTS GRID */}
                  {!activeSubcategory || !activeSubcategory.products || activeSubcategory.products.length === 0 ? (
                    <div className="p-12 text-center text-slate-400">
                      <Briefcase className="w-10 h-10 mx-auto text-slate-300 mb-2" />
                      <p className="text-xs font-bold">No products in this subcategory.</p>
                      <p className="text-[11px] text-slate-400 mt-1">Click 'Add New Product' above to add items.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {activeSubcategory.products.map((prod: any) => (
                        <div
                          key={prod.id}
                          className="p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3 hover:border-rose-200 transition"
                        >
                          <div className="flex items-start justify-between">
                            <div>
                              <span className="font-extrabold text-xs text-slate-950 block">{prod.name}</span>
                              {prod.paperSpec && (
                                <span className="text-[10px] font-mono text-slate-500 block mt-0.5">
                                  • Spec: {prod.paperSpec}
                                </span>
                              )}
                            </div>
                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => setProductModal(prod)}
                                className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-rose-600"
                              >
                                <Edit2 className="w-3 h-3" />
                              </button>
                              <button
                                onClick={() => handleDeleteProduct(prod.id)}
                                className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 hover:text-red-600"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          </div>

                          <p className="text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                            {prod.description}
                          </p>

                          <div className="flex items-center justify-between pt-2 border-t border-slate-200/60">
                            <span className="text-[10px] font-mono text-slate-400">
                              /product/{prod.slug}
                            </span>
                            <Link
                              href={`/product/${prod.slug}`}
                              target="_blank"
                              className="text-[10px] font-extrabold text-rose-600 hover:underline flex items-center gap-0.5"
                            >
                              <span>Preview</span>
                              <ExternalLink className="w-2.5 h-2.5" />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: WEBSITE COPY & HERO */}
        {activeTab === "content" && (
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-black uppercase text-rose-600 tracking-widest block">
                  PAGE COPY & PROMOTIONAL SECTIONS
                </span>
                <h2 className="text-xl font-black text-slate-950">Homepage & Header Copy Editor</h2>
              </div>

              <button
                onClick={async () => {
                  setSaving(true);
                  try {
                    const defaultSecs = [
                      {
                        sectionKey: "hero",
                        title: "Bhaktapur's Premier Design & High Definition Printing Press",
                        subtitle: "A Complete Design & Printing Solution in Dugure, Malpot Road",
                        content: "From studio photo prints, customized frames, Star Flex signboards, and NCR bill pads to sub-second passport photos. Complete indoor & outdoor media production with fast same-day delivery.",
                        imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80",
                        isVisible: true,
                      },
                      {
                        sectionKey: "about",
                        title: "Crafting High-Precision Printing Solutions in Bhaktapur",
                        subtitle: "Your local trusted press for quality print, photo studio & outdoor advertising",
                        content: "Mountain Multimedia Service is a full-service printing press & digital photo studio located in Dugure, Malpot Road, Bhaktapur.",
                        imageUrl: "https://images.unsplash.com/photo-1562564077-715947276f95?auto=format&fit=crop&w=800&q=80",
                        isVisible: true,
                      },
                      {
                        sectionKey: "services_header",
                        title: "Explore Our Full Printing Services & Studio Catalog",
                        subtitle: "10 Specialized Categories, 46 Subcategories & 131 Products",
                        content: "Browse our complete catalog below to inspect materials, paper GSM specs, sizes, and turnaround times.",
                        imageUrl: "",
                        isVisible: true,
                      },
                      {
                        sectionKey: "contact_header",
                        title: "Get In Touch or Order Direct via WhatsApp",
                        subtitle: "Visit our shop in Dugure, Malpot Road, Bhaktapur or call us directly.",
                        content: "We are open Daily from 8:00 AM – 7:00 PM. Call 9841693181 / 9861550233 / 9849425342.",
                        imageUrl: "",
                        isVisible: true,
                      },
                    ];

                    const createdList = [];
                    for (const s of defaultSecs) {
                      const created = await createPageSection(s);
                      createdList.push(created);
                    }
                    setPageSections(createdList);
                    showNotification("Default page sections initialized!");
                  } catch (err: any) {
                    alert(err.message || "Failed to initialize sections.");
                  } finally {
                    setSaving(false);
                  }
                }}
                className="px-4 py-2 rounded-xl bg-slate-950 hover:bg-rose-600 text-white font-extrabold text-xs transition flex items-center gap-1.5 shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Initialize Default Sections</span>
              </button>
            </div>

            {pageSections.length === 0 ? (
              <div className="p-12 text-center text-slate-400 bg-slate-50 rounded-2xl border border-slate-200/80">
                <Layout className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                <p className="text-sm font-black text-slate-700">No page sections found in database.</p>
                <p className="text-xs text-slate-500 mt-1 mb-4">
                  Click 'Initialize Default Sections' above to generate editable copy blocks for Hero, About, Services Header, and Contact Header.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {pageSections.map((sec) => (
                  <div key={sec.id} className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
                    <div className="flex items-center justify-between border-b border-slate-200/80 pb-3">
                      <span className="font-mono text-xs font-black text-rose-600 uppercase">
                        Section Key: {sec.sectionKey}
                      </span>
                      <button
                        onClick={() => handleUpdateSection({ ...sec, isVisible: !sec.isVisible })}
                        className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition flex items-center gap-1.5 ${
                          sec.isVisible ? "bg-emerald-100 text-emerald-800 border border-emerald-300" : "bg-slate-200 text-slate-600"
                        }`}
                      >
                        {sec.isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                        <span>{sec.isVisible ? "Visible on Site" : "Hidden"}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-black uppercase text-slate-700 mb-1">Title</label>
                        <input
                          type="text"
                          value={sec.title || ""}
                          onChange={(e) =>
                            setPageSections(
                              pageSections.map((s) => (s.id === sec.id ? { ...s, title: e.target.value } : s))
                            )
                          }
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs font-bold text-slate-900"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-black uppercase text-slate-700 mb-1">Subtitle</label>
                        <input
                          type="text"
                          value={sec.subtitle || ""}
                          onChange={(e) =>
                            setPageSections(
                              pageSections.map((s) => (s.id === sec.id ? { ...s, subtitle: e.target.value } : s))
                            )
                          }
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-black uppercase text-slate-700 mb-1">Content Body</label>
                        <textarea
                          rows={3}
                          value={sec.content || ""}
                          onChange={(e) =>
                            setPageSections(
                              pageSections.map((s) => (s.id === sec.id ? { ...s, content: e.target.value } : s))
                            )
                          }
                          className="w-full bg-white border border-slate-200 rounded-xl px-4 py-2 text-xs text-slate-900"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-black uppercase text-slate-700 mb-1">
                          Section Media (Image URL / Upload)
                        </label>
                        {sec.imageUrl && (
                          <div className="w-full h-32 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 mb-2 relative">
                            <img src={sec.imageUrl} alt="Section media" className="w-full h-full object-cover" />
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            placeholder="Paste image URL (https://...)"
                            value={sec.imageUrl || ""}
                            onChange={(e) =>
                              setPageSections(
                                pageSections.map((s) => (s.id === sec.id ? { ...s, imageUrl: e.target.value } : s))
                              )
                            }
                            className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-2 text-[11px] font-mono text-slate-800"
                          />
                          <label className="cursor-pointer px-4 py-2 rounded-xl bg-slate-950 hover:bg-rose-600 text-white font-bold text-xs shrink-0 flex items-center gap-1 transition">
                            <Upload className="w-3.5 h-3.5" />
                            <span>Upload</span>
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) =>
                                handleFileUpload(e, (url) =>
                                  setPageSections(
                                    pageSections.map((s) => (s.id === sec.id ? { ...s, imageUrl: url } : s))
                                  )
                                )
                              }
                            />
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-end">
                      <button
                        onClick={() => handleUpdateSection(sec)}
                        className="px-6 py-2.5 bg-slate-950 hover:bg-rose-600 text-white rounded-xl text-xs font-black transition"
                      >
                        Save Section Copy
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 4: CUSTOMER INQUIRIES */}
        {activeTab === "inquiries" && (
          <div className="bg-white rounded-3xl p-8 border border-slate-200/80 shadow-md space-y-6">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-black uppercase text-rose-600 tracking-widest block">
                  CUSTOMER MESSAGES
                </span>
                <h2 className="text-xl font-black text-slate-950">Inquiries & Quotes Inbox</h2>
              </div>
              <span className="px-3 py-1 bg-slate-100 text-slate-800 text-xs font-black rounded-xl border border-slate-200">
                Total: {messages.length}
              </span>
            </div>

            {messages.length === 0 ? (
              <div className="p-12 text-center text-slate-400">
                <Inbox className="w-12 h-12 mx-auto text-slate-300 mb-2" />
                <p className="text-xs font-black">No inquiries received yet.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((item) => (
                  <div
                    key={item.id}
                    className={`p-6 rounded-2xl border transition ${
                      item.status === "unread" ? "border-rose-300 bg-rose-50/20" : "border-slate-200 bg-white"
                    }`}
                  >
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-950 text-white font-black text-xs flex items-center justify-center">
                          {item.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <span className="font-black text-slate-950 text-xs block">{item.name}</span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {item.createdAt ? new Date(item.createdAt).toLocaleString() : ""}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <select
                          value={item.status}
                          onChange={(e) => handleStatusChange(item.id, e.target.value as any)}
                          className="text-xs font-bold px-3 py-1.5 rounded-xl border border-slate-200 bg-white outline-none"
                        >
                          <option value="unread">Unread</option>
                          <option value="read">Read</option>
                          <option value="replied">Replied</option>
                        </select>
                        <button onClick={() => handleDeleteMessage(item.id)} className="p-2 text-slate-400 hover:text-rose-600">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-bold text-slate-700 mb-3">
                      {item.phone && <div>Phone: <a href={`tel:${item.phone}`} className="text-rose-600">{item.phone}</a></div>}
                      {item.email && <div>Email: <a href={`mailto:${item.email}`} className="text-rose-600">{item.email}</a></div>}
                    </div>

                    <p className="text-xs text-slate-800 bg-slate-50 p-4 rounded-xl border border-slate-200/80 whitespace-pre-wrap font-medium">
                      {item.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* OVERLAY MODAL: EDIT CATEGORY */}
      {categoryModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-950">
                {categoryModal.id ? "Edit Category" : "New Category"}
              </h3>
              <button onClick={() => setCategoryModal(null)} className="p-1 rounded-lg text-slate-400 hover:text-slate-900">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-black text-slate-700 mb-1">Category Name</label>
                <input
                  type="text"
                  value={categoryModal.name}
                  onChange={(e) => setCategoryModal({ ...categoryModal, name: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl p-2.5 font-bold"
                />
              </div>

              <div>
                <label className="block font-black text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={categoryModal.description || ""}
                  onChange={(e) => setCategoryModal({ ...categoryModal, description: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="block font-black text-slate-700 mb-1">Image URL / Upload</label>
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={categoryModal.imageUrl || ""}
                    onChange={(e) => setCategoryModal({ ...categoryModal, imageUrl: e.target.value })}
                    className="flex-1 border border-slate-200 rounded-xl p-2.5 font-mono text-[11px]"
                  />
                  <label className="cursor-pointer px-3 py-2.5 rounded-xl bg-slate-950 text-white font-bold text-xs shrink-0 flex items-center gap-1">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, (url) => setCategoryModal({ ...categoryModal, imageUrl: url }))}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button onClick={() => setCategoryModal(null)} className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-bold">
                Cancel
              </button>
              <button
                onClick={() => handleSaveCategory(categoryModal)}
                className="px-5 py-2 rounded-xl bg-rose-600 text-white text-xs font-black"
              >
                Save Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OVERLAY MODAL: EDIT SUBCATEGORY */}
      {subcategoryModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-950">
                {subcategoryModal.id ? "Edit Subcategory" : "New Subcategory"}
              </h3>
              <button onClick={() => setSubcategoryModal(null)} className="p-1 rounded-lg text-slate-400 hover:text-slate-900">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-black text-slate-700 mb-1">Subcategory Name</label>
                <input
                  type="text"
                  value={subcategoryModal.name}
                  onChange={(e) => setSubcategoryModal({ ...subcategoryModal, name: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl p-2.5 font-bold"
                />
              </div>

              <div>
                <label className="block font-black text-slate-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  value={subcategoryModal.description || ""}
                  onChange={(e) => setSubcategoryModal({ ...subcategoryModal, description: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="block font-black text-slate-700 mb-1">Subcategory Image (Upload or Link)</label>
                {subcategoryModal.imageUrl && (
                  <div className="w-full h-24 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 mb-2 relative">
                    <img src={subcategoryModal.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Paste image URL (https://...)"
                    value={subcategoryModal.imageUrl || ""}
                    onChange={(e) => setSubcategoryModal({ ...subcategoryModal, imageUrl: e.target.value })}
                    className="flex-1 border border-slate-200 rounded-xl p-2.5 font-mono text-[11px]"
                  />
                  <label className="cursor-pointer px-3 py-2.5 rounded-xl bg-slate-950 hover:bg-rose-600 text-white font-bold text-xs shrink-0 flex items-center gap-1 transition">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, (url) => setSubcategoryModal({ ...subcategoryModal, imageUrl: url }))}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button onClick={() => setSubcategoryModal(null)} className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-bold">
                Cancel
              </button>
              <button
                onClick={() => handleSaveSubcategory(subcategoryModal)}
                className="px-5 py-2 rounded-xl bg-rose-600 text-white text-xs font-black"
              >
                Save Subcategory
              </button>
            </div>
          </div>
        </div>
      )}

      {/* OVERLAY MODAL: EDIT PRODUCT */}
      {productModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-black text-slate-950">
                {productModal.id ? "Edit Product" : "New Product"}
              </h3>
              <button onClick={() => setProductModal(null)} className="p-1 rounded-lg text-slate-400 hover:text-slate-900">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-black text-slate-700 mb-1">Product Name</label>
                <input
                  type="text"
                  value={productModal.name}
                  onChange={(e) => setProductModal({ ...productModal, name: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl p-2.5 font-bold"
                />
              </div>

              <div>
                <label className="block font-black text-slate-700 mb-1">Paper Specification (e.g. 300 GSM Art Card)</label>
                <input
                  type="text"
                  value={productModal.paperSpec || ""}
                  onChange={(e) => setProductModal({ ...productModal, paperSpec: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="block font-black text-slate-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={productModal.description || ""}
                  onChange={(e) => setProductModal({ ...productModal, description: e.target.value })}
                  className="w-full border border-slate-200 rounded-xl p-2.5"
                />
              </div>

              <div>
                <label className="block font-black text-slate-700 mb-1">Product Image (Upload or Link)</label>
                {productModal.imageUrl && (
                  <div className="w-full h-24 rounded-xl overflow-hidden bg-slate-100 border border-slate-200 mb-2 relative">
                    <img src={productModal.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Paste image URL (https://...)"
                    value={productModal.imageUrl || ""}
                    onChange={(e) => setProductModal({ ...productModal, imageUrl: e.target.value })}
                    className="flex-1 border border-slate-200 rounded-xl p-2.5 font-mono text-[11px]"
                  />
                  <label className="cursor-pointer px-3 py-2.5 rounded-xl bg-slate-950 hover:bg-rose-600 text-white font-bold text-xs shrink-0 flex items-center gap-1 transition">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, (url) => setProductModal({ ...productModal, imageUrl: url }))}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <button onClick={() => setProductModal(null)} className="px-4 py-2 rounded-xl bg-slate-100 text-xs font-bold">
                Cancel
              </button>
              <button
                onClick={() => handleSaveProduct(productModal)}
                className="px-5 py-2 rounded-xl bg-rose-600 text-white text-xs font-black"
              >
                Save Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
