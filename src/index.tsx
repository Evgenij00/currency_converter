import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";

import { CurrencyServiceProvider } from "./currency-service-context";
import CurrencyService from "./currency-service";
import store from "./store";

import App from "./App";

import "./index.css";

const service = new CurrencyService();

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <CurrencyServiceProvider value={service}>
        <App />
      </CurrencyServiceProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
