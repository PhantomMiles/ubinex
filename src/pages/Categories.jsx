import { useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { agroProducts } from "../data/agroProducts";
import ProductDetails from "./ProductDetails";
import Negotiation from "./Negotiation";

export default function Categories() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openNegotiation, setOpenNegotiation] = useState(false);

  const categories = [
    "Vegetables",
    "Fruits",
    "Grains",
    "Dairy",
    "Poultry",
    "Herbs",
  ];

  const filteredProducts = agroProducts.filter((p) => {
    const matchesQuery = `${p.name} ${p.category} ${p.location}`.toLowerCase().includes(query.toLowerCase());
    const matchesCategory = !selectedCategory || p.category === selectedCategory;
    return matchesQuery && matchesCategory;
  });

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f0ffe8' }}>
      <Navbar query={query} setQuery={setQuery} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Section Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold mb-2" style={{ color: '#2d5016' }}>
            <i className="fas fa-th-large mr-3"></i>
            Browse Categories
          </h1>
          <p style={{ color: '#8B5A3C' }}>Explore fresh products by category</p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`p-6 rounded-lg border-2 transition-all text-center font-semibold ${
                selectedCategory === cat
                  ? "border-green-600"
                  : "border-gray-200 hover:border-green-400"
              }`}
              style={
                selectedCategory === cat
                  ? { backgroundColor: "#f0ffe8", borderColor: "#2d5016", color: "#2d5016" }
                  : { color: "#666" }
              }
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Products Grid for Selected Category */}
        {selectedCategory && (
          <>
            <div className="mb-6 p-4 bg-white rounded-lg border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900">
                <i className="fas fa-box-open mr-2"></i>
                {selectedCategory} Products ({filteredProducts.length})
              </h2>
            </div>

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.length > 0 ? (
                filteredProducts.slice(0, 24).map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onView={() => setSelectedProduct(p)}
                    onNegotiate={() => {
                      setSelectedProduct(p);
                      setOpenNegotiation(true);
                    }}
                  />
                ))
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-gray-500 text-lg">No products found in this category.</p>
                </div>
              )}
            </section>
          </>
        )}

        {/* Product Details Modal */}
        {selectedProduct && !openNegotiation && (
          <>
            <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setSelectedProduct(null)} />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
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
            <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setOpenNegotiation(false)} />
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <Negotiation
                product={selectedProduct}
                onClose={() => setOpenNegotiation(false)}
              />
            </div>
          </>
        )}
      </main>
    </div>
  );
}
