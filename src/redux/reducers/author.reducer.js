import {
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
  } from "../action-types";

const initState = {
    item: {},
    error: ""
};

export const authorReducer = function (state = initState, action) {
  switch (action.type) {
    case GET_AUTHOR_REQUEST:
    case DELETE_AUTHOR_REQUEST:
    case ADD_AUTHOR_REQUEST:
    case EDIT_AUTHOR_REQUEST:
    case ADD_AUTHORS_BOOK_REQUEST:
    case DELETE_AUTHORS_BOOK_REQUEST:
        return {
          ...state
        };
    case GET_AUTHOR_FAILURE:
    case DELETE_AUTHOR_FAILURE:
    case ADD_AUTHOR_FAILURE:
    case EDIT_AUTHOR_FAILURE:
    case ADD_AUTHORS_BOOK_FAILURE:
    case DELETE_AUTHORS_BOOK_FAILURE:
        return {
          ...state,
          error: action.payload
        };
    case GET_AUTHOR_SUCCESS:
        return {
          ...state,
          item: action.payload.author
        };
    case DELETE_AUTHOR_SUCCESS:
    case ADD_AUTHOR_SUCCESS:
    case EDIT_AUTHOR_SUCCESS:
    case ADD_AUTHORS_BOOK_SUCCESS:
    case DELETE_AUTHORS_BOOK_SUCCESS:
        return {
          ...state,
        };
    default:
      return { ...state };
  } 
};

export default authorReducer;