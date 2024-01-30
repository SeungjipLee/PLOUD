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
  const [FSD, setFSD] = useState(undefined)

  const handleSubmit = (e) => {
    e.preventDefault();
    // 방 생성 엑시오스 요청보내기
    setFSD(e)

  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="roomName">
          <p>방 이름</p>
          <input
            type="text"
            id="roomName"
            value={formData.roomName}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="numberOfPeople">
          <p>인원</p>
          <input
            type="number"
            id="numberOfPeople"
            onChange={handleChange}
            min="1"
            max="6"
          />
        </label>
        <label htmlFor="category">
          <p>카테고리</p>
          <select id="category">
            <option>면접</option>
            <option>발표</option>
          </select>
        </label>
        <label htmlFor="password">
          <p>비밀번호</p>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="public">공개</label>
        <input type="radio" name="isSecret" id="public" value="false" onChange={handleChange} />
        <label htmlFor="private">비공개</label>
        <input type="radio" name="isSecret" id="private" value="true" onChange={handleChange} />
      </form>
      {FSD}
    </>
  );
};

export default CreateForm;
