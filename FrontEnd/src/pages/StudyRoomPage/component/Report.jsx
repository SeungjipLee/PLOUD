const Report = ({ data }) => {
    
  const handleSubmit = (e) => {
    // 신고 제출 api
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="report">
        <h1>신고하기</h1>
        <div>
          <span>유저 : </span>
          <select className="report-user">
            <option value="">사용자1</option>
            <option value="">사용자2</option>
            <option value="">사용자3</option>
            <option value="">사용자4</option>
          </select>
        </div>
        <div>
          <span>내용 : </span>
          <select className="report-content">
            <option value="">부적절1</option>
            <option value="">부적절2</option>
            <option value="">부적절3</option>
            <option value="">부적절4</option>
          </select>
        </div>
        <div>
          <p>상세</p>
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="상세 내용을 입력하세요."
          ></textarea>
        </div>
        <button>제출</button>
      </div>
    </form>
  );
};

export default Report;
