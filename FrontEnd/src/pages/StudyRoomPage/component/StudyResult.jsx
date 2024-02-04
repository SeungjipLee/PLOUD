import Modal from "../../../components/Modal";

const StudyResult = ({ onClose }) => {
  return (
    <Modal
      title="스터디 결과 발표 - 스터디룸"
      onClose={onClose}
      className="study-result"
    >
      <div className="result-section">
        <div className="result-section-1">
          <div>영상</div>
          <div>결과 : resultGrade</div>
        </div>
        <div className="result-section-2">
          <div> 세부결과 | 피드백 </div>
          <div> 세부 결과 </div>
          <div> 피드백 </div>
        </div>
      </div>
    </Modal>
  );
};

export default StudyResult;
