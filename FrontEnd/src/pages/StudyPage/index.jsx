import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Page from "../../components/Page";
import Footer from "../../components/Footer";
import Button from "../../components/Button";
import CreateForm from "./CreateForm";
import { useDispatch, useSelector } from "react-redux";
import { getStudyList, getStudy } from "../../features/study/studySlice";
import { getMeetingList, joinMeeting } from "../../services/meeting";
import RoomCard from "./roomCard";
import { useNavigate } from "react-router-dom";
import CreateModal from "./CreateModal";
import JoinConfirmModal from "./JoinConfirmModal";

// 방 목록이 리렌더링 되야하는 시점
// 방을 클릭했을 때 - 방에 사람이 다 들어가서 들어갈 수 없을 때 다시 렌더링되서 보여줘야함

const tag = "[StudyPage]";

const StudyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);
  const [maxPage, setMaxPage] = useState(1);
  const [modal, setModal] = useState(false);
  const token = useSelector((state) => state.userReducer.token);
  const studyList = useSelector((state) => state.studyReducer.studyList);
  const [word, setWord] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [isSecret, setIsSecret] = useState(false);
  const [isEnter, setIsEnter] = useState(false);
  const [sessionId, setSessionId] = useState("")
  const [password, setPassword] = useState("");
  const userId = useSelector((state) => state.userReducer.user_id);
  // 최초 마운트, 카테고리 변경 시 검색
  useEffect(() => {
    searchStudyList();
  }, [categoryId, page]);

  // 엔터키 입력 시 검색
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchStudyList();
    }
  };

  // 스터디 리스트 요청
  const searchStudyList = () => {
    const data = { categoryId: categoryId, word: word };
    getMeetingList(
      token,
      data,
      (response) => {
        dispatch(getStudyList(response.data.data));
        setMaxPage(
          response.data.data.length > 9
            ? Math.floor(response.data.data.length / 9) + 1
            : 1
        );
      },
      (error) => console.log(error)
    );
  };

  // 방 만들기 클릭 시 방 생성 폼 띄우기
  const changeModalState = () => {
    setModal(!modal);
  };

  // 방 클릭시 인원, 잠금여부 판단
  const joinStudyRoom = async (data) => {
    setPassword("")
    console.log(data);
    setSessionId(data.sessionId)
    
    if (data.currentPeople === data.maxPeople) {
      alert("입장 인원 초과");
      return;
    }
    console.log(data.isPrivate);
    if (data.isPrivate) {
      setIsSecret(true);
    }
    setIsEnter(true);
  };

  // 방 입장하기 클릭 실행
  const handleJoin = async () => {
    const params = {
      userId: userId,
      sessionId: sessionId,
      password: password,
    };

    joinMeeting(
      token,
      params,
      (response) => {
        dispatch(getStudy(response.data));
        navigate("/study/room");
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <>
      <div
        className="Study"
        style={{
          opacity: modal ? "0.6" : "1",
        }}
      >
        <Page header={<Navbar />} footer={<Footer />}>
          <div className="study-main">
            <div className="flex place-content-between">
              <div className="flex">
                <Button
                  onClick={() => {
                    setCategoryId(0);
                  }}
                  styleType={
                    categoryId === 0
                      ? "study-category-button study-category-button-activate"
                      : "study-category-button study-category-button-deactivate"
                  }
                >
                  전체
                </Button>
                <Button
                  onClick={() => {
                    setCategoryId(1);
                  }}
                  styleType={
                    categoryId === 1
                      ? "study-category-button study-category-button-activate"
                      : "study-category-button study-category-button-deactivate"
                  }
                >
                  면접
                </Button>
                <Button
                  onClick={() => {
                    setCategoryId(2);
                  }}
                  styleType={
                    categoryId === 2
                      ? "study-category-button study-category-button-activate"
                      : "study-category-button study-category-button-deactivate"
                  }
                >
                  발표
                </Button>
                <Button
                  onClick={() => {
                    setCategoryId(3);
                  }}
                  styleType={
                    categoryId === 3
                      ? "study-category-button study-category-button-activate"
                      : "study-category-button study-category-button-deactivate"
                  }
                >
                  기타
                </Button>
              </div>
              <div className="study-main-search">
                {/* {word === "" && <img src="./images/search_icon.PNG" alt="" />} */}
                <img src="./images/search_icon.PNG" alt="" />
                <input
                  className="search-room-input"
                  type="text"
                  placeholder="방 이름으로 검색"
                  value={word}
                  onChange={(e) => setWord(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </div>
            </div>
            <div className="grid room-list">
              {studyList.slice((page - 1) * 9, page * 9).map((data, index) => (
                <div key={index}>
                  <RoomCard data={data}>
                    <div
                      className="enter-room"
                      onClick={() => joinStudyRoom(data)}
                    >
                      입장
                    </div>
                  </RoomCard>
                </div>
              ))}
            </div>
            <div className="pagination">
              <button onClick={(e) => (page > 1 ? setPage(page - 1) : null)}>
                &lt;
              </button>
              {page > 1 && (
                <span onClick={(e) => setPage(page - 1)}>{page - 1}</span>
              )}
              <span>{page}</span>
              {maxPage > page && (
                <span onClick={(e) => setPage(page + 1)}>{page + 1}</span>
              )}
              {maxPage > page + 1 && (
                <span onClick={(e) => setPage(page + 2)}>{page + 2}</span>
              )}
              <button
                onClick={(e) => (page < maxPage ? setPage(page + 1) : null)}
              >
                &gt;
              </button>
            </div>
            <div className="create-room-button">
              <Button onClick={changeModalState}>방 만들기</Button>
            </div>
          </div>
        </Page>
      </div>
      {modal && (
        <CreateModal title="방 생성" onClose={changeModalState} className="create-room">
          <CreateForm />
        </CreateModal>
      )}
      {isSecret && isEnter && (
        <JoinConfirmModal title="비밀번호를 입력해 주세요" onClose={(e) => setIsEnter(false)}>
          <input
            style={{ color: "black" }}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {if (e.key === "Enter"){ console.log(e); handleJoin() }}}
          />
        </JoinConfirmModal>
      )}
      {!isSecret && isEnter && (
        <JoinConfirmModal title="방에 입장하시겠습니까?" onClose={(e) => setIsEnter(false)}>
          <div className="button-container"> 
            <button onClick={handleJoin}>예</button>
          </div>
        </JoinConfirmModal>
      )}
    </>
  );
};

export default StudyPage;
