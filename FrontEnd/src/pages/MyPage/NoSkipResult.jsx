import Modal from "../../components/Modal";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BarChart from "../../components/BarChart";
import { getRecordResult } from "../../services/record";

const NoSkipResult = ({ onClose, speechId }) => {
  const [ isDetail,setIsDetail ] = useState(true)
  const { token } = useSelector((state) => state.userReducer)
  const resultId  = speechId
  const [ scores, setScores ] = useState({})
  const [ feedbacks, setFeedbacks ] = useState([])
  const [ myFeedback, setMyFeedback ] = useState('')
  const [ videoPath, setVideoPath ] = useState('')
  const [ grade, setGrade ] = useState('')

  useEffect(() => {
    if (scores.grade < 20) {
      setGrade('E');
    } else if (scores.grade < 40) {
      setGrade('D');
    } else if (scores.grade < 60) {
      setGrade('C');
    } else if (scores.grade < 80) {
      setGrade('B');
    } else {
      setGrade('A');
    }
  }, [scores.grade]); 

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
            setMyFeedback(res.data.data.speech.comment)
          },
          (err) => console.log(err)
        );
      } catch (error) {
        console.error("Profile fetch failed:", error);
      }
    };
    getData();
  }, []);

  
  const handleDetail = () => {
    setIsDetail(!isDetail)
  }


  return (
    <Modal
      title="스터디 결과 발표 - 스터디룸"
      className="study-result"
      style={{ position: 'fixed', top: '100px', left: '100px', zIndex:999 }}
      onClick={onClose}
    >
      <div className="result-section" onClick={(e) => e.stopPropagation()}>
        <div className="result-section-1 mx-5">
          <div className="p-2">
            <div className="score rounded-xl w-68 h-52 m-auto py-16">
            <video src={videoPath} type="video/webm">
              Your browser does not support the video tag.
              </video>
            </div>
          </div>
          <div className="p-2">
            <div className="score w-68 h-36 m-auto grid grid-cols-2 text-center place-content-center rounded-xl">
              <div className="text-2xl mt-5 ps-5 pb-4 ms-5">결과   :</div>
              <div className="text-5xl me-5 pt-2 pe-5 me-5">{grade}</div>                
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
                      {feedback.timeLog} - {feedback.content}
                    </p>
                  ))}
                </div>
              </div>
              <div className="basis-1/3 h-64 m-4">
                <div className="flex flex-col m-2 rounded-xl bg-gray-200 h-40 my-12">
                  <div className="h-8 mx-2 my-1 text-lr text-center font-bold py-1">나의 피드백</div>
                  <div className="h-24 mx-3 mb-3 bg-white flex justify-center">
                    {myFeedback}
                  </div>
                </div>
              </div>
            </div>
          </div>}
          <button onClick={onClose}>닫기</button>
      </div>
      </div>
    </Modal>
  );
};

export default NoSkipResult;
