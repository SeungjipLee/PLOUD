import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "./sidebar/Sidebar";
import { Button, Input, Textarea } from "@material-tailwind/react";
import { useState, useRef } from "react";
import Page from "../../components/Page";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import {
  getCategoryList,
  getScriptList,
  getScriptDetail,
} from "../../services/script";

const PracticePage = () => {
  const [currentPage, setCurrentPage] = useState("write");

  const [level, setLevel] = useState("1");

  const handleLevel = (e) => {
    setLevel(e.target.value);
  };

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
          className="text-3xl text-sky-950 font-bold ">
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
                onClick={() => setCurrentPage("write")}>
                대본입력
              </Button>
              <Button
                variant="outlined"
                className="border border-blue-950 p-1  bg-gray-400 text-white"
                onClick={() => setCurrentPage("select")}>
                대본선택
              </Button>
            </>
          ) : (
            <>
              <Button
                ref={buttonRef}
                variant="outlined"
                className="border border-blue-950  p-1 bg-gray-400 text-white"
                onClick={() => setCurrentPage("write")}>
                대본입력
              </Button>
              <Button
                variant="outlined"
                className="border border-blue-950 p-1  bg-white focus:text-blue-900"
                onClick={() => setCurrentPage("select")}>
                대본선택
              </Button>
            </>
          )}

          <span className="ml-24 font-bold text-blue-950">단계</span>
          <select
            className="border border-blue-950 p-1 bg-whittext-blue-900 ml-4"
            value={level}
            onChange={handleLevel}>
            <option value="1">level 1</option>
            <option value="2">level 2</option>
            <option value="3">level 3</option>
            <option value="4">level 4</option>
          </select>

          {currentPage === "write" && <ScriptWrite level={level} />}
          {currentPage === "select" && <ScriptSelect level={level} />}
        </div>
      </Page>
    </>
  );
};

const ScriptWrite = ({ level }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const titleChange = (e) => {
    setTitle(e.target.value);
  };

  const contentChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <>
      <div style={{ height: "500px" }}>
        <Input
          className="border border-blue-950 rounded p-2 h-15 bg-white"
          variant="outlined"
          placeholder="제목: 제목을 입력해 주세요"
          onChange={titleChange}
        />
        <Textarea
          style={{ height: "300px" }}
          className="border border-blue-950 rounded p-2 h-80 bg-white"
          color="blue"
          placeholder="내용: 내용을 입력해 주세요. (최대 3000자)"
          onChange={contentChange}
        />
        <div style={{ height: "20px" }}>
          {level == 1 && (
            <Link
              className="bg-slate-300 absolute"
              to="/practice/Level1"
              state={{ content: content }}>
              녹화 페이지 이동
            </Link>
          )}
          {level == 2 && (
            <Link
              className="bg-slate-300"
              to="/practice/Level2"
              state={{ content: content }}>
              녹화 페이지 이동
            </Link>
          )}
        </div>
      </div>
    </>
  );
};

const ScriptSelect = ({ level }) => {
  return (
    <>
      <div
        className=" bg-white"
        style={{
          paddingLeft: "10px",
          paddingTop: "20px",
          height: "600px",
        }}>
        <Sidebar level={level} />
      </div>
    </>
  );
};

export default PracticePage;
