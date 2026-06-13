"use client";

import { useState } from "react";
import { useCartStore } from "@/lib/store";

interface ProductCustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    price: number;
    image: string;
    category: string;
    heroImage?: string;
  };
}

const CAKE_SIZES = [
  { id: "500g", label: "500g", multiplier: 1 },
  { id: "1kg", label: "1 KG", multiplier: 1.75 },
  { id: "2kg", label: "2 KG", multiplier: 2.5 },
];
const ADDON_OPTIONS = [
  { id: "waffers", name: "Waffers", icon: "🧇" },
  { id: "chocochips", name: "Chocolate Chips", icon: "🍫" },
  { id: "sprinkles", name: "Rainbow Sprinkles", icon: "✨" },
  { id: "gummybears", name: "Gummy Bears", icon: "🧸" },
  { id: "oreos", name: "Oreo Pieces", icon: "🍪" },
  { id: "almonds", name: "Sliced Almonds", icon: "🌰" },
  { id: "coconut", name: "Coconut Flakes", icon: "🥥" },
  { id: "brownies", name: "Brownie Chunks", icon: "🟫" },
];

export function ProductCustomizationModal({ isOpen, onClose, product }: ProductCustomizationModalProps) {
  const addItem = useCartStore((s) => s.addItem);
  const toggleDrawer = useCartStore((s) => s.toggleDrawer);

  const [selectedSize, setSelectedSize] = useState<{ id: string; multiplier: number }>(CAKE_SIZES[0]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

  if (!isOpen) return null;

  const calculatedPrice = Math.round(product.price * selectedSize.multiplier);

  const handleAddonToggle = (addonId: string) => {
    setSelectedAddons((prev) =>
      prev.includes(addonId) ? prev.filter((id) => id !== addonId) : [...prev, addonId]
    );
  };

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: calculatedPrice,
      quantity: 1,
      image: product.image || product.heroImage || "",
      category: product.category,
      cakeSize: selectedSize.id,
      addons: selectedAddons.length > 0 ? selectedAddons : undefined,
    });
    toggleDrawer();
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-[101] px-4">
        <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full overflow-hidden animate-in fade-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#a8275b] to-[#ff70a0] p-8 text-white sticky top-0 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-extrabold" style={{ fontFamily: "var(--font-jakarta)" }}>
                Customize Your Cake
              </h2>
              <p className="text-white/90 text-sm mt-1">{product.name}</p>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/20 transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Content */}
          <div className="p-8 space-y-8">
            {/* Cake Size - Radio Buttons */}
            <div>
              <label className="block text-sm font-bold text-[#755257] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined">bakery_dining</span>
                Select Cake Size
              </label>
              <div className="space-y-3">
                {CAKE_SIZES.map((size) => (
                  <label key={size.id} className="flex items-center gap-3 cursor-pointer p-3 rounded-lg hover:bg-[#f9eef0] transition-colors">
                    <input
                      type="radio"
                      name="cakeSize"
                      checked={selectedSize.id === size.id}
                      onChange={() => setSelectedSize(size)}
                      className="w-5 h-5 accent-[#a8275b]"
                    />
                    <div className="flex-1">
                      <span className="text-base font-semibold text-[#322d2f]">{size.label}</span>
                      <span className="text-xs text-[#605a5c] ml-2">
                        ₹{Math.round(product.price * size.multiplier)}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Add-ons - Checkboxes */}
            <div>
              <label className="block text-sm font-bold text-[#755257] mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined">cake</span>
                Add Special Toppings (Optional)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {ADDON_OPTIONS.map((addon) => (
                  <label
                    key={addon.id}
                    className="flex items-center gap-3 p-4 rounded-xl border-2 border-[#e5dadd] cursor-pointer hover:border-[#a8275b] hover:bg-[#f9eef0] transition-all"
                  >
                    <input
                      type="checkbox"
                      checked={selectedAddons.includes(addon.id)}
                      onChange={() => handleAddonToggle(addon.id)}
                      className="w-5 h-5 accent-[#a8275b] cursor-pointer"
                    />
                    <span className="text-xl">{addon.icon}</span>
                    <span className="text-sm font-semibold text-[#322d2f] flex-1">{addon.name}</span>
                  </label>
                ))}
              </div>
              {selectedAddons.length > 0 && (
                <p className="text-xs text-[#a8275b] mt-3 font-semibold">
                  {selectedAddons.length} topping{selectedAddons.length !== 1 ? "s" : ""} selected
                </p>
              )}
            </div>

            {/* Summary */}
            <div className="bg-[#f9eef0] rounded-2xl p-4 space-y-2">
              <div className="flex justify-between items-center pb-2 border-b border-[#b3abad]/20">
                <span className="text-sm text-[#605a5c]">Cake Size:</span>
                <span className="font-bold text-[#a8275b]">{selectedSize.id}</span>
              </div>
              {selectedAddons.length > 0 && (
                <div className="flex justify-between items-start gap-2 pb-2 border-b border-[#b3abad]/20">
                  <span className="text-sm text-[#605a5c]">Toppings:</span>
                  <div className="flex flex-wrap justify-end gap-2">
                    {selectedAddons.map((addonId) => {
                      const addon = ADDON_OPTIONS.find((a) => a.id === addonId);
                      return (
                        <span key={addonId} className="inline-flex items-center gap-1 bg-[#a8275b]/10 text-[#a8275b] px-2 py-1 rounded-full text-xs font-semibold">
                          {addon?.icon} {addon?.name}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
              <div className="flex justify-between items-center pt-2">
                <span className="text-lg font-bold text-[#a8275b]">Price:</span>
                <span className="text-2xl font-extrabold text-[#a8275b]">₹{calculatedPrice}</span>
              </div>
            </div>

            {/* Buttons */}
            <div className="space-y-3">
              <button
                onClick={handleAddToCart}
                className="w-full bg-[#a8275b] text-white py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 hover:bg-[#98184f] active:scale-95 transition-all shadow-[0px_10px_20px_rgba(168,39,91,0.2)]"
              >
                <span className="material-symbols-outlined">add_shopping_cart</span>
                Add to Box
              </button>
              <button
                onClick={onClose}
                className="w-full bg-[#f9eef0] text-[#a8275b] py-4 rounded-full font-bold text-lg hover:bg-[#f0e6e8] active:scale-95 transition-all"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
