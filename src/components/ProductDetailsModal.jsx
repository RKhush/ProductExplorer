import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Image,
  Text,
  Badge,
  useColorModeValue,
  Box,
} from '@chakra-ui/react';

const ProductDetailsModal = ({ isOpen, onClose, product }) => {
  if (!product) return null;
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg" isCentered>
      <ModalOverlay />
      <ModalContent bg={useColorModeValue('beige.50', 'coffee.900')}>
        <ModalHeader color={useColorModeValue('coffee.700', 'beige.200')} fontFamily="Merriweather, Georgia, serif">{product.title}</ModalHeader>
        <ModalCloseButton color={useColorModeValue('coffee.700', 'beige.200')} />
        <ModalBody>
          <Box textAlign="center">
            <Image src={product.image} alt={product.title} boxSize="200px" objectFit="contain" mx="auto" mb={4} />
            <Badge bg={useColorModeValue('coffee.400', 'beige.400')} color={useColorModeValue('beige.50', 'coffee.900')} mb={2}>{product.category}</Badge>
            <Text fontWeight="bold" fontSize="2xl" mb={2} color={useColorModeValue('coffee.700', 'beige.100')}>${product.price}</Text>
            <Text color={useColorModeValue('coffee.800', 'beige.200')} mb={2}>{product.description}</Text>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ProductDetailsModal;
