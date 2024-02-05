import { useSelector,useDispatch } from "react-redux";
import React, { useState } from "react";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Page from "../../components/Page";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import { refreshAccessToken, updateNickname } from "../../features/user/userSlice";




const PatchInfoPage = () => {
  // 로직
  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    // 파일을 읽어서 미리보기 이미지를 생성합니다.
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  return (
      <div className="mypage bg-white w-full min-h-screen">
      <Page header={<Navbar />} footer={<Footer />}>
      <div className="mt-28 place-self-center flex justify-center">
          <h2 className="font-extrabold text-2xl">회원 정보 수정</h2>
      </div>

      {/* 완전 밖 */}
      <div className="flex justify-center relative bg-white rounded-md outline1 mx-auto my10">
        <div className="outline1 pt-5 pb-10">
          {/* 사진이랑 버튼 */}
          <div className="flex fetImg ">
            <div className="w-48 h-48 p-2 border rounded-xl">
              {preview && (
                <div>
                  <img src={preview} alt="Preview" className="w-44 h-44"/>
                </div>
              )}
              {!preview && <img src="images/Profile.PNG" />}
              <br />
              <input type="file" accept="image/*" onChange={handleFileInput} className="mb-3" />
            </div>
              <button 
                className="bg-gray-400 text-white rounded-md p-1 mx-7 mt-16">
                  프로필 사진 변경
              </button>
          </div>
          {/* 닉네임이랑 수정하기 버튼 */}
          <div className="flex justify-center my-3">
            <form action="" className="flex mx-1">
              <input 
                type="text" 
                className="w-56 block rounded-md border-0 py-1 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mx-auto my-5"
                placeholder="닉네임"/>
                <button className="bg-gray-400 text-white rounded-md p-1 mx-3 my-5">수정하기</button>
            </form>
            </div>
          {/* 비밀번호, 마이페이지 버튼 */}
          <div className="flex justify-center m-10">
              <Link to="/resetpw" className="bg-gray-400 text-white rounded-md px-3 py-1 mx-3 my-3">비밀번호 재설정</Link>
              <Link to="/mypage" className="bg-gray-400 text-white rounded-md px-3 py-1 mx-3 my-3">마이페이지</Link>
          </div>
          <span 
            className="checkPatch text-gray-400">
              중복확인
          </span>
        </div>
      </div>

      </Page>
    </div>
  );
};

export default PatchInfoPage;