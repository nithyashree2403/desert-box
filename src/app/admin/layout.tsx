export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-[var(--color-brand-surface)] overflow-hidden">
      {/* Sidebar */}
      <div className="w-72 bg-[var(--color-brand-surface)] border-r border-pink-100 flex flex-col pt-8 pb-4 shrink-0 shadow-[2px_0_15px_-5px_var(--color-brand-surface)] z-10">
        
        {/* Profile */}
        <div className="px-8 flex items-center gap-4 mb-12">
          <div className="w-12 h-12 bg-pink-200 rounded-full flex items-center justify-center font-bold text-[var(--color-brand-primary)] shadow-inner">
            B
          </div>
          <div>
            <h2 className="font-sans font-bold text-gray-900 leading-tight">The Baker's Dashboard</h2>
            <p className="text-xs font-semibold text-[var(--color-brand-primary)] tracking-wide">Admin Access</p>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-2 font-sans font-semibold text-gray-600">
          <a href="#" className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-pink-50 transition">
            <span className="text-gray-400">📊</span> Dashboard
          </a>
          <a href="/admin" className="flex items-center gap-4 px-4 py-3 rounded-xl bg-pink-200/50 text-[var(--color-brand-primary)] shadow-sm">
            <span className="text-[var(--color-brand-primary)]">🛍️</span> Orders
          </a>
          <a href="#" className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-pink-50 transition">
            <span className="text-gray-400">📦</span> Inventory
          </a>
          <a href="#" className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-pink-50 transition">
            <span className="text-gray-400">👥</span> Customers
          </a>
          <a href="#" className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-pink-50 transition">
            <span className="text-gray-400">⚙️</span> Settings
          </a>
        </nav>

        {/* Status */}
        <div className="px-8 mt-auto">
          <div className="bg-pink-100 rounded-2xl p-4 flex items-center gap-3">
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div className="text-sm">
              <p className="text-[10px] font-bold text-[var(--color-brand-primary)] uppercase tracking-wider mb-0.5">Kitchen Status</p>
              <p className="font-bold text-gray-900">Accepting Orders</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="flex-1 overflow-auto bg-[var(--color-brand-surface)] p-12">
        {children}
      </div>
    </div>
  );
}
