"use client";

import { CartDrawer } from "@/components/cart-drawer";
import { CheckoutModal } from "@/components/checkout-modal";

export function ClientProviders() {
  return (
    <>
      <CartDrawer />
      <CheckoutModal />
    </>
  );
}
