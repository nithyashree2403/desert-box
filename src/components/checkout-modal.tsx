"use client";

import { useRouter } from "next/navigation";
import { useCartStore } from "@/lib/store";

export function CheckoutModal() {
  const router = useRouter();
  const { isCheckoutModalOpen, setCheckoutModalOpen, items } = useCartStore();

  if (!isCheckoutModalOpen) return null;

  const handleProceedToCheckout = () => {
    setCheckoutModalOpen(false);
    router.push("/checkout");
  };

  const handleContinueShopping = () => {
    setCheckoutModalOpen(false);
  };

  const cartCount = items.reduce((n, i) => n + i.quantity, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
        onClick={handleContinueShopping}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-[101] px-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden animate-in fade-in zoom-in-95 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#a8275b] to-[#ff70a0] p-8 text-white text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
              ✨
            </div>
            <h2 className="text-2xl font-extrabold" style={{ fontFamily: "var(--font-jakarta)" }}>
              Item Added!
            </h2>
            <p className="text-white/90 text-sm mt-2">Your treat has been added to the box</p>
          </div>

          {/* Content */}
          <div className="p-8">
            <div className="bg-[#f9eef0] rounded-2xl p-4 mb-6">
              <div className="flex justify-between items-center mb-3 pb-3 border-b border-[#b3abad]/20">
                <span className="text-sm text-[#605a5c]">Items in box</span>
                <span className="font-bold text-[#a8275b] text-lg">{cartCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#605a5c]">Subtotal</span>
                <span className="font-extrabold text-[#a8275b] text-lg">₹{subtotal.toFixed(2)}</span>
              </div>
            </div>

            <p className="text-center text-[#605a5c] text-sm mb-6">
              Would you like to proceed to checkout or continue shopping?
            </p>

            {/* Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleProceedToCheckout}
                className="w-full bg-[#a8275b] text-white py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-[#98184f] active:scale-95 transition-all shadow-[0px_10px_20px_rgba(168,39,91,0.2)]"
              >
                <span className="material-symbols-outlined">arrow_forward</span>
                Proceed to Checkout
              </button>
              <button
                onClick={handleContinueShopping}
                className="w-full bg-[#f9eef0] text-[#a8275b] py-4 rounded-full font-bold text-lg hover:bg-[#f0e6e8] active:scale-95 transition-all"
              >
                Continue Shopping
              </button>
            </div>
          </div>

          {/* Footer note */}
          <div className="bg-[#fef4f6] px-8 py-4 text-center border-t border-[#b3abad]/10">
            <p className="text-xs text-[#605a5c] italic">
              You can always review your cart before checking out
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
