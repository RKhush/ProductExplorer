import { createContext, useContext, useEffect, useState } from 'react';
import { fetchFavorites, addToFavorites, removeFromFavorites } from '../services/favoriteService';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {

  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    fetchFavorites().then(setFavorites);
  }, []);

  const toggleFavorite = async (product) => {
    const exists = favorites.some((item) => (item.product?._id || item.product?.id) === (product._id || product.id));
    let updatedFavorites;
    if (exists) {
      updatedFavorites = await removeFromFavorites(product._id || product.id);
    } else {
      updatedFavorites = await addToFavorites(product._id || product.id);
    }
    setFavorites(updatedFavorites);
  };

  const isFavorite = (id) => favorites.some((item) => (item.product?._id || item.product?.id) === id);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
