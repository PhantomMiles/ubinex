import { useState } from "react";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const [query, setQuery] = useState("");
  const { country, setCountry, CURRENCIES } = useApp();
  const navigate = useNavigate();

  return (
    <header className="w-full bg-white shadow sticky top-0 z-50">
      <div className="w-full px-4 py-3">
        <div className="flex items-center justify-between gap-4 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-md bg-green-600 flex items-center justify-center text-white font-bold text-lg">AL</div>
            <div>
              <h1 className="text-lg font-semibold">AgroLink</h1>
              <p className="text-xs text-gray-500">Farm Marketplace</p>
            </div>
          </div>

          <div className="flex-1 max-w-2xl">
            <label className="relative block">
              <span className="sr-only">Search products</span>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products, farms, categories..."
                className="w-full border border-gray-300 rounded-full py-2.5 pl-4 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white rounded-full px-3 py-1 text-sm font-medium">
                Search
              </button>
            </label>
          </div>

          <div className="flex items-center gap-3">
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none"
            >
              {Object.entries(CURRENCIES).map(([code, { name }]) => (
                <option key={code} value={code}>{name}</option>
              ))}
            </select>

            <button
              onClick={() => navigate("/admin")}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium"
            >
              Admin
            </button>
            <button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md text-sm font-medium">
              Cart (0)
            </button>
          </div>
        </div>

        <nav className="flex gap-3 overflow-x-auto pb-2">
          {[
            "All",
            "Vegetables",
            "Fruits",
            "Grains",
            "Legumes",
            "Meat",
            "Fish",
          ].map((c) => (
            <button key={c} className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm whitespace-nowrap font-medium">
              {c}
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
}