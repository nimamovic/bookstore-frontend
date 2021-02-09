import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import { combineReducers } from "redux";
import { booksReducer } from "./reducers/books.reducer";
import { bookReducer } from "./reducers/book.reducer";
import { authorsReducer } from "./reducers/authors.reducer";
import { authorReducer } from "./reducers/author.reducer";
import { authenticationReducer } from "./reducers/auth.reducer";


const createRootReducer = () =>
  combineReducers({
    authentication: authenticationReducer,
    books: booksReducer,
    book: bookReducer,
    authors: authorsReducer,
    author: authorReducer
  });

const initState = {
  authentication: {
    currentUser: null,
    token: "",
    error: ""
  },
  books: {
    items: [],
    error: ""
  },
  book: {
    item: [],
    error: ""
  },
  authors: {
    items: [],
    error: ""
  },
  author: {
    item: [],
    error: ""
  }
}

export default function makeStore(initialState = initState) {
  let composeEnhancers = compose;
  const middlewares = [thunk];

  if (process.env.NODE_ENV === "development") {
    if (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) {
      composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
    }
  }
  const store = createStore(
    createRootReducer(),
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );
  return store;
}