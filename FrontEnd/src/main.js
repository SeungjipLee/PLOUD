import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./app/store";
import { Provider } from "react-redux";
import { StrictMode } from "react";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "./app/persistor";
import "./index.css"

const root = ReactDOM.createRoot(document.getElementById("root"));
persistor;
root.render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={<div>Loading...</div>} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>
);
