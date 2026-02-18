import React, { createContext } from "react";

export const AppContext = createContext();

export const CURRENCIES = {
  NG: { name: "Nigeria", symbol: "₦", rate: 1 },
  GH: { name: "Ghana", symbol: "GHS", rate: 0.4 },
  KE: { name: "Kenya", symbol: "KES", rate: 0.019 },
  TZ: { name: "Tanzania", symbol: "TZS", rate: 0.00042 },
  ET: { name: "Ethiopia", symbol: "ETB", rate: 0.018 },
};

export function useApp() {
  const ctx = React.useContext(AppContext);
  if (!ctx) throw new Error("useApp must be inside AppProvider");
  return ctx;
}
