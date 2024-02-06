import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "./sidebar/Sidebar";
import { Button, Input, Textarea } from "@material-tailwind/react";
import { useState, useRef } from "react";
import Page from "../../components/Page";
import Footer from "../../components/Footer";
import {
  getCategoryList,
  getScriptList,
  getScriptDetail,
} from "../../services/script";

const PracticePage = () => {
  const [currentPage, setCurrentPage] = useState("write");
  const buttonRef = useRef(null);

  useEffect(() => {
    buttonRef.current.focus();
  }, []);

  return (
    <>
      <Page header={<Navbar />} footer={<Footer />}>
        <div style={{ paddingTop: "130px" }}></div>
        <div
          style={{ paddingLeft: "120px" }}
          className="text-3xl text-sky-950 font-bold "
        >
          혼자 연습
        </div>
        <div style={{ paddingLeft: "120px", paddingRight: "120px" }}>
          <div style={{ paddingTop: "30px" }}></div>

          {currentPage === "write" ? (
            <>
              <Button
                ref={buttonRef}
                variant="outlined"
                className="border border-blue-950  p-1 bg-white focus:text-blue-900"
                onClick={() => setCurrentPage("write")}
              >
                대본입력
              </Button>
              <Button
                variant="outlined"
                className="border border-blue-950 p-1  bg-gray-400 text-white"
                onClick={() => setCurrentPage("select")}
              >
                대본선택
              </Button>
            </>
          ) : (
            <>
              <Button
                ref={buttonRef}
                variant="outlined"
                className="border border-blue-950  p-1 bg-gray-400 text-white"
                onClick={() => setCurrentPage("write")}
              >
                대본입력
              </Button>
              <Button
                variant="outlined"
                className="border border-blue-950 p-1  bg-white focus:text-blue-900"
                onClick={() => setCurrentPage("select")}
              >
                대본선택
              </Button>
            </>
          )}

          {currentPage === "write" && <ScriptWrite />}
          {currentPage === "select" && <ScriptSelect />}
        </div>
      </Page>
    </>
  );
};

const ScriptWrite = () => {
  return (
    <>
      <span className="ml-24 font-bold text-blue-950">단계</span>
      <select className="border border-blue-950 p-1 bg-whittext-blue-900 ml-4">
        <option value="1">level 1</option>
        <option value="2">level 2</option>
        <option value="3">level 3</option>
        <option value="4">level 4</option>
      </select>
      <div>
        <Input
          className="border border-blue-950 rounded p-2 h-15 bg-white"
          variant="outlined"
          placeholder="제목: 제목을 입력해 주세요"
        />
        <Textarea
          style={{ height: "300px" }}
          className="border border-blue-950 rounded p-2 h-80 bg-white"
          color="blue"
          placeholder="내용: 내용을 입력해 주세요. (최대 3000자)"
        />
        <button className="bg-blue-950 text-white px-4 py-2 rounded ">
          녹화 화면 가기 (나중에 라우터로 이동시키기)
        </button>
      </div>
    </>
  );
};

const ScriptSelect = () => {
  return (
    <div
      className=" bg-white"
      style={{ paddingLeft: "10px", paddingRight: "10px", paddingTop: "20px" }}
    >
      <Sidebar />
    </div>
  );
};

export default PracticePage;
