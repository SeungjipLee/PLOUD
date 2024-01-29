import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import AuthService from "../pages/LoginPage/Service/AuthService";


const nickname = 'tony'

const Navbar = () => {
  const [isLogined, setisLogined] = useState(true)

  const onClickHandler = () => {
    setisLogined(false)
  }
  console.log(isLogined)
    return(
  <div className="Navbar">
    <nav>
      <Link to="/">Home</Link>
      <Link to="/board">게시판</Link>
      <Link to="/study">스터디</Link>
      <Link to="/practice">연습</Link>
      {!isLogined && <Link to="/login">로그인</Link>}
      {!isLogined && <Link to="/signup">회원가입</Link>}
      {isLogined && <h3>{nickname}님</h3>}
      {isLogined && <Link to="/mypage">마이페이지</Link> }
      {isLogined && <Button onClick={onClickHandler}>로그아웃</Button> }

    </nav>
  </div>)
  }


export default Navbar;
