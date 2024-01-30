import Footer from "../../components/Footer";
import Page from "../../components/Page";
import Button from "../../components/Button";
import SignUpPage from "../SingUpPage";
import LoginPage from ".";
import MainPage from "../MainPage";
import { Link } from "react-router-dom";

const FindPwPage = () => {
  return (
    <>
      <Page footer={<Footer />}>
        <Link to="/" element={<MainPage />}>
          PLOUD
        </Link>
        <div>
          <h2>아이디 찾기</h2>
          <form action="">
            <input type="text" id="email" placeholder="email" />
            <Button>메일전송</Button>
          </form>
          <h2>비밀번호 찾기</h2>
          <form action="">
            <input type="text" id="id" placeholder="id" />
            <br />
            <input type="text" id="email" placeholder="email" />
            <Button>메일전송</Button>
          </form>
          <Link to="/signup" element={<SignUpPage />}>
            회원가입
          </Link>
          <br />
          <Link to="/login" element={<LoginPage />}>
            로그인
          </Link>
          <div className="SocialLogin">
            <div className="KakaoLogin">카카오 로그인</div>
            <div className="GoogleLogin">구글 로그인</div>
          </div>
        </div>
      </Page>
    </>
  );
};

export default FindPwPage;
