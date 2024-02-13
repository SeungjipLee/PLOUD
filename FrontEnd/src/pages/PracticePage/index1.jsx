import Page from "../../components/Page";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { useState } from "react";

const PracticePage1 = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [level, setLevel] = useState("1");

  const titleChange = (e) => {
    setTitle(e.target.value);
  };

  const contentChange = (e) => {
    setContent(e.target.value);
  };

  const handleLevel = (e) => {
    setLevel(e.target.value);
  };

  return (
    <div className="bg-white w-full min-h-screen">
      <Page header={<Navbar />} footer={<Footer />}>
        <div className="mt-28">
          <div className="text-center font-extrabold text-2xl mainBlueF mb-10">
            혼자연습
          </div>

          <div className="flex flex-col mx-60 bg-sky-100 p-10 border border-black rounded-2xl mb-24">
            <div className="flex mb-5">
              <div className="text-xl mainBlueF font-bold">1. 대본 :</div>
              <button className="ms-5 bg-blue-500 text-white rounded-xl px-2 py-1">
                직접 입력
              </button>
              <Link
                to="/practice2"
                className="ms-3 bg-blue-300 text-gray-200 rounded-xl px-2 py-1"
              >
                제공 대본
              </Link>

              <p className="ms-3 text-red-500">
                🎤원하는 발표의 대본을 직접 입력해보세요!
              </p>
            </div>
            <div className="flex mb-5">
              <div className="text-xl mainBlueF font-bold">2. 단계 :</div>
              <select
                className="ms-5 rounded-xl px-3 py-0.5 border border-black"
                value={level}
                onChange={handleLevel}
              >
                <option value="1">Level 1</option>
                <option value="2">Level 2</option>
                <option value="3">Level 3</option>
                <option value="4">Level 4</option>
              </select>
              <p className="ms-3 text-red-500">🎤단계에 대한 설명이 들어가요</p>
            </div>
            <div className="flex mb-5">
              <div className="text-xl mainBlueF font-bold py-1">3. 제목 :</div>
              <input
                type="text"
                className="ms-5 border border-black rounded-2xl px-5 py-1.5 w-1/2"
                placeholder="제목을 입력해주세요."
                onChange={titleChange}
                style={{ whiteSpace: "pre-wrap" }}
              />
              <img src="/images/check.png" className="ms-3 w-7 h-7 mt-1"></img>
            </div>
            <div className="flex mb-10">
              <div className="text-xl mainBlueF font-bold pt-1">4. 내용 :</div>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                className="ms-5 border border-black rounded-2xl px-5 py-2 w-3/4 h-80"
                onChange={contentChange}
                placeholder="내용을 입력해주세요. (최대 3000자)"
                style={{ whiteSpace: "pre-wrap" }}
              ></textarea>
              <img src="/images/check.png" className="ms-3 w-7 h-7 mt-1"></img>
            </div>
            {level == 1 && (
              <Link
                to="/practice/Level1"
                state={{ content: content, title: title }}
                className="self-center mb-2 rounded-xl border border-black px-2 py-1 bg-blue-500 text-gray-200 text-lg"
              >
                <span className="practice-startText">녹화 시작하기</span>
              </Link>
            )}
            {level == 2 && (
              <Link
                to="/practice/Level2"
                state={{ content: content }}
                className="self-center mb-2 rounded-xl border border-black px-2 py-1 bg-blue-500 text-gray-200 text-lg"
              >
                <span className="practice-startText">녹화 시작하기</span>
              </Link>
            )}
            {level == 3 && (
              <Link
                to="/practice/Level3"
                state={{ content: content }}
                className="self-center mb-2 rounded-xl border border-black px-2 py-1 bg-blue-500 text-gray-200 text-lg"
              >
                <span className="practice-startText">녹화 시작하기</span>
              </Link>
            )}
            {level == 4 && (
              <Link
                to="/practice/Level4"
                state={{ content: content }}
                className="self-center mb-2 rounded-xl border border-black px-2 py-1 bg-blue-500 text-gray-200 text-lg"
              >
                <span className="practice-startText">녹화 시작하기</span>
              </Link>
            )}
          </div>
        </div>
      </Page>
    </div>
  );
};

export default PracticePage1;
