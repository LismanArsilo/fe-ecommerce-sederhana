import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import store from "./storeReduxToolkit/index";
import { Provider } from "react-redux";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
