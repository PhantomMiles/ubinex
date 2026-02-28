import React, { useEffect, useState } from "react";
import { agroProducts } from "../data/agroProducts";

const STORAGE_KEY = "adminProducts";

export default function AdminAnalytics() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    inStockProducts: 0,
    outOfStockProducts: 0,
    topCategory: "",
    totalValue: 0,
  });

  useEffect(() => {
    const loadStats = () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        const products = raw ? JSON.parse(raw) : agroProducts.slice();

        const inStock = products.filter(p => p.stock || p.stock === undefined).length;
        const outOfStock = products.filter(p => p.stock === false).length;

        // Calculate category frequency
        const categories = {};
        products.forEach(p => {
          categories[p.category] = (categories[p.category] || 0) + 1;
        });
        const topCat = Object.entries(categories).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

        // Calculate total value
        const totalVal = products.reduce((acc, p) => {
          const price = parseFloat(p.price) || 0;
          return acc + price;
        }, 0);

        setStats({
          totalProducts: products.length,
          inStockProducts: inStock,
          outOfStockProducts: outOfStock,
          topCategory: topCat,
          totalValue: totalVal.toFixed(2),
        });
      } catch (e) {
        console.error("Error loading analytics:", e);
      }
    };

    loadStats();
    const interval = setInterval(loadStats, 5000); // Refresh every 5 seconds
    return () => clearInterval(interval);
  }, []);

  const inStockPercent = stats.totalProducts ? ((stats.inStockProducts / stats.totalProducts) * 100).toFixed(1) : 0;
  const outOfStockPercent = stats.totalProducts ? ((stats.outOfStockProducts / stats.totalProducts) * 100).toFixed(1) : 0;

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-semibold">Analytics & Insights</h2>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Products */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Products</p>
              <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <i className="fas fa-boxes text-blue-600 text-xl"></i>
            </div>
          </div>
        </div>

        {/* In Stock */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">In Stock</p>
              <p className="text-2xl font-bold text-green-600">{stats.inStockProducts}</p>
              <p className="text-xs text-gray-400">{inStockPercent}% of total</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <i className="fas fa-check-circle text-green-600 text-xl"></i>
            </div>
          </div>
        </div>

        {/* Out of Stock */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Out of Stock</p>
              <p className="text-2xl font-bold text-red-600">{stats.outOfStockProducts}</p>
              <p className="text-xs text-gray-400">{outOfStockPercent}% of total</p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <i className="fas fa-times-circle text-red-600 text-xl"></i>
            </div>
          </div>
        </div>

        {/* Total Value */}
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Value</p>
              <p className="text-2xl font-bold text-gray-900">₦{stats.totalValue}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <i className="fas fa-money-bill text-purple-600 text-xl"></i>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Stock Distribution */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <i className="fas fa-chart-pie text-green-600"></i>
            Stock Distribution
          </h3>
          <div className="space-y-3">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">In Stock</span>
                <span className="text-sm font-bold">{inStockPercent}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-green-600 h-3 rounded-full"
                  style={{ width: `${inStockPercent}%` }}
                ></div>
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Out of Stock</span>
                <span className="text-sm font-bold">{outOfStockPercent}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-red-600 h-3 rounded-full"
                  style={{ width: `${outOfStockPercent}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Category */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <i className="fas fa-star text-yellow-500"></i>
            Top Category
          </h3>
          <div className="text-center py-6">
            <div className="text-4xl font-bold text-green-600 mb-2">{stats.topCategory}</div>
            <p className="text-gray-600">Most products in inventory</p>
          </div>
        </div>
      </div>

      {/* Recent Activity / Quick Stats */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <i className="fas fa-list text-blue-600"></i>
          Quick Summary
        </h3>
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <span className="flex items-center gap-2">
              <i className="fas fa-check text-green-600"></i>
              Average Stock Status
            </span>
            <span className="font-semibold text-green-600">{inStockPercent}% Healthy</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <span className="flex items-center gap-2">
              <i className="fas fa-warehouse text-blue-600"></i>
              Total Inventory Value
            </span>
            <span className="font-semibold">₦{stats.totalValue}</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
            <span className="flex items-center gap-2">
              <i className="fas fa-chart-bar text-purple-600"></i>
              Products in Most Demand
            </span>
            <span className="font-semibold text-purple-600">{stats.topCategory}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
