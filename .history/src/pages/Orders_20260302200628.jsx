import { useState } from "react";
import Navbar from "../components/Navbar";
import { useApp } from "../context/useAppContext";

export default function Orders() {
  const [query, setQuery] = useState("");
  const { user, currencies, currency } = useApp();
  const symbol = (currencies && currencies[currency] && currencies[currency].symbol) || '₦';

  // Mock orders data - in a real app, this would come from the backend
  const [orders, setOrders] = useState([
    {
      id: 1,
      productName: "Fresh Tomatoes",
      quantity: 5,
      unit: "kg",
      price: 2500,
      totalPrice: 12500,
      date: "2026-02-28",
      status: "delivered",
      farmerName: "John Farmer",
      farmLocation: "Enugu East"
    },
    {
      id: 2,
      productName: "Organic Spinach",
      quantity: 2,
      unit: "kg",
      price: 3500,
      totalPrice: 7000,
      date: "2026-03-01",
      status: "in-transit",
      farmerName: "Mary's Farm",
      farmLocation: "Nsukka"
    },
    {
      id: 3,
      productName: "Fresh Corn",
      quantity: 10,
      unit: "pieces",
      price: 800,
      totalPrice: 8000,
      date: "2026-03-02",
      status: "pending",
      farmerName: "Green Valley Farm",
      farmLocation: "Agbani"
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case "delivered":
        return "bg-green-100 text-green-800";
      case "in-transit":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "delivered":
        return "fas fa-check-circle";
      case "in-transit":
        return "fas fa-truck";
      case "pending":
        return "fas fa-clock";
      case "cancelled":
        return "fas fa-times-circle";
      default:
        return "fas fa-question-circle";
    }
  };

  const filteredOrders = orders.filter((order) =>
    `${order.productName} ${order.farmerName}`.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f0ffe8' }}>
      <Navbar query={query} setQuery={setQuery} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Section Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold mb-2" style={{ color: '#2d5016' }}>
            <i className="fas fa-receipt mr-3"></i>
            My Orders
          </h1>
          <p style={{ color: '#8B5A3C' }}>Track your purchases and delivery status</p>
        </div>

        {/* Search Bar */}
        <div className="mb-6">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search orders by product or farmer name..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2d5016]"
          />
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {filteredOrders.length > 0 ? (
            filteredOrders.map((order) => (
              <div key={order.id} className="bg-white rounded-lg shadow border border-gray-200 p-6">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                  {/* Product Info */}
                  <div className="md:col-span-4">
                    <h3 className="font-semibold text-gray-900 text-lg">{order.productName}</h3>
                    <p className="text-sm text-gray-600 mt-1">
                      <i className="fas fa-user-tie mr-2" style={{ color: '#8B5A3C' }}></i>
                      {order.farmerName}
                    </p>
                    <p className="text-sm text-gray-600">
                      <i className="fas fa-map-marker-alt mr-2" style={{ color: '#8B5A3C' }}></i>
                      {order.farmLocation}
                    </p>
                  </div>

                  {/* Quantity & Price */}
                  <div className="md:col-span-3">
                    <div className="text-sm text-gray-600 mb-2">
                      Quantity: <span className="font-semibold text-gray-900">{order.quantity} {order.unit}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      Total: <span className="font-semibold text-gray-900">{symbol} {order.totalPrice.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Date & Status */}
                  <div className="md:col-span-3">
                    <div className="text-sm text-gray-600 mb-3">
                      <i className="fas fa-calendar mr-2"></i>
                      {new Date(order.date).toLocaleDateString()}
                    </div>
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(order.status)}`}>
                      <i className={getStatusIcon(order.status)}></i>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1).replace('-', ' ')}
                    </span>
                  </div>

                  {/* Action Buttons */}
                  <div className="md:col-span-2 flex gap-2 justify-between md:justify-end">
                    <button className="px-3 py-2 text-sm rounded-lg transition border border-gray-300 hover:bg-gray-100" style={{ color: '#2d5016' }}>
                      <i className="fas fa-eye mr-2"></i>
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
              <i className="fas fa-inbox text-5xl text-gray-300 mb-4 block"></i>
              <p className="text-gray-500 text-lg">
                {query ? "No orders match your search" : "You haven't placed any orders yet"}
              </p>
              {!query && (
                <button
                  onClick={() => window.location.hash = '#/'}
                  className="mt-4 px-6 py-2 rounded-lg text-white transition"
                  style={{ backgroundColor: '#2d5016' }}
                >
                  <i className="fas fa-shopping-bag mr-2"></i>
                  Start Shopping
                </button>
              )}
            </div>
          )}
        </div>

        {/* Summary Stats */}
        {filteredOrders.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Orders</p>
                  <p className="text-2xl font-bold mt-2" style={{ color: '#2d5016' }}>{orders.length}</p>
                </div>
                <i className="fas fa-shopping-bag text-4xl" style={{ color: '#f0ffe8' }}></i>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Spent</p>
                  <p className="text-2xl font-bold mt-2" style={{ color: '#2d5016' }}>
                    {symbol} {orders.reduce((sum, o) => sum + o.totalPrice, 0).toLocaleString()}
                  </p>
                </div>
                <i className="fas fa-dollar-sign text-4xl" style={{ color: '#f0ffe8' }}></i>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow p-6 border border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Delivered Orders</p>
                  <p className="text-2xl font-bold mt-2" style={{ color: '#2d5016' }}>
                    {orders.filter(o => o.status === 'delivered').length}
                  </p>
                </div>
                <i className="fas fa-check-circle text-4xl" style={{ color: '#f0ffe8' }}></i>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
