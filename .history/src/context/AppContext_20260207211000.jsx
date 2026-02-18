// @refresh reset
import React, { createContext, useState } from "react";

export const AppContext = createContext();

const CURRENCIES = {
  GH: { name: "Ghana", symbol: "GHC", rate: 1 },
  NG: { name: "Nigeria", symbol: "₦", rate: 1.5 },
  KE: { name: "Kenya", symbol: "KES", rate: 0.008 },
  TZ: { name: "Tanzania", symbol: "TZS", rate: 0.00042 },
  ET: { name: "Ethiopia", symbol: "ETB", rate: 0.018 },
};

export function AppProvider({ children }) {
  const [country, setCountry] = useState("GH");
  const [negotiationOffers, setNegotiationOffers] = useState([]);

  const currency = CURRENCIES[country];

  const convertPrice = (price) => {
    return Math.round(price * currency.rate);
  };

  const formatPrice = (price) => {
    const converted = convertPrice(price);
    return `${currency.symbol} ${converted.toLocaleString()}`;
  };

  return (
    <AppContext.Provider
      value={{
        country,
        setCountry,
        currency,
        convertPrice,
        formatPrice,
        CURRENCIES,
        negotiationOffers,
        setNegotiationOffers,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = React.useContext(AppContext);
  if (!ctx) throw new Error("useApp must be inside AppProvider");
  return ctx;
}
