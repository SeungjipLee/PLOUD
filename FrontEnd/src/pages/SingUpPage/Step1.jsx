import React, { useState } from "react";
import { checkId } from "../../services/user";
import { useDispatch } from "react-redux";
import { getIdPw, updateStep } from "../../features/user/signUpSlice";

const Step1 = () => {
  const dispatch = useDispatch()
  // 입력 받는 변수
  const [formData, setFormData] = useState({
    userId: undefined,
    password: undefined,
    password_check: undefined,
  })
  // 보여주는 처리할 변수
  const [isUserIdValid, setIsUserIdValid] = useState(false);
  const validateUserId = () => /^[A-Za-z0-9]{4,15}$/.test(formData.userId);
  const validatePassword = () => /^(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,15}$/.test(formData.password);

  // form과 소통하는 함수
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Id 중복여부 함수
  const handleCheckId = async (e) => {
    e.preventDefault();
    if (validateUserId()) {    
      // 아이디 중복 검사 로직
      try {
        const response = await checkId(
          { userId: formData.userId },
          (res) => res,
          (err) => err
        );
        console.log(response);
        // 추가적인 성공 처리 로직
        if (response.data.status == "200") {
          alert("사용 가능한 아이디입니다.");
          setIsUserIdValid(true);
        } else {
          alert("이미 사용 중인 아이디입니다.");
        }
      } catch (error) {
        console.error("Error sending data", error);
        alert("이미 사용 중인 아이디입니다.");
      }
    } else {
      alert("아이디 형식을 확인해주세요. 아이디는 4~15자 이내입니다.");
    }
  }
  

  // 다음 단계를 누르면 작동할 함수 
  const handleSubmit = (e) => {
    e.preventDefault()
    if (isUserIdValid && (formData.password == formData.password_check) && validatePassword()) {
      dispatch(getIdPw({userId: formData.userId, password: formData.password}))
      dispatch(updateStep(2))
    } else {
      alert("비밀번호를 다시 확인해주세요. 비밀번호는 특수문자를 포함 6~15자 이내입니다.")
    }
  }

  return (
    <>
      <div className="flex justify-center">
        <a href="/"><img src="images/ICON_similar_white.png" className="w-36 mt-24" /></a>
      </div>
      <div className="LoginBox mb-36 py-4 rounded-xl mx-auto relative">
        <h2 className="text-white text-3xl text-center py-5">회원가입</h2>
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

        <input
          type="password"
          id="password"
          name="password"
          className="block w-2/3 rounded-md border-0 py-1 pl-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mx-auto my-5"
          placeholder="비밀번호"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password_check"
          name="password_check"
          className="block w-2/3 rounded-md border-0 py-1 pl-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mx-auto my-5"
          placeholder="비밀번호 확인"
          onChange={handleChange}
        />
        <button className="moveButton" onClick={handleCheckId}>중복확인</button>
        <div className="w-80 mx-auto my-10"><img src="images/Step1.png" /></div>
        <div className="flex justify-center-10">
          <button type="submit" onClick={handleSubmit} className="bg-sky-400 block mb-16 text-white w-2/3 mx-auto rounded-md p-2 text-center hover:bg-sky-500">다음 단계</button>
        </div>

      </div>
    </>
  )
}
export default Step1;