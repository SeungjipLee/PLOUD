import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Page from "../../components/Page";
import Footer from "../../components/Footer";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import CreateForm from "./CreateForm";
import { useDispatch, useSelector } from "react-redux";
import { getStudyList, getStudy } from "../../features/study/studySlice";
import { getMeetingList, joinMeeting } from "../../services/meeting";
import RoomCard from "./roomCard";
import { useNavigate } from "react-router-dom";

// 방 목록이 리렌더링 되야하는 시점
// 방을 클릭했을 때 - 방에 사람이 다 들어가서 들어갈 수 없을 때 다시 렌더링되서 보여줘야함

const tag = "[StudyPage]";

const StudyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [modal, setModal] = useState(false);
  const token = useSelector((state) => state.userReducer.token);
  const studyList = useSelector((state) => state.studyReducer.studyList);
  const [word, setWord] = useState("");
  const [categoryId, setCategoryId] = useState(0);

  // 최초 마운트, 카테고리 변경 시 검색
  useEffect(() => {
    searchStudyList();
  }, [categoryId]);

  // 엔터키 입력 시 검색
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchStudyList();
    }
  };

  // 스터디 리스트 요청
  const searchStudyList = () => {
    const data = { categoryId, word };

    getMeetingList(
      token,
      data,
      (response) => {
        dispatch(getStudyList(response.data.data));
      },
      (error) => console.log(error)
    );
  };

  // useEffect(() => {
  //   // 모달 외부 클릭 감지 함수
  //   const handleClickOutside = (event) => {
  //     if (modal && !event.target.closest(".Modal")) {
  //       changeModalState(false);
  //     }
  //   };

  //   // 모달이 활성화되어 있을 때만 이벤트 리스너 추가
  //   if (modal) {
  //     window.addEventListener("click", handleClickOutside);
  //   }

  //   // 컴포넌트가 언마운트되거나 모달이 닫힐 때 이벤트 리스너 제거
  //   return () => {
  //     window.removeEventListener("click", handleClickOutside);
  //   };
  // }, [modal]);

  const changeModalState = () => {
    setModal(!modal);
    console.log(modal);
  };

  // 방 접속
  const joinStudyRoom = (data) => {
    console.log(data);

    const param = {
      sessionId: data.sessionId,
      password: "",
    };

    joinMeeting(
      token,
      param,
      (response) => {
        console.log(response);
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
                  발표
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
                  면접
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
              <div className="container">
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
            <div className="grid">
              {studyList.map((data, index) => (
                <div key={index}>
                  <RoomCard data={data} />
                  <div onClick={() => joinStudyRoom(data)}>입장</div>
                </div>
              ))}
            </div>
            <div className="study-button-container">
              <Button onClick={changeModalState}>방 만들기</Button>
            </div>
            {/* <div class="pagination">
          <button onClick={currentPage > 1 ? currentPage-- : null}>
          Previous
          </button>
          <button onClick={currentPage < maxPage ? currentPage++ : null}>
          Next
          </button>
        </div> */}
          </div>
        </Page>
      </div>
      {modal && (
        <Modal title="방 생성" onClose={changeModalState}>
          <CreateForm />
        </Modal>
      )}
    </>
  );
};

export default StudyPage;
