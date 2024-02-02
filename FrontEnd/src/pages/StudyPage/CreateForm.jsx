import { useState } from "react";
import { useSelector } from "react-redux";
import { createMeeting } from "../../services/meeting";
import { useDispatch } from "react-redux";
import { getStudy } from "../../features/study/studySlice";

const CreateForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    categoryId: undefined,
    title: undefined,
    maxPeople: undefined,
    isPrivate: false,
    password: undefined,
  });

  const dispatch = useDispatch();
  const token = useSelector((state) => state.userReducer.token);

  const [isSecret, setIsSecret] = useState(false);

  const handleClick = (e) => {
    setIsSecret(e.target.value == "true" ? true : false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("전송 ");
    console.log(formData);

    createMeeting(
      token,
      formData,
      (response) => {
        console.log(response.data.data);
        dispatch(getStudy(response.data.data));
        onClose();
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "30px" }}>
          <label htmlFor="title">
            <span
              style={{
                marginRight: "30px",
              }}
            >
              방 제목
            </span>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              style={{color: "black", paddingLeft: "10px"}}
              onChange={handleChange}
            />
          </label>
        </div>
        <div
          style={{
            display: "flex",
            marginBottom: "20px",
            marginRight: "20px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <label
            htmlFor="maxPeople"
            style={{ display: "flex", alignItems: "center" }}
          >
            <span style={{ marginRight: "20px" }}>인원설정</span>
            <input
              type="number"
              id="maxPeople"
              name="maxPeople"
              value={formData.maxPeople}
              defaultValue={0}
              onChange={handleChange}
              style={{ color: "black", paddingLeft: "10px", width: "40px" }}
              min="1"
              max="6"
            />
          </label>
          <label
            htmlFor="categoryId"
            style={{ display: "flex", alignItems: "center" }}
          >
            <p style={{ marginRight: "15px" }}>카테고리</p>
            <select
              id="categoryId"
              name="categoryId"
              style={{ color: "black" }}
              onChange={handleChange}
            >
              <option value="0">전체</option>
              <option value="1">면접</option>
              <option value="2">발표</option>
            </select>
          </label>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "10px",
          }}
        >
          <label
            htmlFor="password"
            style={{ display: "flex", alignItems: "center" }}
          >
            <p style={{ margin: "0", marginRight: "20px" }}>비밀번호</p>
            {isSecret ? (
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                style={{ width: "150px", color: "black", paddingLeft: "10px" }}
                onChange={handleChange}
              />
            ) : (
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                style={{ width: "150px" }}
                onChange={handleChange}
                disabled
              />
            )}
          </label>

          <div style={{ marginRight: "20px" }}>
            <label htmlFor="public" style={{ margin: "0 5px" }}>
              공개
            </label>
            <input
              type="radio"
              name="isPrivate"
              id="public"
              value="false"
              onClick={handleClick}
              defaultChecked
            />
            <label htmlFor="private" style={{ margin: "0 5px" }}>
              비공개
            </label>
            <input
              type="radio"
              name="isPrivate"
              id="private"
              value="true"
              onClick={handleClick}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "40px",
          }}
        >
          <button
            type="submit"
            style={{
              backgroundColor: "white",
              color: "black",
              padding: "5px",
              fontWeight: "bold",
              borderRadius: "5px"
            }}
          >
            방 만들기
          </button>
        </div>
      </form>

    </>
  );
};

export default CreateForm;
