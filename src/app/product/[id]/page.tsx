"use client";

import { useCartStore } from "@/lib/store";
import Link from "next/link";
import { useParams } from "next/navigation";

// ─── product data ─────────────────────────────────────────────────────────────

const PRODUCTS: Record<string, {
  id: string; name: string; price: number; badge?: string;
  description: string; ingredients: string; allergens: string;
  highlights: { icon: string; label: string }[];
  heroImage: string; thumb1: string; thumb2: string;
  category: string;
}> = {
  "prod-01": {
    id: "prod-01",
    name: "Death By Chocolate",
    price: 750,
    badge: "Best Seller",
    description: "Seven layers of dark, milk, and white chocolate textures for the ultimate cocoa experience. Handcrafted with artisanal precision and perfectly balanced between bittersweet and creamy richness.",
    ingredients: "Couverture dark chocolate (70%), Swiss milk chocolate, white chocolate velvet ganache, organic cocoa powder, free-range eggs, Madagascar vanilla.",
    allergens: "Contains: Dairy, Eggs, Gluten, Nuts (may contain traces).",
    highlights: [
      { icon: "local_fire_department", label: "Freshly baked" },
      { icon: "favorite", label: "Chocolate lovers" },
      { icon: "group", label: "Serves 1-2" },
    ],
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuA45oWkN8Z26J6XuJ15VoSIoKzz-iuoMyDmbTv4aZdEIsnIUsgIFmnE0p_R2Ykg8KF4grZjVouyqyLZbJZ_q7fZKXLwjkRIyiSbESMuUyoYWRyMdhQKfArt7z8MoHVO_tZMZJ1LZvBYq3hjKuAfsQn0MTDHi6Gp_PDDXAFrzH1Xzu5fL_SVKbf3WCT5Ce5EoU9oGyOQjRfLEVR5lup6ueS-1BeJXDfBHHq3JEApr1x0hV6AfGaF1xQILBcGNW_e6z6WjfgiMI5Y1gs",
    thumb1: "https://lh3.googleusercontent.com/aida-public/AB6AXuAG8SZeXAPEkgy4tCxpPAI4sgEFUbHjtXs5W9i-QogvXtqlzPTtR3rp88jV-IPm9WQg7kHcwrXti7hvqvnq9D7Elm-6g2Gqdm07MVGClyM3kpbe5acnXudmT1q6V_8EN8X1mSebq9uBF9AbYQVRiaf4OEt78ncMxzhoM4x5Rhhy-me7xEZzJDPseTep236XTzLzaUdl7TaAcdTIPtesjdazwed9sBDiUNfVoRSQAn0Cbw0wet0d6zkDaspO3fMYrSsR77w5MWxQz7w",
    thumb2: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4XspH8GAaCTsUrXxJsiscOSZ1RjMTgSAk6oj2-Oc1lrPqayI-kfW43Edx1JS8g0FjDiRmVyqPXwkv5IZ8q6hzAB9irLbT-wkCe_ByIulNZdWU3v8e2u-yGDZSgsJ4XdzIW560jtZEoFanKqR6AIowB9hyfEhT6WJcfBPNyO6eDgegnSsMLTsgHAt_GzWh_g_cFqJriqmxDx1s8axuJydgRC9MV5lsUT-g-mw7i53QTDt_5_JiQigD8Ld22HSOynA_2KX3fWUrRQM",
    category: "For Chocolate Lovers",
  },
  "prod-02": {
    id: "prod-02",
    name: "Strawberry Bento",
    price: 400,
    badge: undefined,
    description: "Fresh garden strawberries blended into a fluffy cream cloud on our signature sponge. A burst of summer in every bite.",
    ingredients: "Vanilla bean infused sponge, fresh strawberries, whipped cream, cream cheese frosting.",
    allergens: "Contains: Dairy, Eggs, Gluten.",
    highlights: [
      { icon: "local_fire_department", label: "Freshly baked" },
      { icon: "spa", label: "Summer special" },
      { icon: "group", label: "Serves 1-2" },
    ],
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuACeJSxXQlRkfVVLaIbD24GpJ1yh0a_13q37YNvTXk_akEJ4k0AMvCfDwUjJ18N8RMKubYs3qIoDdpt5QrKId-Hb-ikCNSj7Z7luOMEqd9lw3M1ct-tsq_Ahv7qJ32PQ_Ufc4oWgrlSUsaB-ZYA3fNUW-1NLmWVGKh1b9wmw6ru0DwSqwhwaJuXrWepom2eMhgvmM-Uh0R2NPzXt-XWaBTyolmFwG7hAXRlzJgTpP0gckwQ1TM24TxPnTsuFRpV1-gGLmUAPXj5VFc",
    thumb1: "https://lh3.googleusercontent.com/aida-public/AB6AXuAG8SZeXAPEkgy4tCxpPAI4sgEFUbHjtXs5W9i-QogvXtqlzPTtR3rp88jV-IPm9WQg7kHcwrXti7hvqvnq9D7Elm-6g2Gqdm07MVGClyM3kpbe5acnXudmT1q6V_8EN8X1mSebq9uBF9AbYQVRiaf4OEt78ncMxzhoM4x5Rhhy-me7xEZzJDPseTep236XTzLzaUdl7TaAcdTIPtesjdazwed9sBDiUNfVoRSQAn0Cbw0wet0d6zkDaspO3fMYrSsR77w5MWxQz7w",
    thumb2: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4XspH8GAaCTsUrXxJsiscOSZ1RjMTgSAk6oj2-Oc1lrPqayI-kfW43Edx1JS8g0FjDiRmVyqPXwkv5IZ8q6hzAB9irLbT-wkCe_ByIulNZdWU3v8e2u-yGDZSgsJ4XdzIW560jtZEoFanKqR6AIowB9hyfEhT6WJcfBPNyO6eDgegnSsMLTsgHAt_GzWh_g_cFqJriqmxDx1s8axuJydgRC9MV5lsUT-g-mw7i53QTDt_5_JiQigD8Ld22HSOynA_2KX3fWUrRQM",
    category: "Classic & Premium",
  },
  "prod-03": {
    id: "prod-03",
    name: "Vanilla Bento",
    price: 400,
    badge: undefined,
    description: "Premium Madagascar vanilla bean infused sponge with light buttercream frosting. Simple, elegant, and utterly perfect.",
    ingredients: "Flour, Butter, Sugar, Madagascar Vanilla Bean, Free-range Eggs, Milk.",
    allergens: "Contains: Dairy, Eggs, Gluten.",
    highlights: [
      { icon: "local_fire_department", label: "Freshly baked" },
      { icon: "star", label: "Chef's signature" },
      { icon: "group", label: "Serves 1-2" },
    ],
    heroImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6hWw9V6L4VcdCb8efSrUr9m91whjicasVO8DfeOLvuK3kd721u4dMWjsm8-2GQjeTI4C4P0bO4Gypxob1crpVp2EqDsB6QvMug-yWFOVsBTtu8e0mKsMe3fkar1zHO5ivlIcrjboAUPXQJfXWW7z04oqwNQ1iZsciIOBMzXG_Wwg9h7WWIv3XK2MojmXmcbWs-_VN8RxrwCkbN2dz18TABVW0g6A5Kpsmdz4bXPp2vM8_ENEtoQk5pyaKf6GLFB1I3lWW3sqUCFc",
    thumb1: "https://lh3.googleusercontent.com/aida-public/AB6AXuAG8SZeXAPEkgy4tCxpPAI4sgEFUbHjtXs5W9i-QogvXtqlzPTtR3rp88jV-IPm9WQg7kHcwrXti7hvqvnq9D7Elm-6g2Gqdm07MVGClyM3kpbe5acnXudmT1q6V_8EN8X1mSebq9uBF9AbYQVRiaf4OEt78ncMxzhoM4x5Rhhy-me7xEZzJDPseTep236XTzLzaUdl7TaAcdTIPtesjdazwed9sBDiUNfVoRSQAn0Cbw0wet0d6zkDaspO3fMYrSsR77w5MWxQz7w",
    thumb2: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4XspH8GAaCTsUrXxJsiscOSZ1RjMTgSAk6oj2-Oc1lrPqayI-kfW43Edx1JS8g0FjDiRmVyqPXwkv5IZ8q6hzAB9irLbT-wkCe_ByIulNZdWU3v8e2u-yGDZSgsJ4XdzIW560jtZEoFanKqR6AIowB9hyfEhT6WJcfBPNyO6eDgegnSsMLTsgHAt_GzWh_g_cFqJriqmxDx1s8axuJydgRC9MV5lsUT-g-mw7i53QTDt_5_JiQigD8Ld22HSOynA_2KX3fWUrRQM",
    category: "Classic & Premium",
  },
};

