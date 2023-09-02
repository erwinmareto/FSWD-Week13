import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { addBook, editBook } from "../fetch/books";

function BookForm({ bookData }) {
  const toast = useToast();
  const navigate = useNavigate();
  const [currentImage, setCurrentImage] = useState();

  async function handleSubmit(event) {
    event.preventDefault();
    // Check if there is already a book and use the data
    const formData = new FormData(event.target);
    if (bookData) {
      try {
        await editBook({
          id: bookData.id,
          title: formData.get("title"),
          author: formData.get("author"),
          publisher: formData.get("publisher"),
          year: parseInt(formData.get("year")),
          pages: parseInt(formData.get("pages")),
        });
        Swal.fire({
          icon: "success",
          title: "Book Edited",
          text: "Book Successfully Edited",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/");
      } catch (error) {
        console.log(error);
        Swal.fire({
          icon: "error",
          title: "Edit Failed",
          text: "Update Failed",
          showConfirmButton: false,
          timer: 1500,
        });
      }
      return;
    }
    // Add a new book
    try {
      
      await addBook(formData);
      Swal.fire({
        icon: "success",
        title: "Create Success",
        text: "Successfully Add Game",
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: "Failed to add book",
        showConfirmButton: false,
        timer: 1500,
      });
    }
  }

  useEffect(() => {
    if (bookData?.image) {
      setCurrentImage(`http://localhost:8000/${bookData.image}`);
    }
  }, [bookData]);

  return (
    <form onSubmit={handleSubmit}>
      <VStack>
        <FormControl textAlign="center">
          <FormLabel>Title</FormLabel>
          <Input type="text" name="title" defaultValue={bookData?.title} />
          <FormLabel>Author</FormLabel>
          <Input type="text" name="author" defaultValue={bookData?.author} />
          <FormLabel>Publisher</FormLabel>
          <Input
            type="text"
            name="publisher"
            defaultValue={bookData?.publisher}
          />
          <FormLabel>Year</FormLabel>
          <Input type="number" name="year" defaultValue={bookData?.year} />
          <FormLabel>Pages</FormLabel>
          <Input type="number" name="pages" defaultValue={bookData?.pages} />
        </FormControl>

        {/* {currentImage && (<Image src={currentImage} alt='book cover' />)} */}

        {!bookData?.image && (
          <Input
            name="image"
            type="file"
            onChange={(e) => {
              setCurrentImage(e.target.files[0]);
            }}
          />
        )}

        <Button mt={4} colorScheme="teal" type="submit">
          {bookData ? "Edit Book" : "Add Book"}
        </Button>
      </VStack>
    </form>
  );
}

export default BookForm;
