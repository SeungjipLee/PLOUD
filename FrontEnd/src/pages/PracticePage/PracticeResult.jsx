import Modal from "../../components/Modal";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import BarChart from "../../components/BarChart";
import { getRecordResult } from "../../services/record";

const PracticeResult = ({ onClose, speechId }) => {
  const { token } = useSelector((state) => state.userReducer)
  const resultId  = speechId
  const [ scores, setScores ] = useState({})
  const [ videoPath, setVideoPath ] = useState('')
  const [ grade, setGrade ] = useState('')
  const [ about, setAbout ] = useState({})


  const formatTimeLog = (timeLog) => {
    const match = timeLog.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    const hours = match[1] ? match[1].slice(0, -1) : "00";
    const minutes = match[2] ? match[2].slice(0, -1) : "00";
    const seconds = match[3] ? match[3].slice(0, -1) : "00";
    return `${minutes} : ${seconds}`;
  };

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


  useEffect(() => {
    const getData = () => {
      try {
        const response = getRecordResult(
          token,
          resultId,
          (res) => {
            console.log(res.data.data)
            setScores(res.data.data.score)
            setVideoPath(res.data.data.video.videopath)
            setAbout(res.data.data.speech)
          },
          (err) => console.log(err)
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
            <div className="text-2xl font-bold text-center mt-3 mb-5">
                {about.category} - {about.title} 
            </div>
            <div className="bg-white mb-2 rounded-md pt-5">
              <BarChart scores={[scores.clarity, scores.speed, scores.volume, scores.grade]} className="h-full" />
            </div>
          <button onClick={onClose}>종료</button>
      </div>
      </div>
    </Modal>
  );
};

export default PracticeResult;
