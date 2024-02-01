import Footer from "../../components/Footer";
import Page from "../../components/Page";
import Button from "../../components/Button";
import SignUpPage from "../SingUpPage";
import LoginPage from ".";
import MainPage from "../MainPage";
import { Link, useNavigate } from "react-router-dom";
import React, {useState} from "react";
import axios from "axios";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";


const FindPwPage = () => {
  const [formData, setFormData] = useState({
    name: undefined,
    idEmail: undefined,
    userId: undefined,
    pwEmail: undefined,
    });
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const navigate = useNavigate()

  const handleSubmitId = async (e) => {
    e.preventDefault();
    try {
      const inputForm = {
        email: formData.idEmail,
        name: formData.name
      }
      const response = await axios.post(
        "http://localhost:8000/api/user/find-id",
        inputForm,
        { withCredentials: true }
      );
      console.log(response.data.data.userId)
      if (response.data.status == "200") {
        alert(`찾으시는 아이디는 ${response.data.data.userId}입니다.`)
      } else if (response.data.status == "404") {
        alert('해당 정보로 가입된 아이디가 존재하지 않습니다.')
      } else {
        alert('입력이 올바른지 확인해주세요')
      }
    } catch (error) {
      console.error("Error sending data", error);
      alert("해당 정보로 가입된 아이디가 존재하지 않습니다.")
    }
  }

  const handleSubmitPw = async (e) => {
    e.preventDefault();
    try {
      const inputForm = {
        userId: formData.userId,
        email: formData.pwEmail
      }
      const response = await axios.post(
        "http://localhost:8000/api/user/find-pw",
        inputForm,
        { withCredentials: true }
      );
      console.log(response.data)
      if (response.data.status == "200") {
        alert(`임시 비밀번호 변경 완료. 이메일 확인 바랍니다.`)
        navigate('/login')
      } else if (response.data.status == "404") {
        alert('입력된 정보가 올바른지 확인해주시길 바랍니다.')
      } else {
        alert('잠시 후 다시 진행해주시길 바랍니다.')
      }
    } catch (error) {
      console.error("Error sending data", error);
      alert("(오류 발생) 잠시 후 다시 진행해주시길 바랍니다.")
    }
  }


  return (
    <>
      <Page footer={<Footer />}>
        <Link to="/">PLOUD</Link>
        <div>
          <h2>아이디 찾기</h2>
          <form onSubmit={handleSubmitId}>
            이름 :
            <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder=" ex) 김싸피" />
            <br /><br />
            이메일 :
            <input type="email" name="idEmail" value={formData.idEmail} onChange={handleChange} placeholder=" ex) ssafy@ssafy.com" />
            <br /><br />
            <Button>아이디 찾기</Button>
          </form>
          <br /><br />
          <h2>비밀번호 찾기</h2>
          <form onSubmit={handleSubmitPw}>
            아이디 :
            <input type="text" name="userId" value={formData.userId} onChange={handleChange} placeholder=" ex) ssafy" />
            <br /><br />
            이메일 :
            <input type="email" name="pwEmail" value={formData.pwEmail} onChange={handleChange} placeholder=" ex) ssafy@ssafy.com" />
            <br /><br />
            <Button>비밀번호 찾기</Button>
          </form>
          <br /><br />
          <Link to="/signup" element={<SignUpPage />}>
            회원가입
          </Link>
          <br /><br />
          <Link to="/login" element={<LoginPage />}>
            로그인
          </Link>

          <GoogleOAuthProvider 
          clientId="392523178125-21b3u9bb52injjfa9kjdb3a0vbijcidg.apps.googleusercontent.com"
          onScriptLoadError={() => console.log("실패")}
          onScriptLoadSuccess={() => console.log("성공")}
          >
            <GoogleLogin
              onSuccess={credentialResponse => {
                console.log(credentialResponse);
                localStorage.setItem('credential', credentialResponse.credential);
                localStorage.setItem('clientId', credentialResponse.clientId);
              }}
              onError={() => {
                console.log('Login Failed');
              }}
            />
          </GoogleOAuthProvider>
          
        </div>
      </Page>
    </>
  );
};

export default FindPwPage;
