import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Page from "../../components/Page";
import Footer from "../../components/Footer";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import CreateForm from "./CreateForm";
import { useDispatch, useSelector } from "react-redux";
import { getMeetingList } from "../../services/meeting";

const tag = "[StudyPage]";

const StudyPage = () => {
  const [modal, setModal] = useState(true);
  const token = useSelector((state) => state.userReducer.token);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [categoryId, setCategoryId] = useState(0);
  const [roomList, setRoomList] = useState([]);
  const dispatch = useDispatch();
  let list = [];

  useEffect(() => {
    async function fetchData() {
      // You can await here
      const response = await getMeetingList(
        token,
        { categoryId: categoryId, word: searchKeyword },
        (res) => res,
        (err) => err
      );
      // const list = await response.json()
      list = response.data.data;
      console.log(tag, list);
      setRoomList(list);
    }

    fetchData();
  }, []);

  useEffect(() => {
    // 모달 외부 클릭 감지 함수
    const handleClickOutside = (event) => {
      if (modal && !event.target.closest(".Modal")) {
        changeModalState(false);
      }
    };

    // 모달이 활성화되어 있을 때만 이벤트 리스너 추가
    if (modal) {
      window.addEventListener("click", handleClickOutside);
    }

    // 컴포넌트가 언마운트되거나 모달이 닫힐 때 이벤트 리스너 제거
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [modal]);

  const changeModalState = () => {
    setModal(!modal);
    console.log(modal)
  };

  return (
    <div className="Study">
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
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
              />
            </div>
          </div>

          <div className="grid">
            {roomList.map((data, index) => (
              <Card key={index}>
                Card {data.sessionId} {index + 1}
              </Card>
            ))}
          </div>
          <Button onClick={changeModalState}>방 생성하기</Button>
          {modal && (
            <Modal
              title="방 생성"
              // onClose={changeModalState}
              buttonName="방 만들기"
            >
              <CreateForm />
            </Modal>
          )}
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
  );
};

export default StudyPage;
