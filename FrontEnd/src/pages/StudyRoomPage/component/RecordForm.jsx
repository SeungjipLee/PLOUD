import { useDispatch, useSelector } from "react-redux";
import Modal from "../../../components/Modal";
import { startSpeech } from "../../../services/speech";
import { useReducer, useState } from "react";
import { getSpeechId } from "../../../features/study/studySlice";
import Button from "../../../components/Button";

const RecordForm = ({ children, onClose }) => {
  const { userId, token } = useSelector((state) =>state.userReducer)
  const room = useSelector((state) => state.studyReducer.studyInfo.meetingInfo);
  const [title, setTitle] = useState("");
  const dispatch = useDispatch()
    
  const categoryName = () => {
    switch(room.categoryId){
    case 0: return "전체"
    case 1: return "면접"
    case 2: return "발표"
    case 3: return "기타"
  }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const params = {
        userId: userId,
        sessionId: room.sessionId,
        title: title,
        personal: false,
        categoryId: room.categoryId,
        scriptId: -1,
    }
    startSpeech(token, params,
        (res) => dispatch(getSpeechId(res)),
        (err) => console.log(err)
        )
  }

  return (
    <Modal title="녹화 정보 입력" onClose={onClose} className={"record-form"}>
      <form onSubmit={handleSubmit}>
        <div>
          <p>제목 : 
          <input
            placeholder="제목 입력..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          ></input></p>
          <p>카테고리 : {categoryName()}</p>
          <p>분류 : 스터디</p>
        </div>
        <div style={{display: "flex", justifyContent: "flex-end"}}>
          {children}
          </div>
      </form>
    </Modal>
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
