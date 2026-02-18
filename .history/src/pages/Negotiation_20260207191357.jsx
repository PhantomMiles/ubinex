import React, { useState } from "react";
import { useApp } from "../context/AppContext";

export default function Negotiation({ product = {}, onClose }) {
  const { formatPrice } = useApp();
  const [offer, setOffer] = useState("");
  const [notes, setNotes] = useState("");
  const [offers, setOffers] = useState([
    {
      id: 1,
      from: "seller",
      amount: product.pricePerKg || product.pricePerLiter || 0,
      message: "Starting price",
      timestamp: new Date(),
    },
  ]);

  function sendOffer(e) {
    e.preventDefault();
    const amt = Number(offer) || 0;
    if (!amt) return;

    const newOffer = {
      id: Date.now(),
      from: "buyer",
      amount: amt,
      message: notes || "No message",
      timestamp: new Date(),
    };
    setOffers((s) => [newOffer, ...s]);
    setOffer("");
    setNotes("");

    // Simulate seller counter offer
    setTimeout(() => {
      const basePrice = product.pricePerKg || product.pricePerLiter || 0;
      const sellerCounter = Math.max(Math.round(basePrice * 0.95), amt + 50);
      setOffers((s) => [
        {
          id: Date.now() + 1,
          from: "seller",
          amount: sellerCounter,
          message: "Counter offer - let's meet in the middle",
          timestamp: new Date(),
        },
        ...s,
      ]);
    }, 1500);
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end sm:items-center justify-center z-50">
      <div className="bg-white w-full sm:max-w-lg sm:rounded-lg rounded-t-lg shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <div>
            <h3 className="text-lg font-semibold">{product.name}</h3>
            <p className="text-xs text-gray-500">Negotiate with seller</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
          >
            ×
          </button>
        </div>

        <div className="h-80 overflow-y-auto p-4 bg-gray-50">
          <div className="space-y-3">
            {offers.map((o) => (
              <div
                key={o.id}
                className={`p-3 rounded-lg ${
                  o.from === "buyer"
                    ? "bg-green-100 ml-8 text-right"
                    : "bg-blue-100 mr-8"
                }`}
              >
                <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                  <div>{o.from === "buyer" ? "You" : "Seller"}</div>
                  <div className="text-xs">
                    {o.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </div>
                <div className={`font-bold text-lg ${o.from === "buyer" ? "text-green-700" : "text-blue-700"}`}>
                  {formatPrice(o.amount)}
                </div>
                <div className="mt-1 text-sm text-gray-700">{o.message}</div>
              </div>
            ))}
          </div>
        </div>

        <form onSubmit={sendOffer} className="border-t p-4 space-y-3">
          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-2">
              Your Offer
            </label>
            <input
              type="number"
              min="0"
              value={offer}
              onChange={(e) => setOffer(e.target.value)}
              placeholder="Enter your price"
              className="w-full border border-gray-300 rounded-lg py-2 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-2">
              Message (optional)
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add a note to your offer..."
              className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
              rows="3"
            />
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700"
            >
              Send Offer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
