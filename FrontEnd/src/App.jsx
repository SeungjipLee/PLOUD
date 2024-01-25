import React from "react";
import Router from "./lib/MyRouter";
import Navbar from "./components/Navbar";
import { Counter } from "./features/counter/Counter";

const App = () => {
  return (
    <>
      <Router/>
      {/* <Counter/> */}
    </>
  );
};

export default App;
