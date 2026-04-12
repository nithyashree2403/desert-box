"use client";

import Link from "next/link";
import { useCartStore } from "@/lib/store";

// ─── mock data ────────────────────────────────────────────────────────────────

type OrderStatus = "Shipped" | "Confirmed" | "Delivered" | "Awaiting Verification";

interface Order {
  id: string;
  name: string;
  date: string;
  price: string;
  status: OrderStatus;
  image?: string;
}

const orders: Order[] = [
  {
    id: "88219",
    name: "Artisan Treat Box",
    date: "Oct 24, 2023",
    price: "₹420",
    status: "Shipped",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxHi15xdsf4m4tJ2olzm_68whensyGLjY8XQscEqIijZ9lkvJnBq7C3UgVnkaNRw1p4agVnolDPtCKirjjsLzTUZFWr46f9u7__dDYb0ZhLoMWC3mHdg8rKGVyRG7BayTUCFGZ3mh5-x5VFMMCCUC0AzGKb9JqW-Jabx_QLJJsRwbnwsHrkRMXfWfssAzsnb37ZKlQndQcflGlpkVrUqGPkPeipVb_1ahEvCJeWZsiHXBQIRjSjWuf43Dog0Tt69VaWVBZqsY6XCw",
  },
  {
    id: "88107",
    name: "Signature Macarons (12pc)",
    date: "Oct 22, 2023",
    price: "₹345",
    status: "Confirmed",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCug7pp99KG-DJHu4C1ERXTn-wBPha7VF5I_S8H9ayhztwUH1pV5Dif8PyNMvUR5ro2-DzjIK-8UbBQuNeejqhVqQwu9ObrQASV_mQRKEOCjhHbJ-hE-CkWEFjnrQgS-NH8K8q1R2J5W51HejMnGAsPfxGsvSxpA6TfmXFVPUfSSavcBPM7nA4PfnfpzqN4vYJsCz_-evP86fy4A3A9Zepg_9oKEw4XpToV9YI-srDhqTtbI6Z11oanNglsmfWoJ6A0jrGPe-6ZKL8",
  },
  {
    id: "87993",
    name: "Petit Four Selection",
    date: "Oct 15, 2023",
    price: "₹280",
    status: "Delivered",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAZA6NyrpYPAloJyw55QYQReBfW68Khe_gH6xzjLxcngaR808hJKrhqYO6gPLYSrDYR6KhET5H9TIWO3kiqOPJZkS3JaSqWm0PVmOxGChSVGtIKmZXgkqF0Xn_FLOGMBQ5Jvqcba8pwKvdlusk-NDxCJ6Bsk0Uei3B2w8EmIXDWPvV9xcz6jR5215lxPAsmhw19Ez9E6QkRQFZ1demXsC389qCBabRrdf-52_tCU5b-HE3oukpeP4CggU6ClhFSKcO_hKOUWNLrx3w",
  },
  {
    id: "88301",
    name: "Custom Celebration Cake",
    date: "Oct 28, 2023",
    price: "₹1250",
    status: "Awaiting Verification",
  },
];

const STATUS_STYLES: Record<OrderStatus, { bg: string; text: string }> = {
  "Shipped":              { bg: "bg-[#ff70a0]/20",   text: "text-[#a8275b]" },
  "Confirmed":            { bg: "bg-[#fdced4]",       text: "text-[#654449]" },
  "Delivered":            { bg: "bg-[#e5dadd]",       text: "text-[#605a5c]" },
  "Awaiting Verification":{ bg: "bg-[#f9cc61]/40",   text: "text-[#5b4400]" },
};

// ─── helpers ─────────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: OrderStatus }) {
  const { bg, text } = STATUS_STYLES[status];
  return (
    <span className={`${bg} ${text} text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-widest`}>
      {status}
    </span>
  );
}

// ─── component ───────────────────────────────────────────────────────────────

