import { Box, Heading, Flex, Select, Skeleton, Alert, AlertIcon } from '@chakra-ui/react';

import { useState } from 'react';
import { useDisclosure } from '@chakra-ui/react';
import { useProducts } from '../hooks/useProducts';
import { useCategories } from '../hooks/useCategories';
import Pagination from '../components/Pagination';
import ProductCard from '../components/ProductCard';
import ProductDetailsModal from '../components/ProductDetailsModal';

const ProductExplorer = () => {
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: categories, isLoading: catLoading } = useCategories();
  const { data: products, isLoading, isError, error } = useProducts(category);

  const handleCardClick = (product) => {
    setSelectedProduct(product);
    onOpen();
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setCurrentPage(1);
  };
  const handleSortChange = (e) => {
    setSort(e.target.value);
    setCurrentPage(1);
  };

  const sortProducts = (products, sort) => {
    if (!sort) return products;
    return [...products].sort((a, b) =>
      sort === 'low' ? a.price - b.price : b.price - a.price
    );
  };

  const sortedProducts = products ? sortProducts(products, sort) : [];
  const ITEMS_PER_PAGE = 8;
  const totalPages = Math.ceil(sortedProducts.length / ITEMS_PER_PAGE) || 1;
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <>
      <Box
        as="main"
        flex="1 0 auto"
        maxW="1200px"
        mx="auto"
        p={4}
        width="100%"
        display="flex"
        flexDirection="column"
      >
        <Heading
          as="h1"
          size="lg"
          mb={6}
          mt={{ base: "60px", md: "72px" }}
        >
          Product Explorer
        </Heading>

        <Flex
          mb={4}
          gap={4}
          flexWrap="wrap"
          direction={{ base: "column", md: "row" }}
          align={{ md: "center" }}
        >
          <Select
            placeholder="All Categories"
            value={category}
            onChange={handleCategoryChange}
            maxW="200px"
            isDisabled={catLoading}
          >
            {categories?.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Select>

          <Select
            placeholder="Sort by Price"
            value={sort}
            onChange={handleSortChange}
            maxW="200px"
          >
            <option value="low">Low → High</option>
            <option value="high">High → Low</option>
          </Select>
        </Flex>

        {isLoading ? (
          <Flex wrap="wrap" justify="center" gap={6}>
            {[...Array(8)].map((_, i) => (
              <Skeleton
                key={i}
                height="320px"
                width="250px"
                borderRadius="lg"
              />
            ))}
          </Flex>
        ) : isError ? (
          <Alert status="error" borderRadius="md">
            <AlertIcon />
            {error?.message || "Failed to load products."}
          </Alert>
        ) : (
          <>
            <Flex wrap="wrap" justify="center" gap={6} align="stretch">
              {paginatedProducts.map((product, idx) => (
                <Box
                  key={product._id || product.id || idx}
                  minW="250px"
                  maxW="300px"
                  flex="1 1 250px"
                  display="flex"
                >
                  <ProductCard
                    product={product}
                    onOpen={() => handleCardClick(product)}
                  />
                </Box>
              ))}
            </Flex>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </>
        )}
      </Box>

      <ProductDetailsModal
        isOpen={isOpen}
        onClose={onClose}
        product={selectedProduct}
      />
    </>
  );
};

export default ProductExplorer;
