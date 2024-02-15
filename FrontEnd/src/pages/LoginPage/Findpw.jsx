import React from "react";
import Page from "../../components/Page";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import LoginPage from ".";
import SignUpPage from "../SingUpPage";
import SocialLogin from "./SocialLogin";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { findId, findPw } from "../../services/user";
import MyAlert from "../../components/MyAlert";

const FindPwPage = () => {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  // 알림 창 상태
  const [ message, setMessage ] = useState("")
  const [ alert, setAlert ] = useState(false)
  const [ alert2, setAlert2 ] = useState(false)

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [id, setId] = useState("");
  const [isIdFind, setIsIdFind] = useState(false)

  const handleFindId = (e) => {
    e.preventDefault();
    findId(
      {email: email, name: name},
      async (res) => {
        await setMessage(`아이디는 ${res.data.data.userId}입니다.`)
        setAlert(true)
        setIsIdFind(true)
      },
      async (err) => {
        await setMessage("이름이나 이메일 정보가 올바르지 않습니다.")
        setAlert(true)
      }
    );
  };

  const handleFindPw = (e) => {
    e.preventDefault();
    findPw(
      {userId:id, email:email},
      async (res) => {
        await setMessage('(비밀번호 초기화) 메일로 새비밀번호를 전송하였습니다.')
        setAlert2(true)
      },
      async (err) => {
        await setMessage("아이디나 이메일 정보가 올바르지 않습니다.")
        setAlert(true)
      }
    )
  }

  const changeId = () => {
    setIsIdFind(false)
  }

  const changePw = () => {
    setIsIdFind(true)
  }

  return (
    <>
    <Page footer={<Footer />}>
      <div className="flex justify-center">
        <a href="/"><img src="images/ICON_similar_white.png" className="w-36 mt-24"/></a>
      </div>
      <div className="LoginBox mb-36 py-4 rounded-xl mx-auto">
        <h2 className="text-white text-2xl text-center py-5">
          {!isIdFind&&<span className="mx-5 font-extrabold" onClick={changeId}>아이디 찾기</span>}
          {isIdFind&&<span className="mx-5 text-gray-300" onClick={changeId}>아이디 찾기</span>}
          {!isIdFind&&<span className="mx-5  text-gray-300" onClick={changePw}>비밀번호 찾기</span>}
          {isIdFind&&<span className="mx-5 font-extrabold" onClick={changePw}>비밀번호 찾기</span>}
          </h2>
        {!isIdFind&&<form onSubmit={handleFindId}>
          <input
            type="text"
            id="name"
            className="block w-2/3 rounded-md border-0 py-1 pl-7 pr-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mx-auto my-5"
            placeholder="이름"
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            type="email"
            id="email"
            className="block w-2/3 rounded-md border-0 py-1 pl-7 pr-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mx-auto my-5"
            placeholder="이메일"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <span onClick={handleFindId} className="bg-sky-400 block mt-10 mb-5 text-white w-2/3 mx-auto rounded-md p-2 text-center hover:bg-sky-500">
            <button type="submit">아이디 찾기</button>
          </span>
        </form>}

        {isIdFind&&<form onSubmit={handleFindPw}>
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
            type="email"
            id="email"
            className="block w-2/3 rounded-md border-0 py-1 pl-7 pr-7 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mx-auto my-5"
            placeholder="이메일"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <span onClick={handleFindPw} className="bg-sky-400 block mt-10 mb-5 text-white w-2/3 mx-auto rounded-md p-2 text-center hover:bg-sky-500">
            <button type="submit">비밀번호 찾기</button>
          </span>
        </form>}
        
        <div className="text-slate-200 my-5 LoginAnother justify-center">
          <span className="pe-5 hover:text-white">
            <Link to="/login" element={<LoginPage />}>로그인</Link>
          </span>
          <span className="pe-8 hover:text-white">
            <Link to="/signup" element={<SignUpPage />}>회원가입</Link>
          </span> 
        </div>
        <div className="mx-auto w-1/2 mb-5">
          <SocialLogin />
        </div>
      </div>
    </Page>
    {alert && <MyAlert content={message} onClose={() => {setAlert(false)}}/>}
    {alert2 && <MyAlert content={message} onClose={() => {setAlert2(false); navigate("/login")}}/>}
    </>
  );
};

export default FindPwPage;
