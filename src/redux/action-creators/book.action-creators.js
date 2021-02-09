import axios from "axios";
import {
  GET_BOOKS_FAILURE,
  GET_BOOKS_REQUEST,
  GET_BOOKS_SUCCESS,
  GET_BOOK_FAILURE,
  GET_BOOK_REQUEST,
  GET_BOOK_SUCCESS,
  ADD_BOOK_FAILURE,
  ADD_BOOK_REQUEST,
  ADD_BOOK_SUCCESS,
  EDIT_BOOK_FAILURE,
  EDIT_BOOK_REQUEST,
  EDIT_BOOK_SUCCESS,
  DELETE_BOOK_REQUEST,
  DELETE_BOOK_SUCCESS,
  DELETE_BOOK_FAILURE,
  ADD_BOOKS_AUTHOR_REQUEST,
  ADD_BOOKS_AUTHOR_SUCCESS,
  ADD_BOOKS_AUTHOR_FAILURE,
  DELETE_BOOKS_AUTHOR_REQUEST,
  DELETE_BOOKS_AUTHOR_SUCCESS,
  DELETE_BOOKS_AUTHOR_FAILURE
} from "./../action-types";

const getBooksRequest = () => {
    return {
      type: GET_BOOKS_REQUEST
    };
  };
const getBooksSuccess = (books) => {
    return {
      type: GET_BOOKS_SUCCESS,
      payload: {books}
    };
  };
const getBooksFailure = (error) => {
    return {
      type: GET_BOOKS_FAILURE,
      payload: error,
    };
  };
  
export const getBooks = () =>{
    return function (dispatch) {
      dispatch(getBooksRequest());
      axios({
        method: "get",
        url: "/books",
      }).then((response) => {
        const books = response.data.books;
        dispatch(getBooksSuccess(books));
        })
        .catch((error) => {
          dispatch(getBooksFailure(error));
        });
    };
  }
  
const getBookRequest = () => {
    return {
      type: GET_BOOK_REQUEST
    };
  };
const getBookSuccess = (book) => {
    return {
      type: GET_BOOK_SUCCESS,
      payload: {book}
    };
  };
const getBookFailure = (error) => {
    return {
      type: GET_BOOK_FAILURE,
      payload: error,
    };
  };
  
export const getBook = (id) =>{
    return function (dispatch) {
      dispatch(getBookRequest());
      axios({
        method: "get",
        url: `/books/${id}`,
      }).then((response) => {
        const book = response.data.book;
        dispatch(getBookSuccess(book));
        })
        .catch((error) => {
          dispatch(getBookFailure(error));
        });
    };
  }
  
const addBookRequest = () => {
    return {
      type: ADD_BOOK_REQUEST
    };
  };
const addBookSuccess = () => {
    return {
      type: ADD_BOOK_SUCCESS,
    };
  };
const addBookFailure = (error) => {
    return {
      type: ADD_BOOK_FAILURE,
      payload: error,
    };
  };
  
export const addBook = (book,history) => {
    return function (dispatch) {
      dispatch(addBookRequest);
      axios({
        method: "post",
        url: "/books",
        data: book,
        headers: {
          'x-access-token': `${localStorage.getItem("USER-TOKEN")}`,
        }
      }).then((response) => {
        const status = response.status;
        if(status === 201) dispatch(addBookSuccess());
        history.push("/books");
        })
        .catch((error) => {
          dispatch(addBookFailure(error));
        });
    };
  };
  
 
const editBookRequest = () => {
    return {
      type: EDIT_BOOK_REQUEST
    };
  };
const editBookSuccess = () => {
    return {
      type: EDIT_BOOK_SUCCESS
    };
  };
const editBookFailure = (error) => {
    return {
      type: EDIT_BOOK_FAILURE,
      payload: error,
    };
  };
  
export const editBook = (id,book) => {
    return function (dispatch) {
      dispatch(editBookRequest);
      axios({
        method: 'put',
        url: `/books/${id}`,
        data: book,
        headers: {
          'x-access-token': `${localStorage.getItem("USER-TOKEN")}`,
        }
      }).then((response) => {
        const status = response.status;
        if(status === 200) dispatch(editBookSuccess());
        })
        .catch((error) => {
          dispatch(editBookFailure(error));
        });
    };
  };

const deleteBooksAuthorRequest = () => {
    return {
      type: DELETE_BOOKS_AUTHOR_REQUEST
    };
  };
const deleteBooksAuthorSuccess = () => {
    return {
      type: DELETE_BOOKS_AUTHOR_SUCCESS
    };
  };
const deleteBooksAuthorFailure = (error) => {
    return {
      type: DELETE_BOOKS_AUTHOR_FAILURE,
      payload: error,
    };
  };
  
export const deleteBooksAuthor = (idBook,idAuthor) =>{
    return function (dispatch) {
      dispatch(deleteBooksAuthorRequest());
      axios({
        method: 'delete',
        url: `/books/${idBook}/authors/${idAuthor}`,
        headers: {
          'x-access-token': `${localStorage.getItem("USER-TOKEN")}`,
        }
      }).then((response) => {
        const status = response.status;
        if(status === 200) dispatch(deleteBooksAuthorSuccess());
        })
        .catch((error) => {
          dispatch(deleteBooksAuthorFailure(error));
        });
    };
  }
  

const addBooksAuthorRequest = () => {
    return {
      type: ADD_BOOKS_AUTHOR_REQUEST 
    };
  };
const addBooksAuthorSuccess = () => {
    return {
      type: ADD_BOOKS_AUTHOR_SUCCESS
    };
  };
const addBooksAuthorFailure = (error) => {
    return {
      type: ADD_BOOKS_AUTHOR_FAILURE,
      payload: error,
    };
  };
  
export const addBooksAuthor= (idBook,author) =>{
    return function (dispatch) {
      dispatch(addBooksAuthorRequest());
      axios({
        method: 'post',
        url: `/books/${idBook}/authors`,
        data: {author},
        headers: {
          'x-access-token': `${localStorage.getItem("USER-TOKEN")}`,
        }
      }).then((response) => {
        const status = response.status;
        if(status === 200) dispatch(addBooksAuthorSuccess());
        })
        .catch((error) => {
          dispatch(addBooksAuthorFailure(error));
        });
    };
  }
  
const deleteBookRequest = () => {
    return {
      type: DELETE_BOOK_REQUEST
    };
  };
const deleteBookSuccess = () => {
    return {
      type: DELETE_BOOK_SUCCESS
    };
  };
const deleteBookFailure = (error) => {
    return {
      type: DELETE_BOOK_FAILURE,
      payload: error,
    };
  };

export const deleteBook = (id,history) =>{
    return function (dispatch) {
      console.log(localStorage.getItem("USER-TOKEN") + "roken");
      dispatch(deleteBookRequest());
      axios({
        method: 'delete',
        url: `/books/${id}`,
        headers: {
          'x-access-token': `${localStorage.getItem("USER-TOKEN")}`,
        }
      }).then((response) => {
        const status = response.status;
        if(status === 200) dispatch(deleteBookSuccess());
        history.push('/books');
        })
        .catch((error) => {
          dispatch(deleteBookFailure(error));
        });
    };
  }