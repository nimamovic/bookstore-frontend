import {
    GET_AUTHORS_SUCCESS,
    GET_AUTHORS_REQUEST,
    GET_AUTHORS_FAILURE
  } from "../action-types";

const initState = {
    items: [],
    error: ""
};

export const authorsReducer = function (state = initState, action) {
  switch (action.type) {
    case GET_AUTHORS_REQUEST:
        return {
          ...state
        };
      case GET_AUTHORS_FAILURE:
        return {
          ...state,
          error: action.payload
        };
    case GET_AUTHORS_SUCCESS:
      return {
        ...state,
        items: action.payload.authors
      };
    default:
      return { ...state };
  } 
};

export default authorsReducer;