import { useState } from "react";
import FavoritesModal from "./components/FavoritesModal";
import CartModal from "./components/CartModal";
import ProductExplorer from "./pages/ProductExplorer";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Register from "./components/Register";
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Heading,
  Text,
} from "@chakra-ui/react";
import { useAuth } from "./context/AuthContext";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";

function App() {
  const [isFavoritesOpen, setFavoritesOpen] = useState(false);
  const [isCartOpen, setCartOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const { user } = useAuth();

  if (!user) {
    return (
      <Box
        minH="100vh"
        w="100vw"
        bg="beige.100"
        display="flex"
        alignItems="center"
        justifyContent="center"
        position="relative"
        overflow="hidden"
      >
        {/* SVG Illustration Background */}
        <Box
          position="absolute"
          top={0}
          left={0}
          w="100vw"
          h="100vh"
          zIndex={0}
          pointerEvents="none"
        >
          <svg
            width="100vw"
            height="100vh"
            viewBox="0 0 1440 900"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ width: "100vw", height: "100vh" }}
          >
            <rect width="1440" height="900" fill="#f7f3f0" />
            <circle cx="400" cy="450" r="180" fill="#b98e6a" opacity="0.15" />
            <circle cx="1100" cy="300" r="120" fill="#bfa06a" opacity="0.12" />
            <rect
              x="900"
              y="600"
              width="300"
              height="120"
              rx="40"
              fill="#e6d3b0"
              opacity="0.10"
            />
            {/* Example monitor illustration */}
            <rect
              x="320"
              y="350"
              width="160"
              height="100"
              rx="16"
              fill="#ede1d6"
              stroke="#b98e6a"
              strokeWidth="4"
            />
            <rect
              x="370"
              y="390"
              width="60"
              height="20"
              rx="6"
              fill="#bfa06a"
              opacity="0.25"
            />
            {/* Example avatar illustration */}
            <ellipse
              cx="400"
              cy="340"
              rx="40"
              ry="50"
              fill="#b98e6a"
              opacity="0.35"
            />
            <ellipse cx="400" cy="340" rx="30" ry="35" fill="#ede1d6" />
            {/* Decorative lines */}
            <line
              x1="320"
              y1="470"
              x2="480"
              y2="470"
              stroke="#bfa06a"
              strokeWidth="2"
              opacity="0.2"
            />
            <line
              x1="320"
              y1="480"
              x2="480"
              y2="480"
              stroke="#bfa06a"
              strokeWidth="2"
              opacity="0.1"
            />
          </svg>
        </Box>
        <Box zIndex={1} w={["90vw", "400px"]}>
          {showLogin ? (
            <>
              <Box bg="coffee.500" borderRadius="xl" boxShadow="2xl" p={8}>
                <Box mb={4} textAlign="center">
                  <Text
                    fontSize="2xl"
                    fontWeight="bold"
                    color="beige.50"
                    letterSpacing="wide"
                  >
                    Login
                  </Text>
                </Box>
                <Login />
                <Box mt={4} textAlign="center">
                  <Text>
                    Don't have an account?{" "}
                    <Button
                      variant="link"
                      colorScheme="blue"
                      onClick={() => setShowLogin(false)}
                    >
                      Register
                    </Button>
                  </Text>
                </Box>
              </Box>
            </>
          ) : (
            <>
              <Box bg="coffee.500" borderRadius="xl" boxShadow="2xl" p={8}>
                <Box mb={4} textAlign="center">
                  <Text
                    fontSize="2xl"
                    fontWeight="bold"
                    color="beige.50"
                    letterSpacing="wide"
                  >
                    Register
                  </Text>
                </Box>
                <Register onRegistered={() => setShowLogin(true)} />
                <Box mt={4} textAlign="center">
                  <Text>
                    Already have an account?{" "}
                    <Button
                      variant="link"
                      colorScheme="blue"
                      onClick={() => setShowLogin(true)}
                    >
                      Login
                    </Button>
                  </Text>
                </Box>
              </Box>
            </>
          )}
        </Box>
      </Box>
    );
  }

  return (
    <Box minH="100vh" display="flex" flexDirection="column" position="relative">
      <Header
        onFavoritesOpen={() => setFavoritesOpen(true)}
        onCartOpen={() => setCartOpen(true)}
      />
      <Box flex="1" display="flex" flexDirection="column">
        <ProductExplorer />
      </Box>
      <FavoritesModal
        isOpen={isFavoritesOpen}
        onClose={() => setFavoritesOpen(false)}
      />
      <CartModal isOpen={isCartOpen} onClose={() => setCartOpen(false)} />
      <Box position="relative" left={0} w="100vw">
        <Footer />
      </Box>
    </Box>
  );
}

export default App;
