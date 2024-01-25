import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { signup } from "../../features/user/userSlice";
import Page from "../../components/Page";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import MainPage from "../MainPage";
import Button from "../../components/Button";
import SocialLogin from "../LoginPage/SocialLogin";

const SignUpPage = () => {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [nickname, setNickname] = useState("");
  const [name, setName] = useState("");
  const dispatch = useDispatch();

  const onUserIdHandler = (event) => {
    setUserId(event.target.value);
  };
  const onEmailHandler = (event) => {
    setEmail(event.target.value);
  };
  const onPasswordHandler = (event) => {
    setPassword(event.target.value);
  };
  const onPassword2Handler = (event) => {
    setPassword2(event.target.value);
  };
  const onNicknameHandler = (event) => {
    setNickname(event.target.value);
  };
  const onNameHandler = (event) => {
    setName(event.target.value);
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (password === password2) {
      let body = {
        user_id: userId,
        email: email,
        name: name,
        password: password,
        nickname: nickname,
      };
      dispatch(signup(body))
      // dispatch(signup(body)).then((response) => {
      //   alert("가입이 정상적으로 완료되엇습니다.");
      //   props.history.push("/login");
      // });
    } else {
      alert("비밀번호가 일치하지 않습니다.");
    }
    console.log(event);
  };

  return (
    <Page footer={<Footer />}>
      <Link to="/" element={<MainPage />}>
        PLOUD
      </Link>
      <div className="box">
        <h2>Sign Up</h2>
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
              type="email"
              value={email}
              placeholder="email"
              onChange={onEmailHandler}
            />
            <Button>이메일 확인</Button>
          </div>
          <div className="signup-input">
            <input
              type="text"
              value={nickname}
              placeholder="nickname"
              onChange={onNicknameHandler}
            />
            <Button>중복 확인</Button>
          </div>
          <div className="signup-input">
            <input
              type="text"
              value={name}
              placeholder="name"
              onChange={onNameHandler}
            />
          </div>
          <div className="signup-input">
            <p>
              비밀번호는 문자, 숫자, 특수문자 조합 10~16자리로 입력이
              가능합니다.{" "}
            </p>
            <input
              type="password"
              value={password}
              placeholder="password"
              onChange={onPasswordHandler}
            />
          </div>
          <div className="signup-input">
            {password !== password2 && <p>비밀번호가 일치하지 않습니다.</p>}
            <input
              type="password"
              value={password2}
              placeholder="password check"
              onChange={onPassword2Handler}
            />
          </div>
          <Button type="submit">Sign Up</Button>
        </form>
        <SocialLogin />
      </div>
    </Page>
  );
};

export default SignUpPage;
