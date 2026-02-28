export default function Navbar({ query = "", setQuery = () => {} }) {
  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-20">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-md bg-green-600 flex items-center justify-center text-white font-bold">AL</div>
          <div>
            <h1 className="text-lg font-semibold">AgroLink</h1>
            <p className="text-xs text-gray-500">Fresh farm produce marketplace</p>
          </div>
        </div>

        <div className="flex-1 max-w-xl">
          <label className="relative block">
            <span className="sr-only">Search products</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, farms or categories"
              className="w-full border border-gray-200 rounded-full py-2 pl-4 pr-10 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-green-200"
            />
            <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-green-600 hover:bg-green-700 text-white rounded-full px-3 py-1 text-sm">Search</button>
          </label>
        </div>

        <div className="flex items-center gap-3">
          <a href="#/admin" className="px-3 py-2 rounded-md hover:bg-gray-100">Admin</a>
          <button className="px-3 py-2 rounded-md hover:bg-gray-100">Categories</button>
          <button className="px-3 py-2 rounded-md hover:bg-gray-100">Orders</button>
          <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md flex items-center gap-2"> 
            <span>Cart</span>
            <span className="bg-white text-green-700 font-semibold text-xs rounded-full px-2">0</span>
          </button>
        </div>
      </div>
      <nav className="bg-green-50 border-t border-green-100">
        <div className="max-w-5xl mx-auto px-4 py-2 flex gap-3 overflow-x-auto">
          {[
            "All",
            "Vegetables",
            "Fruits",
            "Grains",
            "Dairy",
            "Poultry",
            "Herbs",
          ].map((c) => (
            <button key={c} className="text-sm px-3 py-1.5 bg-white rounded-full shadow-sm whitespace-nowrap">{c}</button>
          ))}
        </div>
      </nav>
    </header>
  );
}