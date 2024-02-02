import { useState } from "react";
import { useSelector } from "react-redux";

const CreateForm = () => {
  const [formData, setFormData] = useState({
    roomName: undefined,
    numberOfPeople: undefined,
    category: undefined,
    password: undefined,
  });
  const token = useSelector((state) => state.userReducer.token.accessToken);
  const [FSD, setFSD] = useState(undefined);
  const [isSecret, setIsSecret] = useState(false);
  const API_URL = "http://localhost:8000/api/meeting/";

  const handleClick = (e) => {
    console.log("event", e.target.value);
    setIsSecret(e.target.value == "true" ? true : false);
    console.log("state", isSecret);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 방 생성 엑시오스 요청보내기
    axios
      .post(
        API_URL + "create",
        {
          managerId: "",
          categoryId: "",
          title: "",
          maxPeoeple: 1,
          isPrivate: false,
          password: "",
        },
        {
          headers: {
            Authorization: `Bearer ${token.accessToken}`,
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        console.log(response);

        if (response.data.status == 200) {
          return response.data;
        } else {
          throw new Error("방 목록 조회 실패");
        }
      })
      .catch((e) => console.log(e));
    setFSD(e);
  };

  const handleChange = (e) => {
    console.log(e);
    console.log(formData.isSecret);
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
          {isSecret && (
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
          )}
          {!isSecret && (
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              disabled
            />
          )}
        </label>

        <label htmlFor="public">공개</label>
        <input
          type="radio"
          name="isSecret"
          id="public"
          value="false"
          onClick={handleClick}
        />
        <label htmlFor="private">비공개</label>
        <input
          type="radio"
          name="isSecret"
          id="private"
          value="true"
          onClick={handleClick}
        />
      </form>
      {FSD}
    </>
  );
};

export default CreateForm;
