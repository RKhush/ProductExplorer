import axios from 'axios';

const API_URL = 'http://localhost:4000/api/products';

export const fetchProducts = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};


// Category endpoints are not implemented in backend, so we return unique categories from products
export const fetchCategories = async () => {
  const products = await fetchProducts();
  return [...new Set(products.map(p => p.category))];
};


// Filter products by category client-side
export const fetchProductsByCategory = async (category) => {
  const products = await fetchProducts();
  return products.filter(p => p.category === category);
};


export const fetchProductById = async (id) => {
  const { data } = await axios.get(`${API_URL}/${id}`);
  return data;
};
