import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { leaveMeeting } from "../../services/meeting";
import { useNavigate } from "react-router";
import { OpenVidu } from "openvidu-browser";
import UserVideoComponent from "./component/UserVideoComponent";
import Chat from "./component/Chat";
import Report from "./component/Report";
import ResultList from "./component/ResultList";

const StudyRoomPage = () => {
  const navigate = useNavigate();

  const tag = "[StudyRoomPage]";

  const OV = useRef(null);
  const session = useRef(null); // session을 useRef로 선언

  // 기본 정보
  const token = useSelector((state) => state.userReducer.token);
  const room = useSelector((state) => state.studyReducer.studyInfo.meetingInfo);
  const ovToken = useSelector((state) => state.studyReducer.studyInfo.token);

  // 비디오 정보
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscriberse] = useState([]);

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

  // 배열 객체 상태 업데이트 함수
  const updateItemValue = (itemId, newValue) => {
    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === itemId ? { ...item, value: newValue } : item
      )
    );
  };

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

  useEffect(() => {
    joinSession();
  }, []);

  // 접속 시 실행
  const joinSession = () => {
    console.log("joinSession");

    OV.current = new OpenVidu();

    session.current = OV.current.initSession();

    // On every new Stream received...
    session.current.on("streamCreated", (event) => {
      console.log(tag, "누가 접속했어요");

      var subscriber = session.current.subscribe(event.stream, undefined);
      setSubscriberse([...subscribers, subscriber]);
    });

    // On every Stream destroyed...
    session.current.on("streamDestroyed", (event) => {
      console.log(tag, "누가 떠났어요");
      deleteSubscriber(event.stream.streamManager);
    });

    // On every asynchronous exception...
    session.current.on("exception", (exception) => {
      console.warn(tag, exception);
    });

    session.current
      .connect(ovToken, { clientData: token.nickname })
      .then(async () => {
        // --- 5) Get your own camera stream ---

        let tmpPublisher = await OV.current.initPublisherAsync(undefined, {
          audioSource: undefined, // The source of audio. If undefined default microphone
          videoSource: undefined, // The source of video. If undefined default webcam
          publishAudio: true, // Whether you want to start publishing with your audio unmuted or not
          publishVideo: true, // Whether you want to start publishing with your video enabled or not
          resolution: "640x480", // The resolution of your video
          frameRate: 30, // The frame rate of your video
          insertMode: "APPEND", // How the video is inserted in the target element 'video-container'
          mirror: false, // Whether to mirror your local video or not
        });

        // --- 6) Publish your stream ---

        session.current.publish(tmpPublisher);

        // Obtain the current video device in use
        var devices = await OV.current.getDevices();
        var videoDevices = devices.filter(
          (device) => device.kind === "videoinput"
        );
        var currentVideoDeviceId = tmpPublisher.stream
          .getMediaStream()
          .getVideoTracks()[0]
          .getSettings().deviceId;
        var currentVideoDevice = videoDevices.find(
          (device) => device.deviceId === currentVideoDeviceId
        );

        setMainStreamManager(tmpPublisher);
        setPublisher(tmpPublisher);

        // currentVideoDevice: currentVideoDevice,
      })
      .catch((error) => {
        console.log(tag, error);
      });
  };

  const leaveSession = () => {
    console.log(tag, "leaveSession");

    leaveMeeting(
      token,
      { sessionId: room.sessionId, token: ovToken },
      (response) => {
        console.log(tag, response);
        session.current.disconnect();

        session.current = null;
        OV.current = null;

        navigate("/study");
      },
      (error) => {
        console.log(tag, error);
      }
    );
  };

  const deleteSubscriber = (streamManager) => {
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      setSubscriberse(subscribers.splice(index, 1));
    }
  };

  return (
    <div className="RoomPage">
      <div className="flex">
        <div className="ploud-icon">PLOUD</div>
      </div>
      <div className="RoomPage-mid">
        <div className="video-flex">
          <div id="main-video" className="col-md-6">
            <UserVideoComponent streamManager={mainStreamManager} />
          </div>
          <div id="main-video" className="col-md-6">
            <UserVideoComponent streamManager={mainStreamManager} />
          </div>
          {mainStreamManager !== undefined ? (
            <div id="main-video" className="col-md-6">
              <UserVideoComponent streamManager={mainStreamManager} />
            </div>
          ) : null}
          <div id="video-container" className="col-md-6">
            {publisher !== undefined ? (
              <div className="stream-container col-md-6 col-xs-6">
                <UserVideoComponent streamManager={publisher} />
              </div>
            ) : null}
            {subscribers.map((sub, i) => (
              <div key={sub.id} className="stream-container col-md-6 col-xs-6">
                <span>{sub.id}</span>
                <UserVideoComponent streamManager={sub} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex justify-between video-room-button">
        <div className="button-empty items-center space-x-4">
          <img onClick={(e) => setUser(!user)} src="../images/user_icon.PNG" />
        </div>
        <div className="flex items-center space-x-6">
          {mic ? (
            <img onClick={(e) => setMic(!mic)} src="../images/micbutton.PNG" />
          ) : (
            <img
              onClick={(e) => setMic(!mic)}
              src="/public/images/micbutton_disabled.PNG"
            />
          )}
          {video ? (
            <img
              onClick={(e) => setVideo(!video)}
              src="public/images/videobutton.PNG"
            />
          ) : (
            <img
              onClick={(e) => setVideo(!video)}
              src="public/images/videobutton_disabled.PNG"
            />
          )}
          <img
            onClick={(e) => setScreen(!screen)}
            src="public/images/sharebutton.PNG"
          />
          <img
            onClick={(e) => setRecord(!record)}
            src="public/images/recordbutton.PNG"
          />
          <img onClick={leaveSession} src="../images/exitbutton.PNG" alt="" />
        </div>
        <div className="flex items-center space-x-4">
          <img
            onClick={(e) => {
              console.log(e);
              setResult(!result);
            }}
            src="images/resultbutton.PNG"
          />
          <img
            onClick={(e) => {
              console.log(e);
              setReport(!report);
            }}
            src="images/reportbutton.PNG"
          />
          <img
            onClick={(e) => {
              console.log(e);
              setChat(!chat);
            }}
            src="images/chatbutton.PNG"
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
              <div className="study-room-user-list">
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
      {chat && <Chat />}
      {result && <ResultList />}
      {report && <Report />}
    </div>
  );
};

export default StudyRoomPage;
