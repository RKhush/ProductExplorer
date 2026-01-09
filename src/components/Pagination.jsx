import { Button, ButtonGroup, Flex, Text } from '@chakra-ui/react';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <Flex justify="center" align="center" mt={8} gap={2}>
      <ButtonGroup isAttached variant="outline">
        <Button
          onClick={() => onPageChange(currentPage - 1)}
          isDisabled={currentPage === 1}
        >
          Prev
        </Button>
        <Text px={4} alignSelf="center">
          Page {currentPage} of {totalPages}
        </Text>
        <Button
          onClick={() => onPageChange(currentPage + 1)}
          isDisabled={currentPage === totalPages}
        >
          Next
        </Button>
      </ButtonGroup>
    </Flex>
  );
};

export default Pagination;
