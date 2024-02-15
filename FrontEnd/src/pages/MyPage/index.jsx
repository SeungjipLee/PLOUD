import { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Page from "../../components/Page";
import { getProfile } from "../../services/user";
import { useSelector } from "react-redux";
import ResultCard from "../../components/ResultCard";
import { getSpeechList } from "../../services/statistic";
import MyChart from "../../components/MyChart";
import Tier from "../../components/Tier";
import { useNavigate } from "react-router-dom";
import NoSkipResult from "./NoSkipResult";
import PracticeResult from "./PracticeResult";
// import PracticeResult from "../PracticePage/PracticeResult";

const MyPage = () => {
  const { token } = useSelector((state) => state.userReducer);
  const [profile, setProfile] = useState({});
  const profileImgPath = `${profile.profileImg}`;
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState({});

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getProfile(
          token,
          (res) => {
            setProfile(res.data.data);
          },
          (err) => err
        );

        const response2 = await getSpeechList(
          token,
          (res) => {
            const results = res.data.data.slice(0, 5);
            setResults(results);
            const initialModalOpen = results.reduce(
              (acc, result) => ({ ...acc, [result.speechId]: false }),
              {}
            );
            setModalOpen(initialModalOpen);
          },
          (err) => err
        );
      } catch (error) {
        error
      }
    };
    getData();
  }, []);

  const handleModalOpen = (id) => {
    setModalOpen({ ...modalOpen, [id]: true });
  };

  const handleModalClose = (id) => {
    setModalOpen({ ...modalOpen, [id]: false });
  };

  return (
    <div className="bg-white w-full min-h-screen">
      <Page header={<Navbar />} footer={<Footer />}>
        <div className="mt-24 place-self-center flex justify-center">
          <h2 className="font-extrabold text-2xl">마이페이지</h2>
        </div>
        <div className="flex place-self-center container1">
          <div className="ms-12 me-5 bg-white box1 border border-2 border-blue-800 drop-shadow-md rounded-md z-10">
            <div className="flex ms-5 mt-5">
              <div className="w-32 h-64 mx-5 flex flex-col">
                <div
                  style={{
                    width: "130px",
                    height: "130px",
                    overflow: "hidden",
                    borderRadius: "5%",
                  }}>
                  {!profile.profileImg && (
                    <img
                      src="/images/Profile.PNG"
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  )}
                  {profile.profileImg && (
                    <img
                      src={`${profileImgPath}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </div>
                <div style={{ textAlign: "center", fontWeight: "bold" }}>
                  {profile.nickname}
                </div>
                <button
                  onClick={() => navigate("/patchinfo")}
                  className="writeBtn rounded-md py-1 px-1 mt-3">
                  회원 정보 수정
                </button>
              </div>
              <div className="w-32 h-64 ms-1.5 my-5">
                <Tier />
              </div>
            </div>
          </div>

          <div className="me-10 bg-white box2 drop-shadow-md rounded-md border border-2 border-blue-800 py-5 ps-10">
            <MyChart />
          </div>
        </div>
        <div className="flex justify-center z-20">
          <div className="mx-10 box3 flex justify-center z-20">
            <div className="box4 py-3 drop-shadow-md rounded-md border border-2 border-blue-800">
              <span className="ms-5 text-xl">나의 발표 결과</span>
              <span className="text-xs text-gray-500 mx-5">
                ※ 최근 5개의 발표만 제공됩니다.
              </span>
              <div className="flex justify-center">
                {/* 여기에 5개의 결과 카드 나오도록 */}
                {results.map((result, index) => {
                  const handleOpen = () => handleModalOpen(result.speechId);
                  const handleClose = () => handleModalClose(result.speechId);

                  return (
                    <div onClick={handleOpen} key={index}>
                      <ResultCard
                        speechMode={result.speechMode}
                        title={result.title}
                      />
                      {result.speechMode === "스터디" &&
                        modalOpen[result.speechId] && (
                          <NoSkipResult
                            onClose={handleClose}
                            speechId={result.speechId}
                          />
                        )}
                      {result.speechMode === "연습 모드" &&
                        modalOpen[result.speechId] && (
                          <PracticeResult
                            onClose={handleClose}
                            speechId={result.speechId}
                          />
                        )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </Page>
    </div>
  );
};

export default MyPage;
