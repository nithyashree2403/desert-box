"use client";

import { useCartStore } from "@/lib/store";
import { SignInModal } from "@/components/signin-modal";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const BAKER_WHATSAPP = "+918147491854";

export default function CheckoutPage() {
  const { items, sweetNote, clearCart, customer, isSignedIn, addOrder } = useCartStore();
  const router = useRouter();

  const [submitted, setSubmitted] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const cartCount = items.reduce((n, i) => n + i.quantity, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const sweetNotePrice = sweetNote ? 3.5 : 0;
  const deliveryFee = subtotal >= 1500 ? 0 : 5;
  const total = subtotal + sweetNotePrice + deliveryFee;

  const handleSubmit = () => {
    if (isSubmitting) return; // Prevent double submission
    
    if (!isSignedIn || !customer) {
      setShowSignIn(true);
      return;
    }

    setIsSubmitting(true);

    const orderDetails = items.map(item => 
      `• ${item.name} x${item.quantity} - ₹${item.price * item.quantity}`
    ).join('\n');

    const orderTotal = subtotal + sweetNotePrice + deliveryFee;
    
    const bakerMessage = `🔔 *New Order Received*\n\n` +
      `*Customer ID:* ${customer.customerId}\n` +
      `*Name:* ${customer.email.split('@')[0]}\n` +
      `*WhatsApp:* ${customer.whatsapp}\n\n` +
      `*Order Details:*\n${orderDetails}\n\n` +
      `*Subtotal:* ₹${subtotal.toFixed(2)}\n` +
      `${sweetNote ? `*Sweet Note:* ₹${sweetNotePrice.toFixed(2)}\n` : ''}` +
      `*Delivery:* ₹${deliveryFee.toFixed(2)}\n` +
      `*Total:* ₹${orderTotal.toFixed(2)}\n\n` +
      `📱 Contact customer to confirm payment & collect cake customization details!`;

    const customerMessage = `🎉 *Order Received!*\n\n` +
      `Thank you for your order, ${customer.email.split('@')[0]}!\n\n` +
      `*Order ID:* ${customer.customerId}\n` +
      `*Total Amount:* ₹${orderTotal.toFixed(2)}\n\n` +
      `Your order details:\n${orderDetails}\n\n` +
      `💬 The baker will contact you on WhatsApp shortly to:\n` +
      `• Confirm payment details\n` +
      `• Discuss cake customization\n` +
      `• Finalize delivery time\n\n` +
      `Please check your WhatsApp for messages from the baker!\n\n` +
      `Made with ❤️ by The Dessert Box`;

    window.open(`https://wa.me/${BAKER_WHATSAPP.replace('+', '')}?text=${encodeURIComponent(bakerMessage)}`, '_blank');
    window.open(`https://wa.me/${customer.whatsapp.replace('+', '')}?text=${encodeURIComponent(customerMessage)}`, '_blank');

    addOrder({
      orderId: customer.customerId,
      items: items.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image,
      })),
      subtotal,
      sweetNote,
      sweetNotePrice,
      deliveryFee,
      total: orderTotal,
      status: 'Pending',
      createdAt: new Date().toISOString(),
    });

    setSubmitted(true);
    clearCart();
    setTimeout(() => router.push("/profile"), 5000);
  };

  // Show sign-in modal if not signed in
  if (showSignIn) {
    return (
      <SignInModal
        isOpen={true}
        onClose={() => setShowSignIn(false)}
        onSuccess={() => setShowSignIn(false)}
      />
    );
  }

  return (
    <div className="bg-[#fef4f6] text-[#322d2f] min-h-screen">



      <main className="max-w-6xl mx-auto px-6 py-12 relative">

        {/* Sprinkle decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 pointer-events-none -z-10 rounded-full sprinkle-pattern" />
        <div className="fixed bottom-10 left-10 w-12 h-12 sprinkle-pattern rotate-45 pointer-events-none opacity-20" />
        <div className="fixed top-40 right-20 w-8 h-8 rounded-full bg-[#f9cc61]/20 pointer-events-none" />

        {submitted ? (
          /* ── SUCCESS STATE ─────────────────────────────────────────────── */
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <div className="w-24 h-24 bg-[#f9cc61]/30 rounded-full flex items-center justify-center mb-6 text-5xl">
              🎉
            </div>
            <h1 className="text-5xl font-extrabold text-[#a8275b] mb-4" style={{ fontFamily: "var(--font-jakarta)" }}>
              Order Submitted!
            </h1>
            <p className="text-lg text-[#605a5c] max-w-md mb-8">
              Your order is being reviewed. You&apos;ll receive a WhatsApp notification once the baker accepts it.
            </p>
            <p className="text-sm text-[#7c7577]">Redirecting you to home…</p>
          </div>
        ) : (
          <>
            {/* ── HEADING ──────────────────────────────────────────────────── */}
            <div className="text-center mb-16">
              <h1 className="font-extrabold text-5xl md:text-6xl text-[#a8275b] tracking-tight mb-4" style={{ fontFamily: "var(--font-jakarta)" }}>
                Almost There!
              </h1>
              <p className="text-lg text-[#605a5c] max-w-lg mx-auto">
                Your delicious treats are being prepped. Just one more step to secure your spot in our baking queue.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

              {/* ── LEFT: ORDER SUMMARY ─────────────────────────────────────── */}
              <div className="lg:col-span-5 space-y-6">
                {isSubmitting && (
                  <div className="bg-[#a8275b]/10 border-l-4 border-[#a8275b] p-4 rounded-lg flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#a8275b] animate-spin">lock</span>
                    <span className="font-semibold text-[#a8275b]">Cart is protected while processing your order...</span>
                  </div>
                )}
                <div className="bg-white rounded-2xl p-8 shadow-[0px_20px_40px_rgba(74,44,49,0.04)] relative overflow-hidden">
                  <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#f9cc61]/30 rounded-full blur-2xl" />

                  <h2 className="text-2xl font-bold text-[#755257] mb-6 flex items-center gap-2" style={{ fontFamily: "var(--font-jakarta)" }}>
                    <span className="material-symbols-outlined text-[#a8275b]">receipt_long</span>
                    Order Summary
                  </h2>

                  <div className="space-y-4">
                    {items.length === 0 ? (
                      <p className="text-[#605a5c] text-sm italic text-center py-6">No items in cart.</p>
                    ) : (
                      items.map((item) => (
                        <div key={item.id} className="flex justify-between items-center p-4 bg-[#f9eef0] rounded-2xl">
                          <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm bg-[#f0e6e8] shrink-0">
                              {item.image ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-lg">🎂</div>
                              )}
                            </div>
                            <div>
                              <p className="font-bold text-[#322d2f]">{item.name}</p>
                              <p className="text-sm text-[#605a5c]">Qty: {item.quantity}</p>
                            </div>
                          </div>
                          <span className="font-bold text-[#a8275b]">₹{item.price * item.quantity}</span>
                        </div>
                      ))
                    )}

                    {/* Totals */}
                    <div className="pt-6 border-t border-dashed border-[#b3abad]">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-[#605a5c]">Subtotal</span>
                        <span className="text-[#322d2f] font-medium">₹{subtotal.toFixed(2)}</span>
                      </div>
                      {sweetNote && (
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[#605a5c]">Sweet Note</span>
                          <span className="text-[#322d2f] font-medium">₹{sweetNotePrice.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between items-center mb-6">
                        <span className="text-[#605a5c]">Delivery Fee</span>
                        {deliveryFee === 0
                          ? <span className="text-[#745700] font-bold italic">FREE</span>
                          : <span className="text-[#322d2f] font-medium">₹{deliveryFee.toFixed(2)}</span>
                        }
                      </div>
                      <div className="flex justify-between items-center p-4 bg-[#ff70a0]/20 rounded-2xl">
                        <span className="font-bold text-xl text-[#a8275b]" style={{ fontFamily: "var(--font-jakarta)" }}>Total Amount</span>
                        <span className="font-extrabold text-2xl text-[#a8275b]" style={{ fontFamily: "var(--font-jakarta)" }}>₹{total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Info note */}
                <div className="bg-[#f9cc61]/10 p-6 rounded-2xl border-l-4 border-[#745700] flex items-start gap-4">
                  <span className="material-symbols-outlined text-[#745700] shrink-0">info</span>
                  <p className="text-sm text-[#5b4400] leading-relaxed">
                    Orders are confirmed within 30 minutes of payment verification. You will receive a WhatsApp notification once the baker accepts your order.
                  </p>
                </div>
              </div>

              {/* ── RIGHT: PAYMENT ───────────────────────────────────────────── */}
              <div className="lg:col-span-7 space-y-8">

                {/* Payment instructions */}
                <div className="bg-[#f9eef0] rounded-2xl p-8">
                  <h2 className="text-2xl font-bold text-[#755257] mb-6 flex items-center gap-2" style={{ fontFamily: "var(--font-jakarta)" }}>
                    <span className="material-symbols-outlined text-[#a8275b]">chat</span>
                    How Payment Works
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 bg-white rounded-2xl">
                      <div className="w-10 h-10 bg-[#ff70a0]/20 rounded-full flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[#a8275b]">1</span>
                      </div>
                      <div>
                        <p className="font-bold text-[#322d2f]" style={{ fontFamily: "var(--font-jakarta)" }}>Click Submit Order</p>
                        <p className="text-sm text-[#605a5c]">Submit your order to start the payment process</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-white rounded-2xl">
                      <div className="w-10 h-10 bg-[#ff70a0]/20 rounded-full flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[#a8275b]">2</span>
                      </div>
                      <div>
                        <p className="font-bold text-[#322d2f]" style={{ fontFamily: "var(--font-jakarta)" }}>Chat with Baker on WhatsApp</p>
                        <p className="text-sm text-[#605a5c]">A WhatsApp chat will open with the baker to discuss payment & cake customization</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-4 p-4 bg-white rounded-2xl">
                      <div className="w-10 h-10 bg-[#ff70a0]/20 rounded-full flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[#a8275b]">3</span>
                      </div>
                      <div>
                        <p className="font-bold text-[#322d2f]" style={{ fontFamily: "var(--font-jakarta)" }}>Confirm & Pay</p>
                        <p className="text-sm text-[#605a5c]">The baker will share payment details and you can confirm your cake customization</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit button */}
                <div className="mt-10">
                  <button
                    onClick={handleSubmit}
                    disabled={items.length === 0 || isSubmitting}
                    className="w-full bg-[#a8275b] disabled:opacity-50 disabled:cursor-not-allowed text-white py-5 rounded-full font-extrabold text-xl shadow-[0px_10px_20px_rgba(168,39,91,0.2)] hover:shadow-[0px_15px_30px_rgba(168,39,91,0.3)] transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                    style={{ fontFamily: "var(--font-jakarta)" }}
                  >
                    {isSubmitting ? (
                      <>
                        <span className="inline-block animate-spin">⏳</span>
                        <span>Processing Order...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Order for Verification</span>
                        <span className="material-symbols-outlined">arrow_forward</span>
                      </>
                    )}
                  </button>
                  <p className="text-center text-[#605a5c] text-sm mt-4 italic">
                    By submitting, you agree to our terms of service for custom orders.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
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
    </div>
  );
}
