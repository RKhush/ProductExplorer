import { Box, Text, useColorMode } from '@chakra-ui/react';

const Footer = () => {
  const { colorMode } = useColorMode();
  return (
    <Box
      as="footer"
      w="100vw"
      py={4}
      textAlign="center"
      bg={colorMode === 'light' ? 'coffee.900' : 'beige.200'}
      color={colorMode === 'light' ? 'beige.100' : 'coffee.900'}
      flexShrink={0}
      position="relative"
      left={0}
    >
      <Text fontSize="sm">&copy; {new Date().getFullYear()} Product Explorer. All rights reserved.</Text>
    </Box>
  );
};

export default Footer;
