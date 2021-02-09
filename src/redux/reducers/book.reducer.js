import {
    GET_BOOK_FAILURE,
    GET_BOOK_REQUEST,
    GET_BOOK_SUCCESS,
    DELETE_BOOK_REQUEST,
    DELETE_BOOK_FAILURE,
    DELETE_BOOK_SUCCESS,
    ADD_BOOK_FAILURE,
    ADD_BOOK_REQUEST,
    ADD_BOOK_SUCCESS,
    EDIT_BOOK_FAILURE,
    EDIT_BOOK_REQUEST,
    EDIT_BOOK_SUCCESS,
    ADD_BOOKS_AUTHOR_REQUEST,
    ADD_BOOKS_AUTHOR_SUCCESS,
    ADD_BOOKS_AUTHOR_FAILURE,
    DELETE_BOOKS_AUTHOR_REQUEST,
    DELETE_BOOKS_AUTHOR_SUCCESS,
    DELETE_BOOKS_AUTHOR_FAILURE
  } from "../action-types";

const initState = {
    item: [],
    error: ""
};

export const bookReducer = function (state = initState, action) {
  switch (action.type) {
      case GET_BOOK_REQUEST:
      case DELETE_BOOK_REQUEST:
      case ADD_BOOK_REQUEST:
      case EDIT_BOOK_REQUEST:
      case ADD_BOOKS_AUTHOR_REQUEST:
      case DELETE_BOOKS_AUTHOR_REQUEST:
        return {
          ...state
        };
      case GET_BOOK_FAILURE:
      case DELETE_BOOK_FAILURE:
      case ADD_BOOK_FAILURE:
      case EDIT_BOOK_FAILURE:
      case ADD_BOOKS_AUTHOR_FAILURE:
      case DELETE_BOOKS_AUTHOR_FAILURE:
        return {
          ...state,
          error: action.payload
        };
      case GET_BOOK_SUCCESS:
        return {
          ...state,
          item: action.payload.book
        };
      case DELETE_BOOK_SUCCESS:
      case ADD_BOOK_SUCCESS:
      case EDIT_BOOK_SUCCESS:
      case ADD_BOOKS_AUTHOR_SUCCESS:
      case DELETE_BOOKS_AUTHOR_SUCCESS:
        return {
          ...state,
        };
    default:
      return { ...state };
  } 
};

export default bookReducer;