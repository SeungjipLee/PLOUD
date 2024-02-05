import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { leaveMeeting } from "../../services/meeting";
import { useNavigate } from "react-router";
import { OpenVidu } from "openvidu-browser";
import UserVideoComponent from "./component/UserVideoComponent";
import Chat from "./component/Chat";
import Report from "./component/Report";
import ResultList from "./component/ResultList";
import { SignalOptions, Signal } from "openvidu-browser";
import {
  startSpeech,
  endSpeech,
  assessSpeech,
  postFeedback,
  postComment,
} from "../../services/speech";
import RecordForm from "./component/RecordForm";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import { getSpeechId } from "../../features/study/studySlice";

const StudyRoomPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tag = "[StudyRoomPage]";

  const OV = useRef(null);
  const session = useRef(null); // session을 useRef로 선언

  // 기본 정보
  const token = useSelector((state) => state.userReducer.token);
  const room = useSelector((state) => state.studyReducer.studyInfo.meetingInfo);
  const ovToken = useSelector((state) => state.studyReducer.studyInfo.token);
  const speechId = useSelector((state) => state.studyReducer.speechId);

  // 비디오 정보
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscriberse] = useState([]);

  // 비디오 구성 버튼 활성/비활성화 상태
  const [mic, setMic] = useState(true);
  const [video, setVideo] = useState(true);
  const [screen, setScreen] = useState(false);
  const [recordForm, setRecordForm] = useState(false);
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

  // 채팅 정보
  const [chatvalue, setChatvalue] = useState("");
  const [chatList, setChatList] = useState([]);

  // ---------- Variables During Speech ----------
  const [feedback, setFeedback] = useState("");
  const [comment, setComment] = useState("");

  // const speechId = useRef(0);
  const isRecording = useRef(false); // 녹화 중
  const isLast = useRef(false);

  const [mediaRecorder, setMediaRecorder] = useState(null); // 녹음

  const [recordingTime, setRecordingTime] = useState(0); // 녹화 시간
  const [recordingInterval, setRecordingInterval] = useState(null);

  const audioChunksRef = useRef([]); // 음성 정보

  const decibels = useRef([]);

  // ---------- Variables After Speech ----------
  const [showComment, setShowComment] = useState(true);

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

  // useEffect(() => {
  //   console.log(speechId);
  //   if (speechId === undefined) return;
  //   startRecording();
  //   setRecord(true);
  //   setRecordForm(false);
  // }, [speechId]);

  // 녹화 시작
  const clickHandler = (e) => {
    startRecording();
    setRecord(true)
    setRecordForm(false)
  }

  // 녹화 종료
  const handleClick = (e) => {
    setRecordForm(false);
    stopRecording(
      token,
      {
        sessionId: room.sessionId,
        speechId: speechId,
        decibels: decibels.current,
      },
      (res) => res,
      (err) => err
    );
    setRecord(false);
  };

  // 접속 시 실행
  const joinSession = () => {
    console.log("joinSession");

    OV.current = new OpenVidu();

    session.current = OV.current.initSession();

    // On every new Stream received...
    session.current.on("streamCreated", (event) => {
      console.log(tag, "누가 접속했어요");

      // 찍어 보고 채팅창에 추가하기
      console.log(event.stream.connection.data);
      setChatList([...chatList, "접속"]);

      var subscriber = session.current.subscribe(event.stream, undefined);
      setSubscriberse([...subscribers, subscriber]);
    });

    // On every Stream destroyed...
    session.current.on("streamDestroyed", (event) => {
      console.log(tag, "누가 떠났어요");

      // 찍어 보고 채팅창에 추가하기
      console.log(event.stream.connection.data);
      setChatList([...chatList, "떠남"]);

      deleteSubscriber(event.stream.streamManager);
    });

    // On every asynchronous exception...
    session.current.on("exception", (exception) => {
      console.warn(tag, exception);
    });

    // 채팅 수신
    session.current.on("signal:chat", (event) => {
      console.log(event);
      setChatList([...chatList, JSON.parse(event.data).chatvalue]);
    });

    session.current
      .connect(ovToken, { clientData: token.nickname })
      .then(async () => {
        // --- 5) Get your own camera stream ---

        console.log(token.nickname);

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
        leaveSession();
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
      },
      (error) => {
        console.log(tag, error);
      }
    );

    navigate("/study");
  };

  const deleteSubscriber = (streamManager) => {
    let index = subscribers.indexOf(streamManager, 0);
    if (index > -1) {
      setSubscriberse(subscribers.splice(index, 1));
    }
  };

  // 채팅 전송
  const handleSubmit = async (e) => {
    if (e.key !== "Enter") return;

    const signalOptions = {
      data: JSON.stringify({ chatvalue }),
      type: "chat",
      to: undefined,
    };

    if (session.current) {
      session.current
        .signal(signalOptions)
        .then(() => {
          // console.log("메시지 전송 성공");
        })
        .catch((error) => {
          // console.log("메시지 전송 실패");
          // console.log(error)
        });
    }

    setChatvalue("");
  };

  // 녹화 종료 요청
  const speechEnd = () => {
    isLast.current = true;
    // 녹화 중지 함수 실행
    stopRecording();

    endSpeech(
      token,
      {
        sessionId: "session0",
        // sessionId: meetingInfo.sessionId,
        speechId: speechId.current,
        decibels: decibels.current,
      },
      (response) => {
        // console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  // 코멘트 등록 요청
  const commentPost = () => {
    postComment(
      token,
      {
        speechId: speechId.current,
        comment: comment,
      },
      (response) => {
        // console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );

    setShowComment(false);
  };

  // 피드백 등록 요청
  const feebackPost = () => {
    postFeedback(
      token,
      {
        sessionId: "session0",
        // sessionId: meetingInfo.sessionId,
        content: feedback,
      },
      (response) => {
        // console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
    setFeedback("");
  };

  // ---------- Speech Method ----------
  const addDecibel = (newDecibel) => {
    decibels.current.push(newDecibel);
  };

  // 녹화 시작
  const startRecording = () => {
    console.log("녹음 시작");
    isLast.current = false;
    isRecording.current = true;
    audioChunksRef.current = []; // 오디오 청크를 새 배열로 초기화
    setRecordingTime(0);

    // recordTime 측정
    const interval = setInterval(() => {
      setRecordingTime((prevTime) => prevTime + 1);
    }, 1000);
    setRecordingInterval(interval);

    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const audioContext = new AudioContext();
        const source = audioContext.createMediaStreamSource(stream);
        const analyzer = audioContext.createAnalyser();
        analyzer.fftSize = 2048;
        source.connect(analyzer);

        const recorder = new MediaRecorder(stream);
        setMediaRecorder(recorder);

        // 녹음한 데이터를 upload한다.(서버에 전송한다.)
        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            uploadAudio(e.data);
          }
        };

        // 녹음 중지, 중지 버튼을 누른게 아닌 경우 자동으로 다시 녹음 시작
        recorder.onstop = () => {
          stream.getTracks().forEach((track) => track.stop());
          if (isRecording.current) {
            startRecording(); // 자동으로 다시 녹음 시작
          }
        };

        recorder.start();

        // 데시벨 측정
        function analyzeAudio() {
          if (!isRecording.current) {
            return; // 녹음이 중지되면 분석 중지
          }

          const storedData = new Uint8Array(analyzer.frequencyBinCount);
          analyzer.getByteFrequencyData(storedData);

          let sum = 0;
          for (let i = 0; i < storedData.length; i++) {
            sum += storedData[i];
          }

          const average = sum / storedData.length;

          // 배열의 뒤에 추가
          addDecibel(calcDecibel(average));

          setTimeout(analyzeAudio, 100);
        }

        analyzeAudio();

        // 일정 주기마다 중지&재시작
        setTimeout(() => {
          if (recorder.state === "recording") {
            recorder.stop();
          }
        }, 5000);
      })
      .catch((error) => {
        console.error("오디오 스트림을 가져오는 중 오류 발생:", error);
      });
  };

  // 데시벨 계산 후 추가하기
  const calcDecibel = (average) => {
    var decibel = Math.max(Math.round(38 * Math.log10(average)), 0);
    return decibel;
  };

  // 녹화 종료
  const stopRecording = () => {
    // console.log("녹음 중지");
    isRecording.current = false;
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
    }

    clearInterval(recordingInterval); // 타이머 중지

    // 타이머 상태를 null로 초기화하여 다음 녹음에 영향을 주지 않도록 함
    setRecordingInterval(null);
  };

  // 10초 평가 요청
  const uploadAudio = async (data) => {
    // console.log("평가 요청");
    var tmp = [];
    tmp.push(data);

    const audioFile = new Blob(tmp, { type: "audio/wav" });
    const formData = new FormData();
    formData.append("audioFile", audioFile);
    formData.append("speechId", speechId.current);
    formData.append("isLast", isLast.current);

    assessSpeech(
      token,
      formData,
      (response) => {
        // console.log(response.data);
      },
      (error) => {
        console.log(error);
      }
    );
  };

  return (
    <div className="RoomPage">
      <div className="flex">
        <div className="ploud-icon">PLOUD</div>
      </div>
      <div className="RoomPage-mid">
        <div className="video-flex">
          {/* {mainStreamManager !== undefined ? (
            <div id="main-video" className="col-md-6">
              <UserVideoComponent streamManager={mainStreamManager} />
            </div>
          ) : null} */}
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
          <img onClick={(e) => setUser(!user)} src="/images/user_icon.png" />
        </div>
        <div className="flex items-center space-x-6">
          {mic ? (
            <img onClick={(e) => setMic(!mic)} src="/images/micbutton.png" />
          ) : (
            <img
              onClick={(e) => setMic(!mic)}
              src="/images/micbutton_disabled.png"
            />
          )}
          {video ? (
            <img
              onClick={(e) => setVideo(!video)}
              src="/images/videobutton.png"
            />
          ) : (
            <img
              onClick={(e) => setVideo(!video)}
              src="/images/videobutton_disabled.png"
            />
          )}
          <img
            onClick={(e) => setScreen(!screen)}
            src="/images/sharebutton.png"
          />
          <img
            onClick={(e) => setRecordForm(true)}
            src="/images/recordbutton.png"
          />
          {record && (
            <img
              onClick={handleClick}
              src="/images/recordbutton_activated.png"
            />
          )}
          <img onClick={leaveSession} src="/images/exitbutton.png" alt="" />
        </div>
        <div className="flex items-center space-x-4">
          <img
            onClick={(e) => {
              console.log(e);
              setResult(!result);
            }}
            src="/images/resultbutton.png"
          />
          <img
            onClick={(e) => {
              console.log(e);
              setReport(!report);
            }}
            src="/images/reportbutton.png"
          />
          <img
            onClick={(e) => {
              console.log(e);
              setChat(!chat);
            }}
            src="/images/chatbutton.png"
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
      {/* {chat && <Chat />} */}
      {chat && (
        <Modal className="chat" title="채팅">
          <div className="chat-area">
            {chatList &&
              chatList.map((item, index) => {
                const { username, content } = item;
                return (
                  <p>
                    {username} : {content}
                  </p>
                );
              })}
          </div>
          <div>
            <textarea
              type="text"
              value={chatvalue}
              onChange={(e) => setChatvalue(e.target.value)}
              onKeyDown={handleSubmit}
              placeholder="댓글을 입력하세요."
            />
          </div>
        </Modal>
      )}
      {result && <ResultList />}
      {report && <Report />}
      {recordForm && (
        <RecordForm onClose={(e) => setRecordForm(false)}>
          <Button onClick={clickHandler}>녹화 시작</Button>
        </RecordForm>
      )}
    </div>
  );
};
export default StudyRoomPage;
