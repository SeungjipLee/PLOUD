import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import PresentationLayout from "../videocomponents/PresentationLayout"

const InterviewScreenPresenter = () => {
  const navigate = useNavigate();

  // 비디오 구성 버튼 활성/비활성화 상태
  const [mic, setMic] = useState(true);
  const [video, setVideo] = useState(true);
  const [screen, setScreen] = useState(false);
  const [record, setRecord] = useState(false);
  const [result, setResult] = useState(false);
  const [report, setReport] = useState(false);
  const [chat, setChat] = useState(false);
  const [user, setUser] = useState(false);

  // 참가자 목록
  const [captain, setCaptain] = useState(true);
  const [userList, setUserList] = useState([
    { userId: "test01", presenter: true },
    { userId: "test02", presenter: false },
    { userId: "test03", presenter: false },
    { userId: "test04", presenter: false },
  ]);

  // 발표자 권한 변경
  const changePresenter = (e, index) => {
    console.log("clicked");
    const users = userList.map((u, i) => {
      if (u.presenter) return { ...u, presenter: false };
      else if (index === i) return { ...u, presenter: true };
      return u;
    });
    console.log(users);
    setUserList(users);
  };

  return (
    <div className="RoomPage">
      <div className="flex">
        <div className="ploud-icon">PLOUD</div>
      </div>

    <PresentationLayout></PresentationLayout>
      <div className="RoomPage-interview">
        <div className="video-flex">
          <div id="main-video" className="col-md-6">
            <video src=""></video>
          </div>
          <div id="main-video" className="col-md-6">
            <video src=""></video>
          </div>
        </div>
      </div>




      <div className="flex justify-between video-room-button">
        <div className="button-empty items-center space-x-4">
          <img onClick={(e) => setUser(!user)} src="/images/user_icon.PNG" />
        </div>
        <div className="flex items-center space-x-6">
          {mic ? (
            <img onClick={(e) => setMic(!mic)} src="/images/micbutton.PNG" />
          ) : (
            <img
              onClick={(e) => setMic(!mic)}
              src="/images/micbutton_disabled.PNG"
            />
          )}
          {video ? (
            <img
              onClick={(e) => setVideo(!video)}
              src="/images/videobutton.PNG"
            />
          ) : (
            <img
              onClick={(e) => setVideo(!video)}
              src="/images/videobutton_disabled.PNG"
            />
          )}
          <img
            onClick={(e) => setScreen(!screen)}
            src="/images/sharebutton.PNG"
          />
          <img
            onClick={(e) => setRecord(!record)}
            src="/images/recordbutton.PNG"
          />
        </div>
        <div className="flex items-center space-x-4">
          <img
            onClick={(e) => {
              console.log(e);
              setResult(!result);
            }}
            src="/images/resultbutton.PNG"
          />
          <img
            onClick={(e) => {
              console.log(e);
              setReport(!report);
            }}
            src="/images/reportbutton.PNG"
          />
          <img
            onClick={(e) => {
              console.log(e);
              setChat(!chat);
            }}
            src="/images/chatbutton.PNG"
          />
        </div>
      </div>
      {user && (
        <div className="study-room-manage">
          <div>
            <h1>참여자</h1>
          </div>
          <div>
            {userList.map((data, index) => (
              <div key={index} className="study-room-user-list">
                <div className="study-room-user">
                  <span>{data.userId}</span>
                  <span>{captain && "(방장)"}</span>
                </div>
                {captain &&
                  (data.presenter ? (
                    <div
                      onClick={(e) => changePresenter(e, index)}
                      className="presenter presneter-button"
                    >
                      발표자
                    </div>
                  ) : (
                    <div
                      onClick={(e) => changePresenter(e, index)}
                      className="participant presneter-button"
                    >
                      발표자
                    </div>
                  ))}
                {!captain &&
                  (data.presenter ? (
                    <div className="presenter presneter-button">발표자</div>
                  ) : (
                    <div className="participant presneter-button">발표자</div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default InterviewScreenPresenter;
