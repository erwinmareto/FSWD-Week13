import {
  Flex,
  Box,
  Heading,
  ButtonGroup,
  Button,
  Spacer,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import useStore from "../stores/zustand";

function Navbar() {
  const loggedIn = useStore((state) => state.loggedIn)
  const setLoggedIn = useStore((state) => state.setLoggedIn)
  useEffect(() => {
    if (window.localStorage.getItem("token")) {
      setLoggedIn(true);
    }
  }, [window.localStorage.getItem("token")]);
  return (
    <Flex w="full" wrap="wrap" bg="#FBEEAC" alignItems="center" gap="2" m="0">
      <Box p="20px">
        <Link to="/">
          <Heading size="md">Books</Heading>
        </Link>
      </Box>
      <Spacer />
      
        {!loggedIn ? (
          <Link to="/login">
            <Button colorScheme="teal">Log in</Button>
          </Link>
        ) : (
          <ButtonGroup gap="2">
        <Link to="/add">
          <Button colorScheme="teal">Add Book</Button>
        </Link>
          <Button colorScheme="teal" onClick={() => {
            localStorage.removeItem('token')
            setLoggedIn(false)
            Swal.fire({
              icon: 'success',
              title: 'Logged Out',
              text: 'See you soon!',
              showConfirmButton: false,
              timer: 1500
          })
          }}>Log out</Button>
           </ButtonGroup>
        )}
     
    </Flex>
  );
}

export default Navbar;
