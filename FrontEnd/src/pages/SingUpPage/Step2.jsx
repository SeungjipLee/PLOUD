import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkEmail, checkId, signup, verifyEmail } from "../../services/user";
import { useDispatch } from "react-redux";
import { getEmail, updateStep } from "../../features/user/signUpSlice";

const Step2 = () => {
  const dispatch = useDispatch();
  // 입력 받는 변수
  const [formData, setFormData] = useState({
    email: undefined,
    emailCode: undefined,
  });
  // 보여주는 처리할 변수
  const [isEmailPass, setIsEmailPass] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);

  // form과 소통하는 함수
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Email 중복여부 함수
  const handleCheckEmail = async (e) => {
    e.preventDefault();
    // 이메일 중복 검사 로직
    await checkEmail(
      { email: formData.email },
      (res) => {
        if(res.data.status == 200){
          alert("가입 가능한 이메일입니다. 메일로 인증번호를 보냈습니다.");
          setIsEmailPass(true);                  
        }
      },
      (err) => {
        if(err.response.status == 409){
          alert("이미 가입된 이메일입니다.");
        }else{
          alert("이메일을 다시 확인해 주세요.");
        }
      }
    );
  };

  // Email코드 인증 함수
  const handleCheckEmailCode = async (e) => {
    e.preventDefault();
    try {
      const response = await verifyEmail(
        { email: formData.email, code: formData.emailCode },
        (res) => res,
        (err) => err
      );
      console.log(response);
      // 추가적인 성공 처리 로직
      if (response.data.status == "200") {
        alert("이메일 인증이 완료되었습니다.");
        setIsEmailValid(true);
      } else {
        alert("코드를 다시 확인해주세요.");
      }
    } catch (error) {
      console.error("Error sending data", error);
      alert("코드가 발송되지 않았습니다. 잠시후 다시 시도해주세요.");
      // 에러 처리 로직
    }
  };

  // 다음 단계를 누르면 작동할 함수
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isEmailPass && isEmailValid) {
      dispatch(getEmail(formData.email));
      dispatch(updateStep(3));
    } else {
      alert("이메일 인증을 완료 후 눌러주세요.");
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
        <input
          type="email"
          id="email"
          name="email"
          className="block w-2/3 rounded-md border-0 py-1 pl-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mx-auto my-5"
          placeholder="이메일"
          onChange={handleChange}
        />

        <input
          type="text"
          id="emailCode"
          name="emailCode"
          className="block w-2/3 rounded-md border-0 py-1 pl-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mx-auto mt-7"
          placeholder="이메일 인증 코드"
          onChange={handleChange}
        />
        <button className="moveButton" onClick={handleCheckEmail}>
          코드전송
        </button>
        <button className="moveButton1" onClick={handleCheckEmailCode}>
          인증하기
        </button>
        <div className="w-80 mx-auto mt-5 mb-10">
          <img src="images/Step2.png" />
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
    </>
  );
};
export default Step2;
