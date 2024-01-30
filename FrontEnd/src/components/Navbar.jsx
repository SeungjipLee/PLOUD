import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { useSelector, useDispatch } from "react-redux";
import { expireToken } from "../features/user/userSlice";

const Navbar = () => {
  const { isLogined, user_id } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  console.log(isLogined, user_id)

  const onClickHandler = () => {
    dispatch(expireToken());
    // 브라우저 로컬스토리지에서도 토큰을 삭제해야함
    localStorage.removeItem("user");
  };
  return (
    <div className="Navbar">
      <nav>
        <Link to="/">Home</Link>
        <Link to="/board">게시판</Link>
        <Link to="/study">스터디</Link>
        <Link to="/practice">연습</Link>
        <Link to="/test">테스트</Link>
        {!isLogined && <Link to="/login">로그인</Link>}
        {!isLogined && <Link to="/signup">회원가입</Link>}
        {isLogined && <h3>{user_id}님</h3>}
        {isLogined && <Link to="/mypage">마이페이지</Link>}
        {isLogined && <Button onClick={onClickHandler}>로그아웃</Button>}
      </nav>
    </div>
  );
};

export default Navbar;
