import axios from 'axios';

const API_URL = 'http://localhost:4000/api/favorites';

export const fetchFavorites = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

export const addToFavorites = async (productId) => {
  const { data } = await axios.post(API_URL, { id: productId });
  return data;
};

export const removeFromFavorites = async (productId) => {
  const { data } = await axios.delete(`${API_URL}/${productId}`);
  return data;
};
