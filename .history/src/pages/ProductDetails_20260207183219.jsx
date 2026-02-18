
import React from "react";

export default function ProductDetails({ product = {}, onNegotiate }) {
	if (!product) return null;

	const price = product.price || product.pricePerKg || product.pricePerLiter || 0;

	return (
		<div className="bg-white rounded-lg shadow p-4">
			<div className="flex flex-col md:flex-row gap-4">
				<div className="md:w-1/3 bg-gray-100 flex items-center justify-center">
					<img src={product.image} alt={product.name} className="object-contain h-48" />
				</div>

				<div className="md:flex-1">
					<h2 className="text-xl font-semibold">{product.name}</h2>
					<p className="text-sm text-gray-500 mt-1">From: {product.location || product.farm}</p>
					<div className="mt-3">
						<span className="text-2xl font-bold text-green-700">GHS {price}</span>
						<span className="text-sm text-gray-500"> / {product.unit || "kg"}</span>
					</div>

					<p className="mt-4 text-sm text-gray-700">{product.description}</p>

					<div className="mt-6 flex gap-3">
						<button
							onClick={() => onNegotiate && onNegotiate(product)}
							className="bg-green-600 text-white px-4 py-2 rounded-md"
						>
							Negotiate Price
						</button>
						<button className="bg-white border border-gray-200 px-4 py-2 rounded-md">Add to Cart</button>
					</div>
				</div>
			</div>
		</div>
	);
}

