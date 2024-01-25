import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./app/store";
import { Provider } from "react-redux";
// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/300.css';

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <Provider store={store}>
      <App />
    </Provider>
);
