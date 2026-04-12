"use client";

import { useState } from "react";

export default function AdminPage() {
  const [orders, setOrders] = useState([
    { id: "12045", name: "Alice Smith", amount: 45.00, initials: "AS", color: "bg-yellow-400 text-yellow-900" },
    { id: "12046", name: "Bob Jones", amount: 32.50, initials: "BJ", color: "bg-pink-300 text-pink-900" },
    { id: "12047", name: "Charlie Brown", amount: 110.00, initials: "CB", color: "bg-[var(--color-brand-primary)] text-white" },
  ]);

  const handleConfirm = (id: string) => {
    setOrders(orders.filter(order => order.id !== id));
  };

  return (
    <div className="max-w-6xl">
      
      <div className="flex justify-between items-end mb-10">
        <div>
          <h1 className="font-serif text-5xl font-bold text-[var(--color-brand-primary)] mb-4 tracking-tight">
            Pending Order Verification
          </h1>
          <p className="text-gray-600 font-medium text-lg max-w-2xl">
            Review and confirm incoming payment screenshots to process the day's bake. Each confirmation moves a cake to the oven queue.
          </p>
        </div>
        
        <div className="bg-white rounded-[2rem] w-32 h-32 flex flex-col items-center justify-center shadow-sm border border-pink-50 shadow-pink-100/50 shrink-0">
          <span className="font-serif text-4xl font-bold text-[var(--color-brand-primary)] leading-none mb-1">{orders.length + 9}</span>
          <span className="text-xs font-bold text-gray-500 tracking-widest uppercase">TO VERIFY</span>
        </div>
      </div>

      <div className="bg-white rounded-[2rem] shadow-sm border border-pink-50 overflow-hidden">
        {/* Table Header */}
        <div className="flex bg-[#f9f5f0] border-b border-[#f0ece1] px-8 py-5">
          <div className="w-1/6 font-bold text-xs text-gray-500 uppercase tracking-widest">ORDER #</div>
          <div className="w-2/6 font-bold text-xs text-gray-500 uppercase tracking-widest">CUSTOMER NAME</div>
          <div className="w-1/6 font-bold text-xs text-gray-500 uppercase tracking-widest">AMOUNT</div>
          <div className="w-1/6 font-bold text-xs text-gray-500 uppercase tracking-widest">PAYMENT PROOF</div>
          <div className="w-1/6 font-bold text-xs text-gray-500 uppercase tracking-widest text-right">ACTIONS</div>
        </div>
        
        {/* Table Body */}
        <div className="divide-y divide-pink-50">
          {orders.map((order) => (
            <div key={order.id} className="flex items-center px-8 py-6 hover:bg-pink-50/50 transition-colors">
              <div className="w-1/6 font-bold text-[var(--color-brand-primary)] text-lg">
                #{order.id}
              </div>
              <div className="w-2/6 flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${order.color}`}>
                  {order.initials}
                </div>
                <span className="font-bold text-gray-900">{order.name}</span>
              </div>
              <div className="w-1/6 font-bold text-gray-700">
                ${order.amount.toFixed(2)}
              </div>
              <div className="w-1/6">
                <div className="w-14 h-14 bg-gray-100 rounded-lg shadow-sm border border-gray-200 flex items-center justify-center text-xs text-gray-400 overflow-hidden relative cursor-pointer hover:scale-105 transition">
                  <div className="absolute inset-0 bg-pink-100/50 flex"></div>
                  <span className="relative z-10 text-[10px]">Image</span>
                </div>
              </div>
              <div className="w-1/6 flex justify-end gap-3">
                <button 
                  onClick={() => handleConfirm(order.id)}
                  className="px-5 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-full font-bold text-sm transition shadow-sm flex items-center gap-2"
                >
                  <span className="w-4 h-4 rounded-full bg-white/20 flex items-center justify-center text-[10px]">✓</span>
                  Confirm
                </button>
                <button className="px-5 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full font-bold text-sm transition flex items-center gap-2">
                  <span className="text-xs">💬</span> Message
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* Table Footer */}
        <div className="bg-[#fcfaf8] border-t border-pink-50 px-8 py-5 flex justify-between items-center">
          <span className="text-sm font-medium text-gray-500">
            Showing <strong className="text-[var(--color-brand-primary)]">{orders.length}</strong> of 12 orders
          </span>
          <div className="flex gap-2">
            <button className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50">{"<"}</button>
            <button className="w-8 h-8 rounded-full bg-[var(--color-brand-primary)] shadow-sm flex items-center justify-center text-white font-bold">1</button>
            <button className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-700 font-bold hover:bg-gray-50">2</button>
            <button className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50">{">"}</button>
          </div>
        </div>
      </div>
      
    </div>
  );
}
