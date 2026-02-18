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

      <main className="max-w-5xl mx-auto p-4">
        <div className="mb-4">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products, farms or categories"
            className="w-full border border-gray-200 rounded-full py-2 px-4 text-sm shadow-sm"
          />
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.slice(0, 24).map((p) => (
            <ProductCard
              key={p.id}
              product={p}
              onView={(prod) => setSelectedProduct(p)}
              onNegotiate={(prod) => {
                setSelectedProduct(p);
                setOpenNegotiation(true);
              }}
            />
          ))}
        </section>

        {selectedProduct && !openNegotiation && (
          <div className="mt-6">
            <ProductDetails product={selectedProduct} onNegotiate={() => setOpenNegotiation(true)} />
          </div>
        )}

        {openNegotiation && selectedProduct && (
          <div className="mt-6">
            <Negotiation
              product={selectedProduct}
              onClose={() => setOpenNegotiation(false)}
            />
          </div>
        )}
      </main>
    </div>
  );
}
