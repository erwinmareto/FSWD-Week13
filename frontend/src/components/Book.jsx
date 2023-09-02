import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Stack,
  Heading,
  Text,
  Image,
  Button,
  HStack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
  Portal,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import useStore from "../stores/zustand.js";
import { deleteBook } from '../fetch/books.js'
import Swal from "sweetalert2";

function Book({ book }) {
  const loggedIn = useStore((state) => state.loggedIn)
  const navigate = useNavigate();
  async function handleDelete(id) {
    try {
      await deleteBook(id);
      Swal.fire({
        icon: "success",
        title: "Delete Success",
        text: "Successfully Deleted Book",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate('/')
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to delete book",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  return (
    
      <Card
        bg="#75C2F6"
        direction={{ base: "column", sm: "row" }}
        overflow="hidden"
        variant="outline"
        _hover={{
          shadow: 'md',
          transform: 'translateY(-5px)',
          transitionDuration: '0.2s',
          transitionTimingFunction: "ease-in-out"
        }}
      >
        <Image
          objectFit="cover"
          maxW={{ base: "100%", sm: "200px" }}
          h='336px'
          src={`http://localhost:8000/${book.image}`}
          alt="Book Cover"
        />

        <Stack>
          <CardBody>
            <Heading size="md">{book.title}</Heading>

            <Text py="2">{book.author}</Text>
            <Text py="2">{book.publisher}</Text>
            <Text py="2">{book.year}</Text>
            <Text py="2">{book.pages} Pages</Text>
          </CardBody>

          <CardFooter gap="2">
            {loggedIn && (
              <>

            <Link to={`/edit/${book.id}`}>
              <Button
                variant="solid"
                colorScheme="blue"
              >
                Edit
              </Button>
            </Link>
            <Popover>
              <PopoverTrigger>
                <Button variant="solid" colorScheme="red">
                  Delete
                </Button>
              </PopoverTrigger>
              <Portal>
                <PopoverContent bg="red.400">
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverBody>Are you sure about that?</PopoverBody>
                  <PopoverFooter border="0">
                    <Button colorScheme="red" onClick={(e) => handleDelete(book.id)}>Delete</Button>
                  </PopoverFooter>
                </PopoverContent>
              </Portal>
            </Popover>
              </>
            )}
          </CardFooter>
        </Stack>
      </Card>
    
  );
}

export default Book;
