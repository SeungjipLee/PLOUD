import { useSelector } from "react-redux";
import { reportUser } from "../../../services/user";
import { useState } from "react";

const Report = ({ users, closeModal }) => {
  console.log(users);
  const token = useSelector((state) => state.userReducer.token);
  const [nickname, setNickname] = useState("");
  const [content1, setContent1] = useState("");
  const [content2, setContent2] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault;
    console.log(nickname)
    // 신고 제출 api
    const data = {
      userNickname: nickname,
      content: `${content1} : ${content2}`,
    };

    reportUser(
      token,
      data,
      (res) => alert("정상적으로 신고되었습니다."),
      (err) => {
        alert("신고에 실패했습니다.");
        console.log(err);
      }
    );

    closeModal();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="report">
        <h1>신고하기</h1>
        <div>
          <span>유저 : </span>
          <select
            className="report-user"
            onChange={(e) => {
              console.log(e, nickname)
              setNickname(e.target.value)}}
          >
            <option value="">없음</option>
            {users.map((user, index) => {
              console.log(user.nickname)
              return(
              <option key={index} value={user.nickname}>
                {user.nickname}
              </option>
              )
            })}
          </select>
        </div>
        <div>
          <span>내용 : </span>
          <select
            className="report-content"
            value={nickname}
            onChange={(e) => setContent1(e.target.value)}
          >
            <option value="부적절1">부적절1</option>
            <option value="부적절2">부적절2</option>
            <option value="부적절3">부적절3</option>
            <option value="부적절4">부적절4</option>
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
            onChange={(e) => setContent2(e.target.value)}
          ></textarea>
        </div>
        <button>제출</button>
      </div>
    </form>
  );
};

export default Report;
