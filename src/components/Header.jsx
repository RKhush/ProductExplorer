import { Box, Flex, Heading, Spacer, Button, useColorMode, IconButton, Text } from '@chakra-ui/react';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { useFavorites } from '../hooks/useFavorites.jsx';
import { useCart } from '../hooks/useCart.jsx';
import { useAuth } from "../context/AuthContext";

const Header = ({ onFavoritesOpen, onCartOpen, onLoginOpen }) => {
  const { favorites } = useFavorites();
  const { cart } = useCart();
  const { colorMode, toggleColorMode } = useColorMode();
  const { user, logout } = useAuth();

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
        <Heading as="h1" size="lg" fontFamily="Merriweather, Georgia, serif">
          Product Explorer
        </Heading>

        <Spacer />

        {/* Favorites */}
        <IconButton
          icon={<FaHeart />}
          aria-label="Show Favorites"
          colorScheme={favorites.length ? 'pink' : 'gray'}
          variant="ghost"
          size="md"
          mr={2}
          onClick={onFavoritesOpen}
        />

        {/* Cart */}
        <IconButton
          icon={<FaShoppingCart />}
          aria-label="Show Cart"
          colorScheme={cart.length ? 'green' : 'gray'}
          variant="ghost"
          size="md"
          mr={4}
          onClick={onCartOpen}
        />

        {/* Auth Section */}
        {!user ? (
          <Button variant="solid" size="md" mr={4} onClick={onLoginOpen}>
            Login
          </Button>
        ) : (
          <>
            <Text mr={4} fontWeight="bold">
              Hey, {user.name} 👋
            </Text>
            <Button variant="outline" size="md" mr={4} onClick={logout}>
              Logout
            </Button>
          </>
        )}

        {/* Theme Toggle */}
        <Button
          onClick={toggleColorMode}
          size="md"
          fontWeight="bold"
          bg={colorMode === 'light' ? 'beige.500' : 'coffee.400'}
          color={colorMode === 'light' ? 'coffee.900' : 'beige.50'}
          _hover={{ bg: colorMode === 'light' ? 'beige.400' : 'coffee.300' }}
        >
          {colorMode === 'light' ? 'Dark' : 'Light'} Mode
        </Button>
      </Flex>
    </Box>
  );
};

export default Header;
