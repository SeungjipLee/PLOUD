import { useState } from "react";
import { useSelector } from "react-redux";
import { createMeeting } from "../../services/meeting";
import { useDispatch } from "react-redux";
import { getStudy } from "../../features/study/studySlice";
import { useNavigate } from "react-router";

const CreateForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    categoryId: "",
    title: "",
    maxPeople: 2,
    isPrivate: false,
    password: "",
  });

  const dispatch = useDispatch();
  const token = useSelector((state) => state.userReducer.token);

  // isPrivate 값을 업데이트하는 함수
  const updateIsPrivate = (newIsPrivateValue) => {
    setFormData((prevFormData) => ({
      ...prevFormData, // 기존 formData의 다른 필드들을 유지
      isPrivate: newIsPrivateValue, // isPrivate 필드만 새로운 값으로 업데이트
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert("제목을 입력해 주세요.");
      return;
    }
    if (formData.categoryId == "" || formData.categoryId == "0") {
      alert("카테고리를 선택해 주세요.");
      return;
    }
    console.log("전송 ");
    console.log(formData);

    createMeeting(
      token,
      formData,
      (response) => {
        dispatch(getStudy(response.data));
        navigate("/study/room");
      },
      (error) => {
        console.log(error);
      }
    );
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 최대 인원 증가 함수
  const incrementMaxPeople = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      maxPeople: prevFormData.maxPeople < 6 ? prevFormData.maxPeople + 1 : 6, // 최대값은 6
    }));
  };

  // 최대 인원 감소 함수
  const decrementMaxPeople = () => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      maxPeople: prevFormData.maxPeople > 2 ? prevFormData.maxPeople - 1 : 2, // 최소값은 2
    }));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "10px" }}>
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
              style={{ color: "black", paddingLeft: "10px" }}
              onChange={handleChange}
            />
          </label>
        </div>
        <div
          style={{
            display: "flex",
            marginBottom: "20px",
            // marginRight: "20px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <label
            htmlFor="maxPeople"
            style={{ display: "flex", alignItems: "center" }}
          >
            <span style={{ marginRight: "20px" }}>인원설정</span>
            {/* <input
              type="number"
              id="maxPeople"
              name="maxPeople"
              defaultValue={2}
              onChange={handleChange}
              style={{ color: "black", paddingLeft: "10px", width: "40px" }}
              min="2"
              max="6"
            /> */}
            <div className="flex items-center">
              <button
                type="button"
                onClick={decrementMaxPeople}
                className="p-2 text-lg rounded" 
                // className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                -
              </button>
              <input
                type="number" // text 타입으로 변경하여 직접 입력 방지
                readOnly // 값 변경을 버튼을 통해서만 가능하게 설정
                className="text-center w-8 border-gray-300 text-sm text-black"
                value={formData.maxPeople}
              />
              <button
                type="button"
                onClick={incrementMaxPeople}
                className="p-2 text-lg rounded" 
                // className="text-white bg-blue-500 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                +
              </button>
            </div>
          </label>

          <label
            htmlFor="categoryId"
            style={{ display: "flex", alignItems: "center" }}
          >
            <p style={{ marginRight: "15px" }}>카테고리</p>
            <select
              id="categoryId"
              name="categoryId"
              onChange={handleChange}
              style={{ color: "white" }}
            >
              <option value="0">선택</option>
              <option value="1">면접</option>
              <option value="2">발표</option>
              <option value="3">기타</option>
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
            {formData.isPrivate ? (
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

          <div>
            <label htmlFor="public" style={{ margin: "0 5px" }}>
              공개
            </label>
            <input
              type="radio"
              name="isPrivate"
              id="public"
              value={false}
              onChange={() => updateIsPrivate(false)}
              defaultChecked
            />
            <label htmlFor="private" style={{ margin: "0 5px" }}>
              비공개
            </label>
            <input
              type="radio"
              name="isPrivate"
              id="private"
              value={true}
              onChange={() => updateIsPrivate(true)}
            />
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "30px",
          }}
        >
          <button
            type="submit"
            style={{
              backgroundColor: "#FFFFFF",
              color: "#0C134F",
              padding: "5px",
              fontWeight: "bold",
              borderRadius: "5px",
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
