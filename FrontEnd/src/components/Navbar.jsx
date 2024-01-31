import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "./Button";
import { useSelector, useDispatch } from "react-redux";
import { expireToken } from "../features/user/userSlice";

const Navbar = () => {
  const { isLogined, nickname } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const onClickHandler = () => {
    dispatch(expireToken());
    // 브라우저 로컬스토리지에서도 토큰을 삭제해야함
    localStorage.removeItem("user");
  };
  return (
    <div className="Navbar w-screen h-20 fixed top-0 z-20 py-5">
      <Link to="/" >
        <div className="w-40 h-5">
          <img src="images/ICON.png" alt="아이콘" className="w-full object-cover"/>
        </div>
      </Link>
      <nav className="ml-30">
        <Link to="/board" style={{color: '#0C134F'}} className="hover:bg-slate-100">게시판</Link>
        <Link to="/study" style={{color: '#0C134F'}} className="hover:bg-slate-100">스터디</Link>
        <Link to="/practice" style={{color: '#0C134F'}} className="hover:bg-slate-100">연습</Link>
        <Link to="/test" style={{color: '#0C134F'}} className="hover:bg-slate-100">테스트</Link>
      </nav>
      <nav>
        {!isLogined && (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h3 className="font-thin" style={{ color: "#0C134F" }}>
              로그인이 필요합니다.</h3>
          </div>)}
        {!isLogined && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              whiteSpace: "nowrap",
            }}>
            <Link to="/login" style={{ padding:0, paddingRight: 5, color: "#0C134F"}}>
              로그인
            </Link>
            <Link to="/signup" style={{ padding: 0, color: "#0C134F", marginLeft: "10px" }}>
              회원가입
            </Link>
          </div>)}

        {isLogined && (
          <div style={{ display: "flex", justifyContent: "center" }}>
          <h3 className="font-thin" style={{ color: "#0C134F" }}>
            {nickname}님</h3>
          </div>)}
        {isLogined && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              whiteSpace: "nowrap",
            }}>
            <Link to="/mypage" style={{ padding:0, paddingRight: 5, color: "#0C134F"}}>마이페이지</Link>
            <span onClick={onClickHandler} style={{ padding: 0, color: "#0C134F", marginLeft: "10px", cursor: "pointer" }}>로그아웃</span>
          </div>)}
      </nav>
    </div>
  );
};

export default Navbar;