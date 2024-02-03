import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { checkEmail, checkId, signup, verifyEmail } from "../../services/user";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import { useSelector, useDispatch } from "react-redux";
import { updateStep } from "../../features/user/signUpSlice";


const DataSubmitForm = () => {
  const dispatch = useDispatch()
  const {step} = useSelector((state) => state.signUpReducer)
  useEffect(()=>{
    dispatch(updateStep(1))
  }, [])
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
        const response = await signup(
          inputForm,
          (res) => res,
          (err) => err
        );

        // 추가적인 성공 처리 로직
        navigate("/login");
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
      // 에러 처리 로직
    }
  };

  const handleCheckEmail = async (e) => {
    e.preventDefault();
    // 이메일 중복 검사 로직
    try {
      const response = await checkEmail(
        { email: formData.email },
        (res) => res,
        (err) => err
      );
      console.log(formData.email)
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

  const years = Array.from(
    new Array(100),
    (val, index) => new Date().getFullYear() - index
  );

  return (
    <>
      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}
      {step === 3 && <Step3 />}
    </>
  );
};

export default DataSubmitForm;
