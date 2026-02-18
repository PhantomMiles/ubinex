import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { agroProducts } from "../data/agroProducts";
import { useApp } from "../context/AppContext";

export default function Admin() {
  const navigate = useNavigate();
  const { negotiationOffers } = useApp();
  const [tab, setTab] = useState("products");
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const [products, setProducts] = useState(agroProducts);

  function handleEdit(product) {
    setFormData(product);
    setEditingId(product.id);
    setShowForm(true);
  }

  function handleSave(e) {
    e.preventDefault();
    if (editingId) {
      setProducts((ps) =>
        ps.map((p) => (p.id === editingId ? formData : p))
      );
    } else {
      setProducts((ps) => [...ps, { ...formData, id: Date.now() }]);
    }
    setShowForm(false);
    setFormData(null);
    setEditingId(null);
  }

  function handleDelete(id) {
    setProducts((ps) => ps.filter((p) => p.id !== id));
  }

  const outOfStockCount = products.filter(
    (p) => (p.stockKg || p.stockLiters || p.stockUnits || 0) === 0
  ).length;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 text-sm mt-1">Manage products and negotiations</p>
          </div>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
          >
            ← Back to Shop
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-gray-500 text-sm font-medium">Total Products</div>
            <div className="text-3xl font-bold text-gray-900 mt-2">{products.length}</div>
          </div>
          <div className="bg-yellow-50 rounded-lg shadow p-6 border-l-4 border-yellow-400">
            <div className="text-gray-500 text-sm font-medium">Out of Stock</div>
            <div className="text-3xl font-bold text-yellow-600 mt-2">{outOfStockCount}</div>
          </div>
          <div className="bg-blue-50 rounded-lg shadow p-6 border-l-4 border-blue-400">
            <div className="text-gray-500 text-sm font-medium">Negotiations</div>
            <div className="text-3xl font-bold text-blue-600 mt-2">{negotiationOffers.length}</div>
          </div>
          <div className="bg-green-50 rounded-lg shadow p-6 border-l-4 border-green-400">
            <div className="text-gray-500 text-sm font-medium">In Stock</div>
            <div className="text-3xl font-bold text-green-600 mt-2">{products.length - outOfStockCount}</div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow mb-8">
          <div className="border-b">
            <div className="flex">
              <button
                onClick={() => setTab("products")}
                className={`px-6 py-4 font-medium border-b-2 ${
                  tab === "products"
                    ? "border-green-600 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Products
              </button>
              <button
                onClick={() => setTab("negotiations")}
                className={`px-6 py-4 font-medium border-b-2 ${
                  tab === "negotiations"
                    ? "border-green-600 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Negotiations
              </button>
            </div>
          </div>

          <div className="p-6">
            {tab === "products" && (
              <div>
                <div className="mb-6">
                  <button
                    onClick={() => {
                      setShowForm(true);
                      setEditingId(null);
                      setFormData({
                        name: "",
                        category: "Vegetables",
                        pricePerKg: 0,
                        unit: "kg",
                        image: "",
                        location: "",
                        stockKg: 0,
                        description: "",
                      });
                    }}
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                  >
                    + New Product
                  </button>
                </div>

                {showForm && (
                  <ProductForm
                    data={formData}
                    onSave={handleSave}
                    onChange={setFormData}
                    onCancel={() => setShowForm(false)}
                  />
                )}

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="px-4 py-3 text-left font-semibold">Name</th>
                        <th className="px-4 py-3 text-left font-semibold">Category</th>
                        <th className="px-4 py-3 text-left font-semibold">Price</th>
                        <th className="px-4 py-3 text-left font-semibold">Stock</th>
                        <th className="px-4 py-3 text-left font-semibold">Status</th>
                        <th className="px-4 py-3 text-center font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((p) => {
                        const stock = p.stockKg || p.stockLiters || p.stockUnits || 0;
                        const price = p.pricePerKg || p.pricePerLiter || 0;
                        const unit = p.unit || "kg";
                        return (
                          <tr key={p.id} className="border-t hover:bg-gray-50">
                            <td className="px-4 py-3 font-medium">{p.name}</td>
                            <td className="px-4 py-3">{p.category}</td>
                            <td className="px-4 py-3">{price} / {unit}</td>
                            <td className="px-4 py-3">{stock}</td>
                            <td className="px-4 py-3">
                              <span
                                className={`px-2 py-1 rounded text-xs font-semibold ${
                                  stock === 0
                                    ? "bg-red-100 text-red-800"
                                    : stock < 50
                                    ? "bg-yellow-100 text-yellow-800"
                                    : "bg-green-100 text-green-800"
                                }`}
                              >
                                {stock === 0 ? "Out of Stock" : stock < 50 ? "Low Stock" : "In Stock"}
                              </span>
                            </td>
                            <td className="px-4 py-3 text-center">
                              <button
                                onClick={() => handleEdit(p)}
                                className="text-blue-600 hover:text-blue-800 mr-3"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDelete(p.id)}
                                className="text-red-600 hover:text-red-800"
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {tab === "negotiations" && (
              <div>
                {negotiationOffers.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No negotiations yet</p>
                ) : (
                  <div className="space-y-4">
                    {negotiationOffers.map((n) => (
                      <div key={n.id} className="border rounded-lg p-4 hover:shadow-md transition">
                        <div className="flex items-center justify-between mb-2">
                          <div className="font-semibold">{n.productName}</div>
                          <div className="text-green-600 font-bold">{n.amount}</div>
                        </div>
                        <div className="text-sm text-gray-600">
                          <p>Buyer: {n.buyerName || "Guest"}</p>
                          <p>Message: {n.message || "No message"}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductForm({ data, onSave, onChange, onCancel }) {
  return (
    <div className="mb-6 p-6 bg-gray-50 rounded-lg border-2 border-green-200">
      <h3 className="text-lg font-semibold mb-4">
        {data.id ? "Edit Product" : "Add New Product"}
      </h3>
      <form onSubmit={onSave} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product Name</label>
          <input
            type="text"
            value={data?.name || ""}
            onChange={(e) => onChange({ ...data, name: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            value={data?.category || ""}
            onChange={(e) => onChange({ ...data, category: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            <option>Vegetables</option>
            <option>Fruits</option>
            <option>Grains</option>
            <option>Legumes</option>
            <option>Meat</option>
            <option>Fish</option>
            <option>Oils</option>
            <option>Spices</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
          <input
            type="number"
            value={data?.pricePerKg || data?.pricePerLiter || ""}
            onChange={(e) =>
              onChange({
                ...data,
                [data?.pricePerLiter ? "pricePerLiter" : "pricePerKg"]: Number(e.target.value),
              })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
          <input
            type="number"
            value={data?.stockKg || data?.stockLiters || ""}
            onChange={(e) =>
              onChange({
                ...data,
                [data?.stockLiters ? "stockLiters" : "stockKg"]: Number(e.target.value),
              })
            }
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
          <input
            type="text"
            value={data?.location || ""}
            onChange={(e) => onChange({ ...data, location: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
          <input
            type="url"
            value={data?.image || ""}
            onChange={(e) => onChange({ ...data, image: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            value={data?.description || ""}
            onChange={(e) => onChange({ ...data, description: e.target.value })}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400 resize-none"
            rows="3"
          />
        </div>

        <div className="md:col-span-2 flex gap-3">
          <button
            type="submit"
            className="flex-1 bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 font-medium"
          >
            Save Product
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400 font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
