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
    setModal(!modal)
  }

  return (
    <div className="Study">
      <Page header={<Navbar />} footer={<Footer />}>
        <h1>스터디메인</h1>
        <div className="grid">
          {[...Array(9)].map((_, index) => (
            <Card key={index}>Card {index + 1}</Card>
          ))}
        </div>
        <Button onClick={changeModalState}>방 생성하기</Button>
        {modal && (
          <Modal title="방 생성" onClose={changeModalState}>
            <CreateForm />
          </Modal>
        )}
        
      </Page>
    </div>
  );
};

export default StudyPage;
