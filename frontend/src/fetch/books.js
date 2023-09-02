import instance from "../modules/axios";

async function getAllBooks() {
  try {
    const response = await instance({
      method: "GET",
      url: "/books",
    });
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

async function findBook(id) {
    try {
        const response = await instance({
            method: 'GET',
            url: `/books/${id}`
        })
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

async function addBook(book) {
  try {
    const response = await instance.postForm("/books", book);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

async function editBook(book) {
  try {
    const response = await instance.put(`/books/${book.id}`, book);
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

async function deleteBook(id) {
    try {
        const response = await instance.delete(`/books/${id}`)
        return response.data;
    } catch (error) {
        throw new Error(error);
    }
}

export { getAllBooks, findBook, addBook, editBook, deleteBook };
