import React, { useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard from "../components/ProductCard";
import { agroProducts } from "../data/agroProducts";
import ProductDetails from "./ProductDetails";
import Negotiation from "./Negotiation";

export default function Home() {
  const [query, setQuery] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [openNegotiation, setOpenNegotiation] = useState(false);

  const products = agroProducts.filter((p) =>
    `${p.name} ${p.category} ${p.location}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar query={query} setQuery={setQuery} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Section Header */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Fresh Farm Products</h2>
          <p className="text-gray-600 mt-1">From farms across Enugu State</p>
        </div>

        {/* Products Grid */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.length > 0 ? (
            products.slice(0, 24).map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onView={(prod) => setSelectedProduct(p)}
                onNegotiate={() => {
                  setSelectedProduct(p);
                  setOpenNegotiation(true);
                }}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">No products found. Try a different search.</p>
            </div>
          )}
        </section>

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
