import Modal from "../../components/Modal";
import React, { useEffect, useState, useRef } from "react";
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
  const [ speech, setSpeech ] = useState({})
  const [ resultTextColor, setResultTextColor ] = useState("#000000")

  const videoRef = useRef(null);
  
  useEffect(() => {
    if (scores.grade < 20) {
      setGrade('E');
      setResultTextColor("#393939");
    } else if (scores.grade < 40) {
      setGrade('D');
      setResultTextColor("#0C134F");
    } else if (scores.grade < 60) {
      setGrade('C');
      setResultTextColor("#624637");
    } else if (scores.grade < 80) {
      setGrade('B');
      setResultTextColor("#c0c0c0");
    } else {
      setGrade('A');
      setResultTextColor("#ffd700");
    }
  }, [scores.grade]); 

  const gradeStyle = {
    background: `linear-gradient(to top, ${resultTextColor} 40%, transparent 40%)`
  };

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
            setSpeech(res.data.data.speech)
            setScores(res.data.data.score)
            setFeedbacks(res.data.data.feedbacks)
            setVideoPath(res.data.data.video.videoPath)
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

  const moveVideoTime = (timeLog) => {
    const parts = timeLog.split(':');
    const totalSeconds = parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
    
    if(videoRef.current){
      videoRef.current.currentTime = totalSeconds; 
    }
  }

  return (
    <Modal
      title="스피치 결과 발표 - 스터디룸"
      className="study-result-mypage"
      onClick={onClose}
    >
      {/* <div className="result-section" onClick={(e) => e.stopPropagation()}>
        <div className="result-section-1 mx-5">
          <div className="p-2">
            <div className="score rounded-xl w-68 h-52 m-auto py-16">
            <video src={videoPath} type="video/webm">
              Your browser does not support the video tag.
              </video> */}
    <div className="p-5 ps-10 pe-10" onClick={(e) => e.stopPropagation()}>
      <div className="result-section" style={{justifyContent:"space-between"}}>
        <div className="result-section-1" style={{display:"flex", flexDirection:"column", justifyContent:"space-around"}}>
          <div className="pb-3">
            {speech.startsAt}   #{speech.title}    #{speech.category}
          </div>
          <div>
            <div className="rounded-xl w-68 h-52 m-auto" style={{width:"100%", height:"100%"}}>
              <video ref={videoRef} controls src={videoPath} type="video/webm">Your browser does not support the video tag.</video>
            </div>
          </div>
          <div className="p-2">
          <div className="w-68 h-36 grid grid-cols-2 text-center place-content-center rounded-xl"
              style={{backgroundColor:"#EBEAFA"}}>
              <div className="text-2xl mt-5 ps-5 pb-4 ms-5">결과:</div>
              <div className="text-5xl me-5 pt-2 me-5">{grade}</div>
            </div>
          </div>
        </div>
        <div className="result-section-2 mx-7">

          {isDetail&&<div className="h-12 mb-2 text-center text-xl">
          <span className="mx-10 font-bold" style={{color:"#F3704B"}}>세부 결과</span>              
          <span className="mx-10 text-3xl">|</span>
              <span onClick={handleDetail} className="mx-10 text-gray-400 font-bold cursor-pointer">피드백</span>
          </div>}


          {isDetail&&<div className="bg-white h-72 mb-2 rounded-md pt-5">
            <BarChart scores={[scores.clarity, scores.speed, scores.volume, scores.grade]} />
          </div>}


          {!isDetail&&<div className="h-12 mb-2 text-center text-xl">
              <span onClick={handleDetail} className="mx-10 text-gray-400 font-bold cursor-pointer">세부 결과</span>
              <span className="mx-10 text-3xl">|</span>
              <span className="mx-10 font-bold" style={{color:"#F3704B"}}>피드백</span>
          </div>}


          {/* {!isDetail&&<div className="h-72 mb-2">
            <div className="flex flex-row">
              <div className="basis-2/3 flex flex-col rounded-xl bg-gray-200 w-24 h-64 m-4">
                <div className="mx-2 my-2 bg-gray-200 h-8 text-xl text-center font-bold py-1">시간별 피드백</div>
                <div className="mx-5 mb-3 bg-white h-52 p-5"> */}
          {!isDetail&&<div style={{width:"100%", height:"300px"}}>
            <div>
              <div align="center" className="text-xl text-center font-bold py-1" style={{backgroundColor:"#343B71", color:"#FFFFFF" }}>시간별 피드백</div>
              <div style={{overflow:"auto", height:"200px"}} className="p-3 bg-gray-100">
                {feedbacks.map((feedback, index) => (
                  <p key={index} className="py-0.5">
                    <span 
                    className="feedback-time"
                    onClick={() => moveVideoTime(feedback.timeLog)}>{feedback.timeLog}</span> - {feedback.content}
                  </p>
                ))}
              </div>
            </div>
            <div style={{backgroundColor:"#343B71", color:"#FFFFFF"}}>
              <div align="center" className="text-xl text-center font-bold py-1" style={{backgroundColor:"#343B71", color:"#FFFFFF" }}>나의 피드백</div>
              <div style={{overflow:"auto", height:"50px"}} className="pl-3 pr-3">
                {speech.comment && `${speech.comment}`}
              </div>      
            </div>
          </div>}
        </div>
      </div>
      <div align="right">
        <button onClick={onClose} style={{color:"#F3704B"}}>닫기</button>
      </div>
    </div>
    </Modal>
  );
};

export default NoSkipResult;
