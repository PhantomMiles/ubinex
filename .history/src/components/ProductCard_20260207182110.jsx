import React from "react";

export default function ProductCard({ product }) {
  const price = product.price || product.pricePerKg || product.pricePerLiter || product.pricePerUnit || 0;
  const unit = product.unit || "unit";

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition p-4 flex flex-col">
      <div className="flex items-center justify-center h-40">
        <img src={product.image} alt={product.name} className="max-h-36 object-contain" />
      </div>
      <div className="mt-3 flex-1">
        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.location || product.farm}</p>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <div>
          <div className="text-green-700 font-bold">₦{price}</div>
          <div className="text-xs text-gray-500">per {unit}</div>
        </div>
        <div className="flex flex-col items-end gap-2">
          <a href={`/product/${product.id}`} className="bg-green-600 text-white px-3 py-1 rounded-full text-sm">Details</a>
          <a href={`/negotiation?product=${product.id}`} className="text-sm text-green-700 border border-green-200 px-2 py-1 rounded-full">Negotiate</a>
        </div>
      </div>
    </div>
  );
}
