import { extendTheme } from '@chakra-ui/react';


const config = {
  initialColorMode: 'light',
  useSystemColorMode: true,
};

const colors = {
  coffee: {
    50: '#f7f3f0',
    100: '#ede1d6',
    200: '#e1cdbb',
    300: '#d2b497',
    400: '#b98e6a',
    500: '#a47551',
    600: '#8a5f3e',
    700: '#6b472d',
    800: '#4c2f1c',
    900: '#2e180b',
  },
  beige: {
    50: '#fdfaf6',
    100: '#f7f0e3',
    200: '#f0e3cc',
    300: '#e6d3b0',
    400: '#d6bb8c',
    500: '#bfa06a',
    600: '#a1844e',
    700: '#7c6337',
    800: '#55411f',
    900: '#2d210a',
  },
};

const styles = {
  global: (props) => ({
    body: {
      bg: props.colorMode === 'light' ? 'beige.100' : 'coffee.900',
      color: props.colorMode === 'light' ? 'coffee.900' : 'beige.100',
      fontFamily: '"Merriweather", "Georgia", serif',
    },
    '#root': {
      bg: 'transparent',
    },
  }),
};

const components = {
  Button: {
    baseStyle: {
      fontWeight: 'bold',
      borderRadius: 'md',
    },
    variants: {
      solid: (props) => ({
        bg: props.colorMode === 'light' ? 'coffee.500' : 'beige.400',
        color: props.colorMode === 'light' ? 'beige.50' : 'coffee.900',
        _hover: {
          bg: props.colorMode === 'light' ? 'coffee.600' : 'beige.300',
        },
      }),
      outline: (props) => ({
        borderColor: props.colorMode === 'light' ? 'coffee.500' : 'beige.400',
        color: props.colorMode === 'light' ? 'coffee.700' : 'beige.200',
      }),
    },
  },
  Modal: {
    baseStyle: (props) => ({
      dialog: {
        bg: props.colorMode === 'light' ? 'beige.50' : 'coffee.800',
      },
    }),
  },
  Input: {
    variants: {
      filled: (props) => ({
        field: {
          bg: props.colorMode === 'light' ? 'beige.200' : 'coffee.700',
        },
      }),
    },
  },
  Heading: {
    baseStyle: (props) => ({
      color: props.colorMode === 'light' ? 'coffee.700' : 'beige.200',
      fontFamily: 'inherit',
    }),
  },
  Box: {
    baseStyle: {
      borderRadius: 'md',
    },
  },
};

const theme = extendTheme({
  config,
  colors,
  styles,
  components,
  fonts: {
    heading: 'Merriweather, Georgia, serif',
    body: 'Merriweather, Georgia, serif',
  },
});

export default theme;
