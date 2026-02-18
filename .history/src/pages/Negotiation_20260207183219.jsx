import React, { useState } from "react";

export default function Negotiation({ product = {}, onClose }) {
  const [offer, setOffer] = useState("");
  const [notes, setNotes] = useState("");
  const [offers, setOffers] = useState([
    { id: 1, from: "seller", amount: product.price || 0, message: "Starting price" },
  ]);

  function sendOffer(e) {
    e.preventDefault();
    const amt = Number(offer) || 0;
    if (!amt) return;
    const next = { id: Date.now(), from: "buyer", amount: amt, message: notes };
    setOffers((s) => [next, ...s]);
    setOffer("");
    setNotes("");

    // simulate seller counter after a short delay
    setTimeout(() => {
      const sellerCounter = Math.max(Math.round((product.price || amt) * 0.9), amt + 10);
      setOffers((s) => [
        { id: Date.now() + 1, from: "seller", amount: sellerCounter, message: "Counter offer" },
        ...s,
      ]);
    }, 1000 + Math.random() * 1000);
  }

  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Negotiate — {product.name}</h3>
        <div className="flex items-center gap-2">
          <button onClick={onClose} className="text-sm text-gray-500">Close</button>
        </div>
      </div>

      <div className="mt-4">
        <div className="space-y-3 max-h-64 overflow-y-auto p-2">
          {offers.map((o) => (
            <div key={o.id} className={`p-2 rounded-lg ${o.from === "buyer" ? "bg-green-50 self-end" : "bg-gray-100"}`}>
              <div className="flex items-center justify-between text-xs text-gray-600">
                <div>{o.from === "buyer" ? "You" : "Seller"}</div>
                <div className="font-semibold">GHS {o.amount}</div>
              </div>
              {o.message && <div className="mt-1 text-sm text-gray-700">{o.message}</div>}
            </div>
          ))}
        </div>

        <form onSubmit={sendOffer} className="mt-4 grid grid-cols-1 gap-2">
          <div className="flex gap-2">
            <input
              type="number"
              min="0"
              value={offer}
              onChange={(e) => setOffer(e.target.value)}
              placeholder="Your offer (GHS)"
              className="flex-1 border border-gray-200 rounded-full py-2 px-3"
            />
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-full">Propose</button>
          </div>

          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add a note (optional)"
            className="border border-gray-200 rounded-md p-2 text-sm"
          />
        </form>
      </div>
    </div>
  );
}
