import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Page from "../../components/Page";
import Footer from "../../components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Slideshow from "./Slideshow";
import { getSpeechCount } from "../../services/speech";
import MyAlert from "../../components/MyAlert";

const MainPage = () => {
  const { isLogined } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const [speechCount, setSpeechCount] = useState(0);
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState(false);
  const handleLink = async (path) => {
    if (isLogined) {
      navigate(path);
    } else {
      // alert('로그인이 필요합니다.')
      await setMessage("로그인이 필요합니다.");
      setAlert(true);
      // navigate('/login')
    }
  };
  const [modal, setModal] = useState(true);
  const handleClose = () => {
    setModal(false);
  };

  // scroll animation
  useEffect(() => {
    // get speech count
    getSpeechCount(
      (res) => {
        // console.log(res.data.data)
        setSpeechCount(res.data.data.count);
      },
      (err) => console.log("스피치 개수 불러오는 중 오류 발생")
    );
    // end get speech count

    var scrollEvent = function () {
      // 사용자 모니터 화면 높이 + 스크롤이 움직인 높이
      var scroll = window.innerHeight + window.scrollY;

      // 애니메이션 효과를 넣을 DOM 객체 배열
      var itemList = document.querySelectorAll(".animatable");

      Array.prototype.forEach.call(itemList, function (li) {
        // 객체 위치와 높이 비교 : 화면에 표출되는 높이인지 체크
        if (li.offsetTop < scroll) {
          // 객체 animatable 클래스 지우고, animated 클래스 추가
          li.classList.remove("animatable");
          li.classList.add("animated");
        }
      });
    };

    // 스크롤 이벤트 리스너 등록
    window.addEventListener("scroll", scrollEvent);

    // 컴포넌트가 언마운트될 때 리스너 제거
    return () => {
      window.removeEventListener("scroll", scrollEvent);
    };
  }, []);
  // end scroll animation

  return (
    <>
      <div>
        <Page header={<Navbar />} footer={<Footer />}>
          {/* main1 */}
          <div
            style={{ height: "100vh", position: "relative" }}
            className="mainBlueB"
          >
            <img
              src="/images/main1transparent.png"
              alt=""
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                zIndex: "1",
              }}
            />
            <div
              className="text-5xl font-extrabold mainOrangeF mainPageFont fadein"
              style={{
                position: "absolute",
                top: "35%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                fontSize: "20vw",
              }}
            >
              PLOUD
            </div>
          </div>
          {/* main2; video */}
          <div style={{ height: "100vh" }} className="Main2 bg-white">
            <div className="video mx-16">
              <video src="/videos/mainvideo.mp4" autoPlay loop muted></video>
            </div>
            <div>
              <div className="Main2Container me-36">
                <div
                  className="mainBlueB text-white card text-center pt-5 my-5"
                  style={{
                    borderRadius: "10%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <div className="font-extrabold text-2xl">누적 발표수</div>
                  <div className="mt-3 font-extrabold text-2xl">{`${speechCount}`}</div>
                </div>
                <Slideshow className="mainBlueB text-white card text-center pt-5 my-5"></Slideshow>
              </div>
            </div>
          </div>
          {/* main3; link */}
          <div style={{ height: "100vh" }} className="bg-white">
            <h2 className="text-5xl text-center font-bold pt-24">
              스피치 실력을 키워볼까요?
            </h2>
            <div className="Main3_1 mt-32">
              <div
                className="subtitleImg me-12 mb-24 animatable"
                onClick={() => handleLink("/practice1")}
              >
                <img src="images/solo.png" />
                <div className="text cursor-pointer font-bold ">
                  연습모드 바로가기
                </div>
              </div>
              <div
                className="subtitleImg mb-24 animatable"
                onClick={() => handleLink("/study")}
              >
                <img src="images/study.png" />
                <div className="text cursor-pointer font-bold">
                  스터디룸 바로가기
                </div>
              </div>
            </div>
          </div>
          {/* main4; about us */}
          <div
            style={{ height: "100vh", position: "relative" }}
            className="bg-white animatable"
          >
            <img
              src="images/AboutUs.png"
              alt="about us"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>
        </Page>
      </div>
      {alert && (
        <MyAlert
          content={message}
          onClose={() => {
            setAlert(false);
            navigate("/login");
          }}
        />
      )}
    </>
  );
};

export default MainPage;
