import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import AdminHeader from "./_components/AdminHeader";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const reqHeaders = await headers();
  const session = await auth.api.getSession({
    headers: reqHeaders,
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {session?.user && <AdminHeader user={session.user} />}
      <main className="flex-1">{children}</main>
    </div>
  );
}