const recommendations = [
  {
    id: "prod-03",
    name: "Vanilla Bento",
    price: "₹650",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB6hWw9V6L4VcdCb8efSrUr9m91whjicasVO8DfeOLvuK3kd721u4dMWjsm8-2GQjeTI4C4P0bO4Gypxob1crpVp2EqDsB6QvMug-yWFOVsBTtu8e0mKsMe3fkar1zHO5ivlIcrjboAUPXQJfXWW7z04oqwNQ1iZsciIOBMzXG_Wwg9h7WWIv3XK2MojmXmcbWs-_VN8RxrwCkbN2dz18TABVW0g6A5Kpsmdz4bXPp2vM8_ENEtoQk5pyaKf6GLFB1I3lWW3sqUCFc",
  },
  {
    id: "prod-02",
    name: "Strawberry Bento",
    price: "₹700",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC5MYYUZnesoO_T8OUuOoCKtAzXzbBDMjd3i9cCS-v5Hfz-LgM7ZRVVOL9ZAmXMmaQZG9oSZdIXPrqhNpYo_3RQHmCY6DilhQbj3dguk3DN9qXsJHVPyNWtaM5YB0FsS824ua1a538wFALIOOP17ukfW-zC83nfF-ZaZDM5Crwzm2U65fhLEx7MMxYTNj2ynKoxV2xneRuTm12xmknhMDVyk29iCTe19Lr7fapiN4JSRH5tCSainl1hNv3zc4fI5bznz7ytNwPSl5c",
  },
];

