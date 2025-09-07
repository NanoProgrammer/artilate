import React, { createContext, useState, useContext } from 'react';

// Cart Context
const CartContext = createContext();

function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  const addItem = (item) => {
    setCart(prev => {
      const exists = prev.find(p => p.id === item.id);
      if (exists) {
        return prev.map(p =>
          p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeItem = (id) => setCart(prev => prev.filter(p => p.id !== id));
  const updateItem = (id, quantity) =>
    setCart(prev => prev.map(p => p.id === id ? { ...p, quantity } : p));
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addItem, removeItem, updateItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

// Sample Products Data
const sampleProducts = {
  nutBonbons: [
    { id: 1, name: "Hazelnut Praline Bonbons", price: 32.00, image: "/images/hazelnut-bonbons.png", description: "Creamy hazelnut praline in 65% dark chocolate", tag: "Best Seller" },
    { id: 2, name: "Almond Marzipan Collection", price: 35.00, image: "/images/almond-bonbons.png", description: "Traditional marzipan wrapped in milk chocolate", tag: "Premium" },
    { id: 3, name: "Pistachio Rose Bonbons", price: 38.00, image: "/images/pistachio-bonbons.png", description: "Delicate pistachio ganache with rose water", tag: "Limited" },
    { id: 4, name: "Walnut Caramel Squares", price: 30.00, image: "/images/walnut-bonbons.png", description: "Salted caramel with crushed walnuts", tag: "Classic" },
  ],
  nutFree: [
    { id: 11, name: "Pure Dark Collection", price: 28.00, image: "/images/pure-dark.png", description: "Assorted dark chocolate bonbons, nut-free" },
    { id: 12, name: "Fruit Ganache Box", price: 33.00, image: "/images/fruit-ganache.png", description: "Passion fruit, raspberry, and orange centers" },
    { id: 13, name: "Vanilla Bean Bonbons", price: 30.00, image: "/images/vanilla-bonbons.png", description: "Madagascar vanilla bean ganache" },
    { id: 14, name: "Sea Salt Caramel Set", price: 31.00, image: "/images/caramel-set.png", description: "Smooth caramel with Maldon sea salt" },
  ],
  bars: [
    { id: 21, name: "70% Colombian Single Origin", price: 18.00, image: "/images/70-bar.png", description: "Notes of red fruit and cocoa", tag: "Single-Origin" },
    { id: 22, name: "85% Extra Dark Bar", price: 20.00, image: "/images/85-bar.png", description: "Intense chocolate for purists", tag: "Intense" },
    { id: 23, name: "Milk Chocolate 45%", price: 16.00, image: "/images/milk-bar.png", description: "Creamy and smooth Colombian milk chocolate", tag: "Creamy" },
    { id: 24, name: "White Chocolate Vanilla", price: 17.00, image: "/images/white-bar.png", description: "Pure cocoa butter with vanilla beans", tag: "Pure" },
  ],
  dairyFree: [
    { id: 31, name: "Coconut Cream Bonbons", price: 34.00, image: "/images/coconut-bonbons.png", description: "Rich coconut cream in dark chocolate" },
    { id: 32, name: "Oat Milk Chocolate Bar", price: 19.00, image: "/images/oat-bar.png", description: "Creamy alternative to milk chocolate" },
    { id: 33, name: "Dark Mint Collection", price: 29.00, image: "/images/mint-collection.png", description: "Fresh mint ganache, dairy-free" },
    { id: 34, name: "Raspberry Truffle Box", price: 36.00, image: "/images/raspberry-box.png", description: "Tart raspberry centers, no dairy" },
  ],
  mixedBoxes: [
    { id: 41, name: "Signature Mixed Box", price: 65.00, image: "/images/mixed-signature.png", description: "Best of bonbons and bars combined", tag: "Signature" },
    { id: 42, name: "Discovery Collection", price: 45.00, image: "/images/discovery-box.png", description: "Perfect introduction to Artilate", tag: "Starter" },
    { id: 43, name: "Corporate Gift Set", price: 85.00, image: "/images/corporate-gift.png", description: "Premium selection for gifting", tag: "Gifting" },
    { id: 44, name: "Tasting Flight", price: 55.00, image: "/images/tasting-flight.png", description: "Curated tasting experience", tag: "Experience" },
  ],
  glutenFree: [
    { id: 51, name: "Gluten-Free Truffle Box", price: 37.00, image: "/images/gf-truffles.png", description: "Rich truffles, certified gluten-free" },
    { id: 52, name: "Pure Chocolate Bars", price: 22.00, image: "/images/gf-bars.png", description: "Clean ingredient chocolate bars" },
    { id: 53, name: "Fruit & Spice Collection", price: 39.00, image: "/images/gf-fruit-spice.png", description: "Exotic flavors, gluten-free guaranteed" },
    { id: 54, name: "Classic Dark Selection", price: 33.00, image: "/images/gf-dark.png", description: "Traditional favorites without gluten" },
  ],
  limitedEdition: [
    { id: 61, name: "Holiday Spice Collection", price: 48.00, image: "/images/holiday-spice.png", description: "Seasonal spices in dark chocolate", tag: "Seasonal" },
    { id: 62, name: "Valentine's Heart Box", price: 52.00, image: "/images/valentine-hearts.png", description: "Heart-shaped bonbons for love", tag: "Romance" },
    { id: 63, name: "Summer Fruit Series", price: 44.00, image: "/images/summer-fruits.png", description: "Light, fresh fruit ganaches", tag: "Fresh" },
    { id: 64, name: "Collaboration Coffee Bars", price: 25.00, image: "/images/coffee-collab.png", description: "Local coffee roaster collaboration", tag: "Collab" },
  ]
};

// Product Card Component for Carousel
function ProductCard({ product }) {
  const { addItem } = useContext(CartContext);

  return (
    <div className="group relative bg-neutral-900/40 backdrop-blur border border-stone-100/15 rounded-xl p-4 overflow-hidden hover:border-amber-500/30 transition-all duration-300 min-w-[280px]">
      {/* Image Container */}
      <div className="relative aspect-square mb-4 rounded-lg overflow-hidden bg-gradient-to-br from-stone-800/50 to-stone-900/50">
        <div className="absolute inset-0 flex items-center justify-center text-stone-500">
          <div className="text-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="9" cy="9" r="2"/>
              <path d="M21 15l-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="space-y-2">
        <h3 className="font-serif text-lg leading-snug text-stone-100 group-hover:text-amber-200 transition-colors">
          {product.name}
        </h3>
        
        <p className="text-sm text-stone-400 line-clamp-2">
          {product.description}
        </p>

        {/* Price & CTA */}
        <div className="flex items-center justify-between pt-2">
          <span className="text-xl font-semibold text-stone-100">
            ${product.price.toFixed(2)}
          </span>
          
          <button
            onClick={() => addItem(product)}
            className="inline-flex items-center gap-2 px-3 py-2 bg-amber-500/15 text-amber-200 border border-amber-500/25 rounded-lg text-sm font-semibold hover:bg-amber-500/25 transition-colors duration-300"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}


/** @typedef {{ id:number; name:string; price?:number; image?:string; description?:string; tag?:string; slug?:string }} Product */

/** @param {{ product?: Product, size:"spotlight"|"large"|"medium", gradientFrom?:string, gradientTo?:string, isLight?:boolean }} props */
 function AsymmetricCard({ product, size, gradientFrom, gradientTo, isLight = false }) {
  // Si no hay producto, no renderizamos nada
  if (!product) return null;

  const { addItem } = useContext(CartContext);

  const sizeClasses = {
    spotlight: "w-full lg:w-[30%] h-[46vh] lg:h-[80vh]",
    large: "w-full sm:w-3/5 h-[46vh] lg:h-[40vh]",
    medium: "w-full sm:w-2/5 h-[46vh] lg:h-[40vh]",
  };

  const bgClass = gradientFrom && gradientTo
    ? `bg-gradient-to-br ${gradientFrom} ${gradientTo}`
    : "bg-stone-900/40 backdrop-blur";

  const textColor = isLight ? "text-white" : "text-stone-100";
  const priceLabel = typeof product.price === "number" ? `$${product.price.toFixed(2)}` : null;

  return (
    <article className={`${sizeClasses[size]} relative rounded-xl border border-stone-100/15 ${bgClass} p-4 overflow-hidden group`}>
      {/* Badge */}
      {product?.tag ? (
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-bold ${
            isLight
              ? "bg-white/15 text-white border border-white/25"
              : "bg-stone-100/10 text-stone-200 border border-stone-100/15"
          }`}
        >
          {product.tag}
        </span>
      ) : null}

      {/* Info */}
      <div className={`relative z-20 ${size === "spotlight" ? "text-center max-w-none pr-0" : "max-w-[60%] pr-3"}`}>
        <h3 className={`mt-2 font-serif text-lg leading-snug ${textColor} ${size === "spotlight" ? "text-xl" : ""}`}>
          {product.name ?? "Product"}
        </h3>
        {product?.description && (
          <p className={`text-sm mt-1 ${isLight ? "text-white/80" : "text-stone-400"} line-clamp-2`}>
            {product.description}
          </p>
        )}
      </div>

      {/* Imagen absoluta (derecha en ≥sm) */}
      {product?.image && (
        <>
          <img
            src={product.image}
            alt={product.name ?? "Product image"}
            width="1200"
            height="1000"
            loading="lazy"
            decoding="async"
            className={`absolute z-10 object-contain
              drop-shadow-[0_22px_50px_rgba(0,0,0,.45)]
              transition-transform duration-700 ease-out group-hover:scale-105
              ${
                size === "spotlight"
                  ? "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%]"
                  : "left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[82%] sm:left-auto sm:right-3 sm:translate-x-0 sm:w-[68%] md:right-5 md:w-[60%]"
              }`}
          />
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 w-[70%] h-5 rounded-full bg-black/30 blur-2xl opacity-60" />
        </>
      )}

      {/* CTA */}
      <div className="absolute left-4 bottom-4 z-30">
        <div className="flex items-center gap-2">
          {priceLabel && <span className={`text-[0.95rem] font-semibold ${textColor}`}>{priceLabel}</span>}
          <button
            onClick={() => addItem(product)}
            className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold transition-all duration-300 hover:-translate-y-0.5 ${
              isLight
                ? "bg-white/90 text-stone-900 hover:bg-white"
                : size === "spotlight"
                ? "bg-gradient-to-br from-amber-400 to-amber-600 text-stone-900 shadow-lg"
                : "bg-amber-500/15 text-amber-200 border border-amber-500/25 hover:bg-amber-500/25"
            }`}
          >
            {size === "spotlight" ? "Shop now" : "Add to cart"}
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </article>
  );
}


// Asymmetric Grid Layout
function AsymmetricGrid({ products }) {
  const [spotlightProduct, topLeft, topRight, bottomLeft, bottomRight] = products;

  return (
    <div className="flex flex-col lg:flex-row justify-center gap-6 lg:gap-8 max-w-7xl mx-auto">
      {/* Left Spotlight */}
      <AsymmetricCard 
        product={spotlightProduct} 
        size="spotlight"
      />

      {/* Right Grid (2 rows) */}
      <div className="w-full lg:w-[70%] flex flex-col gap-6 lg:gap-8">
        {/* Top Row */}
        <div className="flex flex-col sm:flex-row gap-6 lg:gap-8 h-[46vh] lg:h-[40vh]">
          <AsymmetricCard 
            product={topLeft} 
            size="large"
          />
          <AsymmetricCard 
            product={topRight} 
            size="medium"
            gradientFrom="from-violet-300"
            gradientTo="to-purple-900"
            isLight={true}
          />
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row gap-6 lg:gap-8 h-[46vh] lg:h-[40vh]">
          <AsymmetricCard 
            product={bottomLeft} 
            size="medium"
          />
          <AsymmetricCard 
            product={bottomRight} 
            size="large"
            gradientFrom="from-emerald-900"
            gradientTo="to-emerald-400"
            isLight={true}
          />
        </div>
      </div>
    </div>
  );
}

// Carousel Component
function ProductCarousel({ products, onNext, onPrev, canNext, canPrev }) {
  return (
    <div className="relative">
      <div className="flex gap-6 overflow-hidden">
        <div className="flex gap-6 transition-transform duration-300">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      
      {/* Navigation Buttons */}
      <button
        onClick={onPrev}
        disabled={!canPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-neutral-800/80 backdrop-blur border border-stone-100/20 rounded-full flex items-center justify-center text-stone-300 hover:text-amber-300 hover:border-amber-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M15 18l-6-6 6-6"/>
        </svg>
      </button>
      
      <button
        onClick={onNext}
        disabled={!canNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-neutral-800/80 backdrop-blur border border-stone-100/20 rounded-full flex items-center justify-center text-stone-300 hover:text-amber-300 hover:border-amber-500/40 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 18l6-6-6-6"/>
        </svg>
      </button>
    </div>
  );
}

// Hero Section
function ShopHero() {
  return (
    <section className="relative bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 border-b border-stone-100/10 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(245,158,11,0.08),transparent_60%)]"></div>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_30%,rgba(212,163,115,0.06),transparent_50%)]"></div>
      
      <div className="relative max-w-7xl mx-auto px-6 py-16 lg:py-24">
        <div className="text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-2 text-amber-300 font-semibold text-sm mb-6">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
              <line x1="3" y1="6" x2="21" y2="6"/>
              <path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            Premium Chocolate Collection
          </span>
          
          <h1 className="font-serif text-5xl lg:text-7xl font-bold text-stone-100 mb-6">
            Handcrafted
            <span className="block bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
              Excellence
            </span>
          </h1>
          
          <p className="text-xl text-stone-300 max-w-3xl mx-auto leading-relaxed">
            From Colombian cacao to your table. Discover our complete collection of 
            bean-to-bar chocolates, hand-painted bonbons, and artisanal treats.
          </p>
        </div>
      </div>
    </section>
  );
}

// Search Section
function SearchSection() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <section className="bg-neutral-900 py-12">
      <div className="max-w-4xl mx-auto px-6">
        <div className="bg-neutral-800/50 backdrop-blur border border-stone-100/15 rounded-2xl p-8">
          <h2 className="font-serif text-2xl text-stone-100 text-center mb-6">
            Find Your Perfect Chocolate
          </h2>
          
          <div className="flex items-center gap-4 bg-black/40 border border-stone-100/20 rounded-xl px-4 py-3 focus-within:border-amber-500/40 transition-colors">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-stone-400">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
            
            <input
              type="text"
              placeholder="Search chocolates, bonbons, bars..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 bg-transparent text-stone-100 placeholder:text-stone-400 outline-none"
            />
            
            <button className="bg-amber-500/15 text-amber-200 border border-amber-500/25 px-4 py-2 rounded-lg font-semibold hover:bg-amber-500/25 transition-colors">
              Search
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

// Product Section Component (Carousel)
function ProductSection({ title, products, collectionSlug, description }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 3;
  const maxIndex = Math.max(0, products.length - itemsPerView);

  const handleNext = () => {
    setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
  };

  const handlePrev = () => {
    setCurrentIndex(prev => Math.max(prev - 1, 0));
  };

  const visibleProducts = products.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <section className="bg-neutral-900 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
          <div className="mb-6 lg:mb-0">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-stone-100 mb-3">
              {title}
            </h2>
            <p className="text-stone-300 max-w-2xl">
              {description}
            </p>
          </div>
          
          <a
            href={`/collection/${collectionSlug}`}
            className="inline-flex items-center gap-2 bg-amber-500/15 text-amber-200 border border-amber-500/25 px-6 py-3 rounded-xl font-semibold hover:bg-amber-500/25 transition-all duration-300 hover:-translate-y-0.5"
          >
            View All
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        {/* Products Carousel */}
        <ProductCarousel
          products={visibleProducts}
          onNext={handleNext}
          onPrev={handlePrev}
          canNext={currentIndex < maxIndex}
          canPrev={currentIndex > 0}
        />
      </div>
    </section>
  );
}

// Asymmetric Product Section
function AsymmetricProductSection({ title, products, collectionSlug, description }) {
  return (
    <section className="bg-neutral-900 py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-12">
          <div className="mb-6 lg:mb-0">
            <h2 className="font-serif text-3xl lg:text-4xl font-bold text-stone-100 mb-3">
              {title}
            </h2>
            <p className="text-stone-300 max-w-2xl">
              {description}
            </p>
          </div>
          
          <a
            href={`/collection/${collectionSlug}`}
            className="inline-flex items-center gap-2 bg-amber-500/15 text-amber-200 border border-amber-500/25 px-6 py-3 rounded-xl font-semibold hover:bg-amber-500/25 transition-all duration-300 hover:-translate-y-0.5"
          >
            View All
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </a>
        </div>

        {/* Asymmetric Grid */}
        <AsymmetricGrid products={products.slice(0, 5)} />
      </div>
    </section>
  );
}

// Main Shop Component
function Shop() {
  return (
    <div className="min-h-screen bg-neutral-900 text-stone-50">
      {/* Hero Section */}
      <ShopHero />
      
      {/* Search Section */}
      <SearchSection />
      
      {/* Nut Bonbons Section - Asymmetric */}
      <AsymmetricProductSection
        title="Nut Bonbons"
        products={sampleProducts.nutBonbons}
        collectionSlug="bonbons"
        description="Rich, creamy bonbons featuring premium nuts from around the world. Each piece combines traditional techniques with innovative flavor profiles."
      />
      
      {/* Nut-Free Section - Carousel */}
      <ProductSection
        title="Nut-Free Collection"
        products={sampleProducts.nutFree}
        collectionSlug="nut-free"
        description="Pure chocolate indulgence without nuts. Perfect for those with allergies or anyone seeking clean, focused chocolate flavors."
      />
      
      {/* Bars Section - Asymmetric */}
      <AsymmetricProductSection
        title="Chocolate Bars"
        products={sampleProducts.bars}
        collectionSlug="bars"
        description="Single-origin bars showcasing the terroir of Colombian cacao. From intense dark to creamy milk chocolate."
      />
      
      {/* Dairy-Free Section - Carousel */}
      <ProductSection
        title="Dairy-Free Delights"
        products={sampleProducts.dairyFree}
        collectionSlug="dairy-free"
        description="Plant-based chocolate creations that don't compromise on taste. Rich, satisfying alternatives for every palate."
      />
      
      {/* Mixed Boxes Section - Asymmetric */}
      <AsymmetricProductSection
        title="Mixed Boxes"
        products={sampleProducts.mixedBoxes}
        collectionSlug="mixed-boxes"
        description="Curated collections combining our finest bars and bonbons. Perfect for gifting or discovering new favorites."
      />
      
      {/* Gluten-Free Section - Carousel */}
      <ProductSection
        title="Gluten-Free Selection"
        products={sampleProducts.glutenFree}
        collectionSlug="gluten-free"
        description="Certified gluten-free chocolates crafted with pure ingredients. Safe indulgence without sacrificing quality."
      />
      
      {/* Limited Edition Section - Asymmetric */}
      <AsymmetricProductSection
        title="Limited Edition"
        products={sampleProducts.limitedEdition}
        collectionSlug="limited-edition"
        description="Exclusive seasonal creations and special collaborations. Available for a limited time only."
      />
    </div>
  );
}

// App with Provider
export default function App() {
  return (
    <CartProvider>
      <Shop />
    </CartProvider>
  );
}