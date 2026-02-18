import React from "react";

function formatPrice(product) {
	if (product.pricePerKg) return `${product.pricePerKg}`;
	if (product.pricePerLiter) return `${product.pricePerLiter}`;
	if (product.pricePerUnit) return `${product.pricePerUnit}`;
	if (product.price) return `${product.price}`;
	return "0";
}

function getStockLabel(product) {
	if (product.stockKg) return `${product.stockKg} kg available`;
	if (product.stockLiters) return `${product.stockLiters} L available`;
	if (product.stockUnits) return `${product.stockUnits} units available`;
	return "Stock unknown";
}

export default function ProductCard({ product = {}, onView, onNegotiate }) {
	const price = formatPrice(product);
	const unit = product.unit || (product.pricePerLiter ? "liter" : "kg");
	const location = product.location || product.farm || "Local Farm";
	const stockLabel = getStockLabel(product);

	return (
		<article className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
			<div className="h-44 bg-gray-100 flex items-center justify-center overflow-hidden">
				<img
					src={product.image || "https://via.placeholder.com/400x300?text=Product"}
					alt={product.name}
					className="object-cover h-full w-full"
				/>
			</div>

			<div className="p-3">
				<div className="flex items-start justify-between gap-3">
					<div className="flex-1">
						<h3 className="text-sm font-semibold leading-tight truncate">{product.name}</h3>
						<p className="text-xs text-gray-500 mt-1 truncate">{product.category} • {location}</p>
					</div>
					<div className="text-right">
						<div className="text-green-700 font-bold">GHS {price}</div>
						<div className="text-xs text-gray-500">/ {unit}</div>
					</div>
				</div>

				<div className="mt-2 flex items-center justify-between text-xs text-gray-600">
					<div>{stockLabel}</div>
					<div>{product.rating ? `${product.rating} ★` : "—"}</div>
				</div>

				<p className="mt-2 text-sm text-gray-700 line-clamp-2">{product.description}</p>

				<div className="mt-3 grid grid-cols-2 gap-2">
					<button
						onClick={() => onView && onView(product)}
						className="w-full bg-green-600 text-white py-2 rounded-md text-sm hover:bg-green-700"
					>
						View
					</button>
					<button
						onClick={() => onNegotiate && onNegotiate(product)}
						className="w-full bg-white border border-gray-200 text-sm rounded-md hover:bg-gray-50"
					>
						Negotiate
					</button>
				</div>
			</div>
		</article>
	);
}


