"use client";

import { useState } from "react";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Lock, Mail, Mountain, AlertCircle, Loader2, ArrowRight, ShieldCheck } from "lucide-react";
import Link from "next/link";

interface AdminLoginFormClientProps {
  branding?: any;
}

export default function AdminLoginFormClient({ branding }: AdminLoginFormClientProps = {}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await signIn.email({
        email,
        password,
      });

      if (res.error) {
        setError("Invalid email address or password credentials.");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err: any) {
      setError("Invalid credentials or authentication error.");
    } finally {
      setIsLoading(false);
    }
  };

  const siteName = branding?.siteName || "Mountain Multimedia Service";

  return (
    <div className="min-h-screen bg-slate-50/70 text-slate-900 font-sans flex flex-col justify-between selection:bg-rose-500 selection:text-white bg-print-dots relative">
      {/* Top Navbar Header matching Public Site */}
      <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-white border border-slate-200/80 shadow-sm flex items-center justify-center group-hover:scale-105 transition shrink-0 overflow-hidden p-1">
              {branding?.logoUrl ? (
                <img src={branding.logoUrl} alt={siteName} className="w-full h-full object-contain" />
              ) : (
                <Mountain className="w-5 h-5 text-rose-500" />
              )}
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-950 block leading-none whitespace-nowrap">
                {siteName}
              </span>
              <span className="text-[10px] text-rose-600 font-extrabold tracking-widest uppercase block mt-1 whitespace-nowrap">
                {branding?.tagline || "Printing Press & Studio"}
              </span>
            </div>
          </Link>

          <Link
            href="/"
            className="px-5 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-extrabold text-xs transition flex items-center gap-1.5 shadow-sm"
          >
            <span>Back to Main Website</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </header>

      {/* Main Login Card Container */}
      <main className="flex-1 flex items-center justify-center p-6 py-16">
        <div className="w-full max-w-md bg-white border border-slate-200/90 rounded-3xl p-8 sm:p-10 shadow-2xl shadow-slate-200/60 relative z-10 space-y-8">
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-white border border-slate-200/80 shadow-md overflow-hidden p-2 shrink-0 mb-2">
              {branding?.logoUrl ? (
                <img src={branding.logoUrl} alt={siteName} className="w-full h-full object-contain" />
              ) : (
                <Mountain className="w-8 h-8 text-rose-500" />
              )}
            </div>
            <span className="text-[10px] font-black uppercase text-rose-600 tracking-widest block">
              SECURE ADMIN ACCESS
            </span>
            <h1 className="text-2xl font-black tracking-tight text-slate-950">
              Sign In to Control Center
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Manage live branding, services catalog, and customer inquiries.
            </p>
          </div>

          {error && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-start gap-3">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                Admin Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@mountainmultimedia.com"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 text-slate-900 rounded-xl pl-11 pr-4 py-3 text-xs font-bold outline-none transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-extrabold uppercase tracking-wider text-slate-700 mb-2">
                Security Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-slate-50 border border-slate-200 focus:border-rose-500 focus:ring-2 focus:ring-rose-500/20 text-slate-900 rounded-xl pl-11 pr-4 py-3 text-xs font-bold outline-none transition"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 bg-rose-600 hover:bg-rose-700 text-white font-black rounded-xl shadow-xl shadow-rose-600/30 transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50 text-xs"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating Session...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Admin Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          <div className="pt-6 border-t border-slate-100 text-center">
            <div className="inline-flex items-center gap-1.5 text-[11px] text-slate-500 font-semibold">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Protected SQLite Admin Portal · Bhaktapur</span>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 px-6 text-center text-xs text-slate-500 font-medium">
        &copy; {new Date().getFullYear()} Mountain Multimedia Service. All rights reserved.
      </footer>
    </div>
  );
}
