import { useState } from "react";

export default function Navbar() {
  const [q, setQ] = useState("");

  return (
    <nav className="w-full py-3 px-5 bg-gradient-to-r from-green-600 to-green-500 shadow text-white flex items-center justify-between sticky top-0 z-40">
      <div className="flex items-center gap-4">
        <div className="text-2xl font-extrabold tracking-tight">AgroLink</div>
        <div className="hidden sm:flex items-center gap-2 bg-white/10 rounded-full px-3 py-1">
          <button className="text-sm px-2 py-1 rounded-full bg-white/20">All</button>
          <button className="text-sm px-2 py-1 rounded-full hover:bg-white/20">Vegetables</button>
          <button className="text-sm px-2 py-1 rounded-full hover:bg-white/20">Fruits</button>
          <button className="text-sm px-2 py-1 rounded-full hover:bg-white/20">Grains</button>
        </div>
      </div>

      <div className="flex-1 px-4">
        <div className="max-w-xl mx-auto">
          <label className="relative block">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products, farms, categories"
              className="w-full rounded-full py-2 px-4 pl-10 text-gray-700 bg-white/90 focus:outline-none"
            />
            <svg className="w-5 h-5 absolute left-3 top-2.5 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35" />
              <circle cx="11" cy="11" r="6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </label>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <button className="hidden sm:inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span className="text-sm">Cart</span>
        </button>
        <button className="bg-white text-green-700 px-3 py-1 rounded-full font-semibold">Sign in</button>
      </div>
    </nav>
  );
}