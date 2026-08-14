"use client";

import { signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Mountain, LogOut, ExternalLink, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function AdminHeader({ user }: { user: { email: string; name?: string } }) {
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <header className="bg-slate-900/90 backdrop-blur-md border-b border-slate-800 sticky top-0 z-40 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/admin" className="flex items-center gap-2.5 group">
            <div className="p-2 rounded-xl bg-sky-500/10 border border-sky-500/20 text-sky-400 group-hover:bg-sky-500/20 transition">
              <Mountain className="w-5 h-5" />
            </div>
            <div>
              <div className="font-bold text-slate-100 flex items-center gap-2">
                <span>Mountain Admin</span>
                <span className="px-2 py-0.5 text-[10px] uppercase tracking-wider font-semibold rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3" /> Live SQLite
                </span>
              </div>
              <p className="text-xs text-slate-400">Manage Branding, Services & Content</p>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link
            href="/"
            target="_blank"
            className="hidden sm:flex items-center gap-1.5 text-xs text-slate-400 hover:text-sky-400 transition bg-slate-800/60 px-3 py-1.5 rounded-lg border border-slate-700/60"
          >
            <span>View Public Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>

          <div className="h-4 w-px bg-slate-800 hidden sm:block" />

          <div className="text-right hidden md:block">
            <p className="text-xs font-medium text-slate-200">{user.name || "Admin User"}</p>
            <p className="text-[11px] text-slate-400">{user.email}</p>
          </div>

          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 text-xs text-slate-300 hover:text-red-400 bg-slate-800/80 hover:bg-red-500/10 hover:border-red-500/30 border border-slate-700/80 px-3 py-2 rounded-xl transition duration-150"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </header>
  );
}
