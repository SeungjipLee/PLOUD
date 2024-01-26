import React from "react";
import Page from "../../components/Page";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import MainPage from "../MainPage";
import SignUpPage from "../SingUpPage";
import Button from "../../../src/components/Button";
import SocialLogin from "./SocialLogin";

import { useNavigate } from "react-router-dom";

import { useState } from "react";
import AuthService from "../LoginPage/Service/AuthService";

const LoginPage = () => {
  let navigate = useNavigate();

  const [Id, setId] = useState(""); // 입력받은 Id
  const [Pw, setPw] = useState(""); // 입력받은 Pw

  const handleLogin = (e) => {
    e.preventDefault();

    AuthService.login(Id, Pw)
      .then(() => {
        navigate("/");
      })
      .catch((e) => {
        alert(e);
      });
  };

  return (
    <Page footer={<Footer />}>
      <Link to="/" element={<MainPage />}>
        PLOUD
      </Link>
      <div className="Login">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            id="id"
            placeholder="id"
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
          <br />
          <input
            type="password"
            id="pw"
            placeholder="password"
            onChange={(e) => {
              setPw(e.target.value);
            }}
          />
          <br />
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
