import Modal from "../../components/Modal";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BarChart from "../../components/BarChart";
import { getRecordResult } from "../../services/record";
import { getSentence } from "../../services/sentence"

const PracticeResult = ({ onClose, speechId }) => {
  const [ isDetail,setIsDetail ] = useState(true)
  const { token } = useSelector((state) => state.userReducer)
  const resultId  = speechId
  const [ scores, setScores ] = useState({})
  const [ videoPath, setVideoPath ] = useState('')
  const [ grade, setGrade ] = useState('')
  const [ about, setAbout ] = useState({})
  const [ sentence, setSentence ] = useState('') // 명언
  const [ resultTextColor, setResultTextColor ] = useState("#000000")


  const formatTimeLog = (timeLog) => {
    const match = timeLog.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = match[1] ? match[1].slice(0, -1) : "00";
    const minutes = match[2] ? match[2].slice(0, -1) : "00";
    const seconds = match[3] ? match[3].slice(0, -1) : "00";
    return `${minutes} : ${seconds}`;
  };

  const handleDetail = () => {
    setIsDetail(!isDetail)
  }

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
    background: `linear-gradient(to top, ${resultTextColor} 40%, transparent 40%)`
  };

  useEffect(() => {
    const getData = () => {
      try {
        const response = getRecordResult(
          token,
          resultId,
          (res) => {
            setScores(res.data.data.score)
            setVideoPath(res.data.data.video.videoPath)
            setAbout(res.data.data.speech)
          },
          (err) => err
        );
        
        const randomSentenceResponse = getSentence(
          token,
          (res) => setSentence(res.data.data.sentence),
          (err) => err
        );

      } catch (error) {
        console.error("Profile fetch failed:", error);
      }
    };
    getData();
  }, []);

  

  return (
    <Modal
      title="연습 결과 발표"
      className="study-result-mypage"
      onClick={onClose}
    >
      {/* <div className="result-section" onClick={(e) => e.stopPropagation()}>
        <div className="result-section-1 mx-5">
          <div className="p-2">
            <div className="score rounded-xl w-68 h-52 m-auto py-16">
            <video src={videoPath} controls type="video/webm">
              Your browser does not support the video tag.
              </video> */}
      <div className="p-5 ps-10 pe-10"  onClick={(e) => e.stopPropagation()}>
        <div className="result-section" style={{justifyContent:"space-between"}}>
          <div className="result-section-1" style={{display:"flex", flexDirection:"column", justifyContent:"space-around"}}>
            <div>
              <div className="rounded-xl w-68 h-52 m-auto" style={{width:"100%", height:"100%"}}>
                <video controls src={videoPath} type="video/webm">Your browser does not support the video tag.</video>
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

            {isDetail && <div className="h-12 mb-2 text-center text-xl">
            <span className="mx-10 font-bold" style={{color:"#F3704B"}}>세부 결과</span>              
            <span className="mx-10 text-3xl">|</span>
              <span onClick={handleDetail} className="mx-10 text-gray-400 font-bold cursor-pointer">피드백</span>
            </div>}

            {isDetail && <div className="bg-white h-72 mb-2 rounded-md">
              <div className="text-xl font-bold text-center">
                  #{about.category}  #{about.title}
              </div>
              <BarChart scores={[scores.clarity, scores.speed, scores.volume, scores.grade]} />
            </div>}

            {!isDetail && <div className="h-12 mb-2 text-center text-xl">
                <span onClick={handleDetail} className="mx-10 text-gray-400 font-bold cursor-pointer">세부 결과</span>
                <span className="mx-10 text-3xl">|</span>
                <span className="mx-10 font-bold" style={{color:"#F3704B"}}>피드백</span>
            </div>}

            {!isDetail && <div style={{ width:"100%", height:"300px"}}>
            <div>
              <div className="mb-3"  style={{backgroundColor:"#343B71", color:"#FFFFFF"}}>
              {/* 내 피드백 */}
                <div align="center" className="text-xl text-center font-bold py-1">나의 피드백</div>
                <div style={{height: "200px", overflowY:"auto", wordBreak:"break-all"}} className="pl-3 pr-3">
                  {about.comment && `${about.comment}`}
                </div>
              </div> 
              {/* 명언 */}
              <div style={{height:"90px", display:"flex", flexDirection:"column"}}>
                <div className="text-xl text-center font-bold py-1" style={{backgroundColor:"#343B71", color:"#FFFFFF"}}>
                    오늘의 스피치 명언
                </div>
                <div className="mb-2" style={{overflow:"auto", backgroundColor:"#EBEAFA", flex:"1", display: "flex", alignItems: "center", justifyContent: "center"}}>
                    {sentence}
                </div>
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

export default PracticeResult;
