export type CatalogItem = {
  id: string;
  name: string;
  price: number;           // CAD (unidades)
  category: "Premium Dark"
  | "Fruit Infused"
  | "Nut Collection"
  | "Bonbons"
  | "Gifting"
  | "Limited"
  | "Snacks";
  tag?: string;
  shortDesc?: string;
  longDesc?: string;
  chips?: string[];
  cacao?: string;
  weight?: string;
  dietary?: string[];
  ingredients?: string;
  allergens?: string;
  images: string[];
  content?: string[];
};

export const CATALOG: Record<string, CatalogItem> = {
  /* ───────────────── BARS ───────────────── */
  "milk-37-pistachio": {
    id: "milk-37-pistachio",
    name: "37% Milky Pistachio Bar",
    price: 8,
    category: "Nut Collection",
    tag: "Bean-to-Bar",
    shortDesc: "Creamy 37% milk chocolate studded with pistachio pieces and a whisper of sea salt.",
    longDesc:
      "Silky, nostalgic 37% milk chocolate with pops of roasted pistachio and a pinch of sea salt to brighten the melt. Comforting, crunchy, and impossible to share.",
    chips: ["Creamy 37%", "Pistachio pieces"],
    cacao: "Milk chocolate • 37%",
    weight: "40 g",
    dietary: ["Contains milk"],
    ingredients:
      "Cocoa mass, sugar, cocoa butter, whole milk powder, pistachios (tree nuts), emulsifier (sunflower lecithin), natural flavours.",
    allergens:
      "Contains milk and tree nuts (pistachio). Made in a facility that handles other nuts.",
    images: ["/images/bars/milk-pistachio.webp","/images/bars/milk-pistachio-1.webp","/images/bars/milk-pistachio-2.webp"],
    content: ["1 × 40 g bar","Studded with roasted pistachio pieces"]
  },

  "milk-37-raspberry-crumble": {
    id: "milk-37-raspberry-crumble",
    name: "37% Milky Raspberry Crumble",
    price: 8,
    category: "Fruit Infused",
    tag: "Kid-Friendly",
    shortDesc: "Silky 37% milk chocolate with raspberry crumble bits for a bright, crunchy finish.",
    longDesc:
      "A cheerful bar that pairs creamy 37% milk chocolate with tart raspberry crumble. Crunchy texture, fruity lift, and a smooth, milky finish.",
    chips: ["Raspberry crumble", "Creamy 37%"],
    cacao: "Milk chocolate • 37%",
    weight: "40 g",
    dietary: ["Contains milk"],
    ingredients:
      "Cocoa mass, sugar, cocoa butter, whole milk powder, raspberry crumble (raspberry, sugar), emulsifier (sunflower lecithin), natural flavours.",
    allergens: "Contains milk. Made in a facility that handles nuts.",
    images: ["/images/bars/milk-raspberry-crumble.webp","/images/bars/milk-raspberry-crumble-1.webp","/images/bars/milk-raspberry-crumble-2.webp","/images/bars/milk-raspberry-crumble-3.webp"],
    content: ["1 × 40 g bar","Raspberry crumble bits"]
  },

  "dark-60-pistachio": {
    id: "dark-60-pistachio",
    name: "60% Dark Pistachio Bar",
    price: 11,
    category: "Nut Collection",
    shortDesc: "Balanced 64% dark chocolate layered with pistachio pieces—nutty, lightly sweet, satisfying.",
    longDesc:
      "A versatile 64% dark built for everyday snacking, speckled with roasted pistachios for a buttery crunch and a softly sweet finish.",
    chips: ["64% dark", "Pistachio pieces"],
    cacao: "Dark chocolate • 64%",
    weight: "40 g",
    ingredients:
      "Cocoa mass, organic cane sugar, cocoa butter, pistachios (tree nuts), emulsifier (sunflower lecithin), natural flavours.",
    allergens:
      "Contains tree nuts (pistachio). Made in a facility that handles milk and other nuts.",
    images: ["/images/bars/dark-pistachio.webp", "/images/bars/dark-pistachio-1.webp","/images/bars/dark-pistachio-2.webp"],
    content: ["1 × 40 g bar","Roasted pistachio pieces"]
  },

  /* ───────────────── BONBONS ───────────────── */
  "classic-box-9": {
    id: "classic-box-9",
    name: "Classic Box — 9",
    price: 28,
    category: "Bonbons",
    tag: "Signature",
    shortDesc: "Nine signature bonbons spanning pistachio, caramel with blackberry, and chocolate and hazelnut.",
    longDesc:
     "Nine bonbons that embody the heart of Artilate’s craft. Each piece balances texture, aroma, and emotion — a small story told through fine-flavour cacao. The Pistachio Praliné offers a soft crunch that awakens the senses. The Blackberry Caramel melts slowly, releasing notes of ripe fruit layered over buttery sweetness. The Chocolate & Hazelnut brings pure comfort — a smooth gianduja wrapped in a thin dark shell. Together, they form a tasting journey that moves from nutty and bright to deep and velvety, celebrating the art of balance and flavour precision.",
    chips: ["Gluten-free friendly", "Balanced"],
    cacao: "54% dark chocolate single-origin",
    weight: "9 bonbons",
    dietary: ["Gluten-free (not certified)"],
    ingredients: "Cocoa mass, sugar, cocoa butter, dairy, nuts, fruit purées, natural flavours.",
    allergens: "Contains dairy and nuts.",
    images: ["/images/bonbons/classic-9.webp", "/images/bonbons/classic-9-1.webp","/images/bonbons/classic-9-2.webp"],
    content: ["3 × Pistachio Praliné","3 × Caramel with Blackberry","3 × Chocolate & Hazelnut"]
  },

  "tropical-box-9": {
    id: "tropical-box-9",
    name: "Tropical Box — 9",
    price: 25,
    category: "Bonbons",
    tag: "Fruity",
    shortDesc: "Exotic and vibrant: spicy pineapple, passionfruit, and coffee in silky dark chocolate shells.",
    longDesc:
      "An exploration of tropical intensity in three chapters. The Spicy Pineapple surprises with sweet heat and bright citrus sparkle. Passionfruit follows—lush, tangy, and perfectly balanced against the creamy ganache within. Finally, the Coffee bonbon closes the experience with roasted depth and a whisper of caramel. Crafted with 52% single-origin Colombian dark chocolate, this box is a sensory journey from fire to fruit to finesse—sunshine in every bite.",
    chips: ["Tropical fruits", "Spice & coffee contrast"],
    cacao: "Single-origin Colombia • 52% dark chocolate",
    weight: "9 bonbons",
    dietary: ["May include dairy"],
    ingredients:
      "Cocoa mass, sugar, cocoa butter, dairy, fruit purées (pineapple, passionfruit), coffee, natural flavours, spices.",
    allergens: "Made in a facility that handles dairy and nuts.",
    images: ["/images/bonbons/tropical-9.webp", "/images/bonbons/tropical-9-1.webp","/images/bonbons/tropical-9-2.webp"],
    content: ["3 × Spicy Pineapple","3 × Passionfruit","3 × Coffee"]
  },

  "classic-box-8": {
    id: "classic-box-8",
    name: "Classic Box — 8",
    price: 28,
    category: "Bonbons",
    tag: "Signature",
    shortDesc: "Timeless signatures—silky caramels, pralinés and vanilla-forward ganaches.",
    longDesc:
      "Eight timeless pieces that showcase Artilate’s classic style: soft caramels, nutty pralinés and vanilla-led ganaches with thin, elegant shells.",
    chips: ["Crowd-pleaser"],
    cacao: "57% dark chocolate single-origin",
    weight: "8 bonbons",
    dietary: ["Contains dairy & nuts"],
    ingredients: "Cocoa mass, sugar, cocoa butter, dairy, nuts, natural flavours.",
    allergens: "Contains dairy and nuts.",
    images: ["/images/bonbons/classic-8.webp", "/images/bonbons/classic-8-1.webp","/images/bonbons/classic-8-2.webp"],
    content: ["2 × Caramel with Blackberry","2 × Pistachio Praliné","2 × Chocolate & Hazelnut","2 × Strawberry"]
  },

  "vibrant-box-8": {
    id: "vibrant-box-8",
    name: "Vibrant Box — 8",
    price: 23,
    category: "Bonbons",
    tag: "Fruity",
    shortDesc: "Eight vibrant bonbons — mango, spicy pineapple, passion fruit, and caramel with blackberry.",
    longDesc:
      "A tropical medley designed to awaken every sense. The Mango bonbon bursts with golden sweetness and smooth acidity. Spicy Pineapple brings a playful spark — juicy heat balanced by silky ganache. Passion Fruit follows with tangy brightness and a lingering citrus perfume. Finally, Caramel with Blackberry bridges fruit and comfort, weaving buttery depth with a touch of tart berry. Crafted with 59% single-origin Colombian dark chocolate, this box is sunshine, spice, and elegance in equal measure.",
    chips: ["Seasonal fruit", "Tropical spice"],
    cacao: "Single-origin Colombia • 59% dark chocolate",
    weight: "8 bonbons",
    dietary: ["Contains dairy"],
    ingredients:
      "Cocoa mass, sugar, cocoa butter, dairy, fruit purées (mango, pineapple, passion fruit, blackberry), natural flavours, spices.",
    allergens: "Contains dairy. Made in a facility that handles nuts.",
    images: ["/images/bonbons/vibrant-8.webp", "/images/bonbons/vibrant-8-1.webp","/images/bonbons/vibrant-8-2.webp", "/images/bonbons/vibrant-8-3.webp"],
    content: ["2 × Mango","2 × Spicy Pineapple","2 × Passion Fruit","2 × Caramel with Blackberry"]
  },

  "essentials-box-6": {
    id: "essentials-box-6",
    name: "Essentials Box — 6",
    price: 18,
    category: "Bonbons",
    tag: "Best Value",
    shortDesc: "Six essentials — pistachio, caramel with blackberry, chocolate & hazelnut, passionfruit, coffee, and strawberry.",
    longDesc:
      "A curated tasting set that captures Artilate’s signature balance of flavour and craftsmanship. The Pistachio Praliné opens with roasted depth and creamy texture. Caramel with Blackberry pairs buttery sweetness with bright, jammy fruit. Chocolate & Hazelnut brings comforting gianduja richness in a smooth dark shell. Passionfruit adds a lively tang, Coffee delivers roasted warmth with subtle bitterness, and Strawberry closes the experience with pure, fruit-forward charm. Six handcrafted bonbons that move from nutty and elegant to fresh and vibrant — small in size, rich in story.",
    chips: ["Gift-ready", "Balanced assortment"],
    cacao: "Single-origin Colombia • 53% dark chocolate",
    weight: "6 bonbons",
    dietary: ["Contains dairy & nuts"],
    ingredients:
      "Cocoa mass, sugar, cocoa butter, dairy, nuts (hazelnut, pistachio), fruit purées (blackberry, strawberry, passionfruit), coffee, natural flavours.",
    allergens: "Contains dairy and tree nuts (hazelnut, pistachio).",
    images: ["/images/bonbons/essentials-6.webp", "/images/bonbons/essentials-6-1.webp","/images/bonbons/essentials-6-2.webp", "/images/bonbons/essentials-6-3.webp"],
    content: ["1 × Pistachio Praliné","1 × Caramel with Blackberry","1 × Chocolate & Hazelnut","1 × Passionfruit","1 × Coffee","1 × Strawberry"]
  },

  /* ───────────────── GIFTING ───────────────── */
  "heart-gift-box": {
    id: "heart-gift-box",
    name: "Heart Gift Box",
    price: 86,
    category: "Gifting",
    shortDesc: "Thirty hand-painted heart bonbons — 16 caramel with blackberry, 10 pistachio, and 4 passionfruit.",
    longDesc:
      "Crafted as a gesture of love and artistry, this keepsake box holds thirty hand-painted heart bonbons made from single-origin Colombian cacao. The Caramel with Blackberry hearts (16) melt into layers of buttery sweetness and ripe fruit. The Pistachio Praliné (10) brings roasted depth and a soft, nutty finish. The Passionfruit hearts (4) brighten the collection with tangy citrus notes that linger delicately. Each piece is hand-finished for colour, gloss, and precision — a romantic composition that blends elegance, flavour, and emotion in every bite.",
    chips: ["Hand-painted", "Message card", "Gift-ready"],
    cacao: "Single-origin Colombia • 60% dark chocolate",
    weight: "30 bonbons",
    dietary: ["Contains dairy & nuts"],
    ingredients:
      "Cocoa mass, sugar, cocoa butter, dairy, nuts (pistachio), fruit purées (blackberry, passionfruit), natural flavours.",
    allergens: "Contains dairy and tree nuts (pistachio).",
    images: ["/images/gifts/heart-gift-box.webp", "/images/gifts/heart-gift-box-1.webp","/images/gifts/heart-gift-box-2.webp", "/images/gifts/heart-gift-box-3.webp", "/images/gifts/heart-gift-box-4.webp"],
    content: [
      "16 × Caramel with Blackberry bonbons",
      "10 × Pistachio Praliné bonbons",
      "4 × Passionfruit bonbons",
      "Presented in a reusable keepsake tray"
    ]
  },

  "golden-ribbon-keepsake-box": {
    id: "golden-ribbon-keepsake-box",
    name: "Golden Ribbon Keepsake Box",
    price: 48,
    category: "Gifting",
    tag: "Ready-to-gift",
    shortDesc: "Reusable wooden keepsake box with a ribboned assortment — bonbons, chocolate bars, and coins.",
    longDesc:
      "A refined gift that embodies the spirit of Artilate craftsmanship. Inside the reusable wooden keepsake box, tied with a golden ribbon, rests a complete tasting experience. It begins with an eight-piece bonbon collection featuring Pistachio, Caramel with Blackberry, Passionfruit, Mango, Strawberry, Chocolate & Hazelnut, Spicy Pineapple, and Coffee. Two Milky Chocolate Bars bring creamy comfort, while a 63% Dark Chocolate Bar with Pistachio Crumble adds texture and depth. Three chocolate coins sprinkled with nuts complete the ensemble — a thoughtful, elegant gift ready to share or savour slowly.",
    chips: ["Wooden box", "Assorted chocolates", "Gift-ready"],
    cacao: "Single-origin Colombia • 54–63% dark & milk chocolate",
    weight: "Bonbons + 3 bars + 3 coins",
    dietary: ["Contains dairy & nuts"],
    ingredients:
      "Cocoa mass, sugar, cocoa butter, dairy, nuts (hazelnut, pistachio, almond), fruit purées (blackberry, mango, passionfruit, strawberry), coffee, natural flavours.",
    allergens: "Contains dairy and tree nuts (hazelnut, pistachio, almond).",
    images: ["/images/gifts/keepsake-wood-box.webp", "/images/gifts/keepsake-wood-box-1.webp","/images/gifts/keepsake-wood-box-2.webp"],
    content: [
      "1 × 8-piece bonbon selection (Pistachio, Caramel with Blackberry, Passionfruit, Mango, Strawberry, Chocolate & Hazelnut, Spicy Pineapple, Coffee — 1 each)",
      "2 × Milky Chocolate Bars (37%)",
      "1 × 63% Dark Chocolate Bar with Pistachio Crumble",
      "3 × Chocolate Coins with Nuts",
      "Reusable wooden keepsake box with golden ribbon"
    ],
  },
  "christmas-tasting-box-12": {
  id: "christmas-tasting-box-12",
  name: "Christmas Tasting Box — 12 Bonbons",
  price: 32,
  category: "Limited",
  tag: "Holiday Edition",
  shortDesc: "Six festive flavours including Coconut & Orange, crafted with single-origin Colombian cacao.",
  longDesc:
    "A joyful Christmas tasting box handcrafted with single-origin Colombian cacao. It features six festive flavours — two bonbons of each — blending fruit, nuts, spice, and bright citrus notes. The perfect box for gifting or sharing during the holidays.",
  chips: ["Single-origin cacao", "6 flavours", "Handcrafted"],
  cacao: "Single-origin Colombia • 54–63%",
  weight: "12 bonbons",
  dietary: ["Contains dairy & tree nuts"],
  ingredients:
    "Cocoa mass, sugar, cocoa butter, dairy, nuts (hazelnut, pistachio, coconut), fruit purées (orange, mango, pineapple, passionfruit, blackberry, strawberry), coffee, natural flavours, spices.",
  allergens:
    "Contains dairy and tree nuts (hazelnut, pistachio, coconut). Made in a facility that handles other nuts.",
  images: [
    "/images/christmas/christmas-12-pieces-480.webp",
    "/images/christmas/christmas-12-pieces-800.webp",
    "/images/christmas/christmas-12-pieces-1200.webp"
  ],
  content: [
    "2 × Pistachio Praliné",
    "2 × Caramel with Blackberry",
    "2 × Chocolate & Hazelnut",
    "2 × Passionfruit",
    "2 × Mango",
    "2 × Coconut & Orange"
  ]
},

"christmas-sharing-box-16": {
  id: "christmas-sharing-box-16",
  name: "Christmas Sharing Box — 16 Bonbons",
  price: 42,
  category: "Limited",
  tag: "Family Size",
  shortDesc: "Four crowd-favourite flavours crafted with single-origin Colombian cacao — four bonbons each.",
  longDesc:
    "A 16-piece holiday sharing box made with single-origin Colombian cacao. Designed for gatherings and Christmas dinners, it includes four flavours with four pieces each — a festive balance of nuts, fruit, caramel, and bright tropical notes.",
  chips: ["Single-origin cacao", "Sharing size", "Holiday Edition"],
  cacao: "Single-origin Colombia • 54–63%",
  weight: "16 bonbons",
  dietary: ["Contains dairy & tree nuts"],
  ingredients:
    "Cocoa mass, sugar, cocoa butter, dairy, nuts (hazelnut, pistachio), fruit purées (mango, pineapple, passionfruit, blackberry), natural flavours, spices.",
  allergens:
    "Contains dairy and tree nuts (hazelnut, pistachio). Made in a facility that handles other nuts.",
  images: [
    "/images/christmas/christmas-16-pieces-480.webp",
    "/images/christmas/christmas-16-pieces-800.webp",
    "/images/christmas/christmas-16-pieces-1200.webp"
  ],
  content: [
    "4 × Pistachio Praliné",
    "4 × Caramel with Blackberry",
    "4 × Passionfruit",
    "4 × Spicy Pineapple"
  ]
},

};



/* (Opcional) mapa de precios en centavos para Stripe */
export const PRICE_MAP_CENTS: Record<string, number> = Object.fromEntries(
  Object.values(CATALOG).map((p) => [p.id, Math.round(p.price * 100)])
);
