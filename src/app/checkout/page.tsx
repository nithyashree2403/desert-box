"use client";

import { useCartStore } from "@/lib/store";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef } from "react";

const UPI_ID = "dessertbox@upi";

export default function CheckoutPage() {
  const { items, sweetNote, clearCart, toggleDrawer } = useCartStore();
  const router = useRouter();

  const [copied, setCopied] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const cartCount = items.reduce((n, i) => n + i.quantity, 0);
  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const sweetNotePrice = sweetNote ? 3.5 : 0;
  const deliveryFee = subtotal >= 1500 ? 0 : 5;
  const total = subtotal + sweetNotePrice + deliveryFee;

  const handleCopy = () => {
    navigator.clipboard.writeText(UPI_ID);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = () => {
    setSubmitted(true);
    clearCart();
    setTimeout(() => router.push("/"), 3000);
  };

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

              {/* ── RIGHT: PAYMENT + UPLOAD ──────────────────────────────────── */}
              <div className="lg:col-span-7 space-y-8">

                {/* Payment instructions */}
                <div className="bg-[#f9eef0] rounded-2xl p-8">
                  <h2 className="text-2xl font-bold text-[#755257] mb-6 flex items-center gap-2" style={{ fontFamily: "var(--font-jakarta)" }}>
                    <span className="material-symbols-outlined text-[#a8275b]">account_balance_wallet</span>
                    Payment Instructions
                  </h2>

                  <div className="grid md:grid-cols-2 gap-8 items-center">
                    <div className="space-y-4">
                      <p className="text-[#322d2f] leading-relaxed">
                        To finalize your order, please pay{" "}
                        <span className="font-bold text-[#a8275b] text-xl">₹{total.toFixed(2)}</span>{" "}
                        to the following UPI ID:
                      </p>
                      <div className="bg-white p-4 rounded-2xl border-2 border-[#ff70a0] flex items-center justify-between">
                        <span className="font-bold text-[#a8275b] tracking-wider" style={{ fontFamily: "var(--font-jakarta)" }}>
                          {UPI_ID}
                        </span>
                        <button
                          onClick={handleCopy}
                          className="text-[#a8275b] hover:bg-[#ff70a0]/20 p-2 rounded-full transition-colors"
                        >
                          <span className="material-symbols-outlined">
                            {copied ? "check_circle" : "content_copy"}
                          </span>
                        </button>
                      </div>
                      <div className="flex items-center gap-2 text-[#605a5c] text-sm">
                        <span className="material-symbols-outlined text-base">verified_user</span>
                        <span>Verified Business Account</span>
                      </div>
                    </div>

                    {/* QR Code placeholder */}
                    <div className="flex flex-col items-center gap-3">
                      <div className="bg-white p-4 rounded-2xl shadow-lg relative">
                        <div className="w-40 h-40 bg-[#ebe0e2] rounded-xl flex items-center justify-center border-2 border-dashed border-[#b3abad] relative">
                          <span className="material-symbols-outlined text-4xl text-[#7c7577]">qr_code_2</span>
                          {/* Corner brackets */}
                          <div className="absolute -top-2 -left-2 w-4 h-4 border-t-4 border-l-4 border-[#a8275b]" />
                          <div className="absolute -top-2 -right-2 w-4 h-4 border-t-4 border-r-4 border-[#a8275b]" />
                          <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-4 border-l-4 border-[#a8275b]" />
                          <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-4 border-r-4 border-[#a8275b]" />
                        </div>
                      </div>
                      <span className="text-xs font-bold uppercase tracking-widest text-[#605a5c]">Scan to Pay</span>
                    </div>
                  </div>
                </div>

                {/* Upload section */}
                <div className="bg-white rounded-2xl p-8 shadow-[0px_20px_40px_rgba(74,44,49,0.04)]">
                  <h2 className="text-2xl font-bold text-[#755257] mb-6 flex items-center gap-2" style={{ fontFamily: "var(--font-jakarta)" }}>
                    <span className="material-symbols-outlined text-[#a8275b]">cloud_upload</span>
                    Upload Payment Screenshot
                  </h2>

                  <label className="block group cursor-pointer">
                    <div className={`border-4 border-dashed rounded-2xl p-12 text-center transition-all ${file ? "border-[#a8275b] bg-[#ff70a0]/5" : "border-[#ff70a0]/50 group-hover:border-[#a8275b] group-hover:bg-[#ff70a0]/5"}`}>
                      <input
                        ref={fileRef}
                        className="hidden"
                        type="file"
                        accept="image/*"
                        onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                      />
                      <div className="w-16 h-16 bg-[#ff70a0] rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-[#4c0023] text-3xl">cloud</span>
                      </div>
                      {file ? (
                        <>
                          <p className="font-bold text-lg text-[#a8275b] mb-1" style={{ fontFamily: "var(--font-jakarta)" }}>
                            {file.name}
                          </p>
                          <p className="text-sm text-[#605a5c]">
                            {(file.size / 1024 / 1024).toFixed(2)} MB — click to change
                          </p>
                        </>
                      ) : (
                        <>
                          <p className="font-bold text-lg text-[#322d2f] mb-2" style={{ fontFamily: "var(--font-jakarta)" }}>
                            Click to select file
                          </p>
                          <p className="text-sm text-[#605a5c]">Supports images (JPG, PNG) up to 5MB</p>
                        </>
                      )}
                    </div>
                  </label>

                  <div className="mt-10">
                    <button
                      onClick={handleSubmit}
                      disabled={items.length === 0}
                      className="w-full bg-[#a8275b] disabled:opacity-50 text-white py-5 rounded-full font-extrabold text-xl shadow-[0px_10px_20px_rgba(168,39,91,0.2)] hover:shadow-[0px_15px_30px_rgba(168,39,91,0.3)] transition-all active:scale-[0.98] flex items-center justify-center gap-3"
                      style={{ fontFamily: "var(--font-jakarta)" }}
                    >
                      <span>Submit Order for Verification</span>
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </button>
                    <p className="text-center text-[#605a5c] text-sm mt-4 italic">
                      By submitting, you agree to our terms of service for custom orders.
                    </p>
                  </div>
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
