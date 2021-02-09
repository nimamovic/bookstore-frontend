import axios from "axios";
import {
  GET_AUTHORS_SUCCESS,
  GET_AUTHORS_REQUEST,
  GET_AUTHORS_FAILURE,
  GET_AUTHOR_SUCCESS,
  GET_AUTHOR_REQUEST,
  GET_AUTHOR_FAILURE,
  EDIT_AUTHOR_SUCCESS,
  EDIT_AUTHOR_REQUEST,
  EDIT_AUTHOR_FAILURE,
  ADD_AUTHOR_FAILURE,
  ADD_AUTHOR_REQUEST,
  ADD_AUTHOR_SUCCESS,
  DELETE_AUTHOR_FAILURE,
  DELETE_AUTHOR_REQUEST,
  DELETE_AUTHOR_SUCCESS,
  ADD_AUTHORS_BOOK_REQUEST,
  ADD_AUTHORS_BOOK_SUCCESS,
  ADD_AUTHORS_BOOK_FAILURE,
  DELETE_AUTHORS_BOOK_REQUEST,
  DELETE_AUTHORS_BOOK_SUCCESS,
  DELETE_AUTHORS_BOOK_FAILURE
} from "./../action-types";


//get author
const getAuthorRequest = () => {
    return {
      type: GET_AUTHOR_REQUEST,
    };
  };
const getAuthorSuccess = (author) => {
    return {
      type: GET_AUTHOR_SUCCESS,
      payload: { author }
    };
  };
const getAuthorFailure = (error) => {
    return {
      type: GET_AUTHOR_FAILURE,
      payload: error
    };
  };
  
export const getAuthor = (id) => {
    return function (dispatch) {
      dispatch(getAuthorRequest());
      axios({
        method: "get",
        url: `/authors/${id}`,
      }).then((response) => {
        const author = response.data.author;
        dispatch(getAuthorSuccess(author));
        }).catch((error) => {
          dispatch(getAuthorFailure(error));
        });
    };
  };
  
const editAuthorRequest = () => {
    return {
      type: EDIT_AUTHOR_REQUEST
    };
  };
const editAuthorSuccess = () => {
    return {
      type: EDIT_AUTHOR_SUCCESS
    };
  };
const editAuthorFailure = (error) => {
    return {
      type: EDIT_AUTHOR_FAILURE,
      payload: error
    };
  };
  
export const editAuthor = (id,author) => {
    return function (dispatch) {
      dispatch(editAuthorRequest);
      axios({
        method: 'put',
        url: `/authors/${id}`,
        data: author,
        headers: {
          'x-access-token': `${localStorage.getItem("USER-TOKEN")}`
        }
      }).then((response) => {
        const status = response.status;
        if(status === 200) dispatch(editAuthorSuccess());
        })
        .catch((error) => {
          dispatch(editAuthorFailure(error));
        });
    };
  };
  

const addAuthorRequest = () => {
    return {
      type: ADD_AUTHOR_REQUEST,
    };
  };
const addAuthorSuccess = () => {
    return {
      type: ADD_AUTHOR_SUCCESS,
    };
  };
const addAuthorFailure = (error) => {
    return {
      type: ADD_AUTHOR_FAILURE,
      payload: error
    };
  };
  
export const addAuthor = (author,history) => {
    return function (dispatch) {
      dispatch(addAuthorRequest);
      axios({
        method: "post",
        url: "/authors",
        data: author,
        headers: {
          'x-access-token': `${localStorage.getItem("USER-TOKEN")}`,
        }
      }).then((response) => {
        const status = response.status;
        if(status === 201) dispatch(addAuthorSuccess());
        history.push("/authors");
        }).catch((error) => {
          dispatch(addAuthorFailure(error));
        });
    };
  };
  
  
const getAuthorsRequest = () => {
    return {
      type: GET_AUTHORS_REQUEST,
    };
  };
const getAuthorsSuccess = (authors) => {
    return {
      type: GET_AUTHORS_SUCCESS,
      payload: { authors }
    };
  };
const getAuthorsFailure = (error) => {
    return {
      type: GET_AUTHORS_FAILURE,
      payload: error,
    };
  };
  
export const getAuthors = () =>{
    return function (dispatch) {
      dispatch(getAuthorsRequest());
      axios({
        method: "get",
        url: "/authors",
      }).then((response) => {
        const authors = response.data.authors;
        dispatch(getAuthorsSuccess(authors));
        })
        .catch((error) => {
          dispatch(getAuthorsFailure(error));
        });
    };
  }
  
const deleteAuthorRequest = () => {
    return {
      type: DELETE_AUTHOR_REQUEST,
    };
  };
const deleteAuthorSuccess = () => {
    return {
      type: DELETE_AUTHOR_SUCCESS
    };
  };
const deleteAuthorFailure = (error) => {
    return {
      type: DELETE_AUTHOR_FAILURE,
      payload: error
    };
  };
  
  export const deleteAuthor= (id,history) =>{
    return function (dispatch) {
      dispatch(deleteAuthorRequest());
      axios({
        method: 'delete',
        url: `/authors/${id}`,
        headers: {
          'x-access-token': `${localStorage.getItem("USER-TOKEN")}`,
        }
      }).then((response) => {
        const status = response.status;
        if(status === 200) dispatch(deleteAuthorSuccess());
        history.push('/authors')
        })
        .catch((error) => {
          dispatch(deleteAuthorFailure(error));
        });
    };
  }
  
const deleteAuthorsBookRequest = () => {
    return {
      type: DELETE_AUTHORS_BOOK_REQUEST
    };
  };
const deleteAuthorsBookSuccess = () => {
    return {
      type: DELETE_AUTHORS_BOOK_SUCCESS
    };
  };
const deleteAuthorsBookFailure = (error) => {
    return {
      type: DELETE_AUTHORS_BOOK_FAILURE,
      payload: error
    };
  };
  
export const deleteAuthorsBook= (idAuthor,idBook) =>{
    return function (dispatch) {
      dispatch(deleteAuthorsBookRequest());
      axios({
        method: 'delete',
        url: `/authors/${idAuthor}/books/${idBook}`,
        headers: {
          'x-access-token': `${localStorage.getItem("USER-TOKEN")}`,
        }
      }).then((response) => {
        const status = response.status;
        if(status === 200) dispatch(deleteAuthorsBookSuccess());
        })
        .catch((error) => {
          dispatch(deleteAuthorsBookFailure(error));
        });
    };
  }
  

const addAuthorsBookRequest = () => {
    return {
      type: ADD_AUTHORS_BOOK_REQUEST
    };
  };
const addAuthorsBookSuccess = () => {
    return {
      type: ADD_AUTHORS_BOOK_SUCCESS
    };
  };
const addAuthorsBookFailure = (error) => {
    return {
      type: ADD_AUTHORS_BOOK_FAILURE,
      payload: error
    };
  };
  
export const addAuthorsBook= (idAuthor,book) =>{
    return function (dispatch) {
      dispatch(addAuthorsBookRequest());
      axios({
        method: 'post',
        url: `/authors/${idAuthor}/books`,
        data: {book},
        headers: {
          'x-access-token': `${localStorage.getItem("USER-TOKEN")}`,
        }
      }).then((response) => {
        const status = response.status;
        if(status === 200) dispatch(addAuthorsBookSuccess());
        })
        .catch((error) => {
          dispatch(addAuthorsBookFailure(error));
        });
    };
  }