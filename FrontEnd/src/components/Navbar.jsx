import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { expireToken } from "../features/user/userSlice";

const Navbar = () => {
  const { isLogined, nickname } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLink = (path) => {
    if (isLogined) {
      navigate(path);
    } else {
      alert("로그인이 필요합니다");
      navigate("/login");
    }
  };

  const onClickHandler = () => {
    dispatch(expireToken());
    localStorage.removeItem("user");
    navigate("/");
  };
  return (
    <div className="Navbar w-screen h-20 fixed top-0 z-20 py-5">
      <Link to="/">
        <div className="w-40 h-5 ml-20 mr-10">
          <img
            src="images/ICON.png"
            alt="아이콘"
            className="w-full object-cover"
          />
        </div>
      </Link>
      <nav className="relative">
        <span
          onClick={() => handleLink("/study")}
          style={{ color: "#0C134F" }}
          className="mx-5 font-extrabold link hover:bg-slate-100 cursor-pointer">
          스터디
        </span>
        <span
          onClick={() => handleLink("/practice1")}
          style={{ color: "#0C134F" }}
          className="mx-5 font-extrabold link hover:bg-slate-100 cursor-pointer">
          연습
        </span>
        <span
          onClick={() => handleLink("/board")}
          style={{ color: "#0C134F" }}
          className="mx-5 font-extrabold link hover:bg-slate-100 cursor-pointer">
          게시판
        </span>
      </nav>
      <nav>
        {!isLogined && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              whiteSpace: "nowrap",
            }}>
            <Link
              to="/login"
              style={{
                padding: 0,
                paddingRight: 5,
                color: "#0C134F",
                position: "absolute",
                right: "180px",
                top: "30px",
              }}>
              로그인
            </Link>
            <Link
              to="/signup"
              style={{
                padding: 0,
                color: "#0C134F",
                position: "absolute",
                right: "100px",
                top: "30px",
              }}>
              회원가입
            </Link>
          </div>
        )}

        {isLogined && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              whiteSpace: "nowrap",
            }}>
            <Link
              to="/mypage"
              style={{
                padding: 0,
                paddingRight: 5,
                color: "#0C134F",
                position: "absolute",
                right: "280px",
                top: "30px",
              }}>
              {nickname}님
            </Link>
            <Link
              to="/mypage"
              style={{
                padding: 0,
                paddingRight: 5,
                color: "#0C134F",
                position: "absolute",
                right: "180px",
                top: "30px",
              }}>
              마이페이지
            </Link>
            <span
              onClick={onClickHandler}
              style={{
                padding: 0,
                color: "#0C134F",
                marginLeft: "10px",
                cursor: "pointer",
                position: "absolute",
                right: "100px",
                top: "30px",
              }}>
              로그아웃
            </span>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
