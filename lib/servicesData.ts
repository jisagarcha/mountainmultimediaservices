export interface ServiceProduct {
  id: string | number;
  name: string;
  slug: string;
  description: string;
  paperSpec?: string;
  price?: string;
  imageUrl?: string;
  hasCustomSizesNote?: boolean;
}

export interface ServiceSubcategory {
  id: string | number;
  name: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  hasCustomSizesNote?: boolean;
  products: ServiceProduct[];
}

export interface ServiceCategory {
  id: string | number;
  name: string;
  slug: string;
  description: string;
  iconName: string;
  imageUrl: string;
  subcategories: ServiceSubcategory[];
}

// Helper to generate URL-safe slugs
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/[\s_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

// Top-Level Categories & Full Hierarchy Data
export const SERVICES_CATALOG: ServiceCategory[] = [
  {
    id: "photo-printing-and-frames",
    name: "Photo Printing & Frames",
    slug: "photo-printing-and-frames",
    description: "High definition studio photo printing in all standard market sizes & matching synthetic wooden, glass, and wall frames.",
    iconName: "Camera",
    imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80",
    subcategories: [
      {
        id: "photo-prints-market-sizes",
        name: "Photo Prints (All Market Sizes)",
        slug: "photo-prints-market-sizes",
        description: "Studio HD photo prints on Kodak & Fuji glossy or satin matte archival paper.",
        imageUrl: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80",
        products: [
          {
            id: "photo-print-4x6-4r",
            name: "4x6 Inch (4R) Photo Print",
            slug: "4x6-inch-4r-photo-print",
            description: "Standard postcard 4x6 inch (4R) high definition glossy photo print.",
            paperSpec: "260 GSM Fuji/Kodak Glossy Photo Paper",
          },
          {
            id: "photo-print-5x7-5r",
            name: "5x7 Inch (5R) Photo Print",
            slug: "5x7-inch-5r-photo-print",
            description: "5x7 inch (5R) portrait/landscape photo print on premium satin matte card.",
            paperSpec: "260 GSM Satin Photo Paper",
          },
          {
            id: "photo-print-6x8-6r",
            name: "6x8 Inch (6R) Photo Print",
            slug: "6x8-inch-6r-photo-print",
            description: "Medium 6x8 inch (6R) vibrant color photo print.",
            paperSpec: "260 GSM Premium Photo Paper",
          },
          {
            id: "photo-print-8x10-8r",
            name: "8x10 Inch (8R) Photo Print",
            slug: "8x10-inch-8r-photo-print",
            description: "8x10 inch (8R) studio portrait photo print.",
            paperSpec: "280 GSM Archival Photo Paper",
          },
          {
            id: "photo-print-8x12-a4",
            name: "8x12 Inch (A4 Size / 8R Extra) Photo Print",
            slug: "8x12-inch-a4-photo-print",
            description: "Full A4 / 8x12 inch high resolution studio photo print.",
            paperSpec: "280 GSM Glossy/Satin Photo Paper",
          },
          {
            id: "photo-print-10x12-10r",
            name: "10x12 Inch (10R) Photo Print",
            slug: "10x12-inch-10r-photo-print",
            description: "10x12 inch (10R) family portrait photo print.",
            paperSpec: "280 GSM Satin Photo Paper",
          },
          {
            id: "photo-print-12x18-a3",
            name: "12x18 Inch (12R / A3+) Photo Print",
            slug: "12x18-inch-12r-photo-print",
            description: "Jumbo 12x18 inch (12R) studio photo print for wall frames.",
            paperSpec: "300 GSM Ultra Gloss Photo Card",
          },
          {
            id: "photo-print-16x24",
            name: "16x24 Inch Large Wall Photo Print",
            slug: "16x24-inch-large-wall-photo-print",
            description: "16x24 inch large format high definition photo wall print.",
            paperSpec: "300 GSM Archival Photo Canvas Paper",
          },
          {
            id: "photo-print-20x30",
            name: "20x30 Inch Poster Size Photo Print",
            slug: "20x30-inch-poster-size-photo-print",
            description: "Extra large 20x30 inch poster size photo print.",
            paperSpec: "300 GSM Heavy Photo Card",
          },
          {
            id: "passport-visa-photo-sheet",
            name: "Passport & Visa Photo Set (Auto 4-in-1 / 8-in-1)",
            slug: "passport-visa-photo-set",
            description: "Instant 35x45mm & 2x2 inch biometric passport photo set printed on Fuji photo sheet.",
            paperSpec: "260 GSM Gloss Photo Sheet (10 mins instant)",
          },
        ],
      },
      {
        id: "photo-frames-market-sizes",
        name: "Photo Frames (Matching Market Sizes)",
        slug: "photo-frames-market-sizes",
        description: "Elegant synthetic wooden, glass, tabletop and wall hanging frames matching standard photo print sizes.",
        imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80",
        products: [
          {
            id: "frame-4x6",
            name: "4x6 Inch Tabletop & Wall Frame",
            slug: "4x6-inch-tabletop-wall-frame",
            description: "Compact 4x6 inch synthetic wooden frame with clear glass cover & back stand.",
            paperSpec: "Synthetic Wood + Glass Cover",
          },
          {
            id: "frame-5x7",
            name: "5x7 Inch Glass Desktop Frame",
            slug: "5x7-inch-glass-desktop-frame",
            description: "5x7 inch elegant tabletop photo frame with easel stand.",
            paperSpec: "Synthetic Wood / Glass Frame",
          },
          {
            id: "frame-6x8",
            name: "6x8 Inch Black Matte Frame",
            slug: "6x8-inch-black-matte-frame",
            description: "6x8 inch sleek black border photo frame for desk or wall.",
            paperSpec: "Matte Fiber Frame + Glass",
          },
          {
            id: "frame-8x10",
            name: "8x10 Inch Premium Gold/Silver Frame",
            slug: "8x10-inch-premium-frame",
            description: "8x10 inch carved golden/silver border photo frame.",
            paperSpec: "Carved Synthetic Frame + Glass",
          },
          {
            id: "frame-8x12-a4",
            name: "8x12 Inch (A4 Size) Wooden Wall Frame",
            slug: "8x12-inch-a4-wooden-wall-frame",
            description: "8x12 inch (A4 size) wall hanging photo frame.",
            paperSpec: "Synthetic Hardwood Frame",
          },
          {
            id: "frame-10x12",
            name: "10x12 Inch Gallery Canvas Frame",
            slug: "10x12-inch-gallery-canvas-frame",
            description: "10x12 inch deep profile wooden wall frame.",
            paperSpec: "Deep Profile Wood + Glass",
          },
          {
            id: "frame-12x18",
            name: "12x18 Inch Large Wall Exhibition Frame",
            slug: "12x18-inch-large-wall-exhibition-frame",
            description: "12x18 inch heavy synthetic fiber frame for living room & office walls.",
            paperSpec: "Heavy Fiber Frame + Acrylic/Glass",
          },
          {
            id: "frame-16x24",
            name: "16x24 Inch Jumbo Wall Frame",
            slug: "16x24-inch-jumbo-wall-frame",
            description: "16x24 inch large wall portrait frame.",
            paperSpec: "Heavy Fiber Wood + Shatterproof Glass",
          },
          {
            id: "frame-20x30",
            name: "20x30 Inch Grand Gallery Frame",
            slug: "20x30-inch-grand-gallery-frame",
            description: "Extra large 20x30 inch showcase wall frame.",
            paperSpec: "Hardwood Molding + Acrylic Glass",
          },
        ],
      },
    ],
  },
  {
    id: "commercial-printing-press",
    name: "Commercial Press",
    slug: "commercial-printing-press",
    description: "Industrial printing services: Star Flex signboards, NCR invoice bill pads, wall & desk calendars, roll-up standees & bulk offset media.",
    iconName: "Printer",
    imageUrl: "https://images.unsplash.com/photo-1562564077-715947276f95?auto=format&fit=crop&w=800&q=80",
    subcategories: [
      {
        id: "flex-outdoor-banners",
        name: "Flex & Outdoor Banners",
        slug: "flex-outdoor-banners",
        description: "Heavy duty weather-proof Star Flex banners, shop front signboards & glow lightboxes.",
        imageUrl: "https://images.unsplash.com/photo-1542744094-3a3172720449?auto=format&fit=crop&w=600&q=80",
        products: [
          {
            id: "star-flex-banner-print",
            name: "Star Flex Banner Printing",
            slug: "star-flex-banner-printing",
            description: "High durability Star Flex banner printing for shop signboards and event backdrops.",
            paperSpec: "High Density Weatherproof Star Flex",
          },
          {
            id: "roll-up-standee-2x5",
            name: "Roll-Up Standee (2x5 ft / 2.5x6 ft)",
            slug: "roll-up-standee-banner",
            description: "Portable aluminum retractable roll-up standee banner for exhibitions.",
            paperSpec: "Non-Curl Flex Film + Aluminum Standee",
          },
          {
            id: "solenoid-flex-board-frame",
            name: "Solenoid Flex Signboard Framing",
            slug: "solenoid-flex-signboard-framing",
            description: "Heavy iron pipe framed outdoor flex signboard installation.",
            paperSpec: "Flex + Heavy MS Pipe Frame",
          },
          {
            id: "backlit-glow-sign-board",
            name: "Backlit Glow Sign Lightbox",
            slug: "backlit-glow-sign-lightbox",
            description: "Double-sided illuminated backlit shop signboard.",
            paperSpec: "Backlit Flex + Internal LED Lighting",
          },
        ],
      },
      {
        id: "invoice-bill-pads",
        name: "Invoice & Bill Pads (NCR Carbonless)",
        slug: "invoice-bill-pads",
        description: "Official duplicate & triplicate carbonless receipt books with custom logo and serial numbering.",
        imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80",
        products: [
          {
            id: "invoice-a5-2ply-ncr",
            name: "Invoice A5 2-Ply Duplicate Pad (NCR)",
            slug: "invoice-a5-2ply-ncr-duplicate-pad",
            description: "A5 size carbonless duplicate 50-set receipt pad with perforations.",
            paperSpec: "NCR Carbonless Paper (50 Sets)",
          },
          {
            id: "invoice-a5-3ply-ncr",
            name: "Invoice A5 3-Ply Triplicate Pad (NCR)",
            slug: "invoice-a5-3ply-ncr-triplicate-pad",
            description: "A5 size carbonless triplicate 50-set business receipt pad.",
            paperSpec: "NCR Carbonless Paper (50 Sets)",
          },
          {
            id: "tax-invoice-a4-3ply-numbering",
            name: "Tax Invoice A4 3-Ply with Serial Numbering",
            slug: "tax-invoice-a4-3ply-with-serial-numbering",
            description: "Official A4 size 3-ply tax invoice receipt book with sequential red numbering.",
            paperSpec: "A4 NCR Carbonless + Red Serial Numbering",
          },
          {
            id: "cash-voucher-receipt-pad",
            name: "Cash Voucher & Receipt Pad",
            slug: "cash-voucher-receipt-pad",
            description: "Compact single or 2-ply cash payment voucher pad.",
            paperSpec: "70 GSM Bond Paper / NCR",
          },
        ],
      },
      {
        id: "calendar-printing-category",
        name: "Calendar Printing (Wall & Desk)",
        slug: "calendar-printing-category",
        description: "Custom corporate wall hanging calendars and wire-O table desk calendars.",
        imageUrl: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=600&q=80",
        products: [
          {
            id: "wall-calendar-tin-rim",
            name: "Wall Calendar (Tin Rim / Wire Binding)",
            slug: "wall-calendar-tin-rim-binding",
            description: "Full size multi-sheet customized wall calendar with tin rim top slider.",
            paperSpec: "170 GSM Gloss Art Paper",
          },
          {
            id: "desk-calendar-a5-wireo",
            name: "Desk Table Calendar A5 (Wire-O Bound)",
            slug: "desk-table-calendar-a5-wire-o",
            description: "A5 table desk calendar (12/14/16 pages) with rigid hard stand and metallic wire-O.",
            paperSpec: "250 GSM Gloss Card + Hard Stand",
          },
          {
            id: "poster-calendar-12x18",
            name: "Single Page Poster Wall Calendar 12x18",
            slug: "single-page-poster-wall-calendar-12x18",
            description: "Single sheet 12x18 inch full color year poster calendar.",
            paperSpec: "250 GSM Gloss Art Card",
          },
        ],
      },
    ],
  },
  {
    id: "business-card",
    name: "Business Card",
    slug: "business-card",
    description: "Premium 300 GSM art card, metallic textured, single and double-sided business cards.",
    iconName: "CreditCard",
    imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80",
    subcategories: [
      {
        id: "standard-business-card",
        name: "Standard",
        slug: "standard",
        imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80",
        products: [
          {
            id: "bc-single-side",
            name: "Business Card - Single Side",
            slug: "business-card-single-side",
            description: "High quality 300 GSM matte or gloss laminated single-sided business cards.",
            paperSpec: "300 GSM Matte/Gloss Art Card",
          },
          {
            id: "bc-both-side",
            name: "Business Card - Both Side",
            slug: "business-card-both-side",
            description: "Double-sided full color high precision business card with spot lamination.",
            paperSpec: "300 GSM Matte/Gloss Art Card",
          },
        ],
      },
      {
        id: "metallic-texture-business-card",
        name: "Metallic/Texture",
        slug: "metallic-texture",
        imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
        products: [
          {
            id: "metallic-single-side",
            name: "Metallic Card - Single Side",
            slug: "metallic-card-single-side",
            description: "Shimmering metallic textured stock card with sharp single-sided printing.",
            paperSpec: "280 GSM Metallic Textured Card",
          },
          {
            id: "metallic-both-side",
            name: "Metallic Card - Both Side",
            slug: "metallic-card-both-side",
            description: "Luxurious double-sided metallic textured card for corporate branding.",
            paperSpec: "280 GSM Metallic Textured Card",
          },
        ],
      },
    ],
  },
  {
    id: "gifts-and-promotions",
    name: "Gifts and Promotions",
    slug: "gifts-and-promotions",
    description: "Custom printed mugs, cushions, water bottles, keyrings, pin badges & metallic sheet photo prints.",
    iconName: "Gift",
    imageUrl: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80",
    subcategories: [
      {
        id: "mug",
        name: "Mug",
        slug: "mug",
        imageUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80",
        products: [
          {
            id: "mug-white-large",
            name: "Mug - White & Large Size",
            slug: "mug-white-large-size",
            description: "11oz high-gloss ceramic white mug with full wrap sublimation printing.",
            paperSpec: "Sublimation Ceramic 11oz",
          },
          {
            id: "mug-white-small",
            name: "Mug - White Small Size",
            slug: "mug-white-small-size",
            description: "Compact white ceramic mug suitable for espresso and gift sets.",
            paperSpec: "Sublimation Ceramic 6oz",
          },
          {
            id: "magic-mug",
            name: "Magic Mug",
            slug: "magic-mug",
            description: "Heat-sensitive black mug that reveals printed photo when hot liquid is poured.",
            paperSpec: "Color Changing Thermal Ceramic",
          },
          {
            id: "two-tone-mug",
            name: "Two Tone Mug",
            slug: "two-tone-mug",
            description: "Custom printed mug with colored inner wall and matching handle.",
            paperSpec: "Sublimation Ceramic Two-Tone",
          },
        ],
      },
      {
        id: "cushion",
        name: "Cushion",
        slug: "cushion",
        imageUrl: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&w=600&q=80",
        products: [
          {
            id: "fur-cushion",
            name: "Fur Cushion",
            slug: "fur-cushion",
            description: "Soft plush fur cushion with vibrant sublimation photo insert.",
            paperSpec: "Polyester Fur Cover + Pillow",
          },
          {
            id: "cushion-single-side",
            name: "Single Side Cushion Print",
            slug: "single-side-cushion-print",
            description: "Standard satin square cushion with high definition front side photo print.",
            paperSpec: "Sublimation Satin Fabric",
          },
          {
            id: "cushion-both-side",
            name: "Cushion Both Side",
            slug: "cushion-both-side",
            description: "Full double-sided custom photo cushion print with zip closure.",
            paperSpec: "Sublimation Satin Fabric",
          },
        ],
      },
      {
        id: "water-bottle",
        name: "Water Bottle",
        slug: "water-bottle",
        imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=600&q=80",
        products: [
          {
            id: "water-bottle-print",
            name: "Water Bottle With Print",
            slug: "water-bottle-with-print",
            description: "Stainless steel aluminum sports water bottle with custom sublimation logo.",
            paperSpec: "750ml Stainless Aluminum",
          },
        ],
      },
      {
        id: "keyring",
        name: "Keyring",
        slug: "keyring",
        imageUrl: "https://images.unsplash.com/photo-1622434641406-a158123450f9?auto=format&fit=crop&w=600&q=80",
        products: [
          {
            id: "cushion-keyring",
            name: "Cushion Keyring",
            slug: "cushion-keyring",
            description: "Miniature soft stuffed fabric keyring with double-sided photo print.",
            paperSpec: "Stuffed Fabric Keyring",
          },
          {
            id: "leather-embossed",
            name: "Leather Embossed",
            slug: "leather-embossed",
            description: "Premium genuine leather keyring with heat-embossed logo or text.",
            paperSpec: "Embossed Leather + Metal Ring",
          },
          {
            id: "leather-color-print",
            name: "Leather Single Side Color Print",
            slug: "leather-single-side-color-print",
            description: "Custom UV color printed leather keyring with metallic ring.",
            paperSpec: "UV Printed Leather",
          },
          {
            id: "sanitizer-keyring",
            name: "Sanitizer Key Ring",
            slug: "sanitizer-key-ring",
            description: "Portable refillable bottle keychain pouch with custom printed logo.",
            paperSpec: "Neoprene Pouch + Refill Bottle",
          },
          {
            id: "metal-heart-keyring",
            name: "Metal Heart Keyring",
            slug: "metal-heart-keyring",
            description: "Heavy chrome metallic heart-shaped keychain with photo insert.",
            paperSpec: "Chrome Alloy Metal",
          },
        ],
      },
      {
        id: "pin-badge",
        name: "Pin Badge",
        slug: "pin-badge",
        imageUrl: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=600&q=80",
        products: [
          {
            id: "pin-badge-44mm",
            name: "Pin Badge - 44mm",
            slug: "pin-badge-44mm",
            description: "Standard 44mm round button pin badge with glossy protective film.",
            paperSpec: "Gloss Plastic/Metal Pin Badge",
          },
        ],
      },
      {
        id: "cards",
        name: "Cards",
        slug: "cards",
        imageUrl: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80",
        products: [
          {
            id: "a5-greeting-card-single",
            name: "A5 Greeting Card - Single Side",
            slug: "a5-greeting-card-single-side",
            description: "A5 folded greeting card with high resolution single-sided color print.",
            paperSpec: "300 GSM Art Card",
          },
        ],
      },
      {
        id: "calendar",
        name: "Calendar",
        slug: "calendar",
        imageUrl: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=600&q=80",
        products: [
          {
            id: "wall-calendar",
            name: "Wall Calendar",
            slug: "wall-calendar",
            description: "Full size multi-sheet wall hanging calendar with tin rim binding.",
            paperSpec: "170 GSM Gloss Art Paper",
          },
          {
            id: "desk-calendar-a5",
            name: "Desk Calendar A5 (12/14/16 pages)",
            slug: "desk-calendar-a5-pages",
            description: "Premium A5 table desk calendar with wire-O binding and rigid stand.",
            paperSpec: "250 GSM Gloss Card + Hard Stand",
          },
        ],
      },
      {
        id: "valentine-gifts",
        name: "Valentine Gifts",
        slug: "valentine-gifts",
        imageUrl: "https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&w=600&q=80",
        products: [
          {
            id: "val-mugs",
            name: "Mugs",
            slug: "valentine-mugs",
            description: "Special heart-handle romantic photo print mugs.",
            paperSpec: "Ceramic Heart-Handle",
          },
          {
            id: "photo-print-metal-wood",
            name: "Photo Print on Metal Sheet with Wood Stand",
            slug: "photo-print-on-metal-sheet-with-wood-stand",
            description: "HD vibrant photo printed directly onto aluminum metal sheet with wooden easel base.",
            paperSpec: "Sublimation Aluminum Sheet + Wood Stand",
          },
          {
            id: "magic-mirror-watch",
            name: "Magic Mirror with Watch",
            slug: "magic-mirror-with-watch",
            description: "LED illuminated mirror frame that reveals a customized photo when turned on.",
            paperSpec: "LED Mirror Frame + Clock",
          },
          {
            id: "photo-frame",
            name: "Photo Frame",
            slug: "photo-frame",
            description: "Elegant synthetic wooden photo wall and tabletop frame.",
            paperSpec: "Glass + Synthetic Frame",
          },
          {
            id: "cushion-print-val",
            name: "Cushion Print",
            slug: "valentine-cushion-print",
            description: "Heart shaped photo cushion with plush stuffing.",
            paperSpec: "Heart Satin Pillow",
          },
          {
            id: "wooden-keyrings",
            name: "Wooden Keyrings",
            slug: "wooden-keyrings",
            description: "Natural hardwood engraved or color printed keychains.",
            paperSpec: "Hardwood MDF",
          },
          {
            id: "tshirt-print-val",
            name: "T-shirt Print",
            slug: "valentine-tshirt-print",
            description: "Custom couple photo or quote printed cotton t-shirt.",
            paperSpec: "100% Cotton / Polyester",
          },
        ],
      },
      {
        id: "photo-print-on-metallic-sheet",
        name: "Photo Print On Metallic Sheet",
        slug: "photo-print-on-metallic-sheet",
        imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80",
        products: [
          {
            id: "a4-metallic-sheet",
            name: "A4 Metallic Sheet",
            slug: "a4-metallic-sheet",
            description: "A4 size high-gloss metallic metal sheet photo print.",
            paperSpec: "A4 Aluminum Sublimation Sheet",
          },
          {
            id: "a3-metallic-sheet",
            name: "A3 Metallic Sheet",
            slug: "a3-metallic-sheet",
            description: "Large A3 size high-gloss metallic sheet print for wall displays.",
            paperSpec: "A3 Aluminum Sublimation Sheet",
          },
          {
            id: "a2-metallic-sheet",
            name: "A2 Metallic Sheet",
            slug: "a2-metallic-sheet",
            description: "Extra large A2 metallic sheet photo panel for galleries and office reception.",
            paperSpec: "A2 Aluminum Sublimation Sheet",
          },
        ],
      },
    ],
  },
  {
    id: "digital-print",
    name: "Digital Print",
    slug: "digital-print",
    description: "High speed A4 black & white/color laser printing, document copies & paper stickers.",
    iconName: "Printer",
    imageUrl: "https://images.unsplash.com/photo-1562564077-715947276f95?auto=format&fit=crop&w=800&q=80",
    subcategories: [
      {
        id: "a4",
        name: "A4",
        slug: "a4",
        imageUrl: "https://images.unsplash.com/photo-1562564077-715947276f95?auto=format&fit=crop&w=600&q=80",
        products: [
          {
            id: "a4-bw-single-side",
            name: "A4 BW Single Side",
            slug: "a4-bw-single-side",
            description: "High speed single-sided black and white document laser print.",
            paperSpec: "80 GSM Bond Paper",
          },
          {
            id: "a4-bw-both-side",
            name: "A4 BW Both Side",
            slug: "a4-bw-both-side",
            description: "Duplex double-sided black and white laser document printing.",
            paperSpec: "80 GSM Bond Paper",
          },
          {
            id: "a4-color-print",
            name: "A4 Color Print",
            slug: "a4-color-print",
            description: "Full color high definition laser print on 80 GSM or 100 GSM paper.",
            paperSpec: "80 GSM / 100 GSM Color Paper",
          },
        ],
      },
      {
        id: "sticker-print",
        name: "Sticker Print",
        slug: "sticker-print",
        imageUrl: "https://images.unsplash.com/photo-1572375992501-4b0892d50c69?auto=format&fit=crop&w=600&q=80",
        products: [
          {
            id: "12x18-paper-sticker",
            name: "12x18 Paper Sticker",
            slug: "12x18-paper-sticker",
            description: "Full color 12x18 inch digital sheet paper sticker printing for product labels.",
            paperSpec: "12x18 Self-Adhesive Gloss Paper",
          },
        ],
      },
    ],
  },
  {
    id: "marketing-tools",
    name: "Marketing Tools",
    slug: "marketing-tools",
    description: "Tri-fold A4 brochures, single and double sided promotional flyers & custom size variants.",
    iconName: "FileText",
    imageUrl: "https://images.unsplash.com/photo-1542744094-3a3172720449?auto=format&fit=crop&w=800&q=80",
    subcategories: [
      {
        id: "brochure",
        name: "Brochure",
        slug: "brochure",
        imageUrl: "https://images.unsplash.com/photo-1542744094-3a3172720449?auto=format&fit=crop&w=600&q=80",
        products: [
          {
            id: "brochure-a4-both-side",
            name: "Brochure A4 - Both Side",
            slug: "brochure-a4-both-side",
            description: "Standard A4 double-sided glossy marketing brochure print.",
            paperSpec: "170 GSM Gloss Art Paper",
          },
          {
            id: "brochure-a4-single-side",
            name: "Brochure A4 - Single Side",
            slug: "brochure-a4-single-side",
            description: "A4 single-sided glossy announcement flyer/brochure.",
            paperSpec: "170 GSM Gloss Art Paper",
          },
          {
            id: "brochure-a4-both-side-tri-fold",
            name: "Brochure A4 - Both Side Tri Fold",
            slug: "brochure-a4-both-side-tri-fold",
            description: "Professional 6-panel tri-fold A4 business marketing brochure.",
            paperSpec: "170 GSM Gloss Art Paper + Creasing",
          },
        ],
      },
      {
        id: "flyers",
        name: "Flyers",
        slug: "flyers",
        imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80",
        hasCustomSizesNote: true,
        products: [
          {
            id: "flyer-a4-single-side",
            name: "Flyer A4 - Single Side",
            slug: "flyer-a4-single-side",
            description: "Single sided full color A4 promotional marketing flyer.",
            paperSpec: "130 GSM Gloss Art Paper",
            hasCustomSizesNote: true,
          },
          {
            id: "flyer-a4-both-side",
            name: "Flyer A4 - Both Side",
            slug: "flyer-a4-both-side",
            description: "Double sided full color A4 advertising flyer.",
            paperSpec: "130 GSM Gloss Art Paper",
            hasCustomSizesNote: true,
          },
          {
            id: "flyer-a5-single-side",
            name: "Flyer A5 - Single Side",
            slug: "flyer-a5-single-side",
            description: "Compact A5 size single-sided distribution flyer.",
            paperSpec: "130 GSM Gloss Art Paper",
            hasCustomSizesNote: true,
          },
          {
            id: "flyer-a5-both-side",
            name: "Flyer A5 - Both Side",
            slug: "flyer-a5-both-side",
            description: "Compact A5 double-sided handbill flyer.",
            paperSpec: "130 GSM Gloss Art Paper",
            hasCustomSizesNote: true,
          },
        ],
      },
    ],
  },
  {
    id: "stationary",
    name: "Stationary",
    slug: "stationary",
    description: "PVC ID cards, digital printed lanyards, exercise copies, envelopes, certificates, bookmarks & letterheads.",
    iconName: "BookOpen",
    imageUrl: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=800&q=80",
    subcategories: [
      {
        id: "id-card",
        name: "ID Card",
        slug: "id-card",
        imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80",
        products: [
          {
            id: "id-card-pvc-gloss-single",
            name: "ID Card PVC Gloss - Single Side",
            slug: "id-card-pvc-gloss-single-side",
            description: "Waterproof hard plastic PVC identity card with single-sided gloss finish.",
            paperSpec: "Standard CR80 Heavy PVC",
          },
          {
            id: "id-card-pvc-gloss-both",
            name: "ID Card PVC Gloss - Both Side",
            slug: "id-card-pvc-gloss-both-side",
            description: "Standard school/office double-sided gloss laminated PVC ID card.",
            paperSpec: "Standard CR80 Heavy PVC",
          },
        ],
      },
      {
        id: "id-belt-lanyard",
        name: "ID Belt / Lanyard",
        slug: "id-belt-lanyard",
        imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
        products: [
          {
            id: "lanyard-20mm-digital",
            name: "Lanyard 20mm - Digital Print",
            slug: "lanyard-20mm-digital-print",
            description: "20mm wide full color satin digital sublimated neck lanyard with dog hook.",
            paperSpec: "20mm Satin Webbing",
          },
          {
            id: "id-belt-15mm-plain",
            name: "ID Belt 15mm - Plain",
            slug: "id-belt-15mm-plain",
            description: "Standard 15mm single color woven polyester neck strap lanyard.",
            paperSpec: "15mm Woven Webbing",
          },
          {
            id: "clip-id-holder",
            name: "Clip ID Holder",
            slug: "clip-id-holder",
            description: "Metal crocodile clip with transparent PVC strap for badges.",
            paperSpec: "Metal Clip + Vinyl Strap",
          },
          {
            id: "pocket-round-sprint-id-holder",
            name: "Pocket Round Sprint ID Holder",
            slug: "pocket-round-sprint-id-holder",
            description: "Retractable badge reel yo-yo holder for hospital and corporate staff.",
            paperSpec: "ABS Plastic Reel",
          },
        ],
      },
      {
        id: "exercise-copy",
        name: "Exercise Copy",
        slug: "exercise-copy",
        imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
        products: [
          {
            id: "exercise-copy-100",
            name: "Exercise Copy 100 Pages",
            slug: "exercise-copy-100-pages",
            description: "Custom printed school cover exercise notebook with 100 lined pages.",
            paperSpec: "300 GSM Cover + 70 GSM Pages",
          },
          {
            id: "exercise-copy-200",
            name: "Exercise Copy 200 Pages",
            slug: "exercise-copy-200-pages",
            description: "Heavy duty 200 pages school exercise notebook with laminated cover.",
            paperSpec: "300 GSM Cover + 70 GSM Pages",
          },
        ],
      },
      {
        id: "envelope",
        name: "Envelope",
        slug: "envelope",
        imageUrl: "https://images.unsplash.com/photo-1596526131083-e8c633c948d2?auto=format&fit=crop&w=600&q=80",
        products: [
          {
            id: "standard-envelope-screen",
            name: "Standard Envelope with 1 Color Screen Print",
            slug: "standard-envelope-with-1-color-screen-print",
            description: "Standard office envelope with single color company logo screen printing.",
            paperSpec: "80 GSM White Envelope",
          },
        ],
      },
      {
        id: "certificates",
        name: "Certificates",
        slug: "certificates",
        imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80",
        products: [
          {
            id: "certificate-standard-a4",
            name: "Certificate - Standard A4",
            slug: "certificate-standard-a4",
            description: "Standard A4 appreciation certificate printed on smooth matte card.",
            paperSpec: "250 GSM Matte Card",
          },
          {
            id: "certificate-premium-a4",
            name: "Certificate - Premium A4",
            slug: "certificate-premium-a4",
            description: "Premium A4 award certificate on heavy textured metallic art stock.",
            paperSpec: "300 GSM Metallic Texture Card",
          },
          {
            id: "certificate-premium-12x18",
            name: "Certificate - Premium 12x18",
            slug: "certificate-premium-12x18",
            description: "Large 12x18 inch jumbo award certificate with spot gold foil accents.",
            paperSpec: "300 GSM Texture Card",
          },
          {
            id: "certificate-standard-12x18",
            name: "Certificate - Standard 12x18",
            slug: "certificate-standard-12x18",
            description: "Large 12x18 inch full color achievement certificate.",
            paperSpec: "250 GSM Matte Card",
          },
        ],
      },
      {
        id: "bookmark",
        name: "Bookmark",
        slug: "bookmark",
        imageUrl: "https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80",
        products: [
          {
            id: "bookmark-single-side",
            name: "Bookmark 21x4.95cm - Single Side",
            slug: "bookmark-21x495cm-single-side",
            description: "Custom printed single-sided card bookmark with matte lamination.",
            paperSpec: "350 GSM Matte Card",
          },
          {
            id: "bookmark-both-side",
            name: "Bookmark 21x4.95cm - Both Side",
            slug: "bookmark-21x495cm-both-side",
            description: "Double-sided full color reading bookmark with rounded corners.",
            paperSpec: "350 GSM Matte Card",
          },
        ],
      },
      {
        id: "letterhead",
        name: "Letterhead",
        slug: "letterhead",
        imageUrl: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=600&q=80",
        products: [
          {
            id: "letterhead-standard",
            name: "Letterhead - Standard",
            slug: "letterhead-standard",
            description: "Standard A4 official company letterhead on executive bond paper.",
            paperSpec: "100 GSM Executive Bond Paper",
          },
        ],
      },
      {
        id: "id-holder-collection",
        name: "ID Holder Collection",
        slug: "id-holder-collection",
        imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80",
        products: [
          {
            id: "soft-id-holder",
            name: "Soft ID Card Holder",
            slug: "soft-id-card-holder",
            description: "Clear flexible vinyl ID card pouch.",
            paperSpec: "Flexible PVC Vinyl",
          },
          {
            id: "zipper-id-holder",
            name: "Zipper ID Holder",
            slug: "zipper-id-holder",
            description: "Waterproof ziplock clear badge pouch.",
            paperSpec: "Ziplock PVC Vinyl",
          },
          {
            id: "hard-pvc-id-holder",
            name: "Hard PVC ID Holder",
            slug: "hard-pvc-id-holder",
            description: "Rigid plastic thumb-slot protective ID card frame.",
            paperSpec: "Rigid Polycarbonate Plastic",
          },
        ],
      },
    ],
  },
  {
    id: "business-essentials",
    name: "Business Essentials",
    slug: "business-essentials",
    description: "Wire-bound notebooks, 16-page catalogues, self-inking stamps, duplicate bill books, packaging boxes & company folders.",
    iconName: "Briefcase",
    imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80",
    subcategories: [
      {
        id: "diary-notebook",
        name: "Diary/Notebook",
        slug: "diary-notebook",
        imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
        products: [
          {
            id: "notebook-wire-binding",
            name: "Notebook (Wire Binding)",
            slug: "notebook-wire-binding",
            description: "Custom printed hard cover spiral wire-O bound notebook.",
            paperSpec: "300 GSM Cover + 80 GSM Lined Pages",
          },
        ],
      },
      {
        id: "catalogue",
        name: "Catalogue",
        slug: "catalogue",
        imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
        products: [
          {
            id: "catalogue-16-page",
            name: "Catalogue - 16 Page",
            slug: "catalogue-16-page",
            description: "16-page full color center-stapled product catalogue booklet.",
            paperSpec: "170 GSM Gloss Art Paper",
          },
        ],
      },
      {
        id: "stamps",
        name: "Stamps",
        slug: "stamps",
        imageUrl: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=600&q=80",
        products: [
          {
            id: "normal-stamp",
            name: "Normal Stamp",
            slug: "normal-stamp",
            description: "Traditional wooden handle rubber stamp seal.",
            paperSpec: "Rubber Mold + Wood Handle",
          },
          {
            id: "crystal-handle-stamp",
            name: "Crystal Handle Stamp",
            slug: "crystal-handle-stamp",
            description: "Self-inking flash pre-inked stamp with ergonomic acrylic crystal handle.",
            paperSpec: "Self-Inking Flash Chamber",
          },
        ],
      },
      {
        id: "bill-pad",
        name: "Bill Pad",
        slug: "bill-pad",
        imageUrl: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80",
        products: [
          {
            id: "invoice-a5-2-ply",
            name: "Invoice A5 2 Ply",
            slug: "invoice-a5-2-ply",
            description: "A5 NCR carbonless duplicate 50 set receipt pad.",
            paperSpec: "NCR Carbonless Paper",
          },
          {
            id: "invoice-a5-3-ply",
            name: "Invoice A5 3 Ply",
            slug: "invoice-a5-3-ply",
            description: "A5 NCR carbonless triplicate 50 set business receipt book.",
            paperSpec: "NCR Carbonless Paper",
          },
          {
            id: "tax-invoice-3-ply-a4",
            name: "Tax Invoice (3 Ply) - A4",
            slug: "tax-invoice-3-ply-a4",
            description: "Official A4 size 3-ply carbonless tax invoice receipt book with numbering.",
            paperSpec: "A4 NCR Carbonless + Serial Numbering",
          },
        ],
      },
      {
        id: "packaging-box",
        name: "Packaging Box",
        slug: "packaging-box",
        imageUrl: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=600&q=80",
        products: [
          {
            id: "box-6x6x6",
            name: "Corrugated Box 6x6x6",
            slug: "corrugated-box-6x6x6",
            description: "Custom printed 6x6x6 inch 3-ply corrugated shipping box.",
            paperSpec: "3-Ply Corrugated Cardboard",
          },
          {
            id: "box-8x8x8",
            name: "Corrugated Box 8x8x8",
            slug: "corrugated-box-8x8x8",
            description: "8x8x8 inch corrugated product packaging box.",
            paperSpec: "3-Ply Corrugated Cardboard",
          },
          {
            id: "box-10x10x10",
            name: "Corrugated Box 10x10x10",
            slug: "corrugated-box-10x10x10",
            description: "10x10x10 inch medium corrugated packaging carton.",
            paperSpec: "3-Ply Corrugated Cardboard",
          },
          {
            id: "box-12x12x12",
            name: "Corrugated Box 12x12x12",
            slug: "corrugated-box-12x12x12",
            description: "12x12x12 inch large corrugated courier box.",
            paperSpec: "3-Ply Corrugated Cardboard",
          },
        ],
      },
      {
        id: "company-profile",
        name: "Company Profile",
        slug: "company-profile",
        imageUrl: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=600&q=80",
        products: [
          {
            id: "company-profile-12-page",
            name: "Company Profile - 12 Page",
            slug: "company-profile-12-page",
            description: "12-page corporate presentation booklet with matte laminated cover.",
            paperSpec: "250 GSM Cover + 150 GSM Inner Pages",
          },
        ],
      },
      {
        id: "folder",
        name: "Folder",
        slug: "folder",
        imageUrl: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80",
        products: [
          {
            id: "normal-folder-fastener",
            name: "Normal Folder with Paper Fastener - Multicolor Print",
            slug: "normal-folder-with-paper-fastener-multicolor-print",
            description: "Multicolor printed card file folder with built-in metal paper fastener.",
            paperSpec: "300 GSM Matte Card",
          },
          {
            id: "single-side-pocket-folder",
            name: "Single Side Pocket Folder - Multicolor Print",
            slug: "single-side-pocket-folder-multicolor-print",
            description: "Corporate presentation folder with single interior document pocket and card slot.",
            paperSpec: "350 GSM Gloss Card",
          },
          {
            id: "dual-side-pocket-folder",
            name: "Dual Side Pocket Folder - Multicolor Print",
            slug: "dual-side-pocket-folder-multicolor-print",
            description: "Executive presentation folder with dual inside pockets for brochures & proposals.",
            paperSpec: "350 GSM Gloss Card",
          },
        ],
      },
    ],
  },
  {
    id: "apparels",
    name: "Apparels",
    slug: "apparels",
    description: "Custom screen and sublimation t-shirts, polo shirts, embroidered caps, sweatshirts & canvas tote bags.",
    iconName: "Shirt",
    imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80",
    subcategories: [
      {
        id: "round-neck-t-shirt",
        name: "Round Neck T-shirt",
        slug: "round-neck-t-shirt",
        imageUrl: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
        products: [
          {
            id: "round-neck-1-color",
            name: "Round Neck T-Shirt - 1 Color Print",
            slug: "round-neck-t-shirt-1-color-print",
            description: "100% cotton round neck t-shirt with single color screen printed front chest logo.",
            paperSpec: "180 GSM 100% Cotton",
          },
          {
            id: "round-neck-3-colors",
            name: "Round Neck T-Shirt - 3 Colors Print",
            slug: "round-neck-t-shirt-3-colors-print",
            description: "Cotton t-shirt with 3-color screen printed design.",
            paperSpec: "180 GSM 100% Cotton",
          },
        ],
      },
      {
        id: "polo-t-shirt-polyester",
        name: "Polo T-shirt Polyester",
        slug: "polo-t-shirt-polyester",
        imageUrl: "https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?auto=format&fit=crop&w=600&q=80",
        products: [
          {
            id: "polo-1-color",
            name: "Polo T-shirt (PC PK) - 1 Color Print",
            slug: "polo-t-shirt-pc-pk-1-color-print",
            description: "Collared polo t-shirt with single color screen print or chest embroidery.",
            paperSpec: "220 GSM PC PK Cotton/Poly Blend",
          },
          {
            id: "polo-colors-print",
            name: "Polo T-shirt (PC PK) - Colors Print",
            slug: "polo-t-shirt-pc-pk-colors-print",
            description: "Custom corporate collared polo t-shirt with multicolor print.",
            paperSpec: "220 GSM PC PK Blend",
          },
        ],
      },
      {
        id: "caps",
        name: "Caps",
        slug: "caps",
        imageUrl: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80",
        products: [
          {
            id: "cap-embroidery",
            name: "Cap - Embroidery",
            slug: "cap-embroidery",
            description: "Baseball cap with 3D computer embroidery logo.",
            paperSpec: "Cotton Twill 6-Panel Cap",
          },
          {
            id: "cap-screen-print",
            name: "Cap - Screen Print",
            slug: "cap-screen-print",
            description: "Promotional trucker cap with screen printed front panel logo.",
            paperSpec: "Foam/Mesh Trucker Cap",
          },
        ],
      },
      {
        id: "sweat-shirt",
        name: "Sweat Shirt",
        slug: "sweat-shirt",
        imageUrl: "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=600&q=80",
        products: [
          {
            id: "normal-sweat-shirt",
            name: "Normal Sweat Shirt",
            slug: "normal-sweat-shirt",
            description: "Fleece lined pullover sweatshirt with custom chest logo print.",
            paperSpec: "300 GSM Heavy Fleece",
          },
        ],
      },
      {
        id: "jersey",
        name: "Jersey",
        slug: "jersey",
        imageUrl: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=600&q=80",
        products: [
          {
            id: "football-jersey",
            name: "Football Jersey",
            slug: "football-jersey",
            description: "Full sublimation customized sports team jersey with name and player number.",
            paperSpec: "Dri-Fit Polyester Mesh",
          },
        ],
      },
      {
        id: "bags",
        name: "Bags",
        slug: "bags",
        imageUrl: "https://images.unsplash.com/photo-1597484661643-2f5f36409490?auto=format&fit=crop&w=600&q=80",
        products: [
          {
            id: "non-woven-bag-print",
            name: "Non Woven Bag with Print",
            slug: "non-woven-bag-with-print",
            description: "Eco-friendly non-woven shopping D-cut bag with single color screen print.",
            paperSpec: "80 GSM Non-Woven Polypropylene",
          },
          {
            id: "canvas-tote",
            name: "Canvas Tote",
            slug: "canvas-tote",
            description: "Heavy canvas cotton tote shopping bag with full color digital print.",
            paperSpec: "10oz Natural Cotton Canvas",
          },
        ],
      },
    ],
  },
  {
    id: "signage",
    name: "Signage",
    slug: "signage",
    description: "Brass letters, transparent acrylic signs, laser engraving, forex vinyl signboards & 3D LED glow boxes.",
    iconName: "Layers",
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80",
    subcategories: [
      {
        id: "letter-cutting",
        name: "Letter Cutting",
        slug: "letter-cutting",
        imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80",
        products: [
          {
            id: "brass-letter-175-inch",
            name: "Brass Letter - 1.75 inch",
            slug: "brass-letter-175-inch",
            description: "Precision CNC cut solid brass letter for corporate nameplates.",
            paperSpec: "Solid Brass Sheet",
          },
        ],
      },
      {
        id: "acrylic-signage",
        name: "Acrylic Signage",
        slug: "acrylic-signage",
        imageUrl: "https://images.unsplash.com/photo-1542744094-3a3172720449?auto=format&fit=crop&w=600&q=80",
        products: [
          {
            id: "acrylic-transparent-print",
            name: "Acrylic Signage - Transparent Print",
            slug: "acrylic-signage-transparent-print",
            description: "Clear cast acrylic board with reverse UV color print.",
            paperSpec: "3mm Clear Cast Acrylic",
          },
          {
            id: "acrylic-transparent-spacer",
            name: "Acrylic Signage - Transparent with Spacer",
            slug: "acrylic-signage-transparent-with-spacer",
            description: "Wall mounted clear acrylic sign with stainless steel standoff wall spacers.",
            paperSpec: "5mm Clear Acrylic + SS Standoffs",
          },
          {
            id: "acrylic-plottering",
            name: "Acrylic Signage - Plottering",
            slug: "acrylic-plottering",
            description: "Acrylic sign with precision vinyl plotter cut lettering.",
            paperSpec: "3mm Acrylic + Vinyl Plotter",
          },
          {
            id: "acrylic-plottering-spacer",
            name: "Acrylic Signage - Plottering with Spacer",
            slug: "acrylic-signage-plottering-with-spacer",
            description: "Vinyl plotter cut acrylic sign board with metallic wall spacers.",
            paperSpec: "5mm Acrylic + Vinyl + Wall Spacers",
          },
        ],
      },
      {
        id: "engraving",
        name: "Engraving",
        slug: "engraving",
        imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80",
        products: [
          {
            id: "granite-engraving",
            name: "Granite Engraving",
            slug: "granite-engraving",
            description: "Deep laser/sandblast granite stone engraving filled with gold/white enamel paint.",
            paperSpec: "Black Polish Granite Stone",
          },
        ],
      },
      {
        id: "forex-signage",
        name: "Forex Signage",
        slug: "forex-signage",
        imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80",
        products: [
          {
            id: "forex-plottering",
            name: "Forex Signage - Plottering",
            slug: "forex-plottering",
            description: "PVC Forex foam board with vinyl plotter cut text for indoor directions.",
            paperSpec: "5mm Forex Foam Sheet",
          },
          {
            id: "forex-vinyl-lamination",
            name: "Forex Signage - Vinyl with Lamination",
            slug: "forex-signage-vinyl-with-lamination",
            description: "Forex foam board mounted with matte/gloss laminated vinyl print.",
            paperSpec: "5mm Forex Sheet + Outdoor Vinyl",
          },
        ],
      },
      {
        id: "sign-board",
        name: "Sign Board",
        slug: "sign-board",
        imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=600&q=80",
        products: [
          {
            id: "3d-light-board-led",
            name: "3D Light Board - LED",
            slug: "3d-light-board-led",
            description: "Illuminated 3D acrylic channel letters with internal waterproof LED modules.",
            paperSpec: "3D Acrylic Letters + Waterproof LEDs",
          },
          {
            id: "3d-normal-board",
            name: "3D Normal Board",
            slug: "3d-normal-board",
            description: "Non-illuminated 3D raised acrylic/forex shop name board.",
            paperSpec: "3D Acrylic/Forex Letters",
          },
          {
            id: "2d-light-board-led",
            name: "2D Light Board - LED",
            slug: "2d-light-board-led",
            description: "Flat backlit flex lightbox sign with interior LED lighting.",
            paperSpec: "Backlit Flex + Aluminum Frame",
          },
          {
            id: "glow-sign-board-standard",
            name: "Glow Sign Board Standard",
            slug: "glow-sign-board-standard",
            description: "Standard double-sided shop overhang glow sign lightbox.",
            paperSpec: "Flex Lightbox + MS Frame",
          },
          {
            id: "glow-sign-round-box-vinyl-24",
            name: "Glow Sign Round Box With Vinyl Print 24\"",
            slug: "glow-sign-round-box-with-vinyl-print-24",
            description: "24-inch circular double-sided projecting LED lightbox with vinyl graphics.",
            paperSpec: "24 Inch Circular Aluminum Frame + LED",
          },
          {
            id: "glow-sign-round-box-plotter-24",
            name: "Glow Sign Round Box With Plottering 24\"",
            slug: "glow-sign-round-box-with-plottering-24",
            description: "24-inch circular projecting LED lightbox with plotter cut vinyl graphics.",
            paperSpec: "24 Inch Circular Frame + Plotter Vinyl",
          },
          {
            id: "glow-sign-round-box-vinyl-18",
            name: "Glow Sign Round Box With Vinyl Print 18\"",
            slug: "glow-sign-round-box-with-vinyl-print-18",
            description: "18-inch compact circular projecting LED shop sign box.",
            paperSpec: "18 Inch Circular Frame + Vinyl",
          },
        ],
      },
    ],
  },
];

// Helper search functions
export function getCategoryBySlug(slug: string): ServiceCategory | undefined {
  return SERVICES_CATALOG.find((cat) => cat.slug === slug);
}

export function getSubcategoryBySlug(subSlug: string): { subcategory: ServiceSubcategory; category: ServiceCategory } | undefined {
  for (const cat of SERVICES_CATALOG) {
    const sub = cat.subcategories.find((s) => s.slug === subSlug);
    if (sub) {
      return { subcategory: sub, category: cat };
    }
  }
  return undefined;
}

export function getProductBySlug(productSlug: string): { product: ServiceProduct; subcategory: ServiceSubcategory; category: ServiceCategory } | undefined {
  for (const cat of SERVICES_CATALOG) {
    for (const sub of cat.subcategories) {
      const prod = sub.products.find((p) => p.slug === productSlug);
      if (prod) {
        return { product: prod, subcategory: sub, category: cat };
      }
    }
  }
  return undefined;
}
