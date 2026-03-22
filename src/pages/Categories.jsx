import { useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { agroProducts, enuguLGAs } from "../data/agroProducts";
import ProductDetails from "./ProductDetails";
import Negotiation from "./Negotiation";

export default function Categories({ query = "", setQuery = () => {}, selectedCategory = "", setSelectedCategory = () => {} }) {
  const [selectedLGA, setSelectedLGA] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openNegotiation, setOpenNegotiation] = useState(false);

  const categories = [
    "Vegetables",
    "Fruits",
    "Grains",
    "Roots",
    "Oils",
    "Spices",
    "Processed"
  ];

  const filteredProducts = agroProducts.filter((p) => {
    const matchesQuery = `${p.name} ${p.category} ${p.location}`.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = !selectedCategory || p.category === selectedCategory;
    const matchesLGA = !selectedLGA || p.location.includes(selectedLGA);
    return matchesQuery && matchesCategory && matchesLGA;
  });

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar 
        query={query} 
        setQuery={setQuery} 
        selectedCategory={selectedCategory} 
        setSelectedCategory={setSelectedCategory} 
      />

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Breadcrumbs / Header */}
        <div className="mb-12">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.4em] mb-3">Markets / Enugu State</p>
          <h1 className="text-5xl font-black text-gray-900 italic tracking-tighter uppercase leading-none">
            Agricultural Categories
          </h1>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-64 space-y-10">
            {/* Category Filter */}
            <div>
              <h3 className="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-6 border-b border-gray-100 pb-2">By Category</h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSelectedCategory("")}
                  className={`w-full text-left px-4 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                    !selectedCategory ? 'bg-primary text-white shadow-lg italic translate-x-1' : 'text-gray-400 hover:bg-gray-50'
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-4 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                      selectedCategory === cat ? 'bg-primary text-white shadow-lg italic translate-x-1' : 'text-gray-400 hover:bg-gray-50'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* LGA Filter */}
            <div>
              <h3 className="text-[10px] font-black text-accent uppercase tracking-[0.3em] mb-6 border-b border-gray-100 pb-2">By Enugu LGA</h3>
              <div className="grid grid-cols-2 lg:grid-cols-1 gap-2">
                <button
                  onClick={() => setSelectedLGA("")}
                  className={`w-full text-left px-4 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                    !selectedLGA ? 'bg-accent text-white shadow-lg italic translate-x-1' : 'text-gray-400 hover:bg-gray-50'
                  }`}
                >
                  All LGAs
                </button>
                {enuguLGAs.map((lga) => (
                  <button
                    key={lga.name}
                    onClick={() => setSelectedLGA(lga.name)}
                    className={`w-full text-left px-4 py-3 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all ${
                      selectedLGA === lga.name ? 'bg-accent text-white shadow-lg italic translate-x-1' : 'text-gray-400 hover:bg-gray-50'
                    }`}
                  >
                    {lga.name}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
               <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">
                  Showing <span className="text-gray-900">{filteredProducts.length}</span> results 
                  {selectedCategory && <span> in <span className="text-primary italic">{selectedCategory}</span></span>}
                  {selectedLGA && <span> from <span className="text-accent italic">{selectedLGA} LGA</span></span>}
               </p>
               <div className="flex items-center gap-4">
                  <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sort By:</span>
                  <select className="text-[10px] font-black uppercase tracking-widest bg-transparent border-none focus:ring-0 cursor-pointer">
                    <option>Latest</option>
                    <option>Price: Low to High</option>
                    <option>Price: High to Low</option>
                  </select>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onView={() => setSelectedProduct(p)}
                  />
                ))
              ) : (
                <div className="col-span-full py-32 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
                   <i className="fas fa-search text-gray-200 text-5xl mb-6"></i>
                   <p className="text-gray-400 font-bold uppercase tracking-[0.2em]">No products found matching your filters</p>
                   <button 
                    onClick={() => { setSelectedCategory(""); setSelectedLGA(""); setQuery(""); }}
                    className="mt-6 text-[10px] font-black uppercase tracking-widest text-primary hover:underline"
                   >
                     Reset Filters
                   </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      {/* Product Details Modal */}
      {selectedProduct && !openNegotiation && (
        <>
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-40 transition-opacity" onClick={() => setSelectedProduct(null)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in zoom-in duration-500">
            <ProductDetails
              product={selectedProduct}
              onNegotiate={() => setOpenNegotiation(true)}
              onClose={() => setSelectedProduct(null)}
            />
          </div>
        </>
      )}

      {/* Negotiation Modal */}
      {openNegotiation && selectedProduct && (
        <>
          <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-40" onClick={() => setOpenNegotiation(false)} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-in zoom-in duration-500">
            <Negotiation
              product={selectedProduct}
              onClose={() => setOpenNegotiation(false)}
            />
          </div>
        </>
      )}
    </div>
  );
}
