import {
  Box,
  Stack,
  Flex,
  Center,
  Text,
  Square,
  FormControl,
  FormLabel,
  Input,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useToast
} from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, register } from "../fetch/auth.js";
import Swal from 'sweetalert2';
import useStore from "../stores/zustand.js";

function LoginPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();
  const setLoggedIn = useStore((state) => state.setLoggedIn)

  async function handleSubmit() {
    try {
      await login({ email, password });
      setLoggedIn(true)
      Swal.fire({
        icon: 'success',
        title: 'Logged In',
        text: 'Welcome back!',
        showConfirmButton: false,
        timer: 1500
    })
      navigate('/')
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Login Failed',
            text: 'Wrong email or password',
            showConfirmButton: false,
            timer: 1500
        })
      console.log(error);
    }
  }

  async function handleRegister() {
    try {
        await register({name, email, password})
        toast({
            title: 'Account created.',
            description: "We've created your account for you.",
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
    } catch (error) {
        toast({
            title: 'Failed',
            description: 'Something went wrong',
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
        console.log(error, '<<<<<<<<<<<<');
    }
  }
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Flex
      color="white"
      w="100%"
      h="40rem"
      bgGradient="linear(to-l, #1D5D9B, #75C2F6)"
    >
      <Center flex="1">
        <Text fontSize="6xl">Welcome.</Text>
      </Center>
      <Center flex="1">
        <Stack>
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input type="email" onChange={(e) => setEmail(e.target.value)} />
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button
              mt={4}
              colorScheme="blue"
              type="submit"
              onClick={handleSubmit}
            >
              Log In
            </Button>
          </FormControl>
          <Text>Don't have an account?</Text>
          <Button onClick={onOpen} colorScheme="linkedin" >Register</Button>

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Create an Account</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl>
                  <FormLabel>Name</FormLabel>
                  <Input
                    type="text"
                    onChange={(e) => setName(e.target.value)}
                  />
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <FormLabel>Password</FormLabel>
                  <Input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <Button
                    mt={4}
                    colorScheme="teal"
                    type="submit"
                    onClick={handleRegister}
                  >
                    Submit
                  </Button>
                </FormControl>
              </ModalBody>
            </ModalContent>
          </Modal>
        </Stack>
      </Center>
    </Flex>
  );
}

export default LoginPage;
