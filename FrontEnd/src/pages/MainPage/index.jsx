import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Page from "../../components/Page";
import Footer from "../../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


const MainPage = () => {
  const { isLogined } = useSelector((state) => state.userReducer);
  const navigate = useNavigate()
  
  const handleLink = (path) => {
    if (isLogined) {
      navigate(path)
    } else {
      alert('로그인이 필요합니다.')
      navigate('/login')
    }
  }
  const [modal, setModal] = useState(true)
  const handleClose = () => {
    setModal(false)
  }
  return (
    <div className="Main">
      <Page header={<Navbar />} footer={<Footer />}>
        <div className="Main1 mb-24">
          <img src="images/2.png" className="w-full h-full object-cover"/>
        </div>
        <div className="Main2 mb-24">
          <div className="video mx-16 ms-36 me-12">
            <video src="/videos/mainvideo.mp4" autoPlay loop muted/>
          </div>
          <div className='Main2Container'>
            <div className="mainBlueB text-white card mx-16 me-36 ms-12 text-center pt-5 my-5">Carousel</div>
            <div className="mainBlueB text-white card mx-16 me-36 ms-12 text-center pt-5 my-5">오늘의 발표 수</div>
          </div>
        </div>
        <div className="Main3">
          <h2 className='text-5xl text-center pt-24 font-bold'>스피치 실력을 키워볼까요?</h2>
          <div className='Main3_1 mt-32'>
            <div className="subtitleImg me-12 mb-24" onClick={() => handleLink('/practice')}>
              <img src="images/solo.png"/>
              <div className="text cursor-pointer">연습모드 바로가기</div>
            </div>
            <div className="subtitleImg mb-24" onClick={() => handleLink('/study')}>
              <img src="images/study.png"/>
              <div className="text cursor-pointer">스터디룸 바로가기</div>
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
