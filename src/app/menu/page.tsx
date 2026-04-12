"use client";

import { useCartStore } from "@/lib/store";
import Image from "next/image";
import Link from "next/link";

// ─── data ────────────────────────────────────────────────────────────────────

const classicItems = [
  {
    id: "prod-03",
    name: "Vanilla",
    startingAt: "Starting at ₹400",
    description: "Premium Madagascar vanilla bean infused sponge with light buttercream.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuB4qa3vGW-5XCjhwTrD_n6M_dChyxvjtGL1tYzwRxRsBP4gkeJMFaDhGc4-mHmsZ-TtsE4TZDG0oe-5D4CED-PmAQ3MSXooqrxIx3nrgA7c_DE41kLB8RNjIyNc-YM0RnKGw1VMo_YS29bVGIW6OtU_M_EgoVe7Bsh5DxGxfh4xNU0eP2CTlK5EWXJLcJ6ms6M7iCc4fb8Uo447XX-OOpMnzKbRqUMgKE-I4G_IiKAy_jorOHn-LSIj2JXam8LbxVjZVhqKmtuASvk",
    badge: null,
    hoverLabel: "Chef's Signature",
  },
  {
    id: "prod-02",
    name: "Strawberry",
    startingAt: "Starting at ₹400",
    description: "Fresh garden strawberries blended into a fluffy cream cloud.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuACeJSxXQlRkfVVLaIbD24GpJ1yh0a_13q37YNvTXk_akEJ4k0AMvCfDwUjJ18N8RMKubYs3qIoDdpt5QrKId-Hb-ikCNSj7Z7luOMEqd9lw3M1ct-tsq_Ahv7qJ32PQ_Ufc4oWgrlSUsaB-ZYA3fNUW-1NLmWVGKh1b9wmw6ru0DwSqwhwaJuXrWepom2eMhgvmM-Uh0R2NPzXt-XWaBTyolmFwG7hAXRlzJgTpP0gckwQ1TM24TxPnTsuFRpV1-gGLmUAPXj5VFc",
    badge: null,
    hoverLabel: null,
  },
  {
    id: "prod-rv",
    name: "Red Velvet",
    startingAt: "Starting at ₹450",
    description: "Classic cocoa-infused red sponge with our signature tangy frosting.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuC63EHPWA4UdhOPFyLfLFLx_USTLt3i3qvxUB9mz19fX9VAV111n9VPS3SRyo4KMDzgwGncdIhIMaGDwxu-boS3W23bQOB5EZAzi9CHQE_okkFpHDRQiwl9kBJO504PjJaK7R3K5aM5iNOFhlW6UKf2em6zNzJJtOd3XWWA1Nhq0BWQNAtky4ld6Or2xeXTJZtC5ld6Or2xeXTJZtC5E_GsPVm0On1mywIx1QZekoH_Xhd0HLmuk4ZLj9j0Mt8md2kQ0JuqJMENZy0Ci7eGxEktzIuK_4",
    badge: "Bestseller",
    hoverLabel: null,
  },
];

const moreFlavors = ["Butterscotch", "Mango", "Blackcurrant", "Blueberry", "Coffee", "Lotus Biscoff", "Pistachio", "Rasmalai"];

const crunchyClassics = [
  { name: "Kitkat Treat", price: "₹650", id: "cc-1" },
  { name: "Oreo Blast", price: "₹650", id: "cc-2" },
  { name: "Ferrero Rocher", price: "₹700", id: "cc-3" },
];

const miniBites = [
  { id: "mb-1", name: "Cookies", icon: "cookie", price: 199 },
  { id: "mb-2", name: "Mini Brownie", icon: "bakery_dining", price: 199 },
  { id: "mb-3", name: "Cup Cake (4)", icon: "cake", price: 199 },
  { id: "mb-4", name: "Chocolates", icon: "inventory_2", price: 199 },
];

// ─── component ───────────────────────────────────────────────────────────────

