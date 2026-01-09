import { Box, Flex, Heading, Spacer, Button, useColorMode, IconButton } from '@chakra-ui/react';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useFavorites } from '../hooks/useFavorites.jsx';
import { useCart } from '../hooks/useCart.jsx';

const Header = ({ onFavoritesOpen, onCartOpen }) => {
  const { favorites } = useFavorites();
  const { cart } = useCart();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box
      as="header"
      w="100vw"
      px={4}
      py={3}
      boxShadow="lg"
      bg={colorMode === 'light' ? 'beige.50' : 'coffee.900'}
      color={colorMode === 'light' ? 'coffee.700' : 'beige.100'}
      position="fixed"
      top={0}
      left={0}
      zIndex={200}
    >
      <Flex align="center" maxW="1200px" mx="auto">
        <Heading as="h1" size="lg" fontFamily="Merriweather, Georgia, serif">Product Explorer</Heading>
        <Spacer />
        <IconButton
          icon={<FaHeart />}
          aria-label="Show Favorites"
          colorScheme={favorites.length ? 'pink' : 'gray'}
          variant="ghost"
          size="md"
          mr={2}
          onClick={onFavoritesOpen}
        />
        <IconButton
          icon={<FaShoppingCart />}
          aria-label="Show Cart"
          colorScheme={cart.length ? 'green' : 'gray'}
          variant="ghost"
          size="md"
          mr={2}
          onClick={onCartOpen}
        />
        <Button onClick={toggleColorMode} size="md" fontWeight="bold" bg={colorMode === 'light' ? 'beige.500' : 'coffee.400'} color={colorMode === 'light' ? 'coffee.900' : 'beige.50'} _hover={{ bg: colorMode === 'light' ? 'beige.400' : 'coffee.300' }}>
          {colorMode === 'light' ? 'Dark' : 'Light'} Mode
        </Button>
      </Flex>
    </Box>
  );
};

export default Header;
