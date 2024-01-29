import Button from "../../components/Button";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Page from "../../components/Page";
import { Link } from "react-router-dom";


const PatchInfoPage = () => {
  return (
    <div className="mypage">
      <Page header={<Navbar />} footer={<Footer />}>
        <h1>회원 정보 수정</h1>
        <img src="images/Profile.PNG" alt="Main1.png" />
        <br />
        <Button>프로필 사진 변경</Button>
        <br />
        <input
            type="text"
            id="id"
            placeholder="id"
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
        <Button>수정하기</Button>
        
        <br />
        <Button><Link to="/resetpw">비밀번호 재설정</Link></Button>
        <Button><Link to="/mypage">마이페이지</Link></Button>

      </Page>
    </div>
  );
};

export default PatchInfoPage;