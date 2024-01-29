import React from "react";
import Navbar from "../../components/Navbar";
import Page from "../../components/Page";
import Footer from "../../components/Footer";
import Card from "../../components/Card";

const StudyPage = () => {
  return (
    <div className="Study">
      <Page header={<Navbar />} footer={<Footer />}>
        <h1>스터디메인</h1>
        <div className="grid">
          {[...Array(9)].map((_, index) => (
            <Card key={index}>Card {index + 1}</Card>
          ))}
        </div>
      </Page>
    </div>
  );
};

export default StudyPage;
