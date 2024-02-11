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
    <div style={{ backgroundColor: "#EBEAFA" }}>
      <Page header={<Navbar />} footer={<Footer />}>
        <div style={{ paddingTop: "130px" }}></div>
        <div
          align="center"
          style={{ paddingLeft: "120px", paddingRight: "120px" }}
          className="text-2xl text-sky-950 font-extrabold mainBlueF">
          혼자 연습
        </div>
        <div style={{ paddingLeft: "120px", paddingRight: "120px" }}>
          <div
            style={{
              paddingTop: "30px",
              display: "flex",
              justifyContent: "space-between",
            }}>
            <div>
              {currentPage === "write" ? (
                <>
                  <Button
                    ref={buttonRef}
                    variant="outlined"
                    className="border border-blue-950 p-2 bg-white focus:text-blue-900"
                    style={{ borderTopLeftRadius: "20%" }}
                    onClick={() => setCurrentPage("write")}>
                    대본입력
                  </Button>
                  <Button
                    variant="outlined"
                    className="border border-blue-950 p-2 bg-gray-400 text-white"
                    style={{ borderTopRightRadius: "20%" }}
                    onClick={() => setCurrentPage("select")}>
                    대본선택
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    ref={buttonRef}
                    variant="outlined"
                    className="border border-blue-950  p-2 bg-gray-400 text-white"
                    style={{ borderTopLeftRadius: "20%" }}
                    onClick={() => setCurrentPage("write")}>
                    대본입력
                  </Button>
                  <Button
                    variant="outlined"
                    className="border border-blue-950 p-2 bg-white focus:text-blue-900"
                    style={{ borderTopRightRadius: "20%" }}
                    onClick={() => setCurrentPage("select")}>
                    대본선택
                  </Button>
                </>
              )}
            </div>

            {/* 단계선택 */}
            {currentPage === "write" && (
              <div>
                <span className="font-bold text-blue-950">단계</span>
                <select
                  className="border border-blue-950 p-1 bg-whittext-blue-900 ml-4"
                  value={level}
                  onChange={handleLevel}>
                  <option value="1">level 1</option>
                  <option value="2">level 2</option>
                  <option value="3">level 3</option>
                  <option value="4">level 4</option>
                </select>
              </div>
            )}
            {currentPage === "select" && (
              <div>
                <span className="font-bold text-blue-950">단계</span>
                <select
                  className="border border-blue-950 p-1 bg-whittext-blue-900 ml-4"
                  value={level}
                  onChange={handleLevel}>
                  <option value="1">level 1</option>
                  <option value="2">level 2</option>
                  <option value="3">level 3</option>
                  <option value="4">level 4</option>
                </select>
              </div>
            )}
          </div>
          {currentPage === "write" && <ScriptWrite level={level} />}
          {currentPage === "select" && <ScriptSelect level={level} />}
        </div>
      </Page>
    </div>
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
    <div>
      <div style={{ height: "600px" }} className="mb-32">
        <Input
          className="border border-blue-950 rounded p-2 h-15 bg-white"
          variant="outlined"
          placeholder="제목을 입력해 주세요"
          onChange={titleChange}
        />
        <textarea
          style={{ resize: "none" }}
          className="h-full w-full border border-blue-950 rounded p-2 h-80 bg-white"
          color="blue"
          placeholder="내용을 입력해 주세요. (최대 3000자)"
          onChange={contentChange}
        />
        <div
          align="right"
          className="mt-3"
          style={{ fontWeight: "bold", color: "#0C134F" }}>
          {level == 1 && (
            <Link to="/practice/Level1" state={{ content: content }}>
              <span className="practice-startText">녹화 시작하기 ▶</span>
            </Link>
          )}
          {level == 2 && (
            <Link to="/practice/Level2" state={{ content: content }}>
              <span className="practice-startText">녹화 시작하기 ▶</span>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

const ScriptSelect = ({ level }) => {
  return (
    <>
      <div
        className="bg-white p-2 mb-32 border border-blue-950 rounded"
        // style={{
        //   paddingLeft: "10px",
        //   paddingTop: "20px",
        // }}
      >
        <Sidebar level={level} />
      </div>
    </>
  );
};

export default PracticePage;
