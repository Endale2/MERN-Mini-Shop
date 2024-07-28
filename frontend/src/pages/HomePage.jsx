import React, { useState, useEffect } from 'react';
import {
  Box,
  Image,
  Text,
  SimpleGrid,
  Container,
  Heading,
  VStack,
  IconButton,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  HStack,
} from '@chakra-ui/react';
import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [editProduct, setEditProduct] = useState({
    name: '',
    price: '',
    image: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products/');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleImageError = (e) => {
    e.target.src = 'https://via.placeholder.com/300x200'; // Use a default placeholder image
  };

  const handleDelete = async (productId) => {
    try {
      await axios.delete(`http://localhost:5000/api/products/${productId}`);
      setProducts(products.filter(product => product._id !== productId));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
    setEditProduct({
      name: product.name,
      price: product.price,
      image: product.image
    });
    onOpen();
  };

  const handleUpdateProduct = async () => {
    try {
      await axios.put(`http://localhost:5000/api/products/${selectedProduct._id}`, editProduct, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setProducts(products.map(product => (product._id === selectedProduct._id ? { ...product, ...editProduct } : product)));
      onClose();
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  const handleAddProduct = () => {
    navigate('/create');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProduct({
      ...editProduct,
      [name]: value
    });
    console.log(`Input changed - ${name}: ${value}`); // Logging the changes
  };

  return (
    <Container maxW="container.lg">
      <VStack spacing={8}>
        <Heading as="h1" size="2xl" textAlign="center" mb={8}>
          Homepage
        </Heading>
        {products.length === 0 ? (
          <VStack spacing={4}>
            <Text fontSize="xl">No products found</Text>
            <Button colorScheme="blue" onClick={handleAddProduct}>
              Add Products
            </Button>
          </VStack>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
            {products.map((product) => (
              <Box
                key={product._id}
                borderWidth="1px"
                borderRadius="lg"
                overflow="hidden"
                bg="white"
                shadow="md"
                _dark={{ bg: 'gray.800' }}
                h="300px"
                display="flex"
                flexDirection="column"
              >
                <Box h="50%" overflow="hidden" bg="gray.100" position="relative">
                  <Image
                    src={product.image}
                    alt={product.name}
                    objectFit="cover"
                    width="100%"
                    height="100%"
                    position="absolute"
                    top="0"
                    left="0"
                    onError={handleImageError}
                  />
                </Box>
                <Box p={6} flex="1" display="flex" flexDirection="column" justifyContent="space-between">
                  <Box>
                    <Text fontWeight="bold" fontSize="xl" mb={2}>
                      {product.name}
                    </Text>
                    <Text>${product.price}</Text>
                  </Box>
                  <HStack spacing={4} mt={4}>
                    <IconButton
                      icon={<AiFillEdit />}
                      onClick={() => handleEdit(product)}
                      aria-label="Edit Product"
                    />
                    <IconButton
                      icon={<AiFillDelete />}
                      onClick={() => handleDelete(product._id)}
                      aria-label="Delete Product"
                      colorScheme="red"
                    />
                  </HStack>
                </Box>
              </Box>
            ))}
          </SimpleGrid>
        )}

        {/* Modal for editing product */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Product</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <VStack spacing={4}>
                <Input
                  name="name"
                  value={editProduct.name}
                  placeholder="Product name"
                  onChange={handleInputChange}
                />
                <Input
                  name="price"
                  value={editProduct.price}
                  placeholder="Product price"
                  onChange={handleInputChange}
                />
                <Input
                  name="image"
                  value={editProduct.image}
                  placeholder="Product image"
                  onChange={handleInputChange}
                />
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handleUpdateProduct}>
                Update
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Cancel
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </VStack>
    </Container>
  );
}

export default HomePage;
