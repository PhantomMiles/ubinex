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
      <Navbar />

      <main className="w-full">
        <div className="w-full px-4 py-6 bg-white border-b">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products, farms, or categories..."
              className="w-full border border-gray-300 rounded-lg py-3 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>
        </div>

        <div className="w-full px-4 py-8">
          <div className="max-w-7xl mx-auto">
            {products.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found. Try a different search.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {products.slice(0, 50).map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onView={(prod) => setSelectedProduct(p)}
https://eslint.org/docs/latest/rules/no-unused-vars                    onNegotiate={(prod) => {
                      setSelectedProduct(p);
                      setOpenNegotiation(true);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {selectedProduct && !openNegotiation && (
          <div className="w-full px-4 py-8 bg-white border-t">
            <div className="max-w-7xl mx-auto">
              <ProductDetails
                product={selectedProduct}
                onNegotiate={() => setOpenNegotiation(true)}
              />
            </div>
          </div>
        )}
      </main>

      {openNegotiation && selectedProduct && (
        <Negotiation
          product={selectedProduct}
          onClose={() => setOpenNegotiation(false)}
        />
      )}
    </div>
  );
}
