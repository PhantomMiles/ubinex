import React from "react";

export default function ProductCard({ product = {}, onView, onNegotiate }) {
	return (
		<article className="bg-white rounded-lg shadow-sm overflow-hidden">
			<div className="h-40 bg-gray-100 flex items-center justify-center">
				<img src={product.image} alt={product.name} className="object-cover h-40 w-full" />
			</div>
			<div className="p-3">
				<h3 className="text-sm font-semibold leading-snug truncate">{product.name}</h3>
				<p className="text-xs text-gray-500 mt-1">{product.farm || "Local Farm"}</p>
				<div className="mt-2 flex items-center justify-between">
					<div>
						<span className="text-green-700 font-bold">GHS {product.price}</span>
						<span className="text-xs text-gray-500"> / {product.unit}</span>
					</div>
					<div className="text-xs text-gray-500">{product.rating} ★</div>
				</div>

				<div className="mt-3 flex gap-2">
					<button
						onClick={() => onView && onView(product)}
						className="flex-1 bg-green-600 text-white py-2 rounded-md text-sm hover:bg-green-700"
					>
						View
					</button>
					<button
						onClick={() => onNegotiate && onNegotiate(product)}
						className="flex-1 bg-white border border-gray-200 text-sm rounded-md hover:bg-gray-50"
					>
						Negotiate
					</button>
				</div>
			</div>
		</article>
	);
}

