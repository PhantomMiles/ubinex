import React, { useState } from "react";
import { useApp } from "../context/useAppContext";

export default function Auth() {
  const { login } = useApp();
  const [mode, setMode] = useState("login"); // "login" or "signup"
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("consumer");

  const submit = (e) => {
    e.preventDefault();
    login({ email, role });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <img
          src="/images/ubinex-logo.png"
          alt="Ubinex logo"
          className="h-16 mx-auto mb-4"
        />
        <div className="flex justify-center mb-6">
          <button
            className={`${mode === "login" ? "bg-green-600 text-white" : "text-green-600"} px-4 py-2 rounded-l-md border border-green-600`}
            onClick={() => setMode("login")}
          >
            Login
          </button>
          <button
            className={`${mode === "signup" ? "bg-green-600 text-white" : "text-green-600"} px-4 py-2 rounded-r-md border border-green-600`}
            onClick={() => setMode("signup")}
          >
            Sign up
          </button>
        </div>
        <form onSubmit={submit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Email address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-green-500 focus:border-green-500"
            />
          </div>
          <fieldset className="mt-4">
            <legend className="text-sm font-medium text-gray-700">I am a</legend>
            <div className="flex items-center gap-4 mt-2">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="consumer"
                  checked={role === "consumer"}
                  onChange={() => setRole("consumer")}
                  className="form-radio h-4 w-4 text-green-600"
                />
                <span className="ml-2">Consumer</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="role"
                  value="farmer"
                  checked={role === "farmer"}
                  onChange={() => setRole("farmer")}
                  className="form-radio h-4 w-4 text-green-600"
                />
                <span className="ml-2">Farmer</span>
              </label>
            </div>
          </fieldset>
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-md font-semibold"
          >
            {mode === "login" ? "Log in" : "Create account"}
          </button>
        </form>
      </div>
    </div>
  );
}