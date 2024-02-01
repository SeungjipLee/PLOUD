import React from "react";
import Page from "../../components/Page";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import MainPage from "../MainPage";
import SignUpPage from "../SingUpPage";
import Button from "../../../src/components/Button";
import SocialLogin from "./SocialLogin";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getToken, getUserId } from "../../features/user/userSlice";
import { useState } from "react";
// import AuthService from "../LoginPage/Service/AuthService";
import { login } from "../../services/user";

const LoginPage = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [Id, setId] = useState(""); // 입력받은 Id
  const [Pw, setPw] = useState(""); // 입력받은 Pw

  const handleLogin = (e) => {
    e.preventDefault();

    login(
      {userId: Id, password: Pw},
      (res) => {
        localStorage.setItem("user", JSON.stringify(res.data)); // local에 userData 저장
        dispatch(getToken(res.data));
        dispatch(getUserId(Id));
        navigate("/");
      },
      (err) => alert("아이디 혹은 비밀번호가 일치하지 않습니다.")
      );
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
