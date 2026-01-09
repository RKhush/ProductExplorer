import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, List, ListItem, Image, Text, Flex, IconButton, Box
} from '@chakra-ui/react';
import { FaTrash, FaShoppingCart } from 'react-icons/fa';
import { useFavorites } from '../hooks/useFavorites.jsx';
import { useCart } from '../hooks/useCart.jsx';

const FavoritesModal = ({ isOpen, onClose }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const { addToCart } = useCart();
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Favorite Items</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {favorites.length === 0 ? (
            <Text>No favorite items yet.</Text>
          ) : (
            <List spacing={4}>
              {favorites.map((item) => {
                const product = item.product || item;
                return (
                  <ListItem key={product._id || product.id}>
                    <Flex align="center" gap={4}>
                      {product.image ? (
                        <Image src={product.image} alt={product.title} boxSize="50px" objectFit="contain" />
                      ) : null}
                      <Box flex={1}>
                        <Text fontWeight="bold">{product.title}</Text>
                        <Text fontSize="sm">${product.price}</Text>
                      </Box>
                      <IconButton
                        icon={<FaShoppingCart />}
                        aria-label="Add to cart"
                        size="sm"
                        colorScheme="green"
                        mr={2}
                        onClick={() => addToCart(product)}
                      />
                      <IconButton
                        icon={<FaTrash />}
                        aria-label="Remove from favorites"
                        size="sm"
                        colorScheme="red"
                        onClick={() => toggleFavorite(product)}
                      />
                    </Flex>
                  </ListItem>
                );
              })}
            </List>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default FavoritesModal;
