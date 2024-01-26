import Button from "../../components/Button";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Page from "../../components/Page";

const MyPage = () => {
  return (
    <div className="mypage">
      <Page header={<Navbar />} footer={<Footer />}>
        <h1>마이페이지</h1>
        <div className="mypage-1">
          <div className="profile">프로필
            <Button>회원 정보 수정</Button>
          </div>
          <div className="status">
            <div>학습현황</div>
            <div>학습시간</div>
          </div>
        </div>
        <div className="mypage-2">
          <div className="practicelist">나의 발표 결과</div>
        </div>
      </Page>
    </div>
  );
};

export default MyPage;
