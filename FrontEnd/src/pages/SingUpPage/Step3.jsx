import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  checkEmail,
  checkId,
  checkNickname,
  signup,
  verifyEmail,
} from "../../services/user";
import { getUserData, updateStep } from "../../features/user/signUpSlice";
import { input } from "@material-tailwind/react";
import MyAlert from "../../components/MyAlert";

const Step3 = () => {
  // 알림 창 상태
  const [message, setMessage] = useState("");
  const [alert1, setAlert1] = useState(false);
  const [alert2, setAlert2] = useState(false);

  const { userId, password, email } = useSelector(
    (state) => state.signUpReducer
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // 입력 받는 변수
  const [formData, setFormData] = useState({
    userId: userId,
    password: password,
    email: email,
    nickname: undefined,
    name: undefined,
    birthYear: undefined,
  });
  // 보여주는 처리할 변수
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const validateNickname = () =>
    /^[A-Za-z0-9가-힣]{2,8}$/.test(formData.nickname);
  const validateName = () => /^[A-Za-z가-힣]{2,10}$/.test(formData.name);

  // form과 소통하는 함수
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Nickname 중복여부 함수
  const handleCheckNickname = async (e) => {
    e.preventDefault();
    if (validateNickname()) {
      // 닉네임 중복검사 로직
      try {
        const response = await checkNickname(
          { nickname: formData.nickname },
          (res) => res,
          (err) => err
        );
        // 추가적인 성공 처리 로직
        if (response.data.status == "200") {
          setIsNicknameValid(true);
          setMessage("사용 가능한 닉네임입니다.");
          setAlert1(true);
        } else {
          setMessage("이미 사용 중인 닉네임입니다.");
          setAlert1(true);
        }
      } catch (error) {
        setMessage("이미 사용 중인 닉네임입니다.");
        setAlert1(true);
      }
    } else {
      setMessage(
        "닉네임 형식을 확인해주세요.\n 닉네임은 특수문자 제외 2~8자 이내입니다."
      );
      setAlert1(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateName() && isNicknameValid && validateNickname()) {
      dispatch(
        getUserData({
          nickname: formData.nickname,
          name: formData.name,
          birthYear: formData.birthYear,
        })
      );
      // 여기서 완전 회원가입 요청 ㄱㄱ
      const response = await signup(
        formData,
        (res) => res,
        (err) => err
      );
      setMessage("회원가입이 성공적으로 완료되었습니다.");
      setAlert2(true);
    } else {
      setMessage("이름을 다시 확인해주세요.\n 이름은 특수문자 제외 2~10자 이내입니다.");
      setAlert1(true);
    }
  };

  // 시간 관련 변수
  const years = Array.from(
    new Array(100),
    (val, index) => new Date().getFullYear() - index
  );

  return (
    <>
      <div className="flex justify-center">
        <a href="/">
          <img src="/images/ICON_similar_white.png" className="w-36 mt-24" />
        </a>
      </div>
      <div className="LoginBox mb-36 py-4 rounded-xl mx-auto relative">
        <h2 className="text-white text-3xl text-center py-5">회원가입</h2>
        <input
          type="text"
          name="nickname"
          id="nickname"
          minLength={2}
          maxLength={8}
          className="block w-2/3 rounded-md border-0 py-1 pl-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mx-auto my-5"
          placeholder="별명"
          onChange={handleChange}
        />

        <input
          type="text"
          name="name"
          id="name"
          minLength={2}
          maxLength={10}
          className="block w-2/3 rounded-md border-0 py-1 pl-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mx-auto my-5"
          placeholder="이름"
          onChange={handleChange}
        />
        <div className="block w-2/3 bg-white rounded-md border-0 py-1 pl-7 pr-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mx-auto my-5">
          <span className="text-gray-400">출생연도 :</span>
          <select
            name="birthYear"
            value={formData.birthYear}
            onChange={handleChange}
            className="mx-3 w-36 pl-12 bg-transparent text-black border-none"
          >
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <button className="moveButton" onClick={handleCheckNickname}>
          중복확인
        </button>
        <div className="w-80 mx-auto mt-5 mb-10">
          <img src="/images/Step3.png" />
        </div>
        <div className="flex justify-center-10">
          <button
            type="submit"
            onClick={handleSubmit}
            className="bg-sky-400 block mb-10 text-white w-2/3 mx-auto rounded-md p-2 text-center hover:bg-sky-500"
          >
            가입 완료
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
      {alert2 && (
        <MyAlert
          content={message}
          onClose={() => {
            setAlert2(false);
            navigate("/login");
          }}
        />
      )}
    </>
  );
};
export default Step3;
