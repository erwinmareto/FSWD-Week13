import { Box } from "@chakra-ui/react";
import BookForm from "../components/BookForm";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { editBook, findBook } from "../fetch/books";

function EditBook() {
  const { id } = useParams();
  const [bookData, setBookData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const currentBook = await findBook(id);
        const { book } = await editBook(currentBook.book);

        setBookData(book);
      } catch (error) {
        console.log(error);
        window.alert(error);
      }
    }
    fetchData();
  }, []);
  return (
    <Box>
      <BookForm bookData={bookData}></BookForm>
    </Box>
  );
}
export default EditBook;
