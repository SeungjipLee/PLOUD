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
import StudyRoomPage from "../pages/StudyRoomPage";
import CreateBoard from "../pages/BoardPage/CreateBoard";
import BoardDetail from "../pages/BoardPage/BoardDetail";
import InterviewScreenPresenter from "../pages/StudyRoomPage/component/InterviewScreenPresenter";
import StudyResult from "../pages/StudyRoomPage/component/StudyResult";
import Level1 from "../pages/PracticeRoomPage/Level1";
import Level2 from "../pages/PracticeRoomPage/Level2";
import Level3 from "../pages/PracticeRoomPage/Level3";
import PracticePage1 from "../pages/PracticePage/index1";
import PracticePage2 from "../pages/PracticePage/index2";

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
        <Route path="/practice1" element={<PracticePage1/>} />
        <Route path="/practice2" element={<PracticePage2/>} />
        <Route path="/practice/Level1" element={<Level1 />} />
        <Route path="/practice/Level2" element={<Level2 />} />
        <Route path="/practice/Level3" element={<Level3 />} />
        <Route path="/findpw" element={<FindPwPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/patchinfo" element={<PatchInfoPage />} />
        <Route path="/resetpw" element={<ResetPwPage />} />
        <Route path="/createpw" element={<ResetPwPage />} />
        <Route path="/createboard" element={<CreateBoard />} />
        <Route path="/board/:boardId" element={<BoardDetail />} />
        <Route path="/interview" element={<InterviewScreenPresenter />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
