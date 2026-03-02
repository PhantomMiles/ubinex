import { useState } from "react";
import Navbar from "../components/Navbar";
import { useApp } from "../context/useAppContext";

export default function Cart() {
  const [query, setQuery] = useState("");
  const { currencies, currency } = useApp();
  const symbol = (currencies && currencies[currency] && currencies[currency].symbol) || '₦';

  // Mock cart items - in a real app, this would come from state management (Redux, Context, etc.)
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      productName: "Fresh Tomatoes",
      quantity: 5,
      unit: "kg",
      pricePerUnit: 2500,
      farmerName: "John Farmer",
      farmLocation: "Enugu East",
      image: "tomatoes.jpg"
    },
    {
      id: 2,
      productName: "Organic Spinach",
      quantity: 2,
      unit: "kg",
      pricePerUnit: 3500,
      farmerName: "Mary's Farm",
      farmLocation: "Nsukka",
      image: "spinach.jpg"
    }
  ]);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) {
      removeItem(id);
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const calculateSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.quantity * item.pricePerUnit), 0);
  };

  const calculateTax = () => {
    return Math.round(calculateSubtotal() * 0.075); // 7.5% tax
  };

  const calculateShipping = () => {
    return cartItems.length > 0 ? 1500 : 0; // Fixed shipping
  };

  const calculateTotal = () => {
    return calculateSubtotal() + calculateTax() + calculateShipping();
  };

  const handleCheckout = () => {
    alert("Proceeding to checkout...\nTotal: " + symbol + " " + calculateTotal().toLocaleString());
    // In a real app, redirect to checkout page
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f0ffe8' }}>
      <Navbar query={query} setQuery={setQuery} />

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Section Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-extrabold mb-2" style={{ color: '#2d5016' }}>
            <i className="fas fa-shopping-cart mr-3"></i>
            Shopping Cart
          </h1>
          <p style={{ color: '#8B5A3C' }}>{cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart</p>
        </div>

        {cartItems.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow border border-gray-200 p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      {/* Product Image Placeholder */}
                      <div className="w-full md:w-32 h-32 bg-gray-200 rounded-lg flex items-center justify-center">
                        <i className="fas fa-image text-gray-400 text-3xl"></i>
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">{item.productName}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          <i className="fas fa-user-tie mr-2" style={{ color: '#8B5A3C' }}></i>
                          {item.farmerName}
                        </p>
                        <p className="text-sm text-gray-600">
                          <i className="fas fa-map-marker-alt mr-2" style={{ color: '#8B5A3C' }}></i>
                          {item.farmLocation}
                        </p>
                        <p className="text-sm font-semibold mt-3" style={{ color: '#2d5016' }}>
                          {symbol} {item.pricePerUnit.toLocaleString()} per {item.unit}
                        </p>
                      </div>

                      {/* Quantity & Price */}
                      <div className="flex flex-col items-end justify-between">
                        <div className="flex items-center gap-2 border border-gray-300 rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition"
                          >
                            <i className="fas fa-minus text-sm"></i>
                          </button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 flex items-center justify-center hover:bg-gray-100 rounded transition"
                          >
                            <i className="fas fa-plus text-sm"></i>
                          </button>
                        </div>

                        <div className="text-right mt-4">
                          <p className="text-sm text-gray-600">Subtotal</p>
                          <p className="text-lg font-bold" style={{ color: '#2d5016' }}>
                            {symbol} {(item.quantity * item.pricePerUnit).toLocaleString()}
                          </p>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="mt-4 text-red-600 hover:text-red-900 text-sm font-medium transition"
                        >
                          <i className="fas fa-trash mr-1"></i>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Continue Shopping Button */}
              <button
                onClick={() => window.location.hash = '#/'}
                className="mt-6 w-full px-6 py-3 rounded-lg text-white transition font-semibold"
                style={{ backgroundColor: '#8B5A3C' }}
              >
                <i className="fas fa-arrow-left mr-2"></i>
                Continue Shopping
              </button>
            </div>

            {/* Order Summary Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow border border-gray-200 p-6 sticky top-24">
                <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

                <div className="space-y-4 border-b border-gray-200 pb-4">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span className="font-semibold">{symbol} {calculateSubtotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax (7.5%)</span>
                    <span className="font-semibold">{symbol} {calculateTax().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span className="font-semibold">{symbol} {calculateShipping().toLocaleString()}</span>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-lg font-bold text-gray-900">Total</span>
                    <span className="text-2xl font-bold" style={{ color: '#2d5016' }}>
                      {symbol} {calculateTotal().toLocaleString()}
                    </span>
                  </div>

                  <button
                    onClick={handleCheckout}
                    className="w-full px-6 py-3 rounded-lg text-white font-semibold transition hover:shadow-lg"
                    style={{ backgroundColor: '#2d5016' }}
                  >
                    <i className="fas fa-credit-card mr-2"></i>
                    Proceed to Checkout
                  </button>
                </div>

                {/* Trust Badges */}
                <div className="mt-6 pt-6 border-t border-gray-200 space-y-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <i className="fas fa-lock text-green-600"></i>
                    Safe and secure payments
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fas fa-truck text-green-600"></i>
                    Fast delivery to your location
                  </div>
                  <div className="flex items-center gap-2">
                    <i className="fas fa-undo text-green-600"></i>
                    Easy returns & refunds
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg border border-gray-200">
            <i className="fas fa-shopping-cart text-6xl text-gray-300 mb-4 block"></i>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Start adding fresh farm products to your cart!</p>
            <button
              onClick={() => window.location.hash = '#/'}
              className="px-8 py-3 rounded-lg text-white font-semibold transition hover:shadow-lg"
              style={{ backgroundColor: '#2d5016' }}
            >
              <i className="fas fa-shopping-bag mr-2"></i>
              Start Shopping
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
