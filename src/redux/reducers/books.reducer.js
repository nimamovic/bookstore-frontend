import {
    GET_BOOKS_SUCCESS,
    GET_BOOKS_REQUEST,
    GET_BOOKS_FAILURE
  } from "../action-types";

const initState = {
    items: [],
    error: ""
};

export const booksReducer = function (state = initState, action) {
  switch (action.type) {
    case GET_BOOKS_REQUEST:
        return {
          ...state
        };
    case GET_BOOKS_FAILURE:
        return {
          ...state,
          error: action.payload
        };
    case GET_BOOKS_SUCCESS:
      return {
        ...state,
        items: action.payload.books
      };
    default:
      return { ...state };
  } 
};

export default booksReducer;