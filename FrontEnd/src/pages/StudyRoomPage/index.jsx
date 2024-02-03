import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { leaveMeeting } from "../../services/meeting";
import { useNavigate } from "react-router";
import { OpenVidu } from "openvidu-browser";
import UserVideoComponent from "./component/UserVideoComponent";

const StudyRoomPage = () => {
  const navigate = useNavigate();

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
      console.log("누가 접속했어요");

      var subscriber = session.current.subscribe(event.stream, undefined);
      setSubscriberse([...subscribers, subscriber]);
    });

    // On every Stream destroyed...
    session.current.on("streamDestroyed", (event) => {
      console.log("누가 떠났어요");
      deleteSubscriber(event.stream.streamManager);
    });

    // On every asynchronous exception...
    session.current.on("exception", (exception) => {
      console.warn(exception);
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
        console.log(error);
      });
  };

  const leaveSession = () => {
    console.log("leaveSession");

    leaveMeeting(
      token,
      { sessionId: room.sessionId, token: ovToken },
      (response) => {
        console.log(response);
        session.current.disconnect();

        session.current = null;
        OV.current = null;

        navigate("/study");
      },
      (error) => {
        console.log(error);
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
    <div>
      <h2>임시임시바바바바</h2>
      <div style={{ display: "flex" }}>
        <button
          onClick={leaveSession}
          style={{
            width: "100px",
            height: "50px",
          }}
        >
          세션 나가기
        </button>
      </div>
      <div>
        <h2>화면 단</h2>
        <div>
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
      <div>
        <h2>밑단 마이크 등등</h2>
      </div>
    </div>
  );
};

export default StudyRoomPage;

