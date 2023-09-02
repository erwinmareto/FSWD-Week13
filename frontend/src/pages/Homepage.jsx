import { useEffect, useState } from "react";
import axios from "axios";
import { Stack, Text, Grid, Spinner, Center } from "@chakra-ui/react";
import Book from "../components/Book";
import { getAllBooks } from "../fetch/books";

function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchData() {
    try {
      const payload = await getAllBooks();
      setData(payload);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setLoading(true);
    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <>
          <Text fontSize="5xl" align="center">
            Loading.....
          </Text>
          <Center>
            <Spinner size="xl" />
          </Center>
        </>
      ) : (
        <Stack>
          <Grid templateColumns="repeat(3, 1fr)" gap={3}>
            {data?.books?.map((book) => {
              return <Book book={book}></Book>;
            })}
          </Grid>
        </Stack>
      )}
    </>
  );
}
// TODO: ONLY render edit & delete button when logged in but make it look good
export default Home;
