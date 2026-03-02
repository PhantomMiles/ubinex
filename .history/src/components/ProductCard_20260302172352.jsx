import React from "react";
import { useApp } from "../context/useAppContext";

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
	const { currency, currencies } = useApp();
	const symbol = (currencies && currencies[currency] && currencies[currency].symbol) || '₦';
	const price = formatPrice(product);
	const unit = product.unit || (product.pricePerLiter ? "liter" : "kg");
	const location = product.location || product.farm || "Local Farm";
	const stockLabel = getStockLabel(product);

	return (
		<article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-200" style={{ borderColor: '#2d5016', borderWidth: '1px' }}>
			<div className="relative">
				<div className="h-48 sm:h-40 bg-gray-100 flex items-center justify-center overflow-hidden">
					<img
						src={product.image || "https://via.placeholder.com/600x400?text=Product"}
						alt={product.name}
						className="object-cover h-full w-full"
					/>
				</div>

				<div className="absolute left-3 top-3 bg-white/90 px-2 py-1 rounded-full text-xs font-semibold text-gray-700 shadow-sm">
					{product.rating ? <><i className="fas fa-star" style={{ color: '#FFB800', marginRight: '4px' }}></i>{product.rating}</> : "—"}
				</div>

				<div className="absolute right-3 top-3 text-white px-3 py-1 rounded-full text-sm font-bold shadow-sm" style={{ backgroundColor: '#2d5016' }}>
					<i className="fas fa-tag" style={{ marginRight: '4px' }}></i>{symbol} {price}
				</div>
			</div>

			<div className="p-4">
				<div className="flex items-start justify-between gap-3">
					<div className="flex-1">
						<h3 className="text-sm font-semibold leading-tight truncate">{product.name}</h3>
						<p className="text-xs text-gray-500 mt-1 truncate"><i className="fas fa-tags" style={{ marginRight: '4px', color: '#8B5A3C' }}></i>{product.category} • <i className="fas fa-map-marker-alt" style={{ marginRight: '4px', color: '#8B5A3C' }}></i>{location}</p>
					</div>
					<div className="text-right text-xs text-gray-500">/ {unit}</div>
				</div>

				<p className="mt-3 text-sm text-gray-700 line-clamp-2">{product.description}</p>

				<div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
					<div className="text-xs text-gray-600"><i className="fas fa-box" style={{ marginRight: '4px', color: '#2d5016' }}></i>{stockLabel}</div>

					<div className="flex gap-2 w-full sm:w-1/2">
						<button
							onClick={() => onView && onView(product)}
							className="flex-1 text-white py-2 rounded-full text-sm hover:shadow-md transition flex items-center justify-center"
							style={{ backgroundColor: '#2d5016' }}
						>
							<i className="fas fa-eye" style={{ marginRight: '4px' }}></i>View
						</button>
						<button
							onClick={() => onNegotiate && onNegotiate(product)}
							className="flex-1 text-sm rounded-full hover:bg-gray-50 transition border flex items-center justify-center"
							style={{ borderColor: '#8B5A3C', color: '#8B5A3C' }}
						>
							<i className="fas fa-handshake" style={{ marginRight: '4px' }}></i>Negotiate
						</button>
					</div>
				</div>
			</div>
		</article>
	);
}


