import Button from "../../components/Button";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Page from "../../components/Page";
import { Link } from "react-router-dom";


const ResetPwPage = () => {
  return (
      <Page header={<Navbar />} footer={<Footer />}>
        <h1>비밀번호 수정</h1>
        
        <input
            type="text"
            id="now_password"
            placeholder="now_password"
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
        <br />
          <input
            type="text"
            id="now_password_check"
            placeholder="now_password_check"
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
        <br />
          <input
            type="text"
            id="new_password"
            placeholder="new_password"
            onChange={(e) => {
              setId(e.target.value);
            }}
          />
        <br />
        <Button>비밀번호 변경하기</Button>
        
        <br />
        <Button><Link to="/mypage">마이페이지</Link></Button>

      </Page>
  );
};

export default ResetPwPage;