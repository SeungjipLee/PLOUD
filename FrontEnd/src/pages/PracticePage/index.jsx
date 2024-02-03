import React from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";

const PracticePage = () => {
  return (
    <>
      <Navbar />
      <h1>연습페이지 만들기</h1>
      <Sidebar />
    </>
  );
};

export default PracticePage;
