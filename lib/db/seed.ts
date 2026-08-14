import { db } from "./index";
import * as schema from "./schema";
import { auth } from "../auth";
import { initDb } from "./migrate";

async function main() {
  initDb();
  console.log("🌱 Seeding SQLite database at:", process.env.DATABASE_PATH || "./data/app.db");

  // 1. Branding
  await db.delete(schema.branding);
  await db.insert(schema.branding).values({
    siteName: "Mountain Multimedia Service",
    tagline: "A Complete Design & Printing Solution",
    logoUrl: "",
    primaryColor: "#0f172a",
    secondaryColor: "#0284c7",
    accentColor: "#84cc16",
    contactEmail: "mdigitalpress1@gmail.com",
    contactPhone: "9841693181, 9861550233, 9849425342",
    address: "Dugure, Malpot Road, Bhaktapur, Nepal",
    openingHours: "Open Daily: 8:00 AM – 7:00 PM",
  });
  console.log("✅ Seeded Bhaktapur branding settings.");

  // 2. Services (All 18 specified services)
  await db.delete(schema.services);
  await db.insert(schema.services).values([
    {
      title: "Digital Photo Studio & Passport Photos",
      slug: "digital-photo-studio",
      description: "Urgent same-day passport, visa, MRP, and auto-size photo prints. Ready while you wait.",
      price: "Ready in 10 mins",
      icon: "Camera",
      features: JSON.stringify([
        "Passport, Visa & License Sizes",
        "Studio Lighting Setup",
        "Digital Soft Copy Included",
        "Same-Day Urgent Delivery"
      ]),
      displayOrder: 1,
      isActive: true,
    },
    {
      title: "Photography Services",
      slug: "photography-services",
      description: "Professional studio portraits, family photos, commercial product shots, outdoor shoots, and event coverage.",
      price: "Custom Packages",
      icon: "Camera",
      features: JSON.stringify([
        "Studio & Outdoor Shoots",
        "High-Res Retouching",
        "Product & Commercial Sets",
        "Digital & Printed Portfolios"
      ]),
      displayOrder: 2,
      isActive: true,
    },
    {
      title: "Videography & Film Production",
      slug: "videography-services",
      description: "Cinematic video recording for weddings, commercial campaigns, documentaries, and social media content.",
      price: "Full Day & Hourly",
      icon: "Video",
      features: JSON.stringify([
        "4K Cinema Camera Coverage",
        "Event & Wedding Highlights",
        "Commercial Advertisements",
        "Editing & Color Grading"
      ]),
      displayOrder: 3,
      isActive: true,
    },
    {
      title: "Offset Printing",
      slug: "offset-printing",
      description: "High-volume commercial printing for magazines, bulletins, books, catalogs, and large quantity runs.",
      price: "Bulk Rate",
      icon: "Copy",
      features: JSON.stringify([
        "High Volume Production",
        "Crisp Color Calibration",
        "Multiple Paper Stock Options",
        "Perfect Binding & Finishing"
      ]),
      displayOrder: 4,
      isActive: true,
    },
    {
      title: "Flex Print & Banners",
      slug: "flex-print",
      description: "Weatherproof outdoor flex boards, vinyl banners, shop signboards, and glow-shine displays.",
      price: "Per Sq. Ft.",
      icon: "Layout",
      features: JSON.stringify([
        "Heavy-Duty Weatherproof Flex",
        "Shop Signboard Printing",
        "High-Resolution Large Format",
        "Metal Frame Mounting Options"
      ]),
      displayOrder: 5,
      isActive: true,
    },
    {
      title: "Screen Printing",
      slug: "screen-print",
      description: "Custom screen printing for non-woven bags, cloth banners, envelopes, and specialty surfaces.",
      price: "Per Unit",
      icon: "Layers",
      features: JSON.stringify([
        "Custom Bag Printing",
        "Cloth & Canvas Prints",
        "Special Ink Finishes",
        "Cost-Effective Bulk Runs"
      ]),
      displayOrder: 6,
      isActive: true,
    },
    {
      title: "Colour Print & Photocopy",
      slug: "colour-print-photocopy",
      description: "Fast high-speed B&W and laser colour photocopying, document scanning, laminating, and spiral binding.",
      price: "From Rs. 5",
      icon: "Printer",
      features: JSON.stringify([
        "High-Speed Counter Service",
        "A4, A3, Legal Sizes",
        "Digital PDF Scanning",
        "Lamination & Spiral Binding"
      ]),
      displayOrder: 7,
      isActive: true,
    },
    {
      title: "T-Shirt Printing",
      slug: "tshirt-printing",
      description: "Custom printed T-shirts for schools, corporate teams, clubs, sports groups, and personal gifts.",
      price: "Bulk Discounts",
      icon: "Shirt",
      features: JSON.stringify([
        "Sublimation & Screen Printing",
        "Durable & Wash-Resistant",
        "All Sizes & Colors",
        "Custom Name & Number Prints"
      ]),
      displayOrder: 8,
      isActive: true,
    },
    {
      title: "Mug Printing",
      slug: "mug-printing",
      description: "Custom ceramic mug printing for corporate branding, birthday gifts, and promotional merchandise.",
      price: "From Rs. 250",
      icon: "Coffee",
      features: JSON.stringify([
        "High-Gloss Ceramic Mugs",
        "Full-Color Photo Prints",
        "Magic heat-reveal Mugs",
        "Gift Box Packaging"
      ]),
      displayOrder: 9,
      isActive: true,
    },
    {
      title: "PVC ID Cards",
      slug: "pvc-id-cards",
      description: "Durable waterproof plastic ID cards for schools, offices, clubs, and organizations with lanyards.",
      price: "Volume Based",
      icon: "CreditCard",
      features: JSON.stringify([
        "Waterproof Heavy PVC",
        "Custom Lanyard Printing",
        "Barcode / QR Integration",
        "Holder & Clip Attachments"
      ]),
      displayOrder: 10,
      isActive: true,
    },
    {
      title: "Visiting / Business Cards",
      slug: "visiting-cards",
      description: "Professional business cards in matte, gloss, velvet touch, spot UV, and foil finishes.",
      price: "From Rs. 300 / 100 Cards",
      icon: "FileText",
      features: JSON.stringify([
        "Matte & Gloss Lamination",
        "300 GSM Premium Card Stock",
        "Spot UV & Embossed Gold Foil",
        "Same-Day Design & Print"
      ]),
      displayOrder: 11,
      isActive: true,
    },
    {
      title: "Calendars (Wall & Desk)",
      slug: "custom-calendars",
      description: "Custom desk calendars, wall calendars, and table calendars featuring your photos or business ads.",
      price: "Seasonal Rates",
      icon: "Calendar",
      features: JSON.stringify([
        "Bikram Sambat (BS) & AD Dates",
        "Spiral Bound Desk Standees",
        "Multi-Page Wall Hanging",
        "Nepali Panchanga Integration"
      ]),
      displayOrder: 12,
      isActive: true,
    },
    {
      title: "Wedding & Vratabandha Cards",
      slug: "wedding-vratabandha-cards",
      description: "Elegant traditional and modern invitations for Weddings, Vratabandha, Nwaran, and celebrations.",
      price: "Custom Orders",
      icon: "Heart",
      features: JSON.stringify([
        "Traditional Red & Gold Foil",
        "Laser Cut Luxury Designs",
        "Envelope Printing Included",
        "Nepali & English Typesetting"
      ]),
      displayOrder: 13,
      isActive: true,
    },
    {
      title: "Bills & Receipt Bulletins",
      slug: "bills-bulletins",
      description: "Custom duplicate & triplicate carbonless tax bill books, order forms, vouchers, and bulletins.",
      price: "Per Book",
      icon: "BookOpen",
      features: JSON.stringify([
        "Carbonless (NCR) Paper",
        "Sequential Numbering",
        "Perforated Tear-off",
        "Custom Logo Watermark"
      ]),
      displayOrder: 14,
      isActive: true,
    },
    {
      title: "Certificates & Diplomas",
      slug: "certificates",
      description: "Official school, college, workshop, training, and sports event completion certificates with foil seals.",
      price: "Per Piece",
      icon: "Award",
      features: JSON.stringify([
        "250-300 GSM Textured Paper",
        "Gold Foil Stamp Seals",
        "Custom Watermarks",
        "Individual Name Printing"
      ]),
      displayOrder: 15,
      isActive: true,
    },
    {
      title: "Custom Stamps & Rubber Seals",
      slug: "custom-stamps",
      description: "Self-inking automatic stamps, traditional wooden rubber stamps, and official office seals.",
      price: "Ready in 1 Hour",
      icon: "Stamp",
      features: JSON.stringify([
        "Flash Self-Inking Stamps",
        "Official Round & Oval Seals",
        "Sign Stamps & Signature Seals",
        "Refillable Ink Chambers"
      ]),
      displayOrder: 16,
      isActive: true,
    },
    {
      title: "Photo Albums & Framing",
      slug: "photo-albums-framing",
      description: "High quality glass, synthetic wooden photo frames, canvas wraps, and custom wedding photo albums.",
      price: "Various Sizes",
      icon: "Image",
      features: JSON.stringify([
        "Wooden & Synthetic Framing",
        "Non-Glare Glass Covers",
        "Flush Mount Photobooks",
        "Canvas & Acrylic Wall Prints"
      ]),
      displayOrder: 17,
      isActive: true,
    },
    {
      title: "Graphic Design & Branding",
      slug: "graphic-design-branding",
      description: "Professional graphic design for logos, flyers, social media ads, signboards, and marketing collateral.",
      price: "Package Deal",
      icon: "PenTool",
      features: JSON.stringify([
        "Logo & Brand Identity",
        "Flyer & Brochure Design",
        "Social Media Banners",
        "Print-Ready Vector Files"
      ]),
      displayOrder: 18,
      isActive: true,
    },
  ]);
  console.log("✅ Seeded all 18 services.");

  // 3. Gallery
  await db.delete(schema.gallery);
  await db.insert(schema.gallery).values([
    {
      title: "Urgent Studio Passport Photos",
      category: "Photography",
      imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80",
      description: "Fast 10-minute passport and visa photo prints with correct sizing and studio lighting.",
      displayOrder: 1,
    },
    {
      title: "Custom PVC ID Cards",
      category: "ID Cards",
      imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80",
      description: "Durable plastic student and employee ID cards with printed lanyards.",
      displayOrder: 2,
    },
    {
      title: "Wedding Invitation Cards",
      category: "Wedding Cards",
      imageUrl: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=1200&q=80",
      description: "Traditional gold foil stamped Nepali wedding and Vratabandha invitation sets.",
      displayOrder: 3,
    },
    {
      title: "Custom Printed T-Shirts & Mugs",
      category: "T-Shirt & Mug",
      imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=1200&q=80",
      description: "Custom sublimation printed ceramic mugs and event T-shirts.",
      displayOrder: 4,
    },
    {
      title: "Color Digital Printing & Brochures",
      category: "Printing",
      imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1200&q=80",
      description: "High resolution digital brochures, flyers, menus, and posters.",
      displayOrder: 5,
    },
  ]);
  console.log("✅ Seeded gallery items.");

  // 4. Testimonials
  await db.delete(schema.testimonials);
  await db.insert(schema.testimonials).values([
    {
      clientName: "Ramesh Shrestha",
      clientRole: "Local Business Owner",
      clientCompany: "Bhaktapur Crafts",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80",
      content: "भिसा फोटो तुरुन्तै बनाइदिनुभयो, साइज पनि एकदम सही थियो। (My visa photos were ready in 10 minutes and the size was perfectly accurate!)",
      rating: 5,
      displayOrder: 1,
    },
    {
      clientName: "Anju Prajapati",
      clientRole: "School Administrator",
      clientCompany: "Dugure Secondary School",
      avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80",
      content: "स्कुलका कागजदेखि विद्यार्थीका PVC ID कार्डसम्म, हाम्रो भरपर्दो पसल यही हो। (From school certificates to PVC student ID cards, this is our most trusted local shop.)",
      rating: 5,
      displayOrder: 2,
    },
    {
      clientName: "Bikash Joshi",
      clientRole: "Event Organizer",
      clientCompany: "Malpot Road Youth Club",
      avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80",
      content: "हाम्रो कार्यक्रमका फ्लेक्स बोर्ड, टी-सर्ट र ब्यानर एकदम राम्रो डिजाइन गरेर समयमै प्रिन्ट गरिदिनुभयो। (They designed and printed our event flex banners and T-shirts right on time!)",
      rating: 5,
      displayOrder: 3,
    },
  ]);
  console.log("✅ Seeded testimonials.");

  // 5. Page Sections
  await db.delete(schema.pageSections);
  await db.insert(schema.pageSections).values([
    {
      sectionKey: "hero",
      title: "Mountain Multimedia Service",
      subtitle: "A Complete Design & Printing Solution in Bhaktapur",
      content: "Your trusted neighborhood printing press, photo studio, and photocopy counter in Dugure, Malpot Road. Fast same-day service for passport photos, PVC ID cards, flex printing, business cards, and custom media.",
      imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1920&q=80",
      isVisible: true,
      displayOrder: 1,
    },
    {
      sectionKey: "about",
      title: "भक्तपुरको आफ्नो प्रिन्ट पसल · Your Trusted Local Partner",
      subtitle: "Serving Dugure, Malpot Road & Greater Bhaktapur with Quality & Speed",
      content: "Mountain Multimedia Service provides complete digital printing, photo studio, and design services. We understand urgent local needs — school documents, visa photos, wedding cards, flex signboards, receipt books, and promotional items needed today.",
      imageUrl: "https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=1200&q=80",
      isVisible: true,
      displayOrder: 2,
    },
  ]);
  console.log("✅ Seeded page sections.");

  // 6. Site Settings
  await db.delete(schema.siteSettings);
  await db.insert(schema.siteSettings).values([
    { key: "shop_name", value: "Mountain Multimedia Service" },
    { key: "local_branding", value: "Mountain Printing Press, Photo Studio & Photocopy" },
    { key: "tagline", value: "A Complete Design & Printing Solution" },
    { key: "address", value: "Dugure, Malpot Road, Bhaktapur, Nepal" },
    { key: "phone_primary", value: "9841693181" },
    { key: "phone_secondary", value: "9861550233" },
    { key: "phone_tertiary", value: "9849425342" },
    { key: "email", value: "mdigitalpress1@gmail.com" },
    { key: "hours", value: "Open Daily: 8:00 AM – 7:00 PM" },
  ]);
  console.log("✅ Seeded site settings.");

  // 7. Default Admin User
  const existingUsers = await db.select().from(schema.users);
  if (existingUsers.length === 0) {
    try {
      await auth.api.signUpEmail({
        body: {
          email: "admin@mountainmultimedia.com",
          password: "AdminPassword123!",
          name: "Admin User",
        },
      });
      console.log("✅ Created initial admin account: admin@mountainmultimedia.com / AdminPassword123!");
    } catch (err) {
      console.log("Note on admin creation:", err);
    }
  }

  console.log("✨ Seed completed successfully.");
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
