import { useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Hero from "../components/Hero";
import CategoryList from "../components/CategoryList";
import { agroProducts } from "../data/agroProducts";
import ProductDetails from "./ProductDetails";
import Negotiation from "./Negotiation";

export default function Home({ query = "", setQuery = () => {}, selectedCategory = "", setSelectedCategory = () => {} }) {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openNegotiation, setOpenNegotiation] = useState(false);

  const products = agroProducts.filter((p) => {
    const matchesQuery = `${p.name} ${p.category} ${p.location}`.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = !selectedCategory || p.category === selectedCategory;
    return matchesQuery && matchesCategory;
  });

  const featuredProducts = products.slice(0, 6);
  const bestSellers = products.slice(6, 12);

  const handleCategorySelect = (cat) => {
    const category = cat === "All" || cat === "" ? "" : cat;
    setSelectedCategory(category);
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar 
        query={query} 
        setQuery={setQuery} 
        selectedCategory={selectedCategory} 
        setSelectedCategory={handleCategorySelect} 
      />

      <main className="pb-20">
        <Hero />
        
        <CategoryList onSelect={handleCategorySelect} />

        {/* Featured Produce */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <p className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-2 items-center flex gap-2">
                <span className="w-8 h-px bg-primary"></span>
                Freshly Harvested
              </p>
              <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">Featured Produce</h2>
            </div>
            <div className="flex flex-wrap gap-6 border-b border-gray-100 pb-2">
               {["All product", "Organic", "Vegetables", "Fruits", "Roots"].map((tab) => (
                 <button 
                   key={tab} 
                   className={`text-[10px] font-black uppercase tracking-widest transition hover:text-primary ${tab === "All product" ? 'text-primary' : 'text-gray-400'}`}
                 >
                   {tab}
                 </button>
               ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {featuredProducts.length > 0 ? (
              featuredProducts.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onView={() => setSelectedProduct(p)}
                />
              ))
             ) : (
                <div className="col-span-full py-20 text-center">
                   <p className="text-gray-400 font-bold uppercase tracking-widest">No products found for this category</p>
                </div>
             )}
          </div>
        </section>

        {/* Dynamic Banner Section - Enugu Focused */}
        <section className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="relative rounded-xl overflow-hidden shadow-2xl group bg-orange-50/50 border border-orange-100 min-h-[300px]">
            <div className="absolute inset-0 p-12 flex flex-col justify-center max-w-[65%] z-10">
              <span className="text-[10px] font-black text-orange-600 uppercase tracking-[0.4em] mb-4">Limited Edition</span>
              <h3 className="text-3xl font-black text-gray-900 mb-4 uppercase tracking-tighter leading-none">Nsukka Yellow Pepper Basket</h3>
              <p className="text-xs text-gray-600 mb-8 font-bold uppercase tracking-widest leading-relaxed">Direct from the farms of Obukpa. Aromatic, spicy, and purely organic.</p>
              <button className="text-[10px] font-black uppercase tracking-[0.3em] text-white bg-[#0a0a0a] px-8 py-4 rounded-lg w-fit transition hover:bg-primary shadow-xl">Shop Now</button>
            </div>
            <img src="https://i.pinimg.com/1200x/85/5e/74/855e74af0d4b469be60828d41e886b34.jpg" className="absolute top-0 right-0 h-full w-2/5 object-cover grayscale-[0.2] group-hover:grayscale-0 transition duration-700" alt="Nsukka Pepper" />
          </div>

          <div className="relative rounded-xl overflow-hidden shadow-2xl group bg-[#0a0a0a] min-h-[300px]">
             <div className="absolute inset-0 p-12 flex flex-col justify-center max-w-[65%] text-white z-10">
              <span className="text-[10px] font-black text-primary uppercase tracking-[0.4em] mb-4">Premium Quality</span>
              <h3 className="text-3xl font-black mb-4 uppercase tracking-tighter leading-none">Achi & Inyi Large White Yams</h3>
              <p className="text-xs text-white/50 mb-8 font-bold uppercase tracking-widest leading-relaxed">The king of crops, harvested with care from Oji River LGA. Premium grade tubers.</p>
              <button className="text-[10px] font-black uppercase tracking-[0.3em] text-[#0a0a0a] bg-white px-8 py-4 rounded-lg w-fit transition hover:bg-primary hover:text-white shadow-xl">Explore Markets</button>
            </div>
            <img src="https://i.pinimg.com/1200x/49/4e/8e/494e8eb058f63e67fab6ef6662edf16e.jpg" className="absolute top-0 right-0 h-full w-2/5 object-cover opacity-60 group-hover:opacity-100 transition duration-700" alt="Large White Yams" />
          </div>
        </section>

        {/* Best Seller */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <p className="text-[10px] font-black text-accent uppercase tracking-[0.4em] mb-2 items-center flex gap-2">
                <span className="w-8 h-px bg-accent"></span>
                Top Choices
              </p>
              <h2 className="text-4xl font-black text-gray-900 tracking-tighter uppercase">Market Best Sellers</h2>
            </div>
            <div className="flex flex-wrap gap-6 border-b border-gray-100 pb-2">
               {["All product", "Oils", "Grains", "Spices"].map((tab) => (
                 <button 
                   key={tab} 
                   className={`text-[10px] font-black uppercase tracking-widest transition hover:text-accent ${tab === "All product" ? 'text-accent' : 'text-gray-400'}`}
                 >
                   {tab}
                 </button>
               ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-8">
            {bestSellers.length > 0 ? (
              bestSellers.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onView={() => setSelectedProduct(p)}
                />
              ))
            ) : (
                <div className="col-span-full py-20 text-center">
                   <p className="text-gray-400 font-bold uppercase tracking-widest">No products found for this category</p>
                </div>
             )}
          </div>
        </section>
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
