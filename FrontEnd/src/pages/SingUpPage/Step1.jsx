import React, { useState } from "react";
import { checkId } from "../../services/user";
import { useDispatch } from "react-redux";
import { getIdPw, updateStep } from "../../features/user/signUpSlice";
import MyAlert from "../../components/MyAlert";

const Step1 = () => {
  // 알림 창 상태
  const [message, setMessage] = useState("");
  const [alert1, setAlert1] = useState(false);
  const dispatch = useDispatch();
  // 입력 받는 변수
  const [formData, setFormData] = useState({
    userId: undefined,
    password: undefined,
    password_check: undefined,
  });
  // 보여주는 처리할 변수
  const [isUserIdValid, setIsUserIdValid] = useState(false);
  const validateUserId = () => /^[A-Za-z0-9]{4,15}$/.test(formData.userId);
  const validatePassword = () =>
    /^(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,15}$/.test(formData.password);

  // form과 소통하는 함수
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Id 중복여부 함수
  const handleCheckId = (e) => {
    e.preventDefault();
    if (!validateUserId()) {
      setMessage("아이디 형식을 확인해주세요.");
      setAlert1(true);
      return;
    }

    // 아이디 중복 검사 로직
    checkId(
      { userId: formData.userId },
      async (res) => {
        setIsUserIdValid(true);
        await setMessage("사용 가능한 아이디입니다.");
        setAlert1(true);
      },
      async (err) => {
        await setMessage("이미 사용 중인 아이디입니다.");
        setAlert1(true);
      }
    );
  };

  // 다음 단계를 누르면 작동할 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      isUserIdValid &&
      formData.password === formData.password_check &&
      validatePassword()
    ) {
      dispatch(
        getIdPw({ userId: formData.userId, password: formData.password })
      );
      dispatch(updateStep(2));
    } else {
      setMessage(
        "비밀번호를 다시 확인해주세요.\n비밀번호는 특수문자를 포함 6~15자 이내입니다."
      );
      setAlert1(true);
    }
  };

  return (
    <>
      <div className="flex justify-center">
        <a href="/">
          <img src="images/ICON_similar_white.png" className="w-36 mt-24" />
        </a>
      </div>
      <div className="LoginBox mb-36 py-4 rounded-xl mx-auto relative">
        <h2 className="text-white text-3xl text-center py-5">회원가입</h2>
        {formData.userId && !isUserIdValid && (
          <div className="signup-info signup-info1">
            아이디는 4~15글자입니다.(특수문자 제외)
          </div>
        )}
        {!isUserIdValid && (
          <input
            type="text"
            name="userId"
            id="userId"
            minLength={4}
            maxLength={15}
            className="block w-2/3 rounded-md border-0 py-1 pl-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mx-auto my-5"
            placeholder="아이디"
            onChange={handleChange}
          />
        )}
        {isUserIdValid && (
          <input
            type="text"
            name="userId"
            id="userId"
            minLength={4}
            maxLength={15}
            className="bg-white block w-2/3 rounded-md border-0 py-1 pl-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mx-auto my-5"
            placeholder="아이디"
            value={formData.userId}
            disabled
          />
        )}
        {formData.password && formData.password !== formData.password_check && (
          <div className="signup-info signup-info2">
            비밀번호는 6~15글자입니다.(특수문자 포함)
          </div>
        )}
        <input
          type="password"
          id="password"
          name="password"
          className="block w-2/3 rounded-md border-0 py-1 pl-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mx-auto my-5"
          placeholder="비밀번호"
          onChange={handleChange}
        />
        {formData.password &&
          formData.password_check &&
          formData.password !== formData.password_check && (
            <div className="signup-info signup-info3">
              비밀번호가 일치하지 않습니다.
            </div>
          )}
        <input
          type="password"
          id="password_check"
          name="password_check"
          className="block w-2/3 rounded-md border-0 py-1 pl-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mx-auto my-5"
          placeholder="비밀번호 확인"
          onChange={handleChange}
        />
        {!isUserIdValid && (
          <button className="moveButton" onClick={handleCheckId}>
            중복확인
          </button>
        )}
        {isUserIdValid && (
          <button
            className="moveButton"
            onClick={() => {
              setIsUserIdValid(false);
              setFormData((data) => (data.userId = ""));
            }}
          >
            취소
          </button>
        )}
        <div className="w-80 mx-auto mt-5 mb-10">
          <img src="images/Step1.png" />
        </div>
        <div className="flex justify-center-10">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-sky-400 block mb-10 text-white w-2/3 mx-auto rounded-md p-2 text-center hover:bg-sky-500"
          >
            다음 단계
          </button>
        </div>
      </div>
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
export default Step1;
