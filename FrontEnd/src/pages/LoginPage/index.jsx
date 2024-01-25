import React, { useState } from "react";
import Page from "../../components/Page";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import MainPage from "../MainPage";
import SignUpPage from "../SingUpPage";
import Button from "../../../src/components/Button";
import SocialLogin from "./SocialLogin";

const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  const onUserIdHandler = (event) => {
    setUserId(event.target.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const onSubmitHandler = (event) => {
    console.log(event);
    event.preventDefault();
  };

  return (
    <Page footer={<Footer />}>
      <Link to="/" element={<MainPage />}>
        PLOUD
      </Link>
      <div className="Login">
        <h2>Login</h2>
        <form onSubmit={onSubmitHandler}>
          <div className="signup-input">
            <input
              type="text"
              value={userId}
              placeholder="id"
              onChange={onUserIdHandler}
            />
            <Button>중복확인</Button>
          </div>
          <div className="signup-input">
            <input
              type="password"
              value={password}
              placeholder="password"
              onChange={onPasswordHandler}
            />
          </div>
          <label>
            <input type="checkbox" />
            아이디 저장하기
          </label>
          <br />
          <Button type="submit">Login</Button>
        </form>
      </div>
      <Link to="/findpw" element={<SignUpPage />}>
        아이디/비밀번호 찾기
      </Link>
      <br />
      <Link to="/signup" element={<SignUpPage />}>
        회원가입
      </Link>
      <SocialLogin />
    </Page>
  );
};

export default LoginPage;
