
import {
  SIGN_IN_FAILURE,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_OUT_FAILURE,
  SIGN_OUT_REQUEST,
  SIGN_OUT_SUCCESS
} from "../action-types";


const initState = {
    currentUser: localStorage.getItem("USER-TOKEN"),
    token: localStorage.getItem("USER-TOKEN")
      ? localStorage.getItem("USER-TOKEN")
      : null,
    error: ""
};

export const authenticationReducer = function (state = initState, action) {
  switch (action.type) {
    case SIGN_IN_REQUEST:
    case SIGN_OUT_REQUEST:
      return {
        ...state,
      };
    case SIGN_IN_FAILURE:
    case SIGN_OUT_FAILURE:
      return {
        ...state,
        error: action.payload,
        currentUser: null,
      };
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        token: action.payload.token,
        currentUser: action.payload.token,
      };
    case SIGN_OUT_SUCCESS:
      localStorage.removeItem("USER-TOKEN");
      return {
        ...state,
        currentUser: null,
        token: "",
      };
    default:
      return { ...state };
  }
};

export default authenticationReducer;