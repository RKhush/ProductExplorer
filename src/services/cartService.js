
import axios from 'axios';

const API_URL = `${import.meta.env.VITE_API_URL}/api/cart`;

export const fetchCart = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

export const addToCart = async (productId, qty) => {
  const { data } = await axios.post(API_URL, { id: productId, qty });
  return data;
};


// Decrease quantity by 1 (PATCH)
export const decreaseCartQty = async (productId) => {
  const { data } = await axios.patch(`${API_URL}/${productId}`);
  return data;
};

// Remove item from cart (DELETE)
export const removeFromCart = async (productId) => {
  const { data } = await axios.delete(`${API_URL}/${productId}`);
  return data;
};

export const clearCart = async () => {
  const { data } = await axios.delete(API_URL);
  return data;
};
