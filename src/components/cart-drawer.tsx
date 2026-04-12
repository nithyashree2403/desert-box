"use client";

import { useCartStore } from "@/lib/store";
import { useRouter } from "next/navigation";

export function CartDrawer() {
  const {
    items,
    isDrawerOpen,
    toggleDrawer,
    updateQuantity,
    removeItem,
    sweetNote,
    setSweetNote,
    clearCart,
  } = useCartStore();
  const router = useRouter();

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const packagingFee = 5;
  const sweetNotePrice = 3.5;
  const total = subtotal > 0 ? subtotal + packagingFee + (sweetNote ? sweetNotePrice : 0) : 0;
  const progress = Math.min((subtotal / 1500) * 100, 100);
  const remaining = Math.max(1500 - subtotal, 0);

  if (!isDrawerOpen) return null;

  return (
    <>
      {/* ── BACKDROP ──────────────────────────────────────────────────────── */}
      <div
        className="fixed inset-0 bg-[#755257]/20 backdrop-blur-sm z-40"
        onClick={toggleDrawer}
      />

      {/* ── DRAWER ────────────────────────────────────────────────────────── */}
      <div className="fixed inset-y-0 right-0 w-full max-w-md bg-[#fef4f6] shadow-[0px_20px_40px_rgba(74,44,49,0.15)] z-50 flex flex-col overflow-hidden border-l border-[#b3abad]/10">

        {/* ── DRAWER HEADER ─────────────────────────────────────────────── */}
        <div className="relative bg-[#f9eef0] px-8 pt-10 pb-6">
          {/* Sprinkle decoration */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: "radial-gradient(#ff70a0 1px, transparent 1px), radial-gradient(#f9cc61 1px, transparent 1px), radial-gradient(#a8275b 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            backgroundPosition: "0 0, 10px 10px, 5px 15px",
            opacity: 0.15,
          }} />

          <div className="relative flex justify-between items-center mb-6">
            <h2 className="font-extrabold text-3xl text-[#a8275b] flex items-center gap-2" style={{ fontFamily: "var(--font-jakarta)" }}>
              Your Treats
              <span className="text-lg bg-[#ff70a0]/20 text-[#a8275b] px-3 py-0.5 rounded-full font-bold">
                {items.length}
              </span>
            </h2>
            <button
              onClick={toggleDrawer}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-[#a8275b]/10 transition-colors text-[#a8275b] active:scale-95"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Free shipping progress */}
          <div className="relative space-y-3">
            <div className="flex justify-between text-sm font-semibold text-[#755257]">
              <span>Shipping Progress</span>
              <span className="text-[#a8275b]">
                {subtotal >= 1500
                  ? "🎉 Free Shipping Unlocked!"
                  : `Rs. ${remaining.toFixed(2)} away from Free Shipping!`}
              </span>
            </div>
            <div className="h-3 w-full bg-[#e5dadd] rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#a8275b] to-[#ff70a0] rounded-full shadow-inner relative transition-all duration-500"
                style={{ width: `${progress}%` }}
              >
                <div className="absolute inset-0 bg-[linear-gradient(45deg,rgba(255,255,255,0.2)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.2)_50%,rgba(255,255,255,0.2)_75%,transparent_75%,transparent)] bg-[length:20px_20px]" />
              </div>
            </div>
          </div>
        </div>

        {/* ── SCROLLABLE ITEMS ──────────────────────────────────────────── */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-20 opacity-60">
              <div className="w-24 h-24 bg-[#fdced4] rounded-full mb-4 flex items-center justify-center text-4xl">
                🍰
              </div>
              <p className="text-xl font-bold text-[#755257] mb-2" style={{ fontFamily: "var(--font-jakarta)" }}>
                Your box is empty
              </p>
              <p className="text-sm text-[#605a5c]">Add some sweet treats to get started.</p>
            </div>
          ) : (
            <>
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 items-start group">
                  {/* Image */}
                  <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-[#f0e6e8] shrink-0">
                    {item.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-3xl">🎂</div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-lg text-[#322d2f] leading-tight truncate" style={{ fontFamily: "var(--font-jakarta)" }}>
                        {item.name}
                      </h3>
                      <span className="font-bold text-[#a8275b] shrink-0 ml-2">Rs. {item.price}</span>
                    </div>
                    <p className="text-sm text-[#755257] mb-3">{item.category}</p>

                    {/* Quantity + Remove */}
                    <div className="flex items-center gap-4">
                      <div className="flex items-center bg-[#f9eef0] rounded-full px-2 py-1">
                        <button
                          onClick={() => item.quantity > 1 ? updateQuantity(item.id, item.quantity - 1) : removeItem(item.id)}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-[#a8275b] hover:bg-white transition-all active:scale-90"
                        >
                          <span className="material-symbols-outlined text-sm">remove</span>
                        </button>
                        <span className="w-8 text-center font-bold text-[#322d2f]">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full flex items-center justify-center text-[#a8275b] hover:bg-white transition-all active:scale-90"
                        >
                          <span className="material-symbols-outlined text-sm">add</span>
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-xs font-semibold text-[#755257] hover:text-[#b41340] transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              {/* Sweet note upsell */}
              <div className="mt-8 bg-[#f9cc61]/30 p-6 rounded-2xl relative overflow-hidden">
                <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-[#745700]/10 rounded-full blur-xl" />
                <p className="font-bold text-[#5b4400] mb-2 italic" style={{ fontFamily: "var(--font-jakarta)" }}>
                  Add a sweet note?
                </p>
                <div className="flex justify-between items-end">
                  <p className="text-xs text-[#5b4400]/80 max-w-[140px]">
                    Include a hand-written card for just Rs. 3.50
                  </p>
                  <button
                    onClick={() => setSweetNote(!sweetNote)}
                    className={`font-bold px-4 py-1.5 rounded-full text-sm shadow-sm hover:shadow-md transition-all active:scale-95 ${sweetNote ? "bg-[#745700] text-white" : "bg-white text-[#745700]"}`}
                  >
                    {sweetNote ? "Added ✓" : "Add"}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>

        {/* ── FOOTER / CHECKOUT ─────────────────────────────────────────── */}
        {items.length > 0 && (
          <div className="bg-[#f9eef0] px-8 py-8 space-y-4 rounded-t-2xl shadow-[0_-10px_30px_rgba(74,44,49,0.05)]">
            <div className="space-y-2">
              <div className="flex justify-between text-[#755257]">
                <span>Subtotal</span>
                <span className="font-semibold text-[#322d2f]">Rs. {subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#755257]">
                <span>Packaging &amp; Hand-crafting</span>
                <span className="font-semibold text-[#322d2f]">Rs. {packagingFee.toFixed(2)}</span>
              </div>
              {sweetNote && (
                <div className="flex justify-between text-[#755257]">
                  <span>Sweet Note</span>
                  <span className="font-semibold text-[#322d2f]">Rs. {sweetNotePrice.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between items-center pt-2 border-t border-[#b3abad]/20 mt-2">
                <span className="font-extrabold text-xl text-[#322d2f]" style={{ fontFamily: "var(--font-jakarta)" }}>Total</span>
                <span className="font-extrabold text-2xl text-[#a8275b]" style={{ fontFamily: "var(--font-jakarta)" }}>Rs. {total.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={() => { toggleDrawer(); router.push("/checkout"); }}
              className="w-full bg-[#a8275b] text-white py-5 rounded-full font-bold text-lg shadow-lg hover:bg-[#98184f] hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-3 relative overflow-hidden group"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              <div className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative">Proceed to Checkout</span>
              <span className="material-symbols-outlined relative">arrow_forward</span>
            </button>

            <p className="text-center text-[10px] text-[#755257]/60 font-medium">
              Sweetly Handcrafted &amp; Wrapped with Care in 2024
            </p>
          </div>
        )}
      </div>
    </>
  );
}
