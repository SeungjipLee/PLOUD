import Modal from "../../../components/Modal";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BarChart from "../../../components/BarChart";
import { getRecordResult } from "../../../services/record";
import { postComment } from "../../../services/speech";
import LoadingScreen from "./Loading";
import MyAlert from "../../../components/MyAlert";

const StudyResult = ({ onClose, speechId, videoResponse }) => {
  const [isDetail, setIsDetail] = useState(true);
  const { token } = useSelector((state) => state.userReducer);
  const resultId = speechId;
  const [scores, setScores] = useState({});
  const [feedbacks, setFeedbacks] = useState([]);
  const [myFeedback, setMyFeedback] = useState("");
  const [videoPath, setVideoPath] = useState("");
  const [countdown, setCountdown] = useState(20);
  const [grade, setGrade] = useState("");
  const [speech, setSpeech] = useState({});
  const [resultTextColor, setResultTextColor] = useState("#000000");
  // 알림 창 상태
  const [message, setMessage] = useState("");
  const [alert1, setAlert1] = useState(false);

  // 로딩 상태 관리
  const [loading, setLoading] = useState(true);
  const videoRef = useRef(null);
  
  useEffect(() => {
    console.log("유즈 이펙트~");

    setTimeout(() => {
      recordResultGet();
    }, 5000);
  }, []);

  useEffect(() => {
    if (videoResponse === true) {
      // -> 다시 요청
      recordResultGet();
      console.log("결과 페이지 비디오 다시 요청");

      // 스피너 종료
    } else if (videoResponse === false) {
      // 비디오를 올리지 못함.
      setVideoPath("False");
      console.log("결과 페이지 비디오 올리지 못함");
    
        // 스피너 종료
    }
  }, [videoResponse]);

  const recordResultGet = () => {
    console.log("결과 가쟈와~");

    getRecordResult(
      token,
      resultId,
      (res) => {
        console.log(res.data.data);
        setSpeech(res.data.data.speech);
        setScores(res.data.data.score);
        setFeedbacks(res.data.data.feedbacks);
        if (res.data.data.video.videoPath) {
          setVideoPath(res.data.data.video.videoPath);
        }
      },
      (err) => console.log(err)
    );

    setLoading(false); // 로딩 종료
  };

  useEffect(() => {
    if (scores.grade < 20) {
      setGrade("E");
      setResultTextColor("#393939");
    } else if (scores.grade < 40) {
      setGrade("D");
      setResultTextColor("#0C134F");
    } else if (scores.grade < 60) {
      setGrade("C");
      setResultTextColor("#624637");
    } else if (scores.grade < 80) {
      setGrade("B");
      setResultTextColor("#c0c0c0");
    } else {
      setGrade("A");
      setResultTextColor("#ffd700");
    }
  }, [scores.grade]);

  const gradeStyle = {
    background: `linear-gradient(to top, ${resultTextColor} 40%, transparent 40%)`,
  };

  const formatTimeLog = (timeLog) => {
    const match = timeLog.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = match[1] ? match[1].slice(0, -1) : "00";
    const minutes = match[2] ? match[2].slice(0, -1) : "00";
    const seconds = match[3] ? match[3].slice(0, -1) : "00";
    return `${minutes} : ${seconds}`;
  };

  useEffect(() => {
    // 카운트다운 시작
    const timerId = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    // 20초 후 모달 자동 닫기
    const timeoutId = setTimeout(() => {
      onClose(); // 모달 닫는 함수 호출
    }, 20000);

    return () => {
      clearInterval(timerId); // 컴포넌트 언마운트 시 타이머 제거
      clearTimeout(timeoutId); // 타임아웃 제거
    };
  }, [onClose]);

  const handleSkip = () => {
    if (typeof onClose === "function") {
      onClose(); // "skip" 버튼 클릭 시 모달 닫기
    }
  };

  const handleDetail = () => {
    setIsDetail(!isDetail);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const response = postComment(
        token,
        {
          speechId: resultId,
          comment: myFeedback,
        },
        (res) => {
          setMessage("내 피드백이 등록되었습니다");
          setAlert1(true);
        },
        (err) => console.log(err)
      );
    } catch (err) {
      console.log(err);
    }
  };

  const moveVideoTime = (timeLog) => {
    const parts = timeLog.split(':');
    const totalSeconds = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
    
    if(videoRef.current){
      videoRef.current.currentTime = totalSeconds; 
    }
  }

  return (
    <>
      <Modal title="스터디 결과 발표 - 스터디룸" className="study-result">
        <div className="p-5 ps-10 pe-10">
          {loading === true ? (
            <div className="loading-overlay">
              <LoadingScreen /> {/* Material-UI 로딩 스피너 */}
              <p style={{ textAlign: "center" }}>로딩 중...</p>
            </div>
          ) : (
            <div
              className="result-section"
              style={{ justifyContent: "space-between" }}
            >
              <div
                className="result-section-1"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-around",
                }}
              >
                <div className="pb-3">
                  {speech.startsAt} #{speech.title} #{speech.category}
                </div>
                <div>
                  <div
                    className="rounded-xl w-68 h-52 m-auto"
                    style={{ width: "100%", height: "100%" }}
                  >
                    {videoPath == "" ? (
                      <div>영상을 가져오고 있습니다.</div>
                    ) : videoPath == "False" ? (
                      <div>영상 업로드에 실패헀습니다.</div>
                    ) : (
                      <video ref={videoRef} controls src={videoPath} type="video/webm">
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                </div>
                <div className="p-2">
                  <div
                    className="w-68 h-28 m-auto grid grid-cols-2 text-center place-content-center rounded-xl"
                    style={{
                      backgroundColor: "#EBEAFA",
                      marginTop: "16px",
                      marginBottom: "16px",
                    }}
                  >
                    <div className="text-2xl mt-5 ps-5 pb-4 ms-5">결과:</div>
                    <div className="text-5xl me-5 pt-2 me-5">{grade}</div>
                  </div>
                </div>
              </div>
              <div className="result-section-2 mx-7">
                {isDetail && (
                  <div className="h-12 mb-2 text-center text-xl">
                    <span
                      className="mx-10 font-bold"
                      style={{ color: "#F3704B" }}
                    >
                      세부 결과
                    </span>{" "}
                    <span className="mx-10 text-3xl">|</span>
                    <span
                      onClick={handleDetail}
                      className="mx-10 text-gray-400 font-bold cursor-pointer"
                    >
                      피드백
                    </span>
                  </div>
                )}

                {isDetail && (
                  <div className="bg-white h-72 mb-2 rounded-md pt-5">
                    <BarChart
                      scores={[
                        scores.clarity,
                        scores.speed,
                        scores.volume,
                        scores.grade,
                      ]}
                    />
                  </div>
                )}

                {!isDetail && (
                  <div className="h-12 mb-2 text-center text-xl">
                    <span
                      onClick={handleDetail}
                      className="mx-10 text-gray-400 font-bold cursor-pointer"
                    >
                      세부 결과
                    </span>
                    <span className="mx-10 text-3xl">|</span>
                    <span
                      className="mx-10 font-bold"
                      style={{ color: "#F3704B" }}
                    >
                      피드백
                    </span>
                  </div>
                )}

                {/* {!isDetail&&<div className="h-72 mb-2">
              <div className="flex flex-row">
                <div className="basis-2/3 flex flex-col rounded-xl bg-gray-200 w-24 h-64 m-4">
                  <div className="mx-2 my-2 bg-gray-200 h-8 text-xl text-center font-bold py-1">시간별 피드백</div>
                  <div className="mx-5 mb-3 bg-white h-52 p-5">
                    {feedbacks.map((feedback, index) => (
                      <p key={index} className="py-0.5">
                        {feedback.timeLog} - {feedback.content}
                      </p>
                    ))}
                  </div>
                </div>
                <div className="basis-1/3 h-64 m-4">
                  <div className="flex flex-col m-2 rounded-xl bg-gray-200 h-40 my-12">
                    <div className="h-8 mx-2 my-1 text-lr text-center font-bold py-1">나의 피드백</div>
                    <div className="h-24 mx-3 mb-3 bg-white flex justify-center">
                      <textarea name="" id="" cols="20" rows="3" placeholder="피드백을 남겨보세요." onChange={(e)=>setMyFeedback(e.target.value)}></textarea>
                    </div>
                    <button className="mb-3 bg-white w-1/2 mx-auto" onClick={handleSubmit} >작성</button>
                  </div>
                </div>
              </div>
            </div>} */}
                {!isDetail && (
                  <div
                    style={{ width: "100%" }}
                    className="h-72 mb-2 rounded-md"
                  >
                    <div>
                      <div
                        align="center"
                        className="text-xl text-center font-bold py-2 px-4 "
                        style={{ backgroundColor: "#343B71", color: "#FFFFFF" }}
                      >
                        시간별 피드백
                      </div>
                      <div
                        style={{ overflow: "auto", height: "130px" }}
                        className="p-3 bg-gray-100"
                      >
                        {feedbacks.map((feedback, index) => (
                          <p key={index} className="py-0.5">
                            <span
                              className="feedback-time"
                              onClick={() => moveVideoTime(feedback.timeLog)}
                            >
                              {feedback.timeLog}
                            </span>
                            <span>{" - " + feedback.content}</span>
                          </p>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div
                        align="center"
                        className="text-xl text-center font-bold py-2 px-4"
                        style={{ backgroundColor: "#343B71", color: "#FFFFFF" }}
                      >
                        나의 피드백
                      </div>
                      {/* <div style={{overflow:"auto", height:"50px"}} className="p-3">
                  {`${speech.comment}`}
                </div> */}
                      <div style={{ overflow: "auto", height: "50px" }}>
                        <textarea
                          name=""
                          id=""
                          cols="20"
                          rows="3"
                          className="bg-gray-100"
                          placeholder="피드백을 남겨보세요."
                          style={{ width: "100%" }}
                          onChange={(e) => setMyFeedback(e.target.value)}
                        ></textarea>
                      </div>
                      <div align="right">
                        <button
                          className="mt-3 mb-3 mx-auto p-1"
                          style={{
                            backgroundColor: "#343B71",
                            color: "#FFFFFF",
                            borderRadius: "10%",
                          }}
                          onClick={handleSubmit}
                        >
                          작성
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                <div className="h-10 text-end">
                  {countdown > 0
                    ? `이 창은 ${countdown}초 후 자동으로 닫힙니다.`
                    : "모달이 곧 닫힙니다."}
                  {countdown > 0 && (
                    <button onClick={handleSkip} className="ms-3">
                      skip
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </Modal>
      {alert1 && (
        <MyAlert
          content={message}
          onClose={() => {
            setAlert1(false);
          }}
        />
      )}
    </>
  );
};

export default StudyResult;
