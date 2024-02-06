import Modal from "../../../components/Modal";
import React, { useState } from "react";
import Footer from "../../../components/Footer"
import Navbar from "../../../components/Navbar";
import Page from "../../../components/Page";
import { Link } from "react-router-dom";
import BarChart from "../../../components/BarChart";

const StudyResult = ({ onClose }) => {
  const [ isDetail,setIsDetail ] = useState(true)

  const handleDetail = () => {
    setIsDetail(!isDetail)
  }


  return (
    <Modal
      title="스터디 결과 발표 - 스터디룸"
      className="study-result"
    >
      <div className="result-section">
        <div className="result-section-1 mx-5">
          <div className="p-2">
            <div className="score rounded-xl w-68 h-52 m-auto text-center py-16">
              여기 영상 들어옴
            </div>
          </div>
          <div className="p-2">
            <div className="score w-68 h-36 m-auto grid grid-cols-2 text-center place-content-center rounded-xl">
              <div className="text-2xl mt-5 ps-5 pb-4 ms-5">결과   :</div>
              <div className="text-5xl me-5 pt-2 pe-5 me-5">A</div>                
            </div>
          </div>
        </div>
        <div className="result-section-2 mx-7">

          {isDetail&&<div className="h-12 mb-2 text-center text-xl">
              <span className="mx-10 font-bold">세부 결과</span>
              <span className="mx-10 text-3xl">|</span>
              <span onClick={handleDetail} className="mx-10 text-gray-400 font-bold cursor-pointer">피드백</span>
          </div>}


          {isDetail&&<div className="bg-white h-72 mb-2 rounded-md pt-5">
            <BarChart/>
          </div>}


          {!isDetail&&<div className="h-12 mb-2 text-center text-xl">
              <span onClick={handleDetail} className="mx-10 text-gray-400 font-bold cursor-pointer">세부 결과</span>
              <span className="mx-10 text-3xl">|</span>
              <span className="mx-10 font-bold">피드백</span>
          </div>}


          {!isDetail&&<div className="h-72 mb-2">
            <div className="flex flex-row">
              <div className="basis-2/3 flex flex-col rounded-xl bg-gray-200 w-24 h-64 m-4">
                <div className="mx-2 my-2 bg-gray-200 h-8 text-xl text-center font-bold py-1">시간별 피드백</div>
                <div className="mx-5 mb-3 bg-white h-52 p-5">
                  <p className="py-0.5">(00:01) 피드백 1</p>
                  <p className="py-0.5">(00:02) 피드백 2</p>
                  <p className="py-0.5">(00:03) 피드백 3</p>
                  <p className="py-0.5">(00:04) 피드백 4</p>             
                  </div>
              </div>
              <div className="basis-1/3 h-64 m-4">
                <div className="flex flex-col m-2 rounded-xl bg-gray-200 h-40 my-12">
                  <div className="h-8 mx-2 my-1 text-lr text-center font-bold py-1">나의 피드백</div>
                  <div className="h-24 mx-3 mb-3 bg-white flex justify-center">
                    <textarea name="" id="" cols="20" rows="3" placeholder="피드백을 남겨보세요."></textarea>
                  </div>
                  <button className="mb-3 bg-white w-1/2 mx-auto">작성</button>
                </div>
              </div>
            </div>
          </div>}


          <div className="h-10">
            <div className="text-sm text-end me-5">skip</div>
            <div className="text-end">이 창은 20초 후 자동으로 닫힙니다.</div>
          </div>




        </div>
      </div>
    </Modal>
  );
};

export default StudyResult;
