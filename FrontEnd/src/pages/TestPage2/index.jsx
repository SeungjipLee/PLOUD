import React, { useState } from "react";
import Page from "../../components/Page";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const TestPage2 = () => {
    const[isLogined, setIsLogined] = useState(false)

    const meetingInfo = {
        managerId: "ssafy01",
        categoryId: 1,
        title: "방제목요",
        maxPeople: 4,
        isPrivate: false,
        password: null,
    }

    const onClickHandler = () => {
        setIsLogined(!isLogined)
        // console.log(isLogined)
    }

    const createSession = async () => {
        const serverURL = "http://localhost:8000/api/meeting/create";
        const response = await axios.post(serverURL, meetingInfo);
        
        console.log(response.data.data)
        meetingInfo = response.data.data.meetingInfo;
        return response.data.data.token;
    }

    const joinSession = () => {
        // token 받아오기


        
        
    }

  return (
    <div className="Main">
      <Page header={<Navbar />} footer={<Footer />}>
        <h3>오픈 비두 테스트요</h3>
        <button style={{marginRight: "10px"}} onClick={joinSession}>
            세션 접속
        </button>






      </Page>
    </div>
  );
};

export default TestPage2
