import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Page from "../../components/Page";
import Footer from "../../components/Footer";
import Card from "../../components/Card";
import Button from "../../components/Button";
import Modal from "../../components/Modal";
import CreateForm from "./CreateForm";

const StudyPage = () => {
  const [modal, setModal] = useState(false);

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
          <input type="text" placeholder="방 코드로 검색" />
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
