// context/CartContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { getCartItemsAPI } from "../service/service";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const refreshCartCount = async () => {
    try {
      const response = await getCartItemsAPI();
      console.log(response.data.length)
      setCartCount(response.data.length);
      return response.data.length;
    } catch (error) {
      console.error("Error refreshing cart:", error);
    }
  };

  useEffect(() => {
    refreshCartCount();
  }, []);

return (
  <CartContext.Provider value={{ cartCount, refreshCartCount }}>
    {children}
  </CartContext.Provider>
);
};

export const useCart = () => useContext(CartContext);
