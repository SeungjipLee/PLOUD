import Page from "../../components/Page";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import { useState } from "react";

const PracticePage2 = () => {
  const [level, setLevel] = useState("1");

  return (
    <div className="bg-white w-full min-h-screen">
      <Page header={<Navbar />} footer={<Footer />}>
        <div className="mt-28">
          <div className="text-center font-extrabold text-2xl mainBlueF mb-10">
            혼자연습
          </div>

          <div className="flex flex-col mx-60 bg-sky-100 ps-10 py-10 border border-black rounded-2xl mb-24">
            <div className="flex mb-5">
              <div className="text-xl mainBlueF font-bold">1. 대본 :</div>
              <Link
                to="/practice1"
                className="ms-3 bg-blue-300 text-gray-200 rounded-xl px-2 py-1">
                직접 입력
              </Link>
              <button className="ms-3 bg-blue-500 text-white rounded-xl px-2 py-1">
                제공 대본
              </button>
              <p className="ms-3 text-red-500">
                🎤준비된 대본들을 찾아 연습해보세요!
              </p>
            </div>
            <div className="flex mb-5">
              <div className="text-xl mainBlueF font-bold">2. 단계 :</div>
              <select
                name=""
                id=""
                className="ms-5 rounded-xl px-3 py-0.5 border border-black">
                <option value="">Level 1</option>
                <option value="">Level 2</option>
                <option value="">Level 3</option>
                <option value="">Level 4</option>
              </select>
              <p className="ms-3 text-red-500">🎤단계에 대한 설명이 들어가요</p>
            </div>
            <div className="flex mb-5">
              <div className="text-xl mainBlueF font-bold py-1">3. 분류 :</div>
              <button className="ms-5 bg-blue-500 text-white rounded-xl px-2 ">
                뉴스
              </button>
              <button className="ms-3 bg-blue-300 text-gray-200 rounded-xl px-2 ">
                연설
              </button>
            </div>
            <div className="flex mb-10 w-full">
              <div className="text-xl mainBlueF font-bold pt-1">4. 내용 :</div>

              <div className="ms-5 border border-black rounded-2xl px-5 py-2 w-3/4 h-80 flex">
                <div className="w-1/3 border-r border-black flex flex-col pe-4">
                  <div className="text-xl font-bold">목록</div>
                  <div className="m-2 bg-white h-64 rounded-xl p-4 h-64">
                    목록 리스트
                  </div>
                </div>
                <div className="w-2/3 ms-5 pb-5">
                  <div className="text-xl font-bold">미리보기</div>
                  <div className="m-2 bg-white h-64 rounded-xl p-4">
                    미리보기 내용
                  </div>
                </div>
              </div>
            </div>
            <button className="self-center mb-2 rounded-xl border border-black px-2 py-1 bg-blue-500 text-gray-200 text-lg">
              녹화 시작하기
            </button>
          </div>
        </div>
      </Page>
    </div>
  );
};

export default PracticePage2;
