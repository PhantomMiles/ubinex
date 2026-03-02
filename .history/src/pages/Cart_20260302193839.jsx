import React from 'react';
import Navbar from '../components/Navbar';

export default function Cart() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f0ffe8' }}>
      <Navbar />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold" style={{ color: '#2d5016' }}>Shopping Cart</h2>
          <p className="mt-2 text-gray-600">Your cart is currently empty.</p>
        </div>
      </main>
    </div>
  );
}