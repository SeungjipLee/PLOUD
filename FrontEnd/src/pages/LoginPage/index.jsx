import React from "react";
import Page from "../../components/Page";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import SignUpPage from "../SingUpPage";
import SocialLogin from "./SocialLogin";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getToken, getUserId } from "../../features/user/userSlice";
import { useState } from "react";
import { login } from "../../services/user";
import MyAlert from "../../components/MyAlert";

const LoginPage = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  // 알림 창 상태
  const [ message, setMessage ] = useState("")
  const [ alert, setAlert ] = useState(false)

  const [Id, setId] = useState(""); // 입력받은 Id
  const [Pw, setPw] = useState(""); // 입력받은 Pw

  const handleLogin = (e) => {
    e.preventDefault();

    login(
      { userId: Id, password: Pw },
      (res) => {
        localStorage.setItem("user", JSON.stringify(res.data)); // local에 userData 저장
        dispatch(getToken(res.data));
        dispatch(getUserId(Id));
        navigate("/");
      },
      async (err) => {
        await setMessage("아이디 혹은 비밀번호가 일치하지 않습니다.")
        setAlert(true)
      }
    );
  };

  return (
    <>
    <Page footer={<Footer />}>
      <div className="flex justify-center">
        <a href="/">
          <img src="/images/ICON_similar_white.png" className="w-36 mt-24" />
        </a>
      </div>
      <div className="LoginBox mb-36 py-4 rounded-xl mx-auto">
        <h2 className="text-white text-3xl text-center py-5">로그인</h2>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            id="id"
            className="block w-2/3 rounded-md border-0 py-1 pl-7 pr-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mx-auto my-5"
            placeholder="아이디"
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
          <input
            type="password"
            id="password"
            className="block w-2/3 rounded-md border-0 py-1 pl-7 pr-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mx-auto my-5"
            placeholder="비밀번호"
            onChange={(e) => {
              setPw(e.target.value);
            }}
          />
          <span
            onClick={handleLogin}
            className="bg-sky-400 block mt-10 mb-5 text-white w-2/3 mx-auto rounded-md p-2 text-center hover:bg-sky-500">
            <button type="submit">로그인</button>
          </span>
        </form>
        <div className="text-slate-200 py-5 LoginAnother justify-center">
          <span className="pe-5 hover:text-white">
            <Link to="/findpw" element={<SignUpPage />}>
              아이디/비밀번호 찾기
            </Link>
          </span>
          <span className="pe-8 hover:text-white">
            <Link to="/signup" element={<SignUpPage />}>
              회원가입
            </Link>
          </span>
        </div>
        <div className="mx-auto w-1/2 mb-5" style={{width: "202px"}}>
          <SocialLogin />
        </div>
      </div>
    </Page>
    
    {alert && <MyAlert content={message} onClose={() => {setAlert(false)}}/>}
    </>
  );
};

export default LoginPage;
