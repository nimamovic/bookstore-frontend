import axios from "axios";
import {
  SIGN_IN_FAILURE,
  SIGN_IN_REQUEST,
  SIGN_IN_SUCCESS,
  SIGN_OUT_FAILURE,
  SIGN_OUT_REQUEST,
  SIGN_OUT_SUCCESS
} from "../action-types";

//Sign in action creators
const signInRequest = () => {
  return {
    type: SIGN_IN_REQUEST,
  };
};
const signInSuccess = (token) => {
  return {
    type: SIGN_IN_SUCCESS,
    payload: {
      token
    },
  };
};
const signInFailure = (error) => {
  return {
    type: SIGN_IN_FAILURE,
    payload: error,
  };
};

export const signIn = (payload,history) => {
  return function (dispatch) {
    dispatch(signInRequest);
    axios({
      method: "post",
      url: "/login",
      data: payload,
    }).then((response) => {
        const token = response.data.token;
        localStorage.setItem("USER-TOKEN", token);
        if(localStorage.getItem("USER-TOKEN")) dispatch(signInSuccess(token));
      })
      .catch((error) => {
        dispatch(signInFailure(error));
      });
  };
};


//sign out action creators
export const signOutRequest = function () {
  return {
    type: SIGN_OUT_REQUEST,
  };
};

export const signOutSuccess = function () {
  return {
    type: SIGN_OUT_SUCCESS,
  };
};

export const signOutFailure = function () {
  return {
    type: SIGN_OUT_FAILURE,
  };
};

export const signOut = function () {
  return function (dispatch) {
    dispatch(signOutRequest());
    localStorage.clear();
    console.log(localStorage.getItem("USER_TOKEN"));
    if (localStorage.getItem("USER_TOKEN")) {
      dispatch(signOutFailure());
    } else {
      dispatch(signOutSuccess());
    }
  };
};