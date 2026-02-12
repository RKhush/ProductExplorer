import { useState } from "react";
import axios from "axios";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Alert,
  AlertIcon,
  useColorModeValue,
  SimpleGrid,
  Box,
} from "@chakra-ui/react";

const Register = ({ onRegistered }) => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/register`,
        form,
      );
      if (onRegistered) onRegistered();
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
      setLoading(false);
    }
  };

  const cardBg = undefined;

  return (
    <VStack
      as="form"
      onSubmit={handleSubmit}
      spacing={4}
      align="stretch"
      borderRadius="md"
    >
      {error && (
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          {error}
        </Alert>
      )}
      <SimpleGrid columns={2} spacing={4}>
        <FormControl isRequired>
          <FormLabel htmlFor="name">Name</FormLabel>
          <Input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            autoComplete="email"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            autoComplete="new-password"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
          <Input
            id="confirmPassword"
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            autoComplete="new-password"
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="address">Address</FormLabel>
          <Input
            id="address"
            name="address"
            value={form.address}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="city">City</FormLabel>
          <Input
            id="city"
            name="city"
            value={form.city}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="province">Province</FormLabel>
          <Input
            id="province"
            name="province"
            value={form.province}
            onChange={handleChange}
          />
        </FormControl>
        <FormControl isRequired>
          <FormLabel htmlFor="postalCode">Postal Code</FormLabel>
          <Input
            id="postalCode"
            name="postalCode"
            value={form.postalCode}
            onChange={handleChange}
          />
        </FormControl>
      </SimpleGrid>
      <Button
        type="submit"
        colorScheme="coffee"
        isLoading={loading}
        loadingText="Registering..."
        fontWeight="bold"
        mt={2}
      >
        Register
      </Button>
    </VStack>
  );
};

export default Register;
