import { useState } from "react";
import { AppContext, CURRENCIES } from "./useAppContext";

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
