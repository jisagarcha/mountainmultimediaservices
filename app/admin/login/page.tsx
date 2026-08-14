import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getBranding } from "../actions";
import AdminLoginFormClient from "./_components/AdminLoginFormClient";

export default async function AdminLoginPage() {
  const reqHeaders = await headers();
  const session = await auth.api.getSession({
    headers: reqHeaders,
  });

  // If already authenticated, redirect immediately to /admin
  if (session?.user) {
    redirect("/admin");
  }

  const branding = await getBranding();

  return <AdminLoginFormClient branding={branding} />;
}
