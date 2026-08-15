import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://mountainmultimediaservice.com.np";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Mountain Multimedia Service | Digital Printing Press & Studio Bhaktapur",
    template: "%s | Mountain Multimedia Service",
  },
  description:
    "Mountain Multimedia Service in Dugure, Malpot Road, Bhaktapur. High-definition studio photo printing, passport photos, Star Flex signboards, PVC plastic ID cards, commercial offset printing, custom T-shirt & mug printing, wedding invitation cards, and fast photocopying.",
  keywords: [
    "Mountain Multimedia Service",
    "photo studio Bhaktapur",
    "printing press Bhaktapur",
    "digital printing Dugure Malpot Road",
    "photocopy shop Bhaktapur",
    "passport photo Bhaktapur",
    "PVC ID card printing Nepal",
    "flex signboard printing Bhaktapur",
    "wedding cards printing Bhaktapur",
    "T-shirt mug printing Bhaktapur",
    "offset printing press Nepal",
    "प्रिन्टिङ भक्तपुर",
    "डिजिटल फोटो स्टुडियो भक्तपुर",
    "फोटोकपी दुगुरे"
  ],
  authors: [{ name: "Mountain Multimedia Service", url: siteUrl }],
  creator: "Mountain Multimedia Service",
  publisher: "Mountain Multimedia Service",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    title: "Mountain Multimedia Service | Digital Printing & Photo Studio Bhaktapur",
    description: "Bhaktapur's trusted digital printing press & photo studio in Dugure, Malpot Road. Fast same-day turnaround & WhatsApp orders.",
    siteName: "Mountain Multimedia Service",
    images: [
      {
        url: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80",
        width: 1200,
        height: 630,
        alt: "Mountain Multimedia Service - Printing Press & Studio Bhaktapur",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mountain Multimedia Service | Printing & Photo Studio Bhaktapur",
    description: "High definition studio printing, flex signboards, PVC ID cards, and offset press in Dugure, Malpot Road, Bhaktapur.",
    images: ["https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80"],
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/icon-light-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    shortcut: "/icon-light-32x32.png",
    apple: "/icon-light-32x32.png",
  },
};

export const viewport: Viewport = {
  colorScheme: "light dark",
  themeColor: "#0f172a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // LocalBusiness Structured Data (JSON-LD) for Google Search Rich Snippets
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Mountain Multimedia Service",
    "alternateName": "Mountain Digital Photo Studio & Printing Press",
    "url": siteUrl,
    "logo": `${siteUrl}/uploads/favicon.jpg`,
    "image": "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80",
    "description": "Full-service digital printing press, photo studio & photocopy center located in Dugure, Malpot Road, Bhaktapur, Nepal.",
    "telephone": "+977-9841693181",
    "email": "mdigitalpress1@gmail.com",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Dugure, Malpot Road",
      "addressLocality": "Bhaktapur",
      "addressRegion": "Bagmati",
      "postalCode": "44800",
      "addressCountry": "NP"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "27.6710",
      "longitude": "85.4298"
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "08:00",
        "closes": "19:00"
      }
    ],
    "sameAs": [
      "https://facebook.com",
      "https://instagram.com"
    ]
  };

  return (
    <html lang="en" className="bg-slate-950 text-slate-100">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased font-sans">
        {children}
      </body>
    </html>
  );
}
