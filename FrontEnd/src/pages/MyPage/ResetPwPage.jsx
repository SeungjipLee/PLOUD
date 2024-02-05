import { useSelector,useDispatch } from "react-redux";
import React, { useState } from "react";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Page from "../../components/Page";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import { refreshAccessToken, updateNickname } from "../../features/user/userSlice";




const ResetPwPage = () => {
  // 로직
  const { token } = useSelector((state) => state.userReducer)

  return (
      <div className="mypage bg-white w-full min-h-screen">
      <Page header={<Navbar />} footer={<Footer />}>
      <div className="mt-32 place-self-center flex justify-center">
          <h2 className="font-extrabold text-2xl">비밀번호 변경</h2>
      </div>
      <div className="flex justify-center relative bg-white rounded-md outline1 mx-auto my-5">
        <div className="outline1 py-10">
          <div className="flex fetImg ">
            <div><img src="images/Profile.PNG" className="w-48 h-48"/></div>
            <p className="pt-2">지비집</p>
          </div>
          <div className="flex justify-center my-4">
          <form action="" className="mx-1">
            <input 
              type="password" 
              className="w-64 block rounded-md border-0 py-1 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mx-auto my-5"
              placeholder="비밀번호"/>
            <input 
              type="password" 
              className="w-64 block rounded-md border-0 py-1 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mx-auto my-5"
              placeholder="비밀번호 확인"/>
            <input 
              type="password" 
              className="w-64 block rounded-md border-0 py-1 px-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mx-auto my-5"
              placeholder="새 비밀번호"/>
          </form>
          </div>
          <div className="flex justify-center m-10">
              <button className="bg-gray-400 text-white rounded-md px-3 py-1 mx-3 my-3">비밀번호 변경하기</button>
          </div>
        </div>
      </div>

      </Page>
    </div>
  );
};

export default ResetPwPage;