"use client";

import { useState } from "react";
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
  CheckCircle2,
  Clock3,
} from "lucide-react";
import {
  updateBranding,
  createService,
  updateService,
  deleteService,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  updatePageSection,
  updateMessageStatus,
  deleteContactMessage,
  updateSiteSetting,
} from "../actions";

interface AdminDashboardProps {
  initialBranding: any;
  initialServices: any[];
  initialGallery: any[];
  initialTestimonials: any[];
  initialPageSections: any[];
  initialMessages: any[];
  initialSettings: any[];
}

export default function AdminDashboard({
  initialBranding,
  initialServices,
  initialGallery,
  initialTestimonials,
  initialPageSections,
  initialMessages,
  initialSettings,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<
    "branding" | "services" | "gallery" | "testimonials" | "sections" | "messages" | "settings"
  >("branding");

  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  // States
  const [branding, setBranding] = useState(initialBranding);
  const [services, setServices] = useState(initialServices);
  const [editingService, setEditingService] = useState<any | null>(null);
  const [gallery, setGallery] = useState(initialGallery);
  const [editingGallery, setEditingGallery] = useState<any | null>(null);
  const [testimonials, setTestimonials] = useState(initialTestimonials);
  const [editingTestimonial, setEditingTestimonial] = useState<any | null>(null);
  const [pageSections, setPageSections] = useState(initialPageSections);
  const [messages, setMessages] = useState(initialMessages);
  const [settings, setSettings] = useState(initialSettings);

  const unreadCount = messages.filter((m) => m.status === "unread").length;

  const showNotification = (text: string) => {
    setMsg(text);
    setTimeout(() => setMsg(""), 3500);
  };

  // Branding
  const handleSaveBranding = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      await updateBranding(branding);
      showNotification("Branding & Color preferences updated successfully!");
    } catch (err: any) {
      alert(err.message || "Failed to update branding.");
    } finally {
      setSaving(false);
    }
  };

  // Services
  const handleSaveService = async (data: any) => {
    setSaving(true);
    try {
      const featuresArr = typeof data.features === "string"
        ? data.features.split("\n").filter((f: string) => f.trim())
        : data.features;

      if (data.id) {
        await updateService(data.id, { ...data, features: featuresArr });
        setServices(services.map((s) => (s.id === data.id ? { ...data, features: JSON.stringify(featuresArr) } : s)));
        showNotification("Service updated!");
      } else {
        await createService({ ...data, features: featuresArr });
        showNotification("New service created!");
        window.location.reload();
      }
      setEditingService(null);
    } catch (err: any) {
      alert(err.message || "Operation failed.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteService = async (id: number) => {
    if (!confirm("Are you sure you want to delete this service?")) return;
    try {
      await deleteService(id);
      setServices(services.filter((s) => s.id !== id));
      showNotification("Service removed.");
    } catch (err: any) {
      alert(err.message || "Failed to delete.");
    }
  };

  // Gallery
  const handleSaveGallery = async (data: any) => {
    setSaving(true);
    try {
      if (data.id) {
        await updateGalleryItem(data.id, data);
        setGallery(gallery.map((g) => (g.id === data.id ? data : g)));
        showNotification("Gallery item updated!");
      } else {
        await createGalleryItem(data);
        showNotification("Gallery item added!");
        window.location.reload();
      }
      setEditingGallery(null);
    } catch (err: any) {
      alert(err.message || "Operation failed.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteGallery = async (id: number) => {
    if (!confirm("Remove this gallery item?")) return;
    try {
      await deleteGalleryItem(id);
      setGallery(gallery.filter((g) => g.id !== id));
      showNotification("Gallery item deleted.");
    } catch (err: any) {
      alert(err.message || "Failed to delete.");
    }
  };

  // Testimonials
  const handleSaveTestimonial = async (data: any) => {
    setSaving(true);
    try {
      if (data.id) {
        await updateTestimonial(data.id, data);
        setTestimonials(testimonials.map((t) => (t.id === data.id ? data : t)));
        showNotification("Testimonial updated!");
      } else {
        await createTestimonial(data);
        showNotification("Testimonial added!");
        window.location.reload();
      }
      setEditingTestimonial(null);
    } catch (err: any) {
      alert(err.message || "Operation failed.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteTestimonial = async (id: number) => {
    if (!confirm("Delete this testimonial?")) return;
    try {
      await deleteTestimonial(id);
      setTestimonials(testimonials.filter((t) => t.id !== id));
      showNotification("Testimonial deleted.");
    } catch (err: any) {
      alert(err.message || "Failed to delete.");
    }
  };

  // Sections
  const handleUpdateSection = async (sec: any) => {
    setSaving(true);
    try {
      await updatePageSection(sec.id, sec);
      setPageSections(pageSections.map((s) => (s.id === sec.id ? sec : s)));
      showNotification(`Section '${sec.sectionKey}' updated.`);
    } catch (err: any) {
      alert(err.message || "Failed to update section.");
    } finally {
      setSaving(false);
    }
  };

  // Messages Status
  const handleStatusChange = async (id: number, status: "unread" | "read" | "replied") => {
    try {
      await updateMessageStatus(id, status);
      setMessages(messages.map((m) => (m.id === id ? { ...m, status } : m)));
      showNotification(`Message marked as ${status}.`);
    } catch (err: any) {
      alert(err.message || "Status update failed.");
    }
  };

  const handleDeleteMessage = async (id: number) => {
    if (!confirm("Delete this customer message?")) return;
    try {
      await deleteContactMessage(id);
      setMessages(messages.filter((m) => m.id !== id));
      showNotification("Message deleted.");
    } catch (err: any) {
      alert(err.message || "Failed to delete.");
    }
  };

  // Settings
  const handleSaveSetting = async (key: string, value: string) => {
    setSaving(true);
    try {
      await updateSiteSetting(key, value);
      setSettings((prev) => {
        const idx = prev.findIndex((s) => s.key === key);
        if (idx >= 0) {
          const next = [...prev];
          next[idx] = { ...next[idx], value };
          return next;
        }
        return [...prev, { key, value }];
      });
      showNotification(`Setting '${key}' saved.`);
    } catch (err: any) {
      alert(err.message || "Failed to save setting.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      {/* Toast Notification */}
      {msg && (
        <div className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-slate-950 font-semibold px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 animate-bounce">
          <Check className="w-5 h-5" />
          <span>{msg}</span>
        </div>
      )}

      {/* Admin Tabs Bar */}
      <div className="flex flex-wrap items-center gap-2 mb-8 bg-slate-900/80 p-2 rounded-2xl border border-slate-800">
        <button
          onClick={() => setActiveTab("branding")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition ${
            activeTab === "branding"
              ? "bg-sky-500 text-white shadow-lg shadow-sky-500/25"
              : "text-slate-400 hover:text-white hover:bg-slate-800/60"
          }`}
        >
          <Palette className="w-4 h-4" />
          <span>Branding & Colors</span>
        </button>

        <button
          onClick={() => setActiveTab("services")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition ${
            activeTab === "services"
              ? "bg-sky-500 text-white shadow-lg shadow-sky-500/25"
              : "text-slate-400 hover:text-white hover:bg-slate-800/60"
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Services ({services.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("gallery")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition ${
            activeTab === "gallery"
              ? "bg-sky-500 text-white shadow-lg shadow-sky-500/25"
              : "text-slate-400 hover:text-white hover:bg-slate-800/60"
          }`}
        >
          <ImageIcon className="w-4 h-4" />
          <span>Gallery ({gallery.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("testimonials")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition ${
            activeTab === "testimonials"
              ? "bg-sky-500 text-white shadow-lg shadow-sky-500/25"
              : "text-slate-400 hover:text-white hover:bg-slate-800/60"
          }`}
        >
          <MessageSquareQuote className="w-4 h-4" />
          <span>Testimonials ({testimonials.length})</span>
        </button>

        <button
          onClick={() => setActiveTab("sections")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition ${
            activeTab === "sections"
              ? "bg-sky-500 text-white shadow-lg shadow-sky-500/25"
              : "text-slate-400 hover:text-white hover:bg-slate-800/60"
          }`}
        >
          <Layout className="w-4 h-4" />
          <span>Page Sections</span>
        </button>

        <button
          onClick={() => setActiveTab("messages")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition relative ${
            activeTab === "messages"
              ? "bg-sky-500 text-white shadow-lg shadow-sky-500/25"
              : "text-slate-400 hover:text-white hover:bg-slate-800/60"
          }`}
        >
          <Inbox className="w-4 h-4" />
          <span>Inquiries ({messages.length})</span>
          {unreadCount > 0 && (
            <span className="px-1.5 py-0.5 text-[10px] bg-amber-500 text-slate-950 rounded-full font-bold">
              {unreadCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab("settings")}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold transition ${
            activeTab === "settings"
              ? "bg-sky-500 text-white shadow-lg shadow-sky-500/25"
              : "text-slate-400 hover:text-white hover:bg-slate-800/60"
          }`}
        >
          <Settings className="w-4 h-4" />
          <span>Site Settings</span>
        </button>
      </div>

      {/* TAB 1: BRANDING */}
      {activeTab === "branding" && (
        <form onSubmit={handleSaveBranding} className="space-y-6">
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-bold text-slate-100">Theme Colors & Palette</h2>
                <p className="text-xs text-slate-400">Bhaktapur brand colors (Navy, Sky Blue, Lime/Gold Accent).</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-mono text-slate-300">
                  <div className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: branding.primaryColor }} />
                  <span>{branding.primaryColor}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-mono text-slate-300">
                  <div className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: branding.secondaryColor }} />
                  <span>{branding.secondaryColor}</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 text-xs font-mono text-slate-300">
                  <div className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: branding.accentColor }} />
                  <span>{branding.accentColor}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <label className="block text-xs font-semibold text-slate-300 mb-2">Primary Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={branding.primaryColor || "#0f172a"}
                    onChange={(e) => setBranding({ ...branding, primaryColor: e.target.value })}
                    className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                  <input
                    type="text"
                    value={branding.primaryColor || "#0f172a"}
                    onChange={(e) => setBranding({ ...branding, primaryColor: e.target.value })}
                    className="flex-1 bg-slate-900 border border-slate-700 text-slate-100 text-xs rounded-lg px-3 py-2 outline-none font-mono"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <label className="block text-xs font-semibold text-slate-300 mb-2">Secondary Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={branding.secondaryColor || "#0284c7"}
                    onChange={(e) => setBranding({ ...branding, secondaryColor: e.target.value })}
                    className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                  <input
                    type="text"
                    value={branding.secondaryColor || "#0284c7"}
                    onChange={(e) => setBranding({ ...branding, secondaryColor: e.target.value })}
                    className="flex-1 bg-slate-900 border border-slate-700 text-slate-100 text-xs rounded-lg px-3 py-2 outline-none font-mono"
                  />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
                <label className="block text-xs font-semibold text-slate-300 mb-2">Accent Color</label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={branding.accentColor || "#84cc16"}
                    onChange={(e) => setBranding({ ...branding, accentColor: e.target.value })}
                    className="w-10 h-10 rounded-lg cursor-pointer bg-transparent border-0"
                  />
                  <input
                    type="text"
                    value={branding.accentColor || "#84cc16"}
                    onChange={(e) => setBranding({ ...branding, accentColor: e.target.value })}
                    className="flex-1 bg-slate-900 border border-slate-700 text-slate-100 text-xs rounded-lg px-3 py-2 outline-none font-mono"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <h2 className="text-lg font-bold text-slate-100">Shop Identity & Contact Details</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Shop Name</label>
                <input
                  type="text"
                  value={branding.siteName || ""}
                  onChange={(e) => setBranding({ ...branding, siteName: e.target.value })}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Tagline</label>
                <input
                  type="text"
                  value={branding.tagline || ""}
                  onChange={(e) => setBranding({ ...branding, tagline: e.target.value })}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Contact Email</label>
                <input
                  type="email"
                  value={branding.contactEmail || ""}
                  onChange={(e) => setBranding({ ...branding, contactEmail: e.target.value })}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Phone Numbers</label>
                <input
                  type="text"
                  value={branding.contactPhone || ""}
                  onChange={(e) => setBranding({ ...branding, contactPhone: e.target.value })}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Opening Hours</label>
                <input
                  type="text"
                  value={branding.openingHours || ""}
                  onChange={(e) => setBranding({ ...branding, openingHours: e.target.value })}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-sky-500"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Shop Address</label>
                <input
                  type="text"
                  value={branding.address || ""}
                  onChange={(e) => setBranding({ ...branding, address: e.target.value })}
                  className="w-full bg-slate-950/80 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 outline-none focus:border-sky-500"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white font-semibold px-6 py-3 rounded-xl shadow-lg shadow-sky-500/20 transition disabled:opacity-50"
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save Branding Settings</span>
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: SERVICES */}
      {activeTab === "services" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">All 18 Printing & Studio Services</h2>
              <p className="text-xs text-slate-400">Public offerings shown on the home page.</p>
            </div>
            <button
              onClick={() =>
                setEditingService({
                  title: "",
                  slug: "",
                  description: "",
                  price: "From Rs. 100",
                  icon: "Camera",
                  features: "Feature 1\nFeature 2",
                  isActive: true,
                })
              }
              className="flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition shadow-lg shadow-sky-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>Add New Service</span>
            </button>
          </div>

          {editingService && (
            <div className="bg-slate-900 border border-sky-500/40 rounded-2xl p-6 space-y-4 shadow-2xl">
              <h3 className="text-md font-bold text-sky-400">
                {editingService.id ? "Edit Service" : "New Service"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Title</label>
                  <input
                    type="text"
                    value={editingService.title}
                    onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Price Cue</label>
                  <input
                    type="text"
                    value={editingService.price}
                    onChange={(e) => setEditingService({ ...editingService, price: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs text-slate-400 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={editingService.description}
                    onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs text-slate-400 mb-1">Features (One per line)</label>
                  <textarea
                    rows={3}
                    value={
                      typeof editingService.features === "string"
                        ? editingService.features
                        : Array.isArray(editingService.features)
                        ? editingService.features.join("\n")
                        : ""
                    }
                    onChange={(e) => setEditingService({ ...editingService, features: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white font-mono"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingService(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveService(editingService)}
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-xs text-white font-semibold flex items-center gap-1.5"
                >
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Save Service</span>
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((item) => {
              const features = typeof item.features === "string" ? JSON.parse(item.features || "[]") : item.features || [];
              return (
                <div key={item.id} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-5 shadow-lg relative flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="text-xs font-semibold text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2.5 py-0.5 rounded-full">
                          {item.price}
                        </span>
                        <h3 className="text-md font-bold text-white mt-2">{item.title}</h3>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() =>
                            setEditingService({
                              ...item,
                              features: features.join("\n"),
                            })
                          }
                          className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-sky-400"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteService(item.id)}
                          className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-red-400"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                    <p className="text-xs text-slate-300 mb-4">{item.description}</p>
                  </div>
                  <ul className="space-y-1 border-t border-slate-800/80 pt-3">
                    {features.map((feat: string, idx: number) => (
                      <li key={idx} className="text-[11px] text-slate-400 flex items-center gap-1.5">
                        <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: GALLERY */}
      {activeTab === "gallery" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Portfolio Gallery</h2>
              <p className="text-xs text-slate-400">Categorized sample work items.</p>
            </div>
            <button
              onClick={() =>
                setEditingGallery({
                  title: "",
                  category: "Printing",
                  imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80",
                  videoUrl: "",
                  description: "",
                })
              }
              className="flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition shadow-lg shadow-sky-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>Add Gallery Image</span>
            </button>
          </div>

          {editingGallery && (
            <div className="bg-slate-900 border border-sky-500/40 rounded-2xl p-6 space-y-4 shadow-2xl">
              <h3 className="text-md font-bold text-sky-400">
                {editingGallery.id ? "Edit Item" : "Add New Item"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Title</label>
                  <input
                    type="text"
                    value={editingGallery.title}
                    onChange={(e) => setEditingGallery({ ...editingGallery, title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Category</label>
                  <select
                    value={editingGallery.category}
                    onChange={(e) => setEditingGallery({ ...editingGallery, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                  >
                    <option value="Photography">Photography</option>
                    <option value="Printing">Printing</option>
                    <option value="T-Shirt & Mug">T-Shirt & Mug</option>
                    <option value="ID Cards">ID Cards</option>
                    <option value="Wedding Cards">Wedding Cards</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs text-slate-400 mb-1">Image URL</label>
                  <input
                    type="text"
                    value={editingGallery.imageUrl}
                    onChange={(e) => setEditingGallery({ ...editingGallery, imageUrl: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white font-mono"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs text-slate-400 mb-1">Description</label>
                  <input
                    type="text"
                    value={editingGallery.description || ""}
                    onChange={(e) => setEditingGallery({ ...editingGallery, description: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingGallery(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveGallery(editingGallery)}
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-xs text-white font-semibold flex items-center gap-1.5"
                >
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Save Gallery Item</span>
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {gallery.map((item) => (
              <div key={item.id} className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden shadow-lg">
                <div className="h-44 relative bg-slate-950 overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                  <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md border border-slate-800 text-sky-400 text-[10px] uppercase font-bold px-2.5 py-1 rounded-full">
                    {item.category}
                  </span>
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-white text-sm">{item.title}</h3>
                  <p className="text-xs text-slate-400 line-clamp-1 mt-1">{item.description}</p>
                  <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-slate-800/80">
                    <button
                      onClick={() => setEditingGallery(item)}
                      className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-sky-400"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDeleteGallery(item.id)}
                      className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-red-400"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: TESTIMONIALS */}
      {activeTab === "testimonials" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Customer Reviews</h2>
              <p className="text-xs text-slate-400">Local feedback shown on home page.</p>
            </div>
            <button
              onClick={() =>
                setEditingTestimonial({
                  clientName: "",
                  clientRole: "Customer",
                  clientCompany: "Bhaktapur",
                  avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
                  content: "",
                  rating: 5,
                })
              }
              className="flex items-center gap-2 bg-sky-500 hover:bg-sky-400 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition shadow-lg shadow-sky-500/20"
            >
              <Plus className="w-4 h-4" />
              <span>Add Testimonial</span>
            </button>
          </div>

          {editingTestimonial && (
            <div className="bg-slate-900 border border-sky-500/40 rounded-2xl p-6 space-y-4 shadow-2xl">
              <h3 className="text-md font-bold text-sky-400">
                {editingTestimonial.id ? "Edit Review" : "Add Review"}
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Customer Name</label>
                  <input
                    type="text"
                    value={editingTestimonial.clientName}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, clientName: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Role / Detail</label>
                  <input
                    type="text"
                    value={editingTestimonial.clientRole}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, clientRole: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Location / Company</label>
                  <input
                    type="text"
                    value={editingTestimonial.clientCompany || ""}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, clientCompany: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1">Rating (1-5)</label>
                  <input
                    type="number"
                    min={1}
                    max={5}
                    value={editingTestimonial.rating}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, rating: parseInt(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-xs text-slate-400 mb-1">Review Content (Nepali / English)</label>
                  <textarea
                    rows={3}
                    value={editingTestimonial.content}
                    onChange={(e) => setEditingTestimonial({ ...editingTestimonial, content: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingTestimonial(null)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-xs text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleSaveTestimonial(editingTestimonial)}
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-xs text-white font-semibold flex items-center gap-1.5"
                >
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Save Review</span>
                </button>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((item) => (
              <div key={item.id} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-lg relative">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-white text-sm">{item.clientName}</h3>
                    <p className="text-xs text-slate-400">{item.clientRole} {item.clientCompany ? `• ${item.clientCompany}` : ""}</p>
                  </div>
                  <div className="flex items-center gap-1 text-amber-400">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-slate-300 italic mb-4">"{item.content}"</p>
                <div className="flex justify-end gap-2 pt-3 border-t border-slate-800/80">
                  <button
                    onClick={() => setEditingTestimonial(item)}
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-sky-400"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDeleteTestimonial(item.id)}
                    className="p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-red-400"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: SECTIONS */}
      {activeTab === "sections" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white">Dynamic Page Sections</h2>
            <p className="text-xs text-slate-400">Control section titles, copy, and visibility.</p>
          </div>

          <div className="space-y-6">
            {pageSections.map((sec) => (
              <div key={sec.id} className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-lg space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-bold text-sky-400 bg-sky-500/10 border border-sky-500/20 px-2.5 py-1 rounded-lg uppercase">
                      {sec.sectionKey}
                    </span>
                    <span className="text-sm font-semibold text-white">{sec.title}</span>
                  </div>
                  <button
                    onClick={() =>
                      handleUpdateSection({
                        ...sec,
                        isVisible: !sec.isVisible,
                      })
                    }
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                      sec.isVisible
                        ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400"
                        : "bg-slate-800 border-slate-700 text-slate-400"
                    }`}
                  >
                    {sec.isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    <span>{sec.isVisible ? "Visible" : "Hidden"}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Title</label>
                    <input
                      type="text"
                      value={sec.title}
                      onChange={(e) =>
                        setPageSections(
                          pageSections.map((s) => (s.id === sec.id ? { ...s, title: e.target.value } : s))
                        )
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-400 mb-1">Subtitle</label>
                    <input
                      type="text"
                      value={sec.subtitle || ""}
                      onChange={(e) =>
                        setPageSections(
                          pageSections.map((s) => (s.id === sec.id ? { ...s, subtitle: e.target.value } : s))
                        )
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-xs text-slate-400 mb-1">Content Body</label>
                    <textarea
                      rows={3}
                      value={sec.content || ""}
                      onChange={(e) =>
                        setPageSections(
                          pageSections.map((s) => (s.id === sec.id ? { ...s, content: e.target.value } : s))
                        )
                      }
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => handleUpdateSection(sec)}
                    disabled={saving}
                    className="flex items-center gap-1.5 bg-sky-500 hover:bg-sky-400 text-white font-semibold text-xs px-4 py-2 rounded-xl transition"
                  >
                    {saving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />}
                    <span>Update Section</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: CONTACT MESSAGES */}
      {activeTab === "messages" && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Contact Form Inquiries</h2>
              <p className="text-xs text-slate-400">Submissions received from customers on the website.</p>
            </div>
            <span className="px-3 py-1 bg-slate-800 border border-slate-700 text-slate-300 text-xs font-semibold rounded-xl">
              Total Inquiries: {messages.length}
            </span>
          </div>

          {messages.length === 0 ? (
            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-12 text-center text-slate-400">
              <Inbox className="w-10 h-10 mx-auto text-slate-600 mb-3" />
              <p className="text-sm font-semibold">No inquiries received yet.</p>
              <p className="text-xs text-slate-500">Contact form submissions will appear here automatically.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((item) => (
                <div
                  key={item.id}
                  className={`bg-slate-900/60 border rounded-2xl p-6 shadow-lg space-y-3 transition ${
                    item.status === "unread" ? "border-sky-500/50 bg-slate-900/90" : "border-slate-800"
                  }`}
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-800 pb-3">
                    <div>
                      <span className="font-bold text-white text-sm">{item.name}</span>
                      <span className="text-xs text-slate-400 ml-3">
                        {item.createdAt ? new Date(item.createdAt).toLocaleString() : ""}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={item.status}
                        onChange={(e) => handleStatusChange(item.id, e.target.value as any)}
                        className={`text-xs font-semibold px-2.5 py-1 rounded-lg border bg-slate-950 outline-none ${
                          item.status === "unread"
                            ? "text-amber-400 border-amber-500/30"
                            : item.status === "replied"
                            ? "text-emerald-400 border-emerald-500/30"
                            : "text-slate-300 border-slate-700"
                        }`}
                      >
                        <option value="unread">Unread</option>
                        <option value="read">Read</option>
                        <option value="replied">Replied</option>
                      </select>

                      <button
                        onClick={() => handleDeleteMessage(item.id)}
                        className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-red-400"
                        title="Delete inquiry"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {item.phone && (
                      <div className="flex items-center gap-2 text-slate-300">
                        <Phone className="w-3.5 h-3.5 text-sky-400" />
                        <a href={`tel:${item.phone}`} className="hover:underline">
                          {item.phone}
                        </a>
                      </div>
                    )}
                    {item.email && (
                      <div className="flex items-center gap-2 text-slate-300">
                        <Mail className="w-3.5 h-3.5 text-sky-400" />
                        <a href={`mailto:${item.email}`} className="hover:underline">
                          {item.email}
                        </a>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-slate-200 bg-slate-950/80 p-3 rounded-xl border border-slate-800/80 whitespace-pre-wrap">
                    {item.message}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 7: SITE SETTINGS */}
      {activeTab === "settings" && (
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-bold text-white">Dynamic Site Settings</h2>
            <p className="text-xs text-slate-400">Key-value configurations stored in database without redeploy.</p>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            {settings.map((stg) => (
              <div key={stg.key} className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                <div className="sm:w-1/3">
                  <span className="font-mono text-xs font-semibold text-sky-400 uppercase tracking-wider block">
                    {stg.key}
                  </span>
                </div>
                <div className="flex-1 flex items-center gap-2">
                  <input
                    type="text"
                    value={stg.value}
                    onChange={(e) =>
                      setSettings(
                        settings.map((s) => (s.key === stg.key ? { ...s, value: e.target.value } : s))
                      )
                    }
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                  <button
                    onClick={() => handleSaveSetting(stg.key, stg.value)}
                    disabled={saving}
                    className="px-3 py-2 bg-sky-500 hover:bg-sky-400 text-white rounded-xl text-xs font-semibold shrink-0"
                  >
                    Save
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
