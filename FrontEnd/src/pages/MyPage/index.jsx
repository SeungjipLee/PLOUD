import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Page from "../../components/Page";
import { Link } from "react-router-dom";
import { getProfile } from "../../services/user";
import { useSelector } from "react-redux";
import ResultCard from "../../components/ResultCard";
import { getSpeechList, getScoreList } from "../../services/statistic";
import MyChart from "../../components/MyChart";

const MyPage = () => {
  const { token } = useSelector((state) => state.userReducer)
  const [ profile, setProfile ] = useState({})
  const base64Image = `data:image/png;base64,${profile.profileImg}`
  const [results, setResults] = useState([{}, {}, {}, {}, {}]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProfile(
          token,
          (res) => {
            console.log(token.accessToken)
            console.log(res.data.data)
            setProfile(res.data.data)
          },
          (err) => console.log('여기')
        );
        
        const response2 = await getSpeechList(
          token,
          (res) => {
            console.log(res.data.data)
            setResults(res.data.data.slice(0, 5));
          },
          (err) => console.log('저기')
        )       
      } catch (error) {
        console.error("쩌어기");
      }
    };
    fetchData();
  }, []);

  

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
                <p>총 연습 시간 : </p>
              </div>
            </div>
                <button 
                  className="bg-gray-400 text-white rounded-md p-1 mx-7 mb-3">
                    <Link to="/patchinfo">회원정보 수정</Link>
                </button>
            </div>
          <div className="me-10 bg-white box2 drop-shadow-md rounded-md">
                  <MyChart/>          
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
                {results.map((result, index) => (
                  <ResultCard 
                    key={index}
                    speechMode={result.speechMode}
                    title={result.title}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Page>
      </div>
  );
};

export default MyPage;
