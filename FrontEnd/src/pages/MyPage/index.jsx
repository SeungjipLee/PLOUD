import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Page from "../../components/Page";
import { Link } from "react-router-dom";
import { getProfile } from "../../services/user";
import { useSelector } from "react-redux";

const MyPage = () => {
  const { token } = useSelector((state) => state.userReducer)
  const [ profile, setProfile ] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProfile(
          token,
          (res) => res,
          (err) => err
        );
        setProfile(response.data.data)
      } catch (error) {
        console.error("Profile fetch failed:", error);
      }
    };
    
    fetchData();
  }, []);

  // useEffect(() => {
  //   console.log(profile)
  // }, [profile])

  return (
    <div className="mypage">
      {/* <button onClick={()=> console.log(token)}>콘솔</button> */}
      <Page header={<Navbar />} footer={<Footer />}>
        <h1>마이페이지</h1>
        <div className="mypage-1">
          <div className="profile">
            {/* <Button>
              <Link to="/patchinfo">회원정보수정</Link>
            </Button> */}
          </div>
          <div className="status">
            <div>학습현황</div>
            <div>학습시간</div>
            {profile.name}
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