export default function MenuPage() {
  const addItem = useCartStore((s) => s.addItem);
  const toggleDrawer = useCartStore((s) => s.toggleDrawer);
  const cartCount = useCartStore((s) => s.items.reduce((n, i) => n + i.quantity, 0));

  return (
    <div className="bg-[#fef4f6] text-[#322d2f] min-h-screen">


      {/* ── MAIN ────────────────────────────────────────────────────────────── */}
      <main className="pt-28 pb-32 px-6 max-w-7xl mx-auto relative overflow-hidden">

        {/* Sprinkle decorations */}
        <div className="absolute -right-20 top-40 w-64 h-64 sprinkle-pattern rounded-full -z-10" />
        <div className="absolute -left-20 bottom-40 w-80 h-80 sprinkle-pattern rounded-full -z-10 opacity-10" />

        {/* Header */}
        <header className="mb-16 text-center md:text-left">
          <h1 className="text-5xl md:text-6xl font-extrabold text-[#a8275b] tracking-tight mb-4" style={{ fontFamily: "var(--font-fredoka)" }}>
            The Confectioner's <span className="text-[#ff70a0]">Menu</span>
          </h1>
          <p className="text-lg text-[#605a5c] max-w-2xl leading-relaxed">
            Handcrafted delights from our atelier to your doorstep. Explore our signature cakes and petite treats.
          </p>
        </header>

        {/* ── CLASSIC & PREMIUM ─────────────────────────────────────────────── */}
        <section className="mb-20">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <h2 className="text-3xl font-bold text-[#a8275b] flex items-center gap-3" style={{ fontFamily: "var(--font-jakarta)" }}>
                Classic &amp; Premium
                <span className="h-1 w-12 bg-[#ff70a0] rounded-full hidden md:block" />
              </h2>
              <p className="text-[#755257] font-medium mt-1">Our signature artisanal base recipes</p>
            </div>

            {/* Bento/½KG/1KG pill */}
            <div className="grid grid-cols-3 gap-2 md:gap-4 bg-[#f9eef0] p-4 rounded-xl border border-[#b3abad]/10">
              <div className="text-center">
                <span className="block text-[10px] uppercase tracking-widest text-[#7c7577] mb-1">Bento</span>
                <span className="font-bold text-[#a8275b]">₹400-800</span>
              </div>
              <div className="text-center border-x border-[#b3abad]/20 px-4">
                <span className="block text-[10px] uppercase tracking-widest text-[#7c7577] mb-1">1/2 KG</span>
                <span className="font-bold text-[#a8275b]">₹600-900</span>
              </div>
              <div className="text-center">
                <span className="block text-[10px] uppercase tracking-widest text-[#7c7577] mb-1">1 KG</span>
                <span className="font-bold text-[#a8275b]">₹1100-1800</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Product cards */}
            {classicItems.map((item) => (
              <div key={item.id} className="group bg-white rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0px_20px_40px_rgba(74,44,49,0.12)] flex flex-col">
                <Link href={`/product/${item.id}`} className="block relative aspect-square overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {item.badge && (
                    <div className="absolute top-4 right-4 bg-[#f9cc61] text-[#5b4400] text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">
                      {item.badge}
                    </div>
                  )}
                  {item.hoverLabel && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                      <span className="text-white text-xs font-medium">{item.hoverLabel}</span>
                    </div>
                  )}
                </Link>
                <div className="p-5 flex-grow flex flex-col">
                  <h3 className="font-bold text-xl mb-1 text-[#322d2f]" style={{ fontFamily: "var(--font-jakarta)" }}>{item.name}</h3>
                  <span className="block text-[#98184f] font-bold text-sm mb-2">{item.startingAt}</span>
                  <p className="text-sm text-[#605a5c] mb-4 line-clamp-2 flex-1">{item.description}</p>
                  <button
                    onClick={() => addItem({ id: item.id, name: item.name, price: 400, quantity: 1, image: item.image, category: "Classic & Premium" })}
                    className="w-full py-3 rounded-full bg-[#a8275b] text-white font-bold text-sm flex items-center justify-center gap-2 transition-transform active:scale-95 hover:bg-[#98184f]"
                  >
                    <span className="material-symbols-outlined text-lg">add_circle</span>
                    Add to Box
                  </button>
                </div>
              </div>
            ))}

            {/* More Flavors card */}
            <div className="group bg-[#ff70a0]/10 rounded-2xl overflow-hidden flex flex-col border-2 border-dashed border-[#ff70a0]/30">
              <div className="p-6 flex flex-col justify-center h-full text-center">
                <span className="material-symbols-outlined text-4xl text-[#a8275b] mb-4">auto_awesome</span>
                <h3 className="font-bold text-2xl mb-2 text-[#a8275b]" style={{ fontFamily: "var(--font-jakarta)" }}>More Flavors</h3>
                <div className="flex flex-wrap justify-center gap-2 mb-6">
                  {moreFlavors.map((f) => (
                    <span key={f} className="px-3 py-1 bg-white rounded-full text-xs font-medium text-[#755257]">{f}</span>
                  ))}
                </div>
                <button className="text-[#a8275b] font-bold text-sm underline underline-offset-4 hover:text-[#98184f] transition-colors">
                  View All Classics
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOR CHOCOLATE LOVERS ──────────────────────────────────────────── */}
        <section className="mb-20">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px flex-grow bg-[#b3abad]/30" />
            <h2 className="text-3xl font-bold text-[#755257]" style={{ fontFamily: "var(--font-fredoka)" }}>For Chocolate Lovers</h2>
            <div className="h-px flex-grow bg-[#b3abad]/30" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6" style={{ gridAutoRows: "280px" }}>

            {/* Death By Chocolate – large hero */}
            <div className="md:col-span-8 md:row-span-2 group relative rounded-2xl overflow-hidden shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBQqFqf7VJn5tX_u2Y_19GAKC_QpQp4K4JFtaf0JsNkxj7PB2zzFUID9tvA1wu5Ic7sj55h5m8fwwWyCbYnVzH2XuYEs2jZ-h1aCh7oMGvJV1x1gPdAaECkuBcMCPyVRV5Amt6c-nJgmko9QR5g4aaMba-y2644e9u_cx--57Kvb601P3ix_EHJ7l-UqguTTbtc0kAWngYUd6zb3l-J7Obqa7nnC7u8idgeT28Ic0iV2nNl2Luy0liqEvG_wwgRany1zLpqlzdSzPs"
                alt="Death By Chocolate"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                <div className="flex justify-between items-end">
                  <div>
                    <span className="bg-[#745700] text-[#fff1da] px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase mb-3 inline-block">
                      The Masterpiece
                    </span>
                    <h3 className="text-4xl font-bold text-white mb-2" style={{ fontFamily: "var(--font-jakarta)" }}>
                      Death By Chocolate<span className="text-2xl font-medium ml-3 text-white/90">- ₹750</span>
                    </h3>
                    <p className="text-white/80 max-w-md text-sm">
                      Seven layers of dark, milk, and white chocolate textures for the ultimate cocoa experience.
                    </p>
                  </div>
                  <button
                    onClick={() => addItem({ id: "prod-01", name: "Death By Chocolate", price: 750, quantity: 1, image: "", category: "For Chocolate Lovers" })}
                    className="bg-white text-[#a8275b] p-4 rounded-full shadow-lg transition-transform hover:scale-110 active:scale-95"
                  >
                    <span className="material-symbols-outlined">add_shopping_cart</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Choco Truffle */}
            <div className="md:col-span-4 group relative rounded-2xl overflow-hidden glass-card border border-white/40">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZC7YSWFCR4aGnnu7319ksH9xyTJuZ6vz9Y4tOVajIv8IFaKp6bu-mxhP0-nEUu2ZKqqJxLPQ8vJpCz85oPZyHZww8vxZwX2fQy37WQX68FgRhe1vftY0JQO0Y9v0Dc9hEQ26Z7VnxXEtUZ-YKaUwqyFJ9F1bYXCs9uHfh6xladln1qdc-IlPiOOyzanp7AsD2ihpbS8M7jxkI2HdtwDcXzbfZ48HcBzu-POrnRlSXfgHEREXWaeA8KcmEh8ujrwx_QuOv4fRtYI0"
                alt="Choco Truffle"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold text-lg text-[#a8275b]">Choco Truffle</h3>
                <span className="block text-[#755257] font-bold text-sm mb-1">₹600</span>
                <p className="text-xs text-[#605a5c] mb-4">Silky ganache with deep cocoa notes.</p>
                <button
                  onClick={() => addItem({ id: "prod-ct", name: "Choco Truffle", price: 600, quantity: 1, image: "", category: "For Chocolate Lovers" })}
                  className="text-[#98184f] font-bold text-sm flex items-center gap-1 group-hover:gap-2 transition-all"
                >
                  Add to Box <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>

            {/* Crunchy Classics */}
            <div className="md:col-span-4 rounded-2xl bg-[#755257] text-white p-6 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "var(--font-jakarta)" }}>Crunchy Classics</h3>
                <ul className="space-y-4">
                  {crunchyClassics.map((item, i) => (
                    <li
                      key={item.id}
                      onClick={() => addItem({ id: item.id, name: item.name, price: parseInt(item.price.replace("₹", "")), quantity: 1, image: "", category: "For Chocolate Lovers" })}
                      className={`flex justify-between items-center group/item cursor-pointer ${i > 0 ? "border-t border-white/10 pt-4" : ""}`}
                    >
                      <span>{item.name} - {item.price}</span>
                      <span className="material-symbols-outlined opacity-0 group-hover/item:opacity-100 transition-opacity">add_circle</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10 text-[10px] uppercase tracking-widest text-white/60">
                Available in Bento &amp; Full Size
              </div>
            </div>

          </div>
        </section>

        {/* ── MINI BITES ────────────────────────────────────────────────────── */}
        <section className="mb-20">
          <div className="relative bg-[#f0e6e8] rounded-2xl p-8 md:p-12 overflow-hidden">
            
            {/* ₹199 badge */}
            <div className="absolute top-0 right-0 p-8">
              <div className="w-24 h-24 rounded-full bg-[#f9cc61] flex flex-col items-center justify-center text-[#5b4400] transform rotate-12 shadow-lg border-4 border-white/20">
                <span className="text-[10px] font-bold uppercase">Only</span>
                <span className="text-2xl font-extrabold leading-none">₹199</span>
              </div>
            </div>

            <div className="relative z-10 max-w-3xl">
              <h2 className="text-4xl font-bold text-[#a8275b] mb-2" style={{ fontFamily: "var(--font-jakarta)" }}>Mini Bites</h2>
              <p className="text-[#605a5c] mb-10 text-lg">
                Perfect little joy-filled moments. All items in this category are priced at a flat rate of ₹199.
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {miniBites.map((item) => (
                  <div key={item.id} className="bg-white p-4 rounded-2xl text-center group hover:-translate-y-1 transition-transform">
                    <div className="w-16 h-16 bg-[#ff70a0]/20 rounded-full flex items-center justify-center mx-auto mb-3">
                      <span className="material-symbols-outlined text-[#a8275b] text-2xl">{item.icon}</span>
                    </div>
                    <h4 className="font-bold text-sm mb-3">{item.name}</h4>
                    <button
                      onClick={() => addItem({ id: item.id, name: item.name, price: 199, quantity: 1, image: "", category: "Mini Bites" })}
                      className="text-[10px] font-bold uppercase tracking-widest text-[#a8275b] border border-[#a8275b]/20 px-4 py-1 rounded-full group-hover:bg-[#a8275b] group-hover:text-white transition-colors"
                    >
                      <span className="mr-1">₹199</span>Add
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* BG blob */}
            <div className="absolute bottom-0 right-0 translate-y-1/2 translate-x-1/4 w-96 h-96 bg-[#ff70a0]/10 rounded-full -z-0" />
          </div>
        </section>

      </main>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer className="bg-[#f9eef0] pt-20 pb-28 px-6 overflow-hidden relative">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 relative z-10">
          <div className="text-center md:text-left">
            <span className="material-symbols-outlined text-[#a8275b] text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>cake</span>
            <p className="text-[#605a5c] max-w-xs text-sm mt-4">
              Crafting sweetness one layer at a time with the finest ingredients and boundless imagination.
            </p>
          </div>
          <div className="flex gap-12 text-sm font-bold text-[#a8275b]" style={{ fontFamily: "var(--font-jakarta)" }}>
            <a href="#" className="hover:text-[#ff70a0] transition-colors">Instagram</a>
            <a href="#" className="hover:text-[#ff70a0] transition-colors">Pinterest</a>
            <a href="#" className="hover:text-[#ff70a0] transition-colors">WhatsApp</a>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-[#a8275b] via-[#ff70a0] to-[#f9cc61]" />
      </footer>

      {/* ── MOBILE BOTTOM NAV ───────────────────────────────────────────────── */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 bg-white/60 backdrop-blur-xl px-4 pb-4 flex justify-around items-end shadow-[0px_-10px_30px_rgba(74,44,49,0.05)] rounded-t-[32px]">
        <Link href="/menu" className="flex flex-col items-center justify-center text-[#a8275b]/60 p-2 hover:bg-[#fef4f6] rounded-full active:scale-90 transition-all">
          <span className="material-symbols-outlined">menu_book</span>
          <span className="text-[10px] font-bold uppercase tracking-wider mt-1" style={{ fontFamily: "var(--font-jakarta)" }}>Menu</span>
        </Link>
        <Link href="/menu" className="flex flex-col items-center justify-center bg-[#ff70a0] text-white rounded-full p-3 mb-2 -translate-y-2 shadow-lg active:scale-90 transition-all">
          <span className="material-symbols-outlined">cake</span>
          <span className="text-[10px] font-bold uppercase tracking-wider mt-1" style={{ fontFamily: "var(--font-jakarta)" }}>Custom</span>
        </Link>
        <Link href="/orders" className="flex flex-col items-center justify-center text-[#a8275b]/60 p-2 hover:bg-[#fef4f6] rounded-full active:scale-90 transition-all">
          <span className="material-symbols-outlined">receipt_long</span>
          <span className="text-[10px] font-bold uppercase tracking-wider mt-1" style={{ fontFamily: "var(--font-jakarta)" }}>Orders</span>
        </Link>
        <Link href="#" className="flex flex-col items-center justify-center text-[#a8275b]/60 p-2 hover:bg-[#fef4f6] rounded-full active:scale-90 transition-all">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-bold uppercase tracking-wider mt-1" style={{ fontFamily: "var(--font-jakarta)" }}>Profile</span>
        </Link>
      </nav>

    </div>
  );
}
