import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { reducer as formReducer } from "redux-form";
import "./index.css";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";
import CartContextProvider from "./contexts/CartContext";

const rootReducer = combineReducers({
  form: formReducer,
});

const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <HelmetProvider>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    </HelmetProvider>
  </Provider>,
  document.getElementById("root")
);
