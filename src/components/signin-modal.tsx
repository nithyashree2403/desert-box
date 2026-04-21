"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/store";

interface SignInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function SignInModal({ isOpen, onClose, onSuccess }: SignInModalProps) {
  const { setCustomer, customer } = useCartStore();
  const [email, setEmail] = useState(customer?.email || "");
  const [whatsapp, setWhatsapp] = useState(customer?.whatsapp || "");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Validate inputs
    if (!email.trim()) {
      setError("Please enter your email address");
      setIsLoading(false);
      return;
    }

    if (!whatsapp.trim()) {
      setError("Please enter your WhatsApp number");
      setIsLoading(false);
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    // Basic WhatsApp validation (should be 10+ digits)
    const whatsappClean = whatsapp.replace(/\D/g, "");
    if (whatsappClean.length < 10) {
      setError("Please enter a valid WhatsApp number (at least 10 digits)");
      setIsLoading(false);
      return;
    }

    // Format WhatsApp number with country code
    const formattedWhatsapp = whatsappClean.startsWith("91") 
      ? "+" + whatsappClean 
      : "+91" + whatsappClean;

    // Set customer info in store
    setCustomer({
      email: email.trim().toLowerCase(),
      whatsapp: formattedWhatsapp,
      customerId: "",
    });

    setIsLoading(false);
    onSuccess();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-[#755257]/50 backdrop-blur-sm z-50"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div 
          className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="bg-[#a8275b] p-6 text-center">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-white text-4xl">account_circle</span>
            </div>
            <h2 className="text-2xl font-bold text-white" style={{ fontFamily: "var(--font-jakarta)" }}>
              Welcome Back!
            </h2>
            <p className="text-white/80 text-sm mt-1">
              Sign in to complete your order
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                {error}
              </div>
            )}

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[#322d2f]" style={{ fontFamily: "var(--font-jakarta)" }}>
                Email Address
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#755257]">
                  email
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-12 pr-4 py-4 bg-[#fef4f6] border-2 border-[#f0e6e8] rounded-xl focus:border-[#a8275b] focus:outline-none transition-colors text-[#322d2f]"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-semibold text-[#322d2f]" style={{ fontFamily: "var(--font-jakarta)" }}>
                WhatsApp Number
              </label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#755257]">
                  chat
                </span>
                <input
                  type="tel"
                  value={whatsapp}
                  onChange={(e) => setWhatsapp(e.target.value)}
                  placeholder="9876543210"
                  className="w-full pl-12 pr-4 py-4 bg-[#fef4f6] border-2 border-[#f0e6e8] rounded-xl focus:border-[#a8275b] focus:outline-none transition-colors text-[#322d2f]"
                  style={{ fontFamily: "var(--font-jakarta)" }}
                />
              </div>
              <p className="text-xs text-[#605a5c]">
                We&apos;ll send order updates via WhatsApp
              </p>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#a8275b] disabled:opacity-50 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-[#98184f] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              style={{ fontFamily: "var(--font-jakarta)" }}
            >
              {isLoading ? (
                <>
                  <span className="animate-spin material-symbols-outlined">sync</span>
                  Signing in...
                </>
              ) : (
                <>
                  <span>Continue to Checkout</span>
                  <span className="material-symbols-outlined">arrow_forward</span>
                </>
              )}
            </button>

            <p className="text-center text-xs text-[#605a5c]">
              By signing in, you agree to receive order updates on WhatsApp
            </p>
          </form>
        </div>
      </div>
    </>
  );
}