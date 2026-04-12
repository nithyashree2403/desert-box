"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart } from "lucide-react";
import { useCartStore } from "@/lib/store";

export function Navbar() {
  const pathname = usePathname();
  const toggleDrawer = useCartStore((state) => state.toggleDrawer);
  const items = useCartStore((state) => state.items);

  const cartCount = items.reduce((sum, item) => sum + item.quantity, 0);

  // Hide Navbar on Home and Auth pages. The global layout renders this.
  const isHidden = pathname === "/" || pathname?.startsWith("/admin") || pathname?.startsWith("/auth");

  if (isHidden) return null;

  return (
    <nav className="bg-[#fef4f6]/90 backdrop-blur-md w-full sticky top-0 z-50 shadow-[0px_20px_40px_rgba(74,44,49,0.08)]">
      <div className="flex items-center px-6 md:px-10 lg:px-40 py-4 max-w-[1440px] mx-auto">
        <div className="flex-1 flex items-center justify-start">
          <Link href="/" className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#a8275b] text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>cake</span>
            <span className="text-2xl font-bold text-[#a8275b] hidden sm:block" style={{ fontFamily: "var(--font-fredoka)" }}>
              The Dessert Box
            </span>
          </Link>
        </div>

        <div className="hidden md:flex gap-8 items-center text-[15px] shrink-0" style={{ fontFamily: "var(--font-jakarta)" }}>
          <Link href="/" className="text-[#4a2c31] hover:text-[#a8275b] transition-colors">
            Home
          </Link>
          <Link
            href="/menu"
            className={`transition-colors ${pathname?.startsWith('/menu') || pathname?.startsWith('/product') ? "text-[#a8275b] font-bold border-b-2 border-[#a8275b] pb-1" : "text-[#4a2c31] hover:text-[#a8275b]"}`}
          >
            Menu
          </Link>
          <Link
            href="/orders"
            className={`transition-colors ${pathname === '/orders' ? "text-[#a8275b] font-bold border-b-2 border-[#a8275b] pb-1" : "text-[#4a2c31] hover:text-[#a8275b]"}`}
          >
            My Orders
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-end gap-4">
          {(pathname?.startsWith("/menu") || pathname?.startsWith("/orders")) && (
            <div className="relative bg-[#e5dadd]/50 p-2 rounded-full xl:flex items-center gap-2 hidden">
              <span className="material-symbols-outlined text-[#98184f] ml-2 text-[20px]">search</span>
              <input 
                className="bg-transparent border-none focus:ring-0 text-sm w-48 placeholder:text-[#7c7577] outline-none" 
                placeholder={pathname?.startsWith("/orders") ? "Search orders…" : "Find a treat…"} 
                type="text" 
              />
            </div>
          )}
          <button
            onClick={toggleDrawer}
            className="flex items-center gap-2 bg-[#a8275b] text-white px-6 py-2 rounded-full font-bold shadow-lg active:scale-95 transition-all"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            <span className="material-symbols-outlined">shopping_cart</span>
            <span className="hidden sm:inline">Cart</span>
            {cartCount > 0 && (
              <span className="ml-1 bg-white text-[#a8275b] text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </button>
          <button className="md:hidden text-[#a8275b]">
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
