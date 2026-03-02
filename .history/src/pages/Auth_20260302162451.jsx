import React, { useState } from "react";
import { useApp } from "../context/useAppContext";

export default function Auth() {
  const { login } = useApp();
  const [mode, setMode] = useState("login"); // "login" or "signup"
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("consumer");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    setError("");

    if (mode === "signup") {
      if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }
      if (!name.trim()) {
        setError("Please enter your name");
        return;
      }
    }

    login({ email, name, role });
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: "linear-gradient(135deg, #f5f1e8 0%, #e8f4e1 100%)" }}>
      <div className="w-full max-w-md">
        {/* Header with Logo and Branding */}
        <div className="text-center mb-8">
          <div className="mb-4 text-5xl flex justify-center">
            <img src="/src/assets/logo.png" alt="Ubinex Logo" className="h-16 w-16" />
          </div>
          <h1 className="text-3xl font-bold" style={{ color: "#2d5016" }}>
            Ubinex
          </h1>
          <p className="text-lg mt-2" style={{ color: "#8B5A3C" }}>
            Connecting Farms to Markets
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid grid-cols-2 gap-3 mb-8">
          <button
            onClick={() => setRole("consumer")}
            className={`p-4 rounded-lg border-2 transition-all font-semibold text-center ${
              role === "consumer"
                ? "border-green-600 bg-green-50"
                : "border-gray-300 bg-white hover:border-green-400"
            }`}
            style={role === "consumer" ? { borderColor: "#2d5016", backgroundColor: "#f0ffe8" } : {}}
          >
            <div className="text-2xl mb-2">🛒</div>
            <div style={{ color: role === "consumer" ? "#2d5016" : "#666" }}>
              Consumer
            </div>
          </button>

          <button
            onClick={() => setRole("farmer")}
            className={`p-4 rounded-lg border-2 transition-all font-semibold text-center ${
              role === "farmer"
                ? "border-green-600 bg-green-50"
                : "border-gray-300 bg-white hover:border-green-400"
            }`}
            style={role === "farmer" ? { borderColor: "#8B5A3C", backgroundColor: "#fff9f0" } : {}}
          >
            <div className="text-2xl mb-2">👨‍🌾</div>
            <div style={{ color: role === "farmer" ? "#8B5A3C" : "#666" }}>
              Farmer
            </div>
          </button>
        </div>

        {/* Auth Form Card */}
        <div className="bg-white rounded-lg shadow-xl p-8 border border-gray-200">
          {/* Tab Buttons */}
          <div className="flex gap-2 mb-6 bg-gray-100 p-1 rounded-lg">
            <button
              className={`flex-1 py-2 rounded-md font-semibold transition-all ${
                mode === "login" ? "text-white shadow-md" : "text-gray-600"
              }`}
              onClick={() => {
                setMode("login");
                setError("");
              }}
              style={mode === "login" ? { backgroundColor: "#2d5016" } : {}}
            >
              Log In
            </button>
            <button
              className={`flex-1 py-2 rounded-md font-semibold transition-all ${
                mode === "signup" ? "text-white shadow-md" : "text-gray-600"
              }`}
              onClick={() => {
                setMode("signup");
                setError("");
              }}
              style={mode === "signup" ? { backgroundColor: "#2d5016" } : {}}
            >
              Sign Up
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md text-red-700 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={submit} className="space-y-4">
            {mode === "signup" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:border-transparent transition"
                  style={{ focusRingColor: "#2d5016" }}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:border-transparent transition"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={mode === "login" ? "Enter your password" : "At least 6 characters"}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:border-transparent transition"
              />
            </div>

            {mode === "signup" && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password</label>
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm your password"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:border-transparent transition"
                />
              </div>
            )}

            {/* Role Info */}
            <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-sm text-blue-800">
              {role === "consumer" ? (
                <p><strong>Consumer Mode:</strong> Browse and purchase fresh farm products from local farmers.</p>
              ) : (
                <p><strong>Farmer Mode:</strong> Manage your products and connect with buyers directly.</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-2 rounded-lg font-semibold text-white transition-all hover:shadow-lg text-base"
              style={{ backgroundColor: role === "consumer" ? "#2d5016" : "#8B5A3C" }}
            >
              {mode === "login" ? "Log In" : "Create Account"}
            </button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-gray-600 mt-6">
            {mode === "login" ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => {
                setMode(mode === "login" ? "signup" : "login");
                setError("");
              }}
              className="font-semibold transition-colors"
              style={{ color: "#2d5016" }}
            >
              {mode === "login" ? "Sign up" : "Log in"}
            </button>
          </p>
        </div>

        {/* Footer Text */}
        <p className="text-center text-xs text-gray-500 mt-6">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}