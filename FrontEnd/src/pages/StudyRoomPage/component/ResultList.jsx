import { useState } from "react";
import { useSelector } from "react-redux";
import StudyResult from "./StudyResult";
import Modal from "../../../components/Modal";

const ResultList = (data) => {
  // resultNum 에 자신이 녹화한 영상의 index 를 관리
  // 녹화 결과 리스트에서 결과 하나를 클릭하면 해당 index 의 결과 모달창을 띄우기
  const [resultNum, setResultNum] = useState(0);
  const [modal, setModal] = useState(false);
  
  
  // 녹화한 것들 결과 리스트 가져와서 목록 보여주기
  // 중앙저장소에 결과 데이터들 저장해둘 것
  // const resultList = useSelector((state) => state.ResultReducer)
  const recordList = useSelector((state) => state.recordReducer.recordList);
  const [speechId, setSpeechId] = useState(null)

  const handleClose = () => {
    setModal(false);
  };

  // 결과 클릭 시 결과 모달창 띄우기
  const handleClick = (e, index) => {
    setSpeechId(recordList[index].speechId)
    // index 에 해당하는 데이터 들고와서 결과창 만들어서 보여주기
    setModal(true);
  };

  return (
    <>
      <div className="result-list bg-grad-y-black">
        <h1>결과</h1>
        <div>
          {recordList.map((item, index) => (
            <div key={index} onClick={(e) => handleClick(e, index)}>
              제목 : {item.title}
            </div>
          ))}
        </div>
      </div>
      {modal && <StudyResult onClose={handleClose} speechId={speechId}></StudyResult>}
    </>
  );
};
export default ResultList;
