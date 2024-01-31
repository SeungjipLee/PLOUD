import React, { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Page from "../../components/Page";
import Footer from "../../components/Footer";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import CreateForm from "./CreateForm";
import axios from "axios";
import { useDispatch } from "react-redux";

const StudyPage = () => {
  const [modal, setModal] = useState(false);
  const [serachKeyword, setSearchKeyword] = useState("")
  const dispatch = useDispatch();
  const API_URL = "http://localhost:8000/api/meeting/";


  // useEffect(() => {
  //   console.log('마운트')
  //   axios
  //   .post(
  //     API_URL + "list",
  //     {
  //       categoryId: "a",
  //       word: "a",
  //     },
  //     { headers : {
  //       Authorization: `Bearer ${token.accessToken}`
  //     },
  //      withCredentials: true }
  //   )
  //   .then((response) => {
  //     console.log(response);

  //     if (response.data.status == 200) {
  //       return response.data;
  //     } else {
  //       throw new Error("방 목록 조회 실패");
  //     }
  //   }).catch((e) => console.log(e));
  // }, []) // 두번째 인자인 빈 배열은 마운트 될 때 한번만 실행되어야 함을 나타냄

  const handleChange = (e) => {
    setSearchKeyword(e.target.value)
  }

  const changeModalState = () => {
    setModal(!modal);
  };

  return (
    <div className="Study">
      <Page header={<Navbar />} footer={<Footer />}>
        <div>
          <div>
            <Button>전체</Button>
            <Button>면접</Button>
            <Button>발표</Button>
            <Button>기타</Button>
          </div>
          <input type="text" placeholder="방 코드로 검색" value={serachKeyword} onChange={handleChange}/>
        </div>

        <div className="grid">
          {[...Array(9)].map((_, index) => (
            <Card key={index}>Card {index + 1}</Card>
          ))}
        </div>
        <Button onClick={changeModalState}>방 생성하기</Button>
        {modal && (
          <Modal
            title="방 생성"
            onClose={changeModalState}
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
      </Page>
    </div>
  );
};

export default StudyPage;
