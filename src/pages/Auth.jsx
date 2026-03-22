import React, { useState } from "react";
import { useApp } from "../context/useAppContext";

export default function Auth() {
  const { login, register } = useApp();
  const [mode, setMode] = useState("login"); 
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("consumer");
  const [error, setError] = useState("");

  const submit = (e) => {
    e.preventDefault();
    setError("");

    try {
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
        
        register({ email, name, password, role });
        // After signup, automatically login
        login(email, password);
      } else {
        login(email, password);
      }
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="h-screen w-screen flex items-center justify-center bg-[#f0ffe8] font-sans relative overflow-hidden">
      {/* Decorative Background Elements - Modern & Subtle */}
      <div className="absolute top-[-20%] left-[-20%] w-[60%] h-[60%] bg-primary/5 rounded-full blur-[120px] animate-pulse"></div>
      <div className="absolute bottom-[-20%] right-[-20%] w-[60%] h-[60%] bg-accent/5 rounded-full blur-[120px] animate-pulse delay-1000"></div>

      <div className="w-full max-w-lg px-6 relative z-10 max-h-screen">
        <div className="bg-white rounded-xl shadow-2xl border border-gray-100 p-8 lg:p-10 overflow-hidden animate-in fade-in zoom-in duration-700 flex flex-col">
          {/* Header */}
          <div className="text-center mb-6">
            <img src="/ubinex.png" alt="Logo" className="w-22 h-20 mx-auto mb-2 object-contain" />
            <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase leading-none mb-1">UBINEX</h1>
            <p className="text-[8px] font-black text-gray-400 uppercase tracking-[0.3em]">Connecting Nigerian Farms to Markets</p>
          </div>

          {/* Role Selection - Compact Cards */}
          <div className="grid grid-cols-2 gap-4 mb-6 font-sans">
            <button
              onClick={() => setRole("consumer")}
              className={`group p-3 rounded-lg border-2 transition-all duration-500 flex flex-col items-center gap-2 ${
                role === "consumer"
                  ? "border-primary bg-[#0a0a0a] text-white shadow-xl scale-105"
                  : "border-gray-50 bg-gray-50/50 hover:border-primary/20 hover:bg-white text-gray-400"
              }`}
            >
              <div className={`w-8 h-8 rounded-md flex items-center justify-center text-lg transition ${role === 'consumer' ? 'bg-primary text-white' : 'bg-white text-gray-300'}`}>
                <i className="fas fa-shopping-basket text-sm"></i>
              </div>
              <span className="text-[8px] font-black uppercase tracking-[0.1em]">Consumer</span>
            </button>

            <button
              onClick={() => setRole("farmer")}
              className={`group p-3 rounded-lg border-2 transition-all duration-500 flex flex-col items-center gap-2 ${
                role === "farmer"
                  ? "border-accent bg-[#0a0a0a] text-white shadow-xl scale-105"
                  : "border-gray-50 bg-gray-50/50 hover:border-accent/20 hover:bg-white text-gray-400"
              }`}
            >
              <div className={`w-8 h-8 rounded-md flex items-center justify-center text-lg transition ${role === 'farmer' ? 'bg-accent text-white' : 'bg-white text-gray-300'}`}>
                <i className="fas fa-tractor text-sm"></i>
              </div>
              <span className="text-[8px] font-black uppercase tracking-[0.1em]">Farmer</span>
            </button>
          </div>

          {/* Tab Selection */}
          <div className="flex gap-2 mb-6 bg-gray-50 p-1 rounded-lg border border-gray-100">
            <button
              className={`flex-1 py-2 rounded-md text-[8px] font-black uppercase tracking-widest transition-all duration-300 ${
                mode === "login" ? "bg-white text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600"
              }`}
              onClick={() => { setMode("login"); setError(""); }}
            >
              Log In
            </button>
            <button
              className={`flex-1 py-2 rounded-md text-[8px] font-black uppercase tracking-widest transition-all duration-300 ${
                mode === "signup" ? "bg-white text-gray-900 shadow-sm" : "text-gray-400 hover:text-gray-600"
              }`}
              onClick={() => { setMode("signup"); setError(""); }}
            >
              Sign Up
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 p-2 bg-red-50 border border-red-100 rounded-lg text-red-600 text-[8px] font-black uppercase tracking-widest animate-in slide-in-from-top-2">
              <i className="fas fa-exclamation-triangle mr-1"></i>
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={submit} className="space-y-4 overflow-y-auto pr-1 no-scrollbar max-h-[40vh]">
            {mode === "signup" && (
              <div className="space-y-1">
                <label className="text-[8px] font-black uppercase tracking-widest text-gray-400 ml-1">Name</label>
                <div className="relative">
                   <i className="far fa-user absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-xs"></i>
                   <input
                     type="text"
                     required
                     value={name}
                     onChange={(e) => setName(e.target.value)}
                     placeholder="John Doe"
                     className="w-full bg-gray-50 border border-gray-100 rounded-lg py-3 pl-10 pr-4 text-[9px] font-black uppercase tracking-widest focus:ring-2 focus:ring-primary/5 focus:border-primary/20 transition"
                   />
                </div>
              </div>
            )}

            <div className="space-y-1">
              <label className="text-[8px] font-black uppercase tracking-widest text-gray-400 ml-1">Email</label>
              <div className="relative">
                 <i className="far fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-xs"></i>
                 <input
                   type="email"
                   required
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   placeholder="you@email.com"
                   className="w-full bg-gray-50 border border-gray-100 rounded-lg py-3 pl-10 pr-4 text-[9px] font-black uppercase tracking-widest focus:ring-2 focus:ring-primary/5 focus:border-primary/20 transition"
                 />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[8px] font-black uppercase tracking-widest text-gray-400 ml-1">Password</label>
              <div className="relative">
                 <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-xs"></i>
                 <input
                   type="password"
                   required
                   value={password}
                   onChange={(e) => setPassword(e.target.value)}
                   placeholder="••••••••"
                   className="w-full bg-gray-50 border border-gray-100 rounded-lg py-3 pl-10 pr-4 text-[9px] font-black uppercase tracking-widest focus:ring-2 focus:ring-primary/5 focus:border-primary/20 transition"
                 />
              </div>
            </div>

            {mode === "signup" && (
              <div className="space-y-1">
                <label className="text-[8px] font-black uppercase tracking-widest text-gray-400 ml-1">Confirm</label>
                <div className="relative">
                   <i className="fas fa-shield-alt absolute left-4 top-1/2 -translate-y-1/2 text-gray-300 text-xs"></i>
                   <input
                     type="password"
                     required
                     value={confirmPassword}
                     onChange={(e) => setConfirmPassword(e.target.value)}
                     placeholder="••••••••"
                     className="w-full bg-gray-50 border border-gray-100 rounded-lg py-3 pl-10 pr-4 text-[9px] font-black uppercase tracking-widest focus:ring-2 focus:ring-primary/5 focus:border-primary/20 transition"
                   />
                </div>
              </div>
            )}
          </form>

          <button
            type="submit"
            onClick={submit}
            className={`w-full py-4 rounded-lg font-black text-white transition-all duration-500 shadow-xl text-[9px] uppercase tracking-[0.3em] mt-6 transform active:scale-95 ${
               role === 'consumer' ? 'bg-primary' : 'bg-accent'
            }`}
          >
            {mode === "login" ? "Enter Market" : "Join Ubinex"}
          </button>

          {/* Footer Text */}
          <button
            onClick={() => { setMode(mode === "login" ? "signup" : "login"); setError(""); }}
            className="text-[8px] font-black text-gray-400 uppercase tracking-widest hover:text-primary transition mt-6 text-center"
          >
            {mode === "login" ? "New here? Create Account" : "Registered? Login"}
          </button>
        </div>
      </div>
    </div>
  );
}