import React from "react";
import { useApp } from "../context/AppContext";

function formatPrice(product) {
  if (product.pricePerKg) return `${product.pricePerKg}`;
  if (product.pricePerLiter) return `${product.pricePerLiter}`;
  if (product.pricePerUnit) return `${product.pricePerUnit}`;
  if (product.price) return `${product.price}`;
  return "0";
}

function getStockLabel(product) {
  if (product.stockKg) return `${product.stockKg} kg`;
  if (product.stockLiters) return `${product.stockLiters} L`;
  if (product.stockUnits) return `${product.stockUnits} units`;
  return "0";
}

function isOutOfStock(product) {
  const stock = product.stockKg || product.stockLiters || product.stockUnits || 0;
  return stock === 0;
}

export default function ProductCard({ product = {}, onView, onNegotiate }) {
  const { formatPrice: convertPrice } = useApp();
  const price = formatPrice(product);
  const unit = product.unit || (product.pricePerLiter ? "liter" : "kg");
  const location = product.location || product.farm || "Local Farm";
  const stockLabel = getStockLabel(product);
  const outOfStock = isOutOfStock(product);
  const convertedPrice = convertPrice(Number(price));

  return (
    <article className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all ${outOfStock ? "opacity-60" : ""}`}>
      <div className="h-48 bg-gray-100 flex items-center justify-center overflow-hidden relative">
        <img
          src={product.image || "https://via.placeholder.com/400x300?text=Product"}
          alt={product.name}
          className="object-cover h-full w-full"
        />
        {outOfStock && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <span className="text-white font-bold text-lg">Out of Stock</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-2 mb-2">
          <div className="flex-1">
            <h3 className="text-sm font-semibold leading-tight line-clamp-2">{product.name}</h3>
            <p className="text-xs text-gray-600 mt-1">{product.category} • {location}</p>
          </div>
          {product.rating && <div className="text-xs text-yellow-600 font-medium">{product.rating} ★</div>}
        </div>

        <div className="border-t pt-2 mt-2">
          <div className="text-green-700 font-bold text-lg">{convertedPrice}</div>
          <div className="text-xs text-gray-500">per {unit}</div>
        </div>

        <div className="mt-2 text-xs text-gray-600">
          {outOfStock ? (
            <span className="text-red-600 font-semibold">Out of stock</span>
          ) : (
            <span>{stockLabel} available</span>
          )}
        </div>

        {product.description && (
          <p className="mt-2 text-xs text-gray-700 line-clamp-2">{product.description}</p>
        )}

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            onClick={() => onView && onView(product)}
            disabled={outOfStock}
            className={`w-full ${outOfStock ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"} text-white py-2 rounded-md text-sm font-medium transition-colors`}
          >
            View
          </button>
          <button
            onClick={() => onNegotiate && onNegotiate(product)}
            disabled={outOfStock}
            className={`w-full ${outOfStock ? "bg-gray-200 text-gray-400" : "bg-white border-2 border-green-600 text-green-600 hover:bg-green-50"} py-2 rounded-md text-sm font-medium transition-colors`}
						Negotiate
					</button>
				</div>
			</div>
		</article>
	);
}


