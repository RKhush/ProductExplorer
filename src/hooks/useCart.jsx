import { createContext, useContext, useEffect, useState } from 'react';
import { fetchCart, addToCart as apiAddToCart, removeFromCart as apiRemoveFromCart, clearCart as apiClearCart, decreaseCartQty } from '../services/cartService';

const CartContext = createContext();

export const CartProvider = ({ children }) => {

  const [cart, setCart] = useState([]);

  useEffect(() => {
    fetchCart().then(setCart);
  }, []);

  const addToCart = async (product, quantity = 1) => {
    const updatedCart = await apiAddToCart(product._id || product.id, quantity);
    setCart(updatedCart);
  };


  // Decrease quantity by 1, remove if zero, with id check and error handling
  const decreaseQty = async (id) => {
    if (!id) {
      alert('Invalid product id.');
      return;
    }
    try {
      const updatedCart = await decreaseCartQty(id);
      setCart(updatedCart);
    } catch (err) {
      alert('Failed to decrease quantity: ' + (err?.response?.data?.error || err.message));
    }
  };

  // Remove item from cart (delete whole item)
  const removeFromCart = async (id) => {
    const updatedCart = await apiRemoveFromCart(id);
    setCart(updatedCart);
  };

  const clearCart = async () => {
    const updatedCart = await apiClearCart();
    setCart(updatedCart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, decreaseQty, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
