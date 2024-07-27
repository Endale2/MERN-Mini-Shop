import React from 'react'
import { Container, Flex, Text } from '@chakra-ui/react'
function NavBar() {
  return (
    <Container maxW={"1140px"} px={4}>

        <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        flexDir={{
            base:"column",
            sm:"row"
        }}
        >

            <Text
            
            >MERN-miniShop</Text>

        </Flex>
      
    </Container >
  )
}

export default NavBar
