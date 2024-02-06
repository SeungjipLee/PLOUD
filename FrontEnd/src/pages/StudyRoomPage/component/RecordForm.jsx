import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../components/Modal";
import { useReducer, useState } from "react";
import { getSpeechId } from "../../../features/study/studySlice";
import Button from "../../../components/Button";

const RecordForm = ({ children, onClose }) => {
  const room = useSelector((state) => state.studyReducer.studyInfo.meetingInfo);
  

  const handleSubmit = (e) => {
    e.preventDefault()
    
    
  }


  return (
    
  );
};

export default RecordForm;

{
  /* <div style={{
      width: "300px",
      height: "100px",
      backgroundColor: "white",
      padding: "10px",
    
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    }}>
      <div style={{textAlign: "center"}}>
        제목 : <input placeholder="제목 입력..."></input>
      </div>
      <div style={{textAlign: "center", marginTop: "10px"}}>
        <button>녹화 시작</button>
      </div>
    </div> */
}
