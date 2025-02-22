import Modal from "../../components/Modal";
import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import BarChart from "../../components/BarChart";
import { getRecordResult } from "../../services/record";
import { getSentence } from "../../services/sentence";
import { postComment } from "../../services/speech";
import MyAlert from "../../components/MyAlert";
import LoadingScreen from "../StudyRoomPage/component/Loading";
import LoadingScreen2 from "../StudyRoomPage/component/Loading2";
import { set } from "lodash";

const PracticeResult = ({
  onClose,
  speechId,
  videoResponse,
  resultResponse,
}) => {
  // 알림 창 상태
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState(false);

  const [isDetail, setIsDetail] = useState(true);
  const { token } = useSelector((state) => state.userReducer);
  const resultId = speechId;
  const [scores, setScores] = useState({});
  const [videoPath, setVideoPath] = useState("");
  const [grade, setGrade] = useState("");
  const [about, setAbout] = useState({});
  const [sentence, setSentence] = useState(""); // 명언
  const [resultTextColor, setResultTextColor] = useState("#000000");
  const [myFeedback, setMyFeedback] = useState("");

  const [loading, setLoading] = useState(true);
  const [countdown, setCountdown] = useState(20);

  const isClosed = useRef(false);

  const [isState, setIsState] = useState(1);

  const handleDetail = () => {
    setIsDetail(!isDetail);
  };

  const resultCheck = useRef(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const response = postComment(
        token,
        {
          speechId: resultId,
          comment: myFeedback,
        },
        async (res) => {
          await setMessage("내 피드백이 등록되었습니다");
          setAlert(true);
        },
        (err) => err
      );
    } catch (err) {
      // console.log(err);
    }
  };

  useEffect(() => {
    if (resultResponse === true) {
      sentenceGet();
      recordResultGet();
    }
  }, [resultResponse]);

  useEffect(() => {
    if (resultResponse === true && videoResponse === true && videoPath == "") {
      // -> 다시 요청
      recordResultGet();
    } else if (videoResponse === false) {
      // 비디오를 올리지 못함.
      setVideoPath("False");
    }
  }, [videoResponse]);

  useEffect(() => {
    if (scores.grade < 40) {
      setGrade("E");
      setResultTextColor("#393939");
    } else if (scores.grade < 60) {
      setGrade("D");
      setResultTextColor("#0C134F");
    } else if (scores.grade < 75) {
      setGrade("C");
      setResultTextColor("#624637");
    } else if (scores.grade < 90) {
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

  const recordResultGet = () => {
    if (!resultCheck.current) {
      getRecordResult(
        token,
        resultId,
        (res) => {
          setScores(res.data.data.score);
          if (res.data.data.video.videoPath != null) {
            setVideoPath(res.data.data.video.videoPath);
          }
          setAbout(res.data.data.speech);
          setLoading(false); // 로딩 종료

          if (
            res.data.data.score.speed == 0 ||
            res.data.data.score.speed.clarity == 0
          ) {
            recordResultGet();
          } else {
            resultCheck.current = true;
          }
        },
        (err) => {
          console.log(err);
          if (scores.speed == 0 || scores.clarity == 0) {
            recordResultGet();
          }
        }
      );
    }
  };

  const sentenceGet = () => {
    getSentence(
      token,
      (res) => {
        setSentence(res.data.data.sentence);
      },
      (err) => {
        // console.log(err);
      }
    );
  };

  const handleSkip = () => {
    if (typeof onClose === "function") {
      isClosed.current = true;
      onClose(); // "skip" 버튼 클릭 시 모달 닫기
    }
  };

  useEffect(() => {
    // 카운트다운 시작
    if (!resultResponse) return;

    const timerId = setInterval(() => {
      setCountdown((prevCountdown) => prevCountdown - 1);
    }, 1000);

    // 20초 후 모달 자동 닫기
    const timeoutId = setTimeout(() => {
      if (!isClosed.current) {
        onClose(); // 모달 닫는 함수 호출
      }
    }, 20000);

    return () => {
      if (!resultResponse) return;
      clearInterval(timerId); // 컴포넌트 언마운트 시 타이머 제거
      clearTimeout(timeoutId); // 타임아웃 제거
    };
  }, [resultResponse]);

  return (
    <>
      <Modal
        title="연습 결과 발표"
        className="study-result"
        style={{ position: "fixed", top: "100px", left: "100px", zIndex: 999 }}
      >
        {/* <div className="result-section" onClick={(e) => e.stopPropagation()}>
        <div className="result-section-1 mx-5">
          <div className="p-2">
            <div className="score rounded-xl w-68 h-52 m-auto py-16">
            <video src={videoPath} controls type="video/webm">
              Your browser does not support the video tag.
              </video> */}
        {loading === true ? (
          <div className="loading-overlay">
            <LoadingScreen /> {/* Material-UI 로딩 스피너 */}
            <p style={{ textAlign: "center" }}>로딩 중...</p>
          </div>
        ) : (
          <>
            <div
              className="p-5 ps-10 pe-10"
              onClick={(e) => e.stopPropagation()}
            >
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
                  <div>
                    <div
                      className="rounded-xl w-68 h-52 m-auto"
                      style={{ width: "100%", height: "100%" }}
                    >
                      {videoPath == "" ? (
                        //  로딩 필요함
                        <div className="loading-overlay">
                          <LoadingScreen2 />
                          <p style={{ textAlign: "center" }}>영상로딩 중...</p>
                        </div>
                      ) : videoPath == "False" ? (
                        <div>영상 업로드에 실패헀습니다.</div>
                      ) : (
                        <video controls src={videoPath} type="video/webm">
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
                      <div className="text-5xl me-5 pt-2">{grade}</div>
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
                      </span>
                      <span className="mx-10 text-3xl">|</span>
                      <span
                        onClick={handleDetail}
                        className="mx-10 text-gray-400 font-bold cursor-pointer"
                      >
                        피드백 작성
                      </span>
                    </div>
                  )}

                  {isDetail && (
                    <div className="bg-white h-72 mb-2 rounded-md">
                      <div className="text-xl font-bold text-center">
                        #{about.category} #{about.title}
                      </div>
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
                        피드백 작성
                      </span>
                    </div>
                  )}

                  {!isDetail && (
                    <div style={{ width: "100%", height: "300px" }}>
                      <div className="mb-3">
                        {/* 내 피드백 입력*/}
                        <div
                          align="center"
                          className="text-xl text-center font-bold py-1"
                          style={{
                            backgroundColor: "#343B71",
                            color: "#FFFFFF",
                          }}
                        >
                          나의 피드백
                        </div>
                        <div style={{ overflow: "auto" }}>
                          <textarea
                            name=""
                            id=""
                            cols="20"
                            rows="3"
                            className="ps-2 pe-2 bg-gray-100"
                            placeholder="피드백을 남겨보세요."
                            style={{
                              width: "100%",
                              height: "150px",
                              resize: "none",
                            }}
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
                        {/* <div style={{overflow:"auto"}} className="pl-3 pr-3">
                  {about.comment && `${about.comment}`}
                </div>  */}
                        {/* 명언 */}
                        <div
                          style={{
                            height: "90px",
                            display: "flex",
                            flexDirection: "column",
                          }}
                        >
                          <div
                            className="text-xl text-center font-bold py-1"
                            style={{
                              backgroundColor: "#343B71",
                              color: "#FFFFFF",
                            }}
                          >
                            오늘의 스피치 명언
                          </div>
                          <div
                            style={{
                              overflow: "auto",
                              backgroundColor: "#EBEAFA",
                              flex: "1",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            {sentence}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div align="right">
                <div className="h-10 text-end">
                  <button onClick={handleSkip} className="ms-3">
                    skip
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </Modal>
      {alert && (
        <MyAlert
          content={message}
          onClose={() => {
            setAlert(false);
          }}
        />
      )}
    </>
  );
};

export default PracticeResult;
