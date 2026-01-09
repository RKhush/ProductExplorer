import { useState } from 'react';
import FavoritesModal from './components/FavoritesModal';
import CartModal from './components/CartModal';
import ProductExplorer from './pages/ProductExplorer';
import Header from './components/Header';
import Footer from './components/Footer';
import { Box } from '@chakra-ui/react';

function App() {
  const [isFavoritesOpen, setFavoritesOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);

  return (
    <Box minH="100vh" display="flex" flexDirection="column" position="relative">
      <Header onFavoritesOpen={() => setFavoritesOpen(true)} onCartOpen={() => setCartOpen(true)} />
      <Box flex="1" display="flex" flexDirection="column">
        <ProductExplorer />
      </Box>
      <FavoritesModal isOpen={isFavoritesOpen} onClose={() => setFavoritesOpen(false)} />
      <CartModal isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
      <Box position="relative" left={0} w="100vw">
        <Footer />
      </Box>
    </Box>
  );
}

export default App;
