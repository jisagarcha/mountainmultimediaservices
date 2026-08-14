import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mountain Multimedia Service | Digital Printing, Photo Studio & Photocopy Bhaktapur",
  description: "Mountain Multimedia Service in Dugure, Malpot Road, Bhaktapur. Urgent passport photos, flex printing, offset, PVC ID cards, T-shirt & mug printing, wedding cards, photocopy, and graphic design.",
  keywords: [
    "photo studio Bhaktapur",
    "printing press Bhaktapur",
    "digital printing Dugure",
    "photocopy Bhaktapur",
    "passport photo Bhaktapur",
    "PVC ID card printing Bhaktapur",
    "flex printing Bhaktapur",
    "wedding cards Bhaktapur",
    "T-shirt printing Bhaktapur",
    "mug printing Bhaktapur",
    "Mountain Multimedia Service",
    "प्रिन्टिङ भक्तपुर",
    "फोटोकपी दुगुरे"
  ],
};

export const viewport: Viewport = {
  colorScheme: "dark",
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="bg-slate-950 text-slate-100">
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
