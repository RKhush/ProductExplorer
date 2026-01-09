import {
  Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, List, ListItem, Image, Text, Flex, IconButton, Box, Button
} from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';
import { useCart } from '../hooks/useCart.jsx';

const CartModal = ({ isOpen, onClose }) => {
  const { cart, addToCart, decreaseQty, clearCart } = useCart();
  const total = cart.reduce((sum, item) => sum + (item.product?.price || 0) * item.qty, 0);
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Cart Items</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {cart.length === 0 ? (
            <Text>No items in cart.</Text>
          ) : (
            <>
              <List spacing={4}>
                {cart.map((item) => (
                  <ListItem key={item._id}>
                    <Flex align="center" gap={4}>
                      <Image src={item.product?.image || '/placeholder.png'} alt={item.product?.title || 'No image'} boxSize="50px" objectFit="contain" />
                      <Box flex={1}>
                        <Text fontWeight="bold">{item.product?.title}</Text>
                        <Text fontSize="sm">${item.product?.price} x {item.qty}</Text>
                      </Box>
                      <Flex align="center" gap={1}>
                        <IconButton
                          icon={<span style={{fontWeight: 'bold', fontSize: '18px'}}>-</span>}
                          aria-label="Decrease quantity"
                          size="sm"
                          colorScheme="gray"
                          onClick={() => decreaseQty(item.product?._id)}
                          isDisabled={!item.product?._id}
                        />
                        <Text minW="24px" textAlign="center">{item.qty}</Text>
                        <IconButton
                          icon={<span style={{fontWeight: 'bold', fontSize: '18px'}}>+</span>}
                          aria-label="Increase quantity"
                          size="sm"
                          colorScheme="gray"
                          onClick={() => addToCart(item.product, 1)}
                        />
                      </Flex>
                    </Flex>
                  </ListItem>
                ))}
              </List>
              <Flex justify="space-between" align="center" mt={4}>
                <Text fontWeight="bold">Total: ${total.toFixed(2)}</Text>
                <Button colorScheme="red" size="sm" onClick={clearCart}>Clear Cart</Button>
              </Flex>
            </>
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default CartModal;
