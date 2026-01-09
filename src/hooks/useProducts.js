import { useQuery } from '@tanstack/react-query';
import { fetchProducts, fetchProductsByCategory } from '../services/productService';

export const useProducts = (category) => {
  return useQuery({
    queryKey: ['products', category],
    queryFn: () => (category ? fetchProductsByCategory(category) : fetchProducts()),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};
