import { useEffect, useState } from "react";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Page from "../../components/Page";
import { Link } from "react-router-dom";
import { getProfile } from "../../services/user";
import { useSelector } from "react-redux";
import ResultCard from "../../components/ResultCard";

const MyPage = () => {
  const { token } = useSelector((state) => state.userReducer)
  const [ profile, setProfile ] = useState({})
  const base64Image = `data:image/png;base64,${profile.profileImg}`

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProfile(
          token,
          (res) => {
            console.log(res.data.data)
            setProfile(res.data.data)
          },
          (err) => console.log(err)
        );
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
      <div className="bg-white w-full min-h-screen">
      <Page header={<Navbar />} footer={<Footer />}>
        <div className="mt-24 place-self-center flex justify-center">
          <h2 className="font-extrabold text-2xl">마이페이지</h2>
        </div>
        <div className="flex place-self-center container1">
          <div className="ms-10 me-5 bg-white box1 drop-shadow-md rounded-md">
            <h2 className="ms-5 text-xl my-3">프로필</h2>
            <div className="flex">
              <div className="w-32 h-32 mx-5">
                {!profile.profileImg&&
                <img src="images/Profile.PNG"/>}
                {profile.profileImg&&<img src={`${base64Image}`}/>}
              </div>
              <div className="text-sm py-2">
                <p className="py-0.5">닉네임 : {profile.nickname}</p>
                <p className="py-0.5">이름 : {profile.name}</p>
                <p className="py-0.5">아이디 : {profile.userId}</p>
                <p className="py-0.5">이메일 : {profile.email}</p>
              </div>
            </div>
                <button 
                  className="bg-gray-400 text-white rounded-md p-1 mx-7 mb-3">
                    <Link to="/patchinfo">회원정보 수정</Link>
                </button>
            </div>
          <div className="ms-5 me-10 bg-white box2 drop-shadow-md rounded-md">
            <h2 className="ms-5 text-xl my-3">학습현황</h2>
              <div className="flex">
                <div className="w-72 h-44 mx-5 my-3">
                  <img src="images/graph.PNG"/>
                </div>
                <div>
                  <p className="text-xl py-2">학습시간</p>
                  <p className="py-1">연습 :</p>
                  <p className="py-1">스터디 :</p>
                  <p className="py-1">총 합 :</p>
                </div>
              </div>

          </div>
        </div>
        <div className="flex justify-center">
          <div className="mx-10 box3 flex justify-center">
            <div className="box4 py-3 drop-shadow-md rounded-md">
              <span className="ms-5 text-xl">나의 발표 결과</span>
              <span className="text-xs text-gray-500 mx-5">
                ※ 최근 5개의 발표만 제공됩니다.
              </span>
              <div className="flex justify-center">
                {/* 여기에 5개의 결과 카드 나오도록 */}
                <ResultCard/>
                <ResultCard/>
                <ResultCard/>
                <ResultCard/>
                <ResultCard/>
              </div>
            </div>
          </div>
        </div>
      </Page>
      </div>
  );
};

export default MyPage;
