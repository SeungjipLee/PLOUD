import React, { useState,  } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const DataSubmitForm = () => {
  const [formData, setFormData] = useState({
    userId: undefined,
    email: undefined,
    emailCode: undefined,
    name: undefined,
    nickname: undefined,
    password: undefined,
    password_check: undefined,
    birthYear: undefined,
  });
  const [isUserIdValid, setIsUserIdValid] = useState(false);
  const [isEmailPass, setIsEmailPass] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const validateUserId = () => /^[A-Za-z0-9]{4,15}$/.test(formData.userId);
  const validateNickname = () =>
    /^[A-Za-z0-9가-힣]{2,8}$/.test(formData.nickname);
  const validatePassword = () =>
    /^(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{6,15}$/.test(formData.password);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !validateUserId() ||
      !validateNickname() ||
      !validatePassword() ||
      formData.password !== formData.password_check ||
      !isUserIdValid ||
      !isEmailValid
    ) {
      alert("양식을 올바르게 채워주세요.");
    } else {
      try {
        const inputForm = {
          userId: formData.userId,
          password: formData.password,
          email: formData.email,
          name: formData.name,
          nickname: formData.nickname,
          birthYear: formData.birthYear,
        };
        const response = await axios.post(
          "http://localhost:8000/api/user/signup",
          inputForm,
          { withCredentials: true }
        );
        console.log(response.data);
        // 추가적인 성공 처리 로직
        navigate('/login')
      } catch (error) {
        console.error("Error sending data", error);
        // 에러 처리 로직
      }
    }
  };

  const handleCheckId = async (e) => {
    e.preventDefault();
    if (!validateUserId()) {
      alert("아이디 형식을 확인해주세요.");
    }
    // 아이디 중복 검사 로직
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/userId",
        { userId: formData.userId },
        { withCredentials: true }
      );
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
      // 에러 처리 로직
    }
  };

  const handleCheckEmail = async (e) => {
    e.preventDefault();
    // 이메일 중복 검사 로직
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/email",
        { email: formData.email },
        { withCredentials: true }
      );
      // 추가적인 성공 처리 로직
      if (response.data.status == "200") {
        alert("가입 가능한 이메일입니다. 메일로 인증번호를 보냈습니다.");
        setIsEmailPass(true);
      } else if (response.data.status == "409") {
        alert("이미 가입된 이메일입니다.");
      } else {
        alert("인증 코드 메일이 전송되지 않았습니다. 다시 실행 바랍니다.");
      }
    } catch (error) {
      console.error("Error sending data", error);
      alert("이미 가입된 이메일입니다.");
      // 에러 처리 로직
    }
  };

  const handleCheckEmailCode = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/verify-email",
        { email: formData.email, code: formData.emailCode },
        { withCredentials: true }
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

  const years = Array.from(
    new Array(100),
    (val, index) => new Date().getFullYear() - index
  );

  return (
    <>
      <Link to="/">PLOUD</Link>
      <h1>회원가입</h1>
      <form onSubmit={handleSubmit}>
        아이디 :
        {isUserIdValid && 
          <input
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            placeholder=""
            disabled
          />
        }
        {!isUserIdValid && (
          <input
            type="text"
            name="userId"
            value={formData.userId}
            onChange={handleChange}
            placeholder=" ex) ssafy"
          />
        )}
        {!isUserIdValid && (<span onClick={handleCheckId}>중복확인</span>)}
        {isUserIdValid && (<span onClick={() => setIsUserIdValid(false)}>취소</span>)}
        <br />
        <br />
        이메일 :
        {isEmailPass && 
          <input
            type="email"
            name="userId"
            value={formData.email}
            onChange={handleChange}
            placeholder=""
            disabled
          />
        }
        {!isEmailPass && (
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder=" ex) ssafy@ssafy.com"
          />
        )}
        {!isEmailPass && (<span onClick={handleCheckEmail}>중복확인</span>)}
        {isEmailPass && (<span onClick={() => setIsEmailPass(false)}>취소</span>)}
        <br />
        <br />
        이메일 코드 확인:
        {isEmailValid && 
          <input
            type="text"
            name="emailCode"
            value={formData.emailCode}
            onChange={handleChange}
            placeholder=""
            disabled
          />
        }
        {!isEmailValid && (
          <input
            type="text"
            name="emailCode"
            value={formData.emailCode}
            onChange={handleChange}
            placeholder=" ex) xAdsXZ"
          />
        )}
        {!isEmailValid && (<span onClick={handleCheckEmailCode}>인증</span>)}
        {/* {isEmailValid && (<span onClick={() => setIsEmailValid(false)}>취소</span>)}
         */}
        <br />
        <br />
        
        
        
        이름 :
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder=" ex) 김싸피"
        />
        <br />
        <br /> 닉네임 :
        <input
          type="text"
          minLength="2"
          maxLength="8"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
          placeholder=" ex) 싸피"
        />
        <br />
        <br /> 비밀번호 :
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="*********"
        />
        <br />
        <br /> 비밀번호 확인 :
        <input
          type="password"
          name="password_check"
          value={formData.password_check}
          onChange={handleChange}
          placeholder="*********"
        />
        <br />
        <br /> 출생연도 :
        <select
          name="birthYear"
          value={formData.birthYear}
          onChange={handleChange}
        >
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <br />
        <br />
        <button type="submit">회원가입</button>
      </form>
    </>
  );
};

export default DataSubmitForm;
