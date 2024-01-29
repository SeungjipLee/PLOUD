import { useState } from "react";
import { useSelector } from "react-redux";

const CreateForm = () => {
  const [formData, setFormData] = useState({
    roomName: "",
    numberOfPeople: 0,
    category: "",
    password: "",
    isSecret: false,
  });
  const token = useSelector((state) => state.userReducer.token.accessToken);

  const handleSubmit = (e) => {
    e.preventDefault();
    // 방 생성 엑시오스 요청보내기
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label for="roomName">
          <p>방 이름</p>
          <input
            type="text"
            id="roomName"
            value={formData.roomName}
            onChange={handleChange}
          />
        </label>
        <label for="numberOfPeople">
          <p>인원</p>
          <input
            type="number"
            id="numberOfPeople"
            onChange={handleChange}
            min="1"
            max="6"
          />
        </label>
        <label for="category">
          <p>카테고리</p>
          <select id="category">
            <option>면접</option>
            <option>발표</option>
          </select>
        </label>
        <label for="password">
          <p>비밀번호</p>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>
        <form>
          <label for="public">
            <p>공개</p>
            <input type="radio" id="public" onChange={handleChange} checked />
          </label>
          <label for="private">
            <p>비공개</p>
            <input type="radio" id="private" onChange={handleChange} />
          </label>
        </form>
      </form>
    </>
  );
};

export default CreateForm;
