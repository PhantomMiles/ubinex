
import React from "react";
import { useApp } from "../context/useAppContext";

export default function ProductDetails({ product = {}, onNegotiate, onClose }) {
	const { currency, currencies } = useApp();

	if (!product) return null;
	const symbol = (currencies && currencies[currency] && currencies[currency].symbol) || '₦';
	const price = product.price || product.pricePerKg || product.pricePerLiter || 0;
	const stockLabel = [];
	if (product.stockKg) stockLabel.push(`${product.stockKg} kg`);
	if (product.stockLiters) stockLabel.push(`${product.stockLiters} L`);
	if (product.stockUnits) stockLabel.push(`${product.stockUnits} units`);

	return (
		<div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
			{/* Close Button */}
			<div className="sticky top-0 bg-white border-b border-gray-200 flex justify-between items-center p-4 rounded-t-2xl">
			<h2 className="text-xl font-bold" style={{ color: '#2d5016' }}><i className="fas fa-package" style={{ marginRight: '8px' }}></i>{product.name}</h2>
			<button
				onClick={onClose}
				className="text-gray-500 hover:text-gray-700 text-xl"
			>
				<i className="fas fa-times"></i>

			<div className="p-6">
				{/* Image */}
				<div className="bg-gray-100 rounded-xl flex items-center justify-center h-64 mb-6 overflow-hidden">
					<img src={product.image} alt={product.name} className="object-cover w-full h-full" />
				</div>

				{/* Location & Rating */}
				<div className="flex justify-between items-start mb-3">
					<div>
					<p className="text-sm text-gray-600"><i className="fas fa-map-marker-alt" style={{ marginRight: '6px', color: '#8B5A3C' }}></i>{product.location || "Local Farm"}</p>
					<p className="text-sm text-gray-600 mt-1"><i className="fas fa-tags" style={{ marginRight: '6px', color: '#8B5A3C' }}></i>{product.category}</p>
				</div>
				{product.rating && (
					<div className="bg-yellow-50 px-3 py-1 rounded-full">
						<p className="font-semibold text-amber-600"><i className="fas fa-star" style={{ marginRight: '4px' }}></i>{product.rating}</p>

				{/* Price & Stock */}
			<div className="rounded-xl p-4 mb-6" style={{ backgroundColor: '#f0ffe8', border: '1px solid #2d5016' }}>
				<div className="flex justify-between items-baseline">
					<div>
						<p className="text-sm text-gray-600 mb-1"><i className="fas fa-dollar-sign"></i> Price</p>
						<p className="text-3xl font-bold" style={{ color: '#2d5016' }}>{symbol} {price}</p>
						<p className="text-sm text-gray-600 mt-1">per {product.unit || "kg"}</p>
					</div>
					{stockLabel.length > 0 && (
						<div className="text-right">
							<p className="text-sm text-gray-600 mb-1"><i className="fas fa-box"></i> Available</p>
							<p className="font-semibold" style={{ color: '#2d5016' }}>{stockLabel.join(" & ")}</p>
						)}
					</div>
				</div>

				{/* Description */}
				<div className="mb-6">
					<h3 className="text-sm font-semibold text-gray-900 mb-2">About</h3>
					<p className="text-sm text-gray-700 leading-relaxed">{product.description}</p>
				</div>

				{/* Action Buttons */}
				<div className="flex gap-3">
					<button
						onClick={() => onNegotiate && onNegotiate()}
						className="flex-1 bg-green-600 text-white font-semibold py-3 rounded-full hover:bg-green-700 transition-colors shadow-md"
					>
						Negotiate Price
					</button>
					<button className="flex-1 bg-white border-2 border-gray-200 text-gray-900 font-semibold py-3 rounded-full hover:bg-gray-50 transition-colors">
						Add to Cart
					</button>
				</div>
			</div>
		</div>
	);
}