export default function OrdersPage() {
  const { toggleDrawer, items } = useCartStore();
  const cartCount = items.reduce((n, i) => n + i.quantity, 0);

  const activeOrder = orders.find((o) => o.status === "Shipped");

  return (
    <div className="bg-[#fef4f6] text-[#322d2f] min-h-screen">



      <main className="max-w-6xl mx-auto px-6 py-12 relative min-h-screen">

        {/* Decorative blobs */}
        <div className="absolute top-20 right-0 w-64 h-64 -z-10 rounded-full blur-3xl sprinkle-bg" style={{ opacity: 0.1 }} />
        <div className="absolute bottom-40 left-0 w-48 h-48 -z-10 rounded-full blur-2xl sprinkle-bg" style={{ opacity: 0.1 }} />

        {/* ── HEADER ──────────────────────────────────────────────────────── */}
        <header className="mb-12">
          <h1 className="text-5xl text-[#a8275b] mb-2" style={{ fontFamily: "var(--font-fredoka)" }}>
            My Sweet Journey
          </h1>
          <p className="text-[#605a5c] text-lg">Track your handmade delights from our ovens to your doorstep.</p>
        </header>

        {/* ── BENTO GRID ──────────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">

          {/* Active tracking card */}
          <div className="lg:col-span-2 bg-white rounded-[2rem] p-8 border border-[#a8275b]/5 relative overflow-hidden shadow-[0px_20px_40px_rgba(74,44,49,0.06)]">
            <div className="flex justify-between items-start mb-8">
              <div>
                <span className="bg-[#f9cc61] text-[#5b4400] px-4 py-1 rounded-full text-xs font-bold tracking-wider uppercase mb-3 inline-block">
                  Active Delivery
                </span>
                <h2 className="font-extrabold text-2xl text-[#322d2f]" style={{ fontFamily: "var(--font-jakarta)" }}>
                  Order #{activeOrder?.id ?? "—"}
                </h2>
                <p className="text-[#605a5c]">Arriving in approx. 25 mins</p>
              </div>
              <div className="bg-[#f9eef0] p-4 rounded-2xl">
                <span className="material-symbols-outlined text-[#a8275b] text-3xl">local_shipping</span>
              </div>
            </div>

            {/* Progress bar */}
            <div className="relative pt-1">
              <div className="flex mb-4 items-center justify-between">
                <div className="text-xs font-bold text-[#a8275b] bg-[#ff70a0]/20 px-2 py-1 rounded">Shipped</div>
                <span className="text-xs font-semibold text-[#a8275b]">75%</span>
              </div>
              <div className="overflow-hidden h-3 mb-4 rounded-full bg-[#f0e6e8]">
                <div className="h-full bg-gradient-to-r from-[#a8275b] to-[#ff70a0] rounded-full" style={{ width: "75%" }} />
              </div>
              <div className="flex justify-between text-[10px] font-bold text-[#605a5c] uppercase tracking-tighter">
                <span>Awaiting</span>
                <span>Confirmed</span>
                <span className="text-[#a8275b]">Shipped</span>
                <span>Delivered</span>
              </div>
            </div>
          </div>

          {/* Stats / reward card */}
          <div className="bg-[#fdced4] rounded-[2rem] p-8 flex flex-col justify-center items-center text-center relative group overflow-hidden">
            <div className="absolute inset-0 sprinkle-bg opacity-20 group-hover:opacity-30 transition-opacity" />
            <div className="relative">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 mx-auto shadow-sm">
                <span className="material-symbols-outlined text-[#755257] text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
              </div>
              <h3 className="font-bold text-[#654449] text-xl mb-1" style={{ fontFamily: "var(--font-jakarta)" }}>
                Lover of Sweets
              </h3>
              <p className="text-[#654449]/80 text-sm mb-4">You&apos;ve ordered 12 artisan boxes this month!</p>
              <button className="text-[#755257] font-bold text-sm underline hover:text-[#a8275b] transition-colors">
                Claim Reward
              </button>
            </div>
          </div>
        </div>

        {/* ── ORDER HISTORY ────────────────────────────────────────────────── */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl text-[#322d2f]" style={{ fontFamily: "var(--font-fredoka)" }}>Order History</h2>
            <div className="flex gap-2">
              <button className="bg-[#f0e6e8] px-4 py-2 rounded-full text-sm font-medium hover:bg-[#ebe0e2] transition-colors">All</button>
              <button className="bg-white px-4 py-2 rounded-full text-sm font-medium hover:bg-[#ebe0e2] transition-colors">Last 3 Months</button>
            </div>
          </div>

          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order.id}
                className="order-card-transition bg-white p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-sm"
              >
                <div className="flex items-center gap-6">
                  {/* Image */}
                  <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-[#f0e6e8]">
                    {order.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={order.image} alt={order.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-[#a8275b]/40">inventory_2</span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div>
                    <div className="flex items-center gap-3 mb-1 flex-wrap">
                      <h4 className="font-bold text-lg text-[#322d2f]" style={{ fontFamily: "var(--font-jakarta)" }}>
                        {order.name}
                      </h4>
                      <StatusBadge status={order.status} />
                    </div>
                    <p className="text-sm text-[#605a5c] font-medium">Order Date: {order.date}</p>
                    <p className="text-sm text-[#755257] font-bold">{order.price}</p>
                  </div>
                </div>

                {/* CTA buttons */}
                <div className="flex items-center gap-3 shrink-0">
                  {order.status === "Delivered" && (
                    <>
                      <button className="border-2 border-[#f0e6e8] text-[#322d2f] font-bold px-6 py-2 rounded-full text-sm hover:bg-[#f0e6e8] transition-all" style={{ fontFamily: "var(--font-jakarta)" }}>
                        Leave Review
                      </button>
                      <button className="bg-[#a8275b] text-white font-bold px-6 py-2 rounded-full text-sm shadow-md active:scale-95 duration-150" style={{ fontFamily: "var(--font-jakarta)" }}>
                        Reorder
                      </button>
                    </>
                  )}
                  {order.status === "Shipped" && (
                    <>
                      <button className="border-2 border-[#f0e6e8] text-[#322d2f] font-bold px-6 py-2 rounded-full text-sm hover:bg-[#f0e6e8] transition-all" style={{ fontFamily: "var(--font-jakarta)" }}>
                        Track Order
                      </button>
                      <button className="bg-[#a8275b] text-white font-bold px-6 py-2 rounded-full text-sm shadow-md active:scale-95 duration-150" style={{ fontFamily: "var(--font-jakarta)" }}>
                        Reorder
                      </button>
                    </>
                  )}
                  {order.status === "Confirmed" && (
                    <>
                      <button className="border-2 border-[#f0e6e8] text-[#322d2f] font-bold px-6 py-2 rounded-full text-sm hover:bg-[#f0e6e8] transition-all" style={{ fontFamily: "var(--font-jakarta)" }}>
                        Order Details
                      </button>
                      <button disabled className="bg-[#ebe0e2] text-[#322d2f] font-bold px-6 py-2 rounded-full text-sm opacity-50 cursor-not-allowed" style={{ fontFamily: "var(--font-jakarta)" }}>
                        Reorder
                      </button>
                    </>
                  )}
                  {order.status === "Awaiting Verification" && (
                    <button className="bg-[#f0e6e8] text-[#322d2f] font-bold px-6 py-2 rounded-full text-sm hover:bg-[#ebe0e2] transition-all" style={{ fontFamily: "var(--font-jakarta)" }}>
                      Modify Order
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── QUOTE CTA ───────────────────────────────────────────────────── */}
        <div className="mt-20 text-center">
          <div className="inline-block p-4 rounded-full bg-[#ff70a0]/10 mb-4">
            <span className="material-symbols-outlined text-[#a8275b] text-4xl">auto_awesome</span>
          </div>
          <p className="text-[#605a5c] italic">
            &ldquo;A party without cake is just a meeting.&rdquo; — Julia Child
          </p>
        </div>
      </main>

      {/* ── FOOTER ──────────────────────────────────────────────────────────── */}
      <footer className="bg-[#fef4f6] w-full rounded-t-[32px] mt-12 flex flex-col md:flex-row justify-between items-center px-12 py-10 text-sm" style={{ fontFamily: "var(--font-jakarta)" }}>
        <div className="mb-6 md:mb-0">
          <div className="font-semibold text-lg text-[#a8275b] mb-2" style={{ fontFamily: "var(--font-fredoka)" }}>
            The Dessert Box
          </div>
          <p className="text-[#4a2c31]">© 2024 The Dessert Box. Handmade with love.</p>
        </div>
        <div className="flex gap-8">
          <a href="#" className="text-[#4a2c31] hover:text-[#a8275b] transition-colors">Instagram</a>
          <a href="#" className="text-[#4a2c31] hover:text-[#a8275b] transition-colors">Facebook</a>
          <a href="#" className="text-[#4a2c31] hover:text-[#a8275b] transition-colors">Contact Us</a>
        </div>
      </footer>

      {/* ── MOBILE BOTTOM NAV ───────────────────────────────────────────────── */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#fef4f6] backdrop-blur-lg px-6 py-4 flex justify-around items-center z-50 border-t border-[#a8275b]/10">
        <Link href="/" className="flex flex-col items-center gap-1 text-[#605a5c]">
          <span className="material-symbols-outlined">home</span>
          <span className="text-[10px] font-bold">Home</span>
        </Link>
        <Link href="/menu" className="flex flex-col items-center gap-1 text-[#605a5c]">
          <span className="material-symbols-outlined">restaurant_menu</span>
          <span className="text-[10px] font-bold">Menu</span>
        </Link>
        <Link href="/orders" className="flex flex-col items-center gap-1 text-[#a8275b]">
          <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>receipt_long</span>
          <span className="text-[10px] font-bold">Orders</span>
        </Link>
        <button className="flex flex-col items-center gap-1 text-[#605a5c]">
          <span className="material-symbols-outlined">person</span>
          <span className="text-[10px] font-bold">Profile</span>
        </button>
      </nav>

    </div>
  );
}
