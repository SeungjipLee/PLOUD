import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { checkEmail, checkId, signup, verifyEmail } from "../../services/user";
import { useDispatch } from "react-redux";
import { getEmail, updateStep } from "../../features/user/signUpSlice";

const Step2 = () => {
    // 입력 받는 변수
    const [formData, setFormData] = useState({
        email: undefined,
        emailCode : undefined,
    })
    // 보여주는 처리할 변수
    const [isStep2Done, setIsStep2Done] = useState(false)
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
      try {
        const response = await checkEmail(
          { email: formData.email },
          (res) => res,
          (err) => err
        );
        // 추가적인 성공 처리 로직
        if (response.data.status == "200") {
          alert("가입 가능한 이메일입니다. 메일로 인증번호를 보냈습니다.");
          setIsEmailPass(true);
        } else if (response.data.status == "409") {
          alert("이미 가입된 이메일입니다.");
        } else {
          alert("(코드 전송되지 않음) 이메일 양식이 올바른지 확인하십시오.");
        }
      } catch (error) {
        console.error("Error sending data", error);
        alert("이미 가입된 이메일입니다.");
        // 에러 처리 로직
      }
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
        // 추가적인 성공 처리 로직
        if (response.data.status == "200") {
          alert("이메일 인증이 완료되었습니다.");
          setIsEmailValid(true);
        } else {
          alert("코드를 다시 확인해주세요.");
        }
      } catch (error) {
        console.error("Error sending data", error);
        alert("코드를 다다시 확인해주세요.");
        // 에러 처리 로직
      }
    };
    
    return (
        <>
        <div className="flex justify-center">
            <a href="/"><img src="images/ICON_similar_white.png" className="w-36 mt-24"/></a>
        </div>
        <div className="LoginBox mb-36 py-4 rounded-xl mx-auto relative">
            <h2 className="text-white text-3xl text-center py-5">회원가입</h2>
              <input
                type="email"
                id="email"
                className="block w-2/3 rounded-md border-0 py-1 pl-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mx-auto my-5"
                placeholder="이메일"
                onChange={(e) => {
                  setFormData(e.target.value);
                }}
              />
              
                <input
                  type="text"
                  id="emailCode"
                  className="block w-2/3 rounded-md border-0 py-1 pl-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mx-auto mt-7"
                  placeholder="이메일 인증 코드"
                  onChange={(e) => {
                    setFormData(e.target.value);
                  }}
                />
              <button className="moveButton">코드전송</button>
              <button className="moveButton1">인증하기</button>
              <div className="w-80 mx-auto my-10"><img src="images/Step2.png"/></div>
              <div className="flex justify-center-10">
                <button type="submit" className="bg-sky-400 block mb-16 text-white w-2/3 mx-auto rounded-md p-2 text-center hover:bg-sky-500">다음 단계</button>
              </div>
                  
        </div>
        </>
    )
}
export default Step2;