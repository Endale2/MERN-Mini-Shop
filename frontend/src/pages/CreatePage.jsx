import { Container, Heading, VStack, Box, Input, Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useColorModeValue } from '@chakra-ui/react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

function CreatePage() {
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: ""
    });

    const handleAddProduct = async () => {
        try {
            const response = await axios.post("http://localhost:5000/api/products/", newProduct, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            toast.success('Product created successfully!');
        } catch (error) {
            toast.error('Error creating product');
        }
    };

    return (
        <Container maxW={"container.sm"}>
            <Toaster />
            <VStack spacing={8}>
                <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                    Create New Product
                </Heading>
                <Box w={"full"} bg={useColorModeValue("white", "gray.800")} p={6} rounded={"lg"} shadow={"md"}>
                    <VStack spacing={4}>
                        <Input
                            name="name"
                            value={newProduct.name}
                            placeholder="Product name"
                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                        />
                        <Input
                            name="price"
                            value={newProduct.price}
                            placeholder="Product price"
                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                        />
                        <Input
                            name="image"
                            value={newProduct.image}
                            placeholder="Product image"
                            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
                        />
                        <Button colorScheme="blue" onClick={handleAddProduct} w={'full'}>
                            Add New Product
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
}

export default CreatePage;