// ─── component ────────────────────────────────────────────────────────────────

export default function ProductPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : (params.id ?? "prod-01");
  const product = PRODUCTS[id] ?? PRODUCTS["prod-01"];

  const addItem = useCartStore((s) => s.addItem);
  const toggleDrawer = useCartStore((s) => s.toggleDrawer);
  const cartCount = useCartStore((s) => s.items.reduce((n, i) => n + i.quantity, 0));

  const handleAdd = () => {
    addItem({ id: product.id, name: product.name, price: product.price, quantity: 1, image: product.heroImage, category: product.category });
    toggleDrawer();
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col bg-[#fef4f6] text-[#322d2f] overflow-x-hidden">



      {/* ── MAIN ─────────────────────────────────────────────────────────── */}
      <main className="flex flex-1 flex-col px-6 py-8 md:px-10 lg:px-40 max-w-[1440px] mx-auto w-full">

        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

          {/* Image Gallery */}
          <div className="flex flex-col gap-4">
            <div className="w-full aspect-square rounded-2xl overflow-hidden relative group">
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                style={{ backgroundImage: `url('${product.heroImage}')` }}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div
                className="aspect-video rounded-2xl overflow-hidden bg-[#f0e6e8]"
                style={{ backgroundImage: `url('${product.thumb1}')`, backgroundSize: "cover", backgroundPosition: "center" }}
              />
              <div
                className="aspect-video rounded-2xl overflow-hidden bg-[#f0e6e8]"
                style={{ backgroundImage: `url('${product.thumb2}')`, backgroundSize: "cover", backgroundPosition: "center" }}
              />
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              {product.badge && (
                <span className="inline-flex px-4 py-1 rounded-full bg-[#f9cc61] text-[#5b4400] text-sm font-bold w-fit">
                  {product.badge}
                </span>
              )}
              <h1 className="text-[#322d2f] text-5xl font-black leading-tight tracking-tighter" style={{ fontFamily: "var(--font-jakarta)" }}>
                {product.name}
              </h1>
              <p className="text-[#a8275b] text-3xl font-bold">₹{product.price}</p>
            </div>

            <p className="text-[#605a5c] text-lg leading-relaxed">{product.description}</p>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {product.highlights.map((h) => (
                <div key={h.label} className="flex items-center gap-3 p-4 rounded-2xl bg-[#f9eef0] border border-[#b3abad]/10">
                  <span className="material-symbols-outlined text-[#a8275b]">{h.icon}</span>
                  <span className="text-sm font-bold">{h.label}</span>
                </div>
              ))}
            </div>

            {/* Add to Box CTA */}
            <div className="pt-4">
              <button
                onClick={handleAdd}
                className="w-full md:w-auto px-12 py-5 bg-[#a8275b] text-white rounded-full font-bold text-lg shadow-[0px_20px_40px_rgba(74,44,49,0.08)] hover:bg-[#98184f] transition-all flex items-center justify-center gap-2 active:scale-95"
              >
                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add_circle</span>
                Add to Box
              </button>
            </div>

            {/* Info Panels */}
            <div className="mt-8 flex flex-col gap-4">
              <div className="p-6 rounded-2xl bg-white">
                <h3 className="text-lg font-bold flex items-center gap-2 mb-2" style={{ fontFamily: "var(--font-jakarta)" }}>
                  <span className="material-symbols-outlined text-[#605a5c]">nutrition</span>
                  Ingredients &amp; Allergens
                </h3>
                <p className="text-[#605a5c] text-sm">
                  {product.ingredients}
                  <span className="block mt-2 font-semibold text-[#322d2f]">{product.allergens}</span>
                </p>
              </div>
              <div className="p-6 rounded-2xl bg-white">
                <h3 className="text-lg font-bold flex items-center gap-2 mb-2" style={{ fontFamily: "var(--font-jakarta)" }}>
                  <span className="material-symbols-outlined text-[#605a5c]">ac_unit</span>
                  Storage Instructions
                </h3>
                <p className="text-[#605a5c] text-sm">
                  Keep refrigerated at 4-8°C. For the best flavor experience, let the cake sit at room temperature for 10 minutes before serving. Best consumed within 48 hours of delivery.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── YOU MIGHT ALSO LIKE ──────────────────────────────────────── */}
        <section className="mt-24 pb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-black tracking-tight" style={{ fontFamily: "var(--font-jakarta)" }}>
              You might also like
            </h2>
            <Link href="/menu" className="text-[#a8275b] font-bold hover:underline">
              View all bento cakes
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendations.map((rec) => (
              <Link href={`/product/${rec.id}`} key={rec.id} className="group cursor-pointer">
                <div className="aspect-square rounded-2xl overflow-hidden bg-[#f0e6e8] mb-4 relative">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
                    style={{ backgroundImage: `url('${rec.image}')` }}
                  />
                </div>
                <h4 className="text-xl font-bold mb-1" style={{ fontFamily: "var(--font-jakarta)" }}>{rec.name}</h4>
                <p className="text-[#a8275b] font-bold">{rec.price}</p>
              </Link>
            ))}

            {/* Gift card */}
            <div className="hidden lg:flex aspect-square rounded-2xl bg-[#ff70a0]/20 flex-col items-center justify-center p-8 text-center border-2 border-dashed border-[#a8275b]/20">
              <span className="material-symbols-outlined text-[#a8275b] text-5xl mb-4">redeem</span>
              <p className="text-[#322d2f] font-bold">Gift wrapping available at checkout</p>
            </div>

            {/* Delivery card */}
            <div className="hidden lg:flex aspect-square rounded-2xl bg-[#f0e6e8] flex-col items-center justify-center p-8 text-center relative overflow-hidden">
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#745700]/10 rounded-full" />
              <span className="material-symbols-outlined text-[#605a5c] text-5xl mb-4">schedule</span>
              <p className="text-[#322d2f] font-bold">Same day delivery in Mumbai</p>
            </div>
          </div>
        </section>
      </main>

      {/* ── MOBILE STICKY BOTTOM ─────────────────────────────────────────── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 p-4 bg-white/80 backdrop-blur-md border-t border-[#b3abad]/20 z-50">
        <div className="flex items-center justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-xs text-[#605a5c]">Price</span>
            <span className="text-lg font-black text-[#a8275b]">₹{product.price}</span>
          </div>
          <button
            onClick={handleAdd}
            className="flex-1 px-6 py-3 bg-[#a8275b] text-white rounded-full font-bold shadow-[0px_20px_40px_rgba(74,44,49,0.08)] active:scale-95"
          >
            Add to Box
          </button>
        </div>
      </div>

      {/* ── SPRINKLE DECORATION ──────────────────────────────────────────── */}
      <div className="fixed -bottom-10 -right-10 opacity-20 pointer-events-none select-none">
        <svg fill="none" height="200" viewBox="0 0 100 100" width="200" xmlns="http://www.w3.org/2000/svg">
          <rect fill="#a8275b" height="12" rx="2" transform="rotate(45 10 10)" width="4" x="10" y="10" />
          <rect fill="#f9cc61" height="12" rx="2" transform="rotate(-30 50 30)" width="4" x="50" y="30" />
          <rect fill="#755257" height="12" rx="2" transform="rotate(15 80 15)" width="4" x="80" y="15" />
          <rect fill="#f9cc61" height="12" rx="2" transform="rotate(60 20 70)" width="4" x="20" y="70" />
          <rect fill="#a8275b" height="12" rx="2" transform="rotate(-15 60 80)" width="4" x="60" y="80" />
        </svg>
      </div>

    </div>
  );
}
