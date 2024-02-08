import Modal from "../../../components/Modal";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import BarChart from "../../../components/BarChart";
import { getRecordResult } from "../../../services/record";
import { postComment } from "../../../services/board";

const StudyResult = ({ onClose }) => {
  const [ isDetail,setIsDetail ] = useState(true)
  const { token } = useSelector((state) => state.userReducer)
  const resultId  = 1
  const [ scores, setScores ] = useState({})
  const [ feedbacks, setFeedbacks ] = useState({})
  const [ myFeedback, setMyFeedback ] = useState('')
  const [ videoPath, setVideoPath ] = useState('')
  const [countdown, setCountdown] = useState(20);

  const formatTimeLog = (timeLog) => {
    const match = timeLog.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = match[1] ? match[1].slice(0, -1) : "00";
    const minutes = match[2] ? match[2].slice(0, -1) : "00";
    const seconds = match[3] ? match[3].slice(0, -1) : "00";
    return `${minutes} : ${seconds}`;
  };


  useEffect(() => {
    const getData = () => {
      try {
        const response = getRecordResult(
          token,
          resultId,
          (res) => {
            console.log(res.data.data)
            setScores(res.data.data.score)
            setFeedbacks(res.data.data.feedbacks)
            setVideoPath(res.data.data.video.videopath)
          },
          (err) => console.log(err)
        );
      } catch (error) {
        console.error("Profile fetch failed:", error);
      }
    };
    getData();
  }, []);

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
    setIsDetail(!isDetail)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const response = postComment(
        token,
        {
          "speechId": resultId,
          "comment": myFeedback
        },
        (res) => console.log(res),
        (err) => console.log(err)
      )
    } catch (err) {console.log(err)}
    }
  

  return (
    <Modal
      title="스터디 결과 발표 - 스터디룸"
      className="study-result"
    >
      <div className="result-section">
        <div className="result-section-1 mx-5">
          <div className="p-2">
            <div className="score rounded-xl w-68 h-52 m-auto py-16">
              <video src={videoPath}>비디오 들어올 곳</video>
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
            <BarChart scores={[scores.clarity, scores.speed, scores.volume, scores.grade]} />
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
                  {feedbacks.map((feedback, index) => (
                    <p key={index} className="py-0.5">
                      {formatTimeLog(feedback.timeLog)} - {feedback.content}
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
          </div>}
          <div className="h-10">
          {countdown > 0 && (
            <div className="text-sm text-end me-5">
              <button onClick={handleSkip}>skip</button>
            </div>
          )}
          <div className="text-end">
            {countdown > 0
              ? `이 창은 ${countdown}초 후 자동으로 닫힙니다.`
              : "모달이 곧 닫힙니다."}
          </div>
        </div>
      </div>
      </div>
    </Modal>
  );
};

export default StudyResult;
