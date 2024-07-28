import React from 'react';
import { Container, Flex, Text, HStack, Button, useColorMode, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { AiOutlinePlusSquare } from 'react-icons/ai'; 
import {LuSun} from 'react-icons/lu'
import {IoMoon} from 'react-icons/io5'

function NavBar() {
    const {colorMode, toggleColorMode} = useColorMode()
  return (
    <Container maxW={"1140px"} px={4} >
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
          base: "column",
          sm: "row"
        }}
      >
        <Text fontSize='30px' color='tomato'>
          <Link to="/">
            MERN-miniShop
          </Link>
        </Text>

        <HStack spacing={2} alignItems={"center"}>
          <Link to="/create">
            <Button>
              <AiOutlinePlusSquare size={20} />  {/* Use React Icon */}
            </Button>
          </Link>
          <Button onClick={toggleColorMode} aria-label="Toggle color mode">
      {colorMode === "light" ? <IoMoon size={24} /> : <LuSun size={24} />}
    </Button>
        </HStack>
      </Flex>
    </Container>
  );
}

export default NavBar;
