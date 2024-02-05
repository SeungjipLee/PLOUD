import { useSelector,useDispatch } from "react-redux";
import React, { useState } from "react";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Page from "../../components/Page";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import { refreshAccessToken, updateNickname } from "../../features/user/userSlice";




const CreateBoard = () => {
  // 로직

  return (
      <div className="mypage bg-white w-full min-h-screen">
      <Page header={<Navbar />} footer={<Footer />}>
        <div className="flex justify-center w-full mt-24">
          <div className="creBoaOut">
            <div className="text-center">
              <h2 className="font-extrabold text-2xl">게시글 작성</h2>
            </div>

          <div className="border-2 border-black mx-20 px-10 my-5 rounded-xl">
            <div className="mt-5 mb-2 text-xl">제목</div>
            <div>
              <input
                type="text"
                className="block w-full rounded-md border-0 py-1 pl-5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
            </div>
            <div className="mt-5 mb-2 text-xl">내용</div>
            <div className="border rounded-md mb-10">
            <div className="bg-white w-full h-7"><img src="images/createBoard.png" className="h-full pl-2"/></div>
            <textarea
              className=" block w-full h-80 border-0 py-1 pl-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            </div>
          </div>
          <div className="createBtn px-60">
        <button class="border writeBtn rounded-md py-1 px-4 mx-10">등록</button>
        <button class="border writeBtn1 rounded-md py-1 px-4 mx-10"><Link to={"/board"}>취소</Link></button>
          </div>
          </div>
        </div>
      </Page>
    </div>
  );
};

export default CreateBoard;