import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { checkEmail, checkId, signup, verifyEmail } from "../../services/user";

const Step3 = () => {
    // 입력 받는 변수
    const [formData, setFormData] = useState({
        name: undefined,
        nickname : undefined,
        birthYear: undefined,
    })
    // 보여주는 처리할 변수
    const [isStep3Done, setIsStep3Done] = useState(false)
    const [isNicknameValid, setIsNicknameValid] = useState(false);
    
    
    const handleChange = (e) => {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const validateNickname = () =>
    /^[A-Za-z0-9가-힣]{2,8}$/.test(formData.nickname);
    
    

    const years = Array.from(
      new Array(100),
      (val, index) => new Date().getFullYear() - index
    );
    
    return (
        <>
        <div className="flex justify-center">
            <a href="/"><img src="images/ICON_similar_white.png" className="w-36 mt-24"/></a>
        </div>
        <div className="LoginBox mb-36 py-4 rounded-xl mx-auto relative">
            <h2 className="text-white text-3xl text-center py-5">Sign Up</h2>
              <input
                type="text"
                id="nickname"
                minLength={2}
                maxLength={8}
                className="block w-2/3 rounded-md border-0 py-1 pl-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mx-auto my-5"
                placeholder="nickname"
                onChange={(e) => {
                  setFormData(e.target.value);
                }}
              />
              
                <input
                  type="text"
                  id="name"
                  minLength={2}
                  maxLength={6}
                  className="block w-2/3 rounded-md border-0 py-1 pl-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mx-auto my-5"
                  placeholder="name"
                  onChange={(e) => {
                    setFormData(e.target.value);
                  }}
                />                  
                <div className="block w-2/3 rounded-md border-0 py-1 pl-7 pr-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mx-auto my-5">
                <span className="text-white">birth year   :</span>
                <select
                  name="birthYear"
                  value={formData.birthYear}
                  onChange={handleChange}
                  className="mx-3 w-20"
                >{years.map((year) => (
                <option key={year} value={year}>
                {year}
                </option>
                ))}
                </select>
                </div>
              <button className="moveButton">중복확인</button>
              <div className="w-80 mx-auto my-10"><img src="images/Step3.png"/></div>
              <div className="flex justify-center-10">
                <button type="submit" className="bg-sky-400 block mb-16 text-white w-2/3 mx-auto rounded-md p-2 text-center hover:bg-sky-500">가입 완료</button>
              </div>
                  
        </div>
        </>
    )
}
export default Step3;