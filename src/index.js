import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import makeStore from "./redux/store";
import 'bootstrap/dist/css/bootstrap.min.css';  


const store = makeStore();
//store.dispatch(getBooks());
//store.dispatch(getAuthors());

const WithProvider = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(<WithProvider/>, document.getElementById("root"));

