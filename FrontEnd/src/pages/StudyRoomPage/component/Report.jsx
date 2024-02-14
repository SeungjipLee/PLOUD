import { useSelector } from "react-redux";
import { reportUser } from "../../../services/user";
import { useState } from "react";
import MyAlert from "../../../components/MyAlert";

const Report = ({ users, closeModal }) => {
  console.log(users);
  const token = useSelector((state) => state.userReducer.token);
  const [nickname, setNickname] = useState("");
  const [content1, setContent1] = useState("");
  const [content2, setContent2] = useState("");
  // 알림 창 상태
  const [message, setMessage] = useState("");
  const [alert1, setAlert1] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault;
    console.log(nickname);
    // 신고 제출 api
    const data = {
      userNickname: nickname,
      content: `${content1} : ${content2}`,
    };

    reportUser(
      token,
      data,
      (res) => {
        setMessage("정상적으로 신고되었습니다.");
        setAlert1(true);
      },
      (err) => {
        setMessage("신고에 실패했습니다.");
        setAlert1(true);
      }
    );

    closeModal();
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="report bg-grad-y-black">
          <h1>신고하기</h1>
          <div>
            <span>유저 : </span>
            <select
              className="report-user"
              onChange={(e) => {
                console.log(e, nickname);
                setNickname(e.target.value);
              }}
              value={nickname}
            >
              <option value="">없음</option>
              {users.map((user, index) => {
                console.log(user.nickname);
                return (
                  <option key={index} value={user.nickname}>
                    {user.nickname}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <span>내용 : </span>
            <select
              className="report-content"
              value={content1}
              onChange={(e) => setContent1(e.target.value)}
            >
              <option value="부적절한 닉네임">부적절한 닉네임</option>
              <option value="부적절한 화면">부적절한 화면</option>
              <option value="불법 광고">불법 광고</option>
              <option value="직접 입력하기">직접 입력하기</option>
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
      {alert1 && (
        <MyAlert
          content={message}
          onClose={() => {
            setAlert1(false);
          }}
        />
      )}
    </>
  );
};

export default Report;
