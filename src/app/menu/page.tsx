"use client";

import { useCartStore } from "@/lib/store";
import { ProductCustomizationModal } from "@/components/product-customization-modal";
import { PRODUCTS, CATEGORIES, MENU_NOTICES, ProductItem } from "@/lib/data";
import Link from "next/link";
import { useState, useMemo } from "react";

export default function MenuPage() {
  const items = useCartStore((s) => s.items);
  const cartCount = useCartStore((s) => s.items.reduce((n, i) => n + i.quantity, 0));

  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [showCustomizationModal, setShowCustomizationModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);

  const handleCustomizeProduct = (product: ProductItem) => {
    setSelectedProduct(product);
    setShowCustomizationModal(true);
  };

  const getProductQuantity = (productId: string) => {
    return items.filter((item) => item.id.startsWith(productId)).reduce((sum, item) => sum + item.quantity, 0);
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      const matchesCategory = activeCategory === "All" || product.category === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  const classicProducts = useMemo(() => PRODUCTS.filter(p => p.category === "Classic & Premium"), []);
  const chocolateProducts = useMemo(() => PRODUCTS.filter(p => p.category === "For Chocolate Lovers"), []);
  const miniBitesProducts = useMemo(() => PRODUCTS.filter(p => p.category === "Mini Bites"), []);

  return (
    <div className="bg-[#fef4f6] text-[#322d2f] min-h-screen">

      {/* ── MAIN CONTENT ────────────────────────────────────────────────────── */}
      <main className="pt-28 pb-32 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-hidden">

        {/* Background Sprinkle decorations */}
        <div className="absolute -right-20 top-40 w-64 h-64 sprinkle-pattern rounded-full -z-10 opacity-30" />
        <div className="absolute -left-20 bottom-40 w-80 h-80 sprinkle-pattern rounded-full -z-10 opacity-10" />

        {/* ── HEADER ──────────────────────────────────────────────────────────── */}
        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-[#ff70a0]/20 border border-[#a8275b]/20 text-[#a8275b] px-4 py-1.5 rounded-full text-sm font-bold mb-4 shadow-sm">
            <span>👩‍🍳 Handcrafted by Lead Woman Chef & Baker</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#a8275b] tracking-tight mb-3" style={{ fontFamily: "var(--font-fredoka)" }}>
            The Dessert Box <span className="text-[#ff70a0]">Menu</span>
          </h1>
          <p className="text-xl text-[#755257] font-semibold italic max-w-2xl mx-auto mb-2" style={{ fontFamily: "var(--font-fredoka)" }}>
            "{MENU_NOTICES.tagline}"
          </p>
          <p className="text-sm text-[#605a5c] max-w-xl mx-auto leading-relaxed">
            All 23 gourmet cakes and petite treats available in Bento, ½ KG, and 1 KG portions.
          </p>
        </header>

        {/* ── OFFICIAL NOTICE & DISCLAIMER BANNER ─────────────────────────────── */}
        <div className="bg-gradient-to-r from-[#4c0023] to-[#a8275b] text-white p-6 md:p-8 rounded-3xl mb-12 shadow-xl border border-white/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center md:text-left items-center">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl shrink-0">
                ⏰
              </div>
              <div>
                <h4 className="font-bold text-lg text-white" style={{ fontFamily: "var(--font-jakarta)" }}>Pre-Order Required</h4>
                <p className="text-xs text-white/80">{MENU_NOTICES.preOrder}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center text-2xl shrink-0">
                📦
              </div>
              <div>
                <h4 className="font-bold text-lg text-white" style={{ fontFamily: "var(--font-jakarta)" }}>Customization & Delivery</h4>
                <p className="text-xs text-white/80">{MENU_NOTICES.extraCharges}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-[#ff70a0] text-[#4c0023] rounded-full flex items-center justify-center text-2xl shrink-0 font-bold">
                📱
              </div>
              <div>
                <h4 className="font-bold text-lg text-white" style={{ fontFamily: "var(--font-jakarta)" }}>Direct WhatsApp Order</h4>
                <p className="text-xs text-white/80">Call/WhatsApp: +91 {MENU_NOTICES.phone}</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── SEARCH & CATEGORY FILTERS ───────────────────────────────────────── */}
        <div className="mb-12 space-y-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Filter Tabs */}
            <div className="flex flex-wrap justify-center md:justify-start gap-2 bg-[#f0e6e8] p-1.5 rounded-full border border-[#b3abad]/20">
              {["All", "Classic & Premium", "For Chocolate Lovers", "Mini Bites"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm transition-all ${
                    activeCategory === cat
                      ? "bg-[#a8275b] text-white shadow-md"
                      : "text-[#755257] hover:text-[#a8275b] hover:bg-white/50"
                  }`}
                  style={{ fontFamily: "var(--font-jakarta)" }}
                >
                  {cat} {cat === "All" ? `(${PRODUCTS.length})` : cat === "Classic & Premium" ? `(${classicProducts.length})` : cat === "For Chocolate Lovers" ? `(${chocolateProducts.length})` : `(${miniBitesProducts.length})`}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full md:w-72">
              <span className="material-symbols-outlined absolute left-3.5 top-1/2 -translate-y-1/2 text-[#a8275b]">
                search
              </span>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search flavors, cakes..."
                className="w-full bg-white border border-[#b3abad]/30 rounded-full pl-10 pr-4 py-2.5 text-sm text-[#322d2f] focus:outline-none focus:border-[#a8275b] shadow-sm"
              />
            </div>
          </div>
        </div>

        {/* ── PRODUCT GRID BY CATEGORIES ─────────────────────────────────────── */}
        {activeCategory === "All" && !searchQuery ? (
          <>
            {/* SECTION 1: CLASSIC & PREMIUM */}
            <section className="mb-20">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-[#a8275b]/15 pb-4">
                <div>
                  <h2 className="text-3xl font-extrabold text-[#a8275b] flex items-center gap-3" style={{ fontFamily: "var(--font-fredoka)" }}>
                    Classic & Premium Cakes
                    <span className="text-sm font-semibold bg-[#ff70a0]/20 text-[#a8275b] px-3 py-1 rounded-full">11 Flavors</span>
                  </h2>
                  <p className="text-[#755257] text-sm mt-1">Our signature artisanal base recipes</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {classicProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onCustomize={handleCustomizeProduct} quantity={getProductQuantity(product.id)} />
                ))}
              </div>
            </section>

            {/* SECTION 2: FOR CHOCOLATE LOVERS */}
            <section className="mb-20">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 border-b border-[#a8275b]/15 pb-4">
                <div>
                  <h2 className="text-3xl font-extrabold text-[#4c0023] flex items-center gap-3" style={{ fontFamily: "var(--font-fredoka)" }}>
                    For Chocolate Lovers 🍫
                    <span className="text-sm font-semibold bg-[#755257]/20 text-[#4c0023] px-3 py-1 rounded-full">8 Creations</span>
                  </h2>
                  <p className="text-[#755257] text-sm mt-1">Rich, decadent cocoa masterpieces</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {chocolateProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onCustomize={handleCustomizeProduct} quantity={getProductQuantity(product.id)} />
                ))}
              </div>
            </section>

            {/* SECTION 3: MINI BITES */}
            <section className="mb-20">
              <div className="bg-[#f0e6e8] rounded-3xl p-8 md:p-12 relative overflow-hidden border border-[#a8275b]/15">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                  <div>
                    <h2 className="text-3xl font-extrabold text-[#a8275b] flex items-center gap-3" style={{ fontFamily: "var(--font-fredoka)" }}>
                      Mini Bites 🧁
                      <span className="text-sm font-semibold bg-[#f9cc61] text-[#5b4400] px-3 py-1 rounded-full uppercase tracking-wider">Flat ₹199</span>
                    </h2>
                    <p className="text-[#605a5c] text-sm mt-1">Perfect little joy-filled bite-sized treats</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
                  {miniBitesProducts.map((product) => (
                    <ProductCard key={product.id} product={product} onCustomize={handleCustomizeProduct} quantity={getProductQuantity(product.id)} isMiniBite />
                  ))}
                </div>
              </div>
            </section>
          </>
        ) : (
          /* FILTERED OR SEARCH RESULTS VIEW */
          <section className="mb-20">
            <h2 className="text-2xl font-bold text-[#a8275b] mb-6" style={{ fontFamily: "var(--font-jakarta)" }}>
              {searchQuery ? `Search Results for "${searchQuery}" (${filteredProducts.length})` : `${activeCategory} (${filteredProducts.length})`}
            </h2>

            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center shadow-sm">
                <span className="material-symbols-outlined text-6xl text-[#a8275b]/30 mb-4">search_off</span>
                <h3 className="text-xl font-bold text-[#322d2f] mb-2">No treats found</h3>
                <p className="text-[#605a5c]">Try searching for something else or switch category tabs.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} onCustomize={handleCustomizeProduct} quantity={getProductQuantity(product.id)} isMiniBite={product.category === "Mini Bites"} />
                ))}
              </div>
            )}
          </section>
        )}

      </main>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer className="bg-[#f9eef0] pt-16 pb-28 px-6 overflow-hidden relative border-t border-[#a8275b]/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10 text-[#322d2f]">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="material-symbols-outlined text-[#a8275b] text-4xl" style={{ fontVariationSettings: "'FILL' 1" }}>cake</span>
              <span className="text-2xl font-extrabold text-[#a8275b]" style={{ fontFamily: "var(--font-fredoka)" }}>The Dessert Box</span>
            </div>
            <p className="text-sm text-[#605a5c] leading-relaxed mb-4">
              Handcrafted with love, culinary mastery, and maternal care by our lead woman chef & baker in Coimbatore.
            </p>
            <p className="text-xs text-[#a8275b] font-bold">
              Instagram: @{MENU_NOTICES.instagram}
            </p>
          </div>

          <div>
            <h4 className="font-extrabold text-lg text-[#a8275b] mb-4" style={{ fontFamily: "var(--font-jakarta)" }}>Order & Delivery Info</h4>
            <ul className="space-y-2 text-sm text-[#605a5c]">
              <li className="flex items-center gap-2">
                <span className="text-base">⏰</span> {MENU_NOTICES.preOrder}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-base">📦</span> {MENU_NOTICES.extraCharges}
              </li>
              <li className="flex items-center gap-2">
                <span className="text-base">📞</span> WhatsApp: +91 {MENU_NOTICES.phone}
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-extrabold text-lg text-[#a8275b] mb-4" style={{ fontFamily: "var(--font-jakarta)" }}>Atelier Location</h4>
            <p className="text-sm text-[#605a5c] leading-relaxed">
              📍 {MENU_NOTICES.address}
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-[#b3abad]/20 text-center text-xs text-[#605a5c]">
          © 2024 The Dessert Box. All Rights Reserved. Crafted by Woman Chef & Baker.
        </div>
      </footer>

      {/* ── PRODUCT CUSTOMIZATION MODAL ───────────────────────────────────── */}
      {selectedProduct && (
        <ProductCustomizationModal
          isOpen={showCustomizationModal}
          onClose={() => setShowCustomizationModal(false)}
          product={selectedProduct}
        />
      )}

    </div>
  );
}

// ── Product Card Helper Component ──────────────────────────────────────────
function ProductCard({
  product,
  onCustomize,
  quantity,
  isMiniBite = false,
}: {
  product: ProductItem;
  onCustomize: (p: ProductItem) => void;
  quantity: number;
  isMiniBite?: boolean;
}) {
  return (
    <div className="group bg-white rounded-3xl overflow-hidden transition-all duration-300 hover:shadow-[0px_20px_40px_rgba(168,39,91,0.12)] flex flex-col border border-[#b3abad]/15 hover:border-[#a8275b]/30">
      {/* Product Image */}
      <div className="block relative aspect-square overflow-hidden bg-[#fef4f6]">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <div className="absolute top-3 right-3 bg-[#f9cc61] text-[#5b4400] text-[10px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            {product.badge}
          </div>
        )}
        <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-md text-[#a8275b] text-xs font-bold px-3 py-1 rounded-full shadow-sm">
          Starting ₹{product.startingPrice}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex-grow flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-extrabold text-xl text-[#322d2f]" style={{ fontFamily: "var(--font-jakarta)" }}>
              {product.name}
            </h3>
          </div>

          {/* Pricing tiers breakdown pill if available */}
          {product.prices && (
            <div className="grid grid-cols-3 gap-1 bg-[#f9eef0] p-2 rounded-xl text-[11px] text-center my-3 font-semibold text-[#a8275b] border border-[#a8275b]/10">
              <div>
                <span className="block text-[9px] uppercase tracking-wider text-[#605a5c]">Bento</span>
                ₹{product.prices.bento}
              </div>
              <div className="border-x border-[#a8275b]/15 px-1">
                <span className="block text-[9px] uppercase tracking-wider text-[#605a5c]">½ KG</span>
                ₹{product.prices.halfKg}
              </div>
              <div>
                <span className="block text-[9px] uppercase tracking-wider text-[#605a5c]">1 KG</span>
                ₹{product.prices.oneKg}
              </div>
            </div>
          )}

          {isMiniBite && (
            <div className="bg-[#f9cc61]/20 text-[#5b4400] px-3 py-1 rounded-xl text-xs font-bold text-center my-3">
              Portion Price: ₹199
            </div>
          )}

          <p className="text-xs text-[#605a5c] mb-4 line-clamp-2 leading-relaxed">{product.description}</p>
        </div>

        <button
          onClick={() => onCustomize(product)}
          className={`w-full py-3 rounded-full font-bold text-sm flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md ${
            quantity > 0
              ? "bg-[#ff70a0] text-white hover:bg-[#e85a8a]"
              : "bg-[#a8275b] text-white hover:bg-[#98184f]"
          }`}
          style={{ fontFamily: "var(--font-jakarta)" }}
        >
          {quantity > 0 ? (
            <>
              <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>
                check_circle
              </span>
              <span>In Cart ({quantity})</span>
            </>
          ) : (
            <>
              <span className="material-symbols-outlined text-lg">add_shopping_cart</span>
              <span>{isMiniBite ? "Add to Box (₹199)" : "Select Size & Add"}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
