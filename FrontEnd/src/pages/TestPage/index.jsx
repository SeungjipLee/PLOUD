import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Page from "../../components/Page";
import Footer from "../../components/Footer";

const TestPage = () => {
  const[isLogined, setIsLogined] = useState(false)

  const onClickHandler = () => {
    setIsLogined(!isLogined)
    console.log(isLogined)
  }
  return (
    <div className="Main">
      <Page header={<Navbar />} footer={<Footer />}>
        <h1>테스트페이지</h1>
        {!isLogined && <div onClick={onClickHandler}>false인 상태</div>}
        {isLogined && <div onClick={onClickHandler}>true인 상태</div>}
      </Page>
    </div>
  );
};

export default TestPage;
