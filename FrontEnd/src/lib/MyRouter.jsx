import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainPage from "../pages/MainPage";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SingUpPage";
import BoardPage from "../pages/BoardPage";
import StudyPage from "../pages/StudyPage";
import PracticePage from "../pages/PracticePage";
import FindPwPage from "../pages/LoginPage/Findpw";
import MyPage from "../pages/MyPage";
import PatchInfoPage from "../pages/MyPage/PatchInfoPage";
import ResetPwPage from "../pages/MyPage/ResetPwPage";
import TestPage from "../pages/TestPage";
import StudyRoomPage from "../pages/StudyRoomPage"
import CreateBoard from "../pages/BoardPage/CreateBoard";
import BoardDetail from "../pages/BoardPage/BoardDetail";
import InterviewScreenPresenter from "../pages/StudyRoomPage/component/InterviewScreenPresenter";
import MyChart from "../components/MyChart"

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/board" element={<BoardPage />} />
        <Route path="/study" element={<StudyPage />} />
        <Route path="/study/room" element={<StudyRoomPage />} />
        <Route path="/practice" element={<PracticePage />} />
        <Route path="/findpw" element={<FindPwPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/patchinfo" element={<PatchInfoPage />} />
        <Route path="/resetpw" element={<ResetPwPage />} />
        <Route path="/createpw" element={<ResetPwPage />} />
        <Route path="/createboard" element={<CreateBoard />} />
        <Route path="/test" element={<TestPage />} />
        <Route path="/board-detail" element={<BoardDetail />} />
        <Route path="/interview" element={<InterviewScreenPresenter/>} />
        <Route path="/1" element={<MyChart/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
