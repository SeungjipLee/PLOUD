import React from "react";
import Navbar from "../../components/Navbar";
import Page from "../../components/Page";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import PracticePage from "../PracticePage";
import StudyPage from "../StudyPage";
import API from "../../utils/Api";
import axios from "axios";

// 메인페이지

// 로그인 전과 후로 나뉘며
// 로그인 토큰을 가지고 있을 시
// Navbar에
// 닉네임 마이페이지 로그아웃이 활성화되고
// 로그인 회원가입 버튼이 비활성화된다
// 로그인 되어 있지 않으면 게시판, 연습, 스터디로 가는 버튼이
// 로그인페이지로 향하게 된다

const MainPage = () => {
  return (
    <div className="Main">
      <Page header={<Navbar />} footer={<Footer />}>
        <div className="Main1 mb-24">
          <img src="images/Main1.png" alt="Main1.png" className="w-full h-full object-cover"/>
        </div>
        <div className="Main2 mb-24">
          <div className="video mx-16 ms-36 me-12">
            <video src="videos/cat.mp4" autoPlay loop />
          </div>
          <div className='Main2Container'>
            <div className="mainBlueB text-white card mx-16 me-36 ms-12 text-center pt-5 my-5">Carousel</div>
            <div className="mainBlueB text-white card mx-16 me-36 ms-12 text-center pt-5 my-5">오늘의 발표 수</div>
          </div>
        </div>
        <div className="Main3">
          <h2 className='text-5xl text-center pt-24 font-bold'>스피치 실력을 키워볼까요?</h2>
          <div className='Main3_1 mt-32'>
            <div class="subtitleImg me-12 mb-24">
              <Link to="/practice">
              <img src="images/solo.png"/>
              <div class="text">연습모드 바로가기</div>
              </Link>
            </div>
            <div class="subtitleImg mb-24">
              <Link to="/study">
              <img src="images/study.png"/>
              <div class="text">스터디룸 바로가기</div>
              </Link>
            </div>
          </div>
        </div>
        <div className="Main1 mb-24">
          <img src="images/evaluation2.PNG" className="w-full h-full object-cover"/>
        </div>
      </Page>
    </div>
  );
};

export default MainPage;
