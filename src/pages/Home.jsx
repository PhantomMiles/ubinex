import { useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import Hero from "../components/Hero";
import CategoryList from "../components/CategoryList";
import { agroProducts } from "../data/agroProducts";
import ProductDetails from "./ProductDetails";
import Negotiation from "./Negotiation";
import { useApp } from "../context/useAppContext";

export default function Home({ query = "", setQuery = () => {}, selectedCategory = "", setSelectedCategory = () => {} }) {
  const { t } = useApp();
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openNegotiation, setOpenNegotiation] = useState(false);
  const [featuredTab, setFeaturedTab] = useState("All product");
  const [bestSellerTab, setBestSellerTab] = useState("All product");

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

  const featuredTabs = [
    { label: t("all_product"), value: "All product" },
    { label: t("organic"), value: "Organic" },
    { label: t("vegetables"), value: "Vegetables" },
    { label: t("fruits"), value: "Fruits" },
    { label: t("roots"), value: "Roots" },
  ];

  const bestSellerTabs = [
    { label: t("all_product"), value: "All product" },
    { label: t("palm_oil"), value: "Oils" },
    { label: t("grains"), value: "Grains" },
    { label: t("spices"), value: "Spices" },
  ];

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
              <p className="text-[10px] font-black text-primary uppercase mb-2 items-center flex gap-2 tracking-widest">
                <span className="w-8 h-px bg-primary"></span>
                {t("freshly_harvested")}
              </p>
              <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tight">{t("featured_produce")}</h2>
            </div>
            <div className="flex flex-wrap gap-6 border-b border-gray-100 pb-2">
               {featuredTabs.map((tab) => (
                 <button 
                   key={tab.value}
                   onClick={() => setFeaturedTab(tab.value)}
                   className={`text-[10px] font-black uppercase transition hover:text-primary ${tab.value === featuredTab ? 'text-primary border-b-2 border-primary pb-1' : 'text-gray-400'}`}
                 >
                   {tab.label}
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
              <span className="text-[10px] font-black text-orange-600 uppercase mb-4 tracking-widest">{t("limited_edition")}</span>
              <h3 className="text-3xl font-black text-gray-900 mb-4 uppercase leading-none">{t("nsukka_pepper")} Basket</h3>
              <p className="text-xs text-gray-600 mb-8 font-bold uppercase leading-relaxed">{t("authentic_aroma")}. Direct from local farms.</p>
              <button className="text-[10px] font-black uppercase text-white bg-[#0a0a0a] px-8 py-4 rounded-lg w-fit transition hover:bg-primary shadow-xl">
                {t("shop_now")}
              </button>
            </div>
            <img src="https://i.pinimg.com/1200x/31/4b/2d/314b2d6fe2d8c4241af1a3592dac521f.jpg" className="absolute top-0 right-0 h-full w-2/5 object-cover grayscale-[0.2] group-hover:grayscale-0 transition duration-700" alt="Nsukka Pepper" />
          </div>

          <div className="relative rounded-xl overflow-hidden shadow-2xl group bg-[#0a0a0a] min-h-[300px]">
             <div className="absolute inset-0 p-12 flex flex-col justify-center max-w-[65%] text-white z-10">
              <span className="text-[10px] font-black text-primary uppercase mb-4 tracking-widest">{t("premium_quality")}</span>
              <h3 className="text-3xl font-black mb-4 uppercase leading-none">Achi & Inyi Large White Yams</h3>
              <p className="text-xs text-white/50 mb-8 font-bold uppercase leading-relaxed">The king of crops, harvested with care from Oji River LGA.</p>
              <button className="text-[10px] font-black uppercase text-[#0a0a0a] bg-white px-8 py-4 rounded-lg w-fit transition hover:bg-primary hover:text-white shadow-xl">
                {t("search_market")}
              </button>
            </div>
            <img src="https://i.pinimg.com/1200x/49/4e/8e/494e8eb058f63e67fab6ef6662edf16e.jpg" className="absolute top-0 right-0 h-full w-2/5 object-cover opacity-60 group-hover:opacity-100 transition duration-700" alt="Large White Yams" />
          </div>
        </section>

        {/* Best Seller */}
        <section className="max-w-7xl mx-auto px-6 py-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <p className="text-[10px] font-black text-accent uppercase mb-2 items-center flex gap-2 tracking-widest">
                <span className="w-8 h-px bg-accent"></span>
                {t("top_choices")}
              </p>
              <h2 className="text-4xl font-black text-gray-900 uppercase tracking-tight">{t("market_best_sellers")}</h2>
            </div>
            <div className="flex flex-wrap gap-6 border-b border-gray-100 pb-2">
               {bestSellerTabs.map((tab) => (
                 <button 
                   key={tab.value}
                   onClick={() => setBestSellerTab(tab.value)}
                   className={`text-[10px] font-black uppercase transition hover:text-accent ${tab.value === bestSellerTab ? 'text-accent border-b-2 border-accent pb-1' : 'text-gray-400'}`}
                 >
                   {tab.label}
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