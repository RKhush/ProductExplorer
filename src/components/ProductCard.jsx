
import { Box, Image, Text, Badge, Button, useColorModeValue, IconButton, Flex, Spacer, useToast } from '@chakra-ui/react';
import useQuantityModal from './useQuantityModal';
import QuantityModal from './QuantityModal';
import { FaHeart, FaRegHeart, FaShoppingCart } from 'react-icons/fa';
import { useFavorites } from '../hooks/useFavorites.jsx';
import { useCart } from '../hooks/useCart.jsx';


const ProductCard = ({ product, onOpen }) => {

  const { isFavorite, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();
  const { isOpen, openModal, onConfirm, handleClose } = useQuantityModal();
  const toast = useToast();

  const handleFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite(product);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    openModal((quantity) => {
      addToCart(product, quantity);
      toast({
        title: 'Added to cart',
        description: `${product.title} (x${quantity}) has been added to your cart.`,
        status: 'success',
        duration: 2000,
        isClosable: true,
        position: 'top',
      });
    });
  };

  return (
    <>
      <Box
        borderWidth="1.5px"
        borderRadius="xl"
        overflow="hidden"
        p={4}
        bg={useColorModeValue('beige.200', 'coffee.800')}
        borderColor={useColorModeValue('coffee.400', 'beige.400')}
        boxShadow={useColorModeValue('lg', 'dark-lg')}
        _hover={{ boxShadow: '2xl', transform: 'translateY(-4px)', transition: '0.2s', bg: useColorModeValue('beige.100', 'coffee.700') }}
        cursor="pointer"
        onClick={onOpen}
        height="100%"
        display="flex"
        flexDirection="column"
      >
        <Flex align="center" mb={2}>
          <IconButton
            icon={isFavorite(product._id || product.id) ? <FaHeart color="#a47551" /> : <FaRegHeart />}
            aria-label="Favorite"
            variant="ghost"
            size="sm"
            onClick={handleFavorite}
            _hover={{ bg: useColorModeValue('beige.300', 'coffee.700') }}
          />
          <Spacer />
          <Badge colorScheme="teal">{product.category}</Badge>
        </Flex>
        {product.image ? (
          <Image src={product.image} alt={product.title} boxSize="150px" objectFit="contain" mx="auto" mb={3} />
        ) : null}
        <Text fontWeight="bold" noOfLines={2} mb={2}>
          {product.title}
        </Text>
        <Text color={useColorModeValue('gray.700', 'gray.200')} fontSize="lg" fontWeight="semibold">
          ${product.price}
        </Text>
        <Flex gap={2} mt={3}>
          <Button colorScheme="blue" flex={1} onClick={onOpen}>
            View Details
          </Button>
          <IconButton
            icon={<FaShoppingCart />}
            aria-label="Add to Cart"
            colorScheme="green"
            onClick={handleAddToCart}
          />
        </Flex>
      </Box>
      <QuantityModal isOpen={isOpen} onClose={handleClose} onConfirm={onConfirm} />
    </>
  );
};

export default ProductCard;
