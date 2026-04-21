"use client";

import { useCartStore } from "@/lib/store";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const { customer, isSignedIn, orders, signOut } = useCartStore();
  const router = useRouter();

  // Redirect if not signed in
  if (!isSignedIn || !customer) {
    return (
      <div className="bg-[#fef4f6] text-[#322d2f] min-h-screen flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-20 h-20 bg-[#f0e6e8] rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-[#a8275b] text-4xl">lock</span>
          </div>
          <h1 className="text-3xl font-bold text-[#a8275b] mb-4" style={{ fontFamily: "var(--font-jakarta)" }}>
            Please Sign In
          </h1>
          <p className="text-[#605a5c] mb-8">
            You need to sign in to view your profile and order history.
          </p>
          <Link 
            href="/checkout"
            className="inline-block bg-[#a8275b] text-white px-8 py-3 rounded-full font-bold hover:bg-[#98184f] transition-all"
            style={{ fontFamily: "var(--font-jakarta)" }}
          >
            Go to Checkout to Sign In
          </Link>
        </div>
      </div>
    );
  }

  const handleSignOut = () => {
    signOut();
    router.push("/");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-700';
      case 'In Progress':
        return 'bg-blue-100 text-blue-700';
      case 'Delivered':
        return 'bg-[#f9cc61]/20 text-[#745700]';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <div className="bg-[#fef4f6] text-[#322d2f] min-h-screen">
      <main className="max-w-4xl mx-auto px-6 py-12 relative">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 -z-10 rounded-full blur-3xl sprinkle-bg" style={{ opacity: 0.1 }} />

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-[#a8275b] mb-2" style={{ fontFamily: "var(--font-jakarta)" }}>
            My Profile
          </h1>
          <p className="text-[#605a5c]">Manage your account and view order history</p>
        </div>

        {/* Customer Details Card */}
        <div className="bg-white rounded-3xl p-8 shadow-[0px_20px_40px_rgba(74,44,49,0.04)] mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-[#755257] flex items-center gap-2" style={{ fontFamily: "var(--font-jakarta)" }}>
              <span className="material-symbols-outlined text-[#a8275b]">account_circle</span>
              Account Details
            </h2>
            <button
              onClick={handleSignOut}
              className="text-[#605a5c] hover:text-[#a8275b] flex items-center gap-2 text-sm transition-colors"
            >
              <span className="material-symbols-outlined">logout</span>
              Sign Out
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="p-4 bg-[#fef4f6] rounded-2xl">
              <p className="text-xs text-[#605a5c] uppercase tracking-wider mb-1">Customer ID</p>
              <p className="font-bold text-[#a8275b] text-lg" style={{ fontFamily: "var(--font-jakarta)" }}>
                {customer.customerId}
              </p>
            </div>
            <div className="p-4 bg-[#fef4f6] rounded-2xl">
              <p className="text-xs text-[#605a5c] uppercase tracking-wider mb-1">Email</p>
              <p className="font-bold text-[#322d2f] text-lg" style={{ fontFamily: "var(--font-jakarta)" }}>
                {customer.email}
              </p>
            </div>
            <div className="p-4 bg-[#fef4f6] rounded-2xl md:col-span-2">
              <p className="text-xs text-[#605a5c] uppercase tracking-wider mb-1">WhatsApp Number</p>
              <p className="font-bold text-[#322d2f] text-lg flex items-center gap-2" style={{ fontFamily: "var(--font-jakarta)" }}>
                {customer.whatsapp}
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">Verified</span>
              </p>
            </div>
          </div>
        </div>

        {/* Order History */}
        <div className="bg-white rounded-3xl p-8 shadow-[0px_20px_40px_rgba(74,44,49,0.04)]">
          <h2 className="text-2xl font-bold text-[#755257] mb-6 flex items-center gap-2" style={{ fontFamily: "var(--font-jakarta)" }}>
            <span className="material-symbols-outlined text-[#a8275b]">receipt_long</span>
            Order History
          </h2>

          {orders.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-[#f0e6e8] rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="material-symbols-outlined text-[#a8275b] text-3xl">shopping_bag</span>
              </div>
              <p className="text-[#605a5c] mb-4">No orders yet</p>
              <Link 
                href="/menu"
                className="inline-block bg-[#a8275b] text-white px-6 py-3 rounded-full font-bold hover:bg-[#98184f] transition-all"
                style={{ fontFamily: "var(--font-jakarta)" }}
              >
                Browse Menu
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <div 
                  key={order.orderId}
                  className="p-6 bg-[#fef4f6] rounded-2xl border border-[#f0e6e8]"
                >
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                    <div>
                      <p className="font-bold text-[#322d2f]" style={{ fontFamily: "var(--font-jakarta)" }}>
                        Order #{order.orderId}
                      </p>
                      <p className="text-sm text-[#605a5c]">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <span className={`px-4 py-2 rounded-full text-sm font-bold ${getStatusColor(order.status)}`}>
                      {order.status}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    {order.items.map((item, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-[#605a5c]">
                          {item.name} x{item.quantity}
                        </span>
                        <span className="font-medium">₹{item.price * item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4 border-t border-[#f0e6e8] flex justify-between items-center">
                    <span className="text-sm text-[#605a5c]">
                      {order.sweetNote && <span className="mr-3">🎀 Sweet Note</span>}
                      🚚 Delivery: ₹{order.deliveryFee}
                    </span>
                    <span className="font-bold text-[#a8275b] text-xl" style={{ fontFamily: "var(--font-jakarta)" }}>
                      ₹{order.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Back to Home */}
        <div className="text-center mt-8">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-[#605a5c] hover:text-[#a8275b] transition-colors"
          >
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}