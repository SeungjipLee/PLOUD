import React, { useState } from "react";
import { request } from "../../lib/axios";
import { useSelector, useDispatch } from "react-redux";
import { signup } from "../../features/user/userSlice";
import Page from "../../components/Page";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import MainPage from "../MainPage";
import Button from "../../components/Button";
import SocialLogin from "../LoginPage/SocialLogin";

const SignUpPage = async () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
    nickname: "",
    userId: "",
    birthYear: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.password2) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    request("post", "/user/signup", formData);
  };

  return (
    <Page footer={<Footer />}>
      <Link to="/" element={<MainPage />}>
        PLOUD
      </Link>
      <div className="box">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="signup-input">
            <input
              type="text"
              value={formData.userId}
              placeholder="id"
              onChange={handleChange}
            />
            <Button>중복확인</Button>
          </div>
          <div className="signup-input">
            <input
              type="email"
              value={formData.email}
              placeholder="email"
              onChange={handleChange}
            />
            <Button>이메일 확인</Button>
          </div>
          <div className="signup-input">
            <input
              type="text"
              value={formData.nickname}
              placeholder="nickname"
              onChange={handleChange}
            />
            <Button>중복 확인</Button>
          </div>
          <div className="signup-input">
            <input
              type="text"
              value={formData.name}
              placeholder="name"
              onChange={handleChange}
            />
          </div>
          <div className="signup-input">
            <p>
              비밀번호는 문자, 숫자, 특수문자 조합 10~16자리로 입력이
              가능합니다.{" "}
            </p>
            <input
              type="password"
              value={formData.password}
              placeholder="password"
              onChange={handleChange}
            />
          </div>
          <div className="signup-input">
            {formData.password !== formData.password2 && (
              <p>비밀번호가 일치하지 않습니다.</p>
            )}
            <input
              type="password"
              value={formData.password2}
              placeholder="password check"
              onChange={handleChange}
            />
          </div>
          <Button type="submit">Sign Up</Button>
        </form>
        <SocialLogin />
      </div>
    </Page>
  );
};

// export default SignUpPage;
