import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { leaveMeeting } from "../../services/meeting";
import { useNavigate } from "react-router";
import { OpenVidu } from "openvidu-browser";
import UserVideoComponent from "./component/UserVideoComponent";
import Report from "./component/Report";
import ResultList from "./component/ResultList";
import { addRecordList } from "../../features/record/recordSlice";
import { getRecordResult } from "../../services/record";
import { useCallback } from "react";
import {
  startSpeech,
  endSpeech,
  assessSpeech,
  postFeedback,
  postComment,
} from "../../services/speech";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import StudyResult from "./component/StudyResult";

const StudyRoomPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tag = "[StudyRoomPage]";

  const OV = useRef(null);
  const session = useRef(null);

  const OVScreen = useRef(null);
  const sessionScreen = useRef(null);

  // 기본 정보
  const { userId, token, nickname } = useSelector((state) => state.userReducer);
  const room = useSelector((state) => state.studyReducer.studyInfo.meetingInfo);
  const ovToken = useSelector((state) => state.studyReducer.studyInfo.ovToken);
  const screenToken = useSelector(
    (state) => state.studyReducer.studyInfo.screenToken
  );

  // 방에 있는 유저 목록 관리 { nickname : String }
  const [roomUsers, setRoomUsers] = useState([]);
  // 유저 닉네임 추가
  const addUser = (newUser) => {
    setRoomUsers((prevUsers) => [...prevUsers, newUser]);
  };
  // 특정 유저 닉네임 제거
  const removeUser = (userNickname) => {
    setRoomUsers((prevUsers) =>
      prevUsers.filter((user) => user.nickname !== userNickname)
    );
  };

  // 비디오 정보
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [videoDivClass, setVideoDivClass] = useState("");

  // 비디오 녹화 관련 함수
  const isVideoRecording = useRef(false);
  const videoChunksRef = useRef([]); // 영상 정보

  // 화면 모드
  // 0 대기 1 면접 2 발표 3 대본
  const [mode, setMode] = useState("0");

  // 공유화면도 subs 이기때문에 실질적인 subs수를 체크하기 위함
  const setClassName = (subs) => {
    console.log(subs);
    const subscribersWithOutScreen = subs.filter(
      (sub) => getUserNickname(sub) !== "screen"
    );
    console.log(subscribersWithOutScreen);
    const selected =
      subscribersWithOutScreen.length > 3 ? "video-flex-big" : "video-flex";
    return selected;
  };

  // 페이지 상단 높이 조절
  const setClassRoomPageTOP = () => {
    switch (mode) {
      case "0":
        return "RoomPage-top-basic";
      case "1":
        return "RoomPage-top-basic";
      case "2":
        return "RoomPage-top";
      case "3":
        return "RoomPage-top";
    }
  };

  const setClassRoomPageMID = () => {
    switch (mode) {
      case "0":
        return "RoomPage-mid-basic";
      case "1":
        return "RoomPage-mid-basic";
      case "2":
        return "RoomPage-mid";
      case "3":
        return "RoomPage-mid";
    }
  };
  // 비디오 구성 버튼 활성/비활성화 상태
  const [mic, setMic] = useState(true);
  const [video, setVideo] = useState(true);
  const [screen, setScreen] = useState(false);
  const [recordForm, setRecordForm] = useState(false);
  const [record, setRecord] = useState(false);
  const [result, setResult] = useState(false);
  const [resultScreen, setResultScreen] = useState(false);
  const [report, setReport] = useState(false);
  const [chat, setChat] = useState(false);
  const [user, setUser] = useState(false);

  // 화면공유 여부 파악
  const [screenShare, setScreenShare] = useState(false);

  // 녹화 Form
  const [title, setTitle] = useState("");
  const speechId = useRef(0);

  const categoryName = () => {
    switch (room.categoryId) {
      case 0:
        return "전체";
      case 1:
        return "면접";
      case 2:
        return "발표";
      case 3:
        return "기타";
    }
  };

  const [publisherScreen, setPublisherScreen] = useState(undefined);

  // 화면 공유
  const handleScreenShare = async () => {
    let publisherScreen = await OVScreen.current.initPublisherAsync(undefined, {
      audioSource: undefined,
      videoSource:
        navigator.userAgent.indexOf("Firefox") !== -1 ? "window" : "screen",
      publishAudio: true,
      publishVideo: true,
      resolution: "640x480",
      frameRate: 30,
      insertMode: "APPEND",
      mirror: false,
    });

    // 공유 중지를 감지하는 부분 인데 지금 안됨 더 찾아봐야 함
    console.log(publisherScreen.stream.mediaStream.getVideoTracks()[0]);

    const videoTrack = publisherScreen.stream.mediaStream.getVideoTracks()[0];
    if (videoTrack) {
      videoTrack.onended = () => {
        handleScreenShare2();
      };
    }

    sessionScreen.current.publish(publisherScreen);
    setPublisherScreen(publisherScreen);
    setScreenShare(true);
    setMode("2");
  };

  const handleScreenShare2 = async () => {
    if (publisherScreen) {
      sessionScreen.current.unpublish(publisherScreen);

      setPublisherScreen(null);
      setScreenShare(false);
    }
  };

  // 참가자 목록
  const [captain, setCaptain] = useState(true);
  const [presenter, setPresenter] = useState("");
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
  const [feedbackModal, setFeedbackModal] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [comment, setComment] = useState("");

  const isRecording = useRef(false); // 녹화 중
  const isLast = useRef(true);

  const [mediaRecorder, setMediaRecorder] = useState(null); // 녹음

  const [recordingTime, setRecordingTime] = useState(0); // 녹화 시간
  const [recordingInterval, setRecordingInterval] = useState(null);

  const decibels = useRef([]);

  // ---------- Variables After Speech ----------
  const [showComment, setShowComment] = useState(true);

  // 사용법 publisher, mainStreamManager, subscriber 등을 넣으면 닉네임을 파싱해서 반환해줌
  const getUserNickname = (streamObject) => {
    const nickname = JSON.parse(
      streamObject.stream.connection.data.split("%/%")[0]
    ).clientData;
    return nickname.split("//").length > 1 ? "screen" : nickname;
  };

  // 신고 창 닫기
  const closeModal = () => {
    setReport(false);
  };

  // 결과 창 닫기
  const handleResultClose = () => {
    setResultScreen(false);
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

  // 사람 수 마다 화면이 다르게 배치되도록 분기처리
  // 1. 화면 나오는 최상위 className 변경 => div 크기 변경
  // 2. 각 화면에 들어갈 className 변경 => video 크기 변경
  // useEffect 로 subscribers 수에 따라 결정
  useEffect(() => {
    let videoClassName = "";
    switch (
      subscribers.filter((sub) => getUserNickname(sub) !== "screen").length
    ) {
      // case 0:
      //   videoClassName = "video-div-size-6";
      //   break;
      case 0:
        videoClassName = "video-div-size-1";
        break;
      case 1:
        videoClassName = "video-div-size-2 col-md-6";
        break;
      case 2:
        videoClassName = "video-div-size-4 col-md-6";
        break;
      case 3:
        videoClassName = "video-div-size-4 col-md-6";
        break;
      case 4:
        videoClassName = "video-div-size-6 col-md-6";
        break;
      case 5:
        videoClassName = "video-div-size-6 col-md-6";
        break;
    }
    setVideoDivClass(videoClassName);
  }, [subscribers]);

  // 화면 모드
  // 모드에 따라 비디오 컨테이너 클래스를 변경
  // RoomPage-mid를 얼만큼 사용할 것인가
  // RoomPage-mid div의 바로 하위 div의 크기를 결정
  const getVideoContainerClass = () => {
    switch (mode) {
      case "0": // 대기화면
        return subscribers.length > 3 ? "video-flex-big" : "video-flex";
      case "1": // 발표화면
        return "video-mode-2"; // 모드 2에 대한 클래스
      case "2": // 면접화면
        return "video-mode-3"; // 모드 3에 대한 클래스
      default: // 기본???
        return "video-flex";
    }
  };

  // 모드에 따라 각 스트림 컨테이너 클래스를 변경
  const getStreamContainerClass = (index) => {
    if (mode === 2 && index === 0) {
      return "stream-container-big"; // 첫 번째 스트림 크게
    } else if (mode === 2) {
      return "stream-container-small"; // 나머지 스트림 작게
    }
    return "stream-container col-md-6 col-xs-6"; // 기본 클래스
  };

  // 녹화 시작
  const submitHandler = (e) => {
    e.preventDefault();

    console.log("녹음 시작");

    const params = {
      title: title,
      personal: false,
      categoryId: room.categoryId,
      sessionId: room.sessionId,
    };

    startSpeech(
      token,
      params,
      (res) => {
        speechId.current = res.data.data.speechId;

        console.log("발표 시작 : " + speechId.current);

        startRecording();
        videoRecordingStart();
        sendSignal("rstart", "님이 발표를 시작하였습니다.");
      },
      (err) => console.log(err)
    );

    setRecord(true);
    setRecordForm(false);
  };

  // 접속 시 실행
  const joinSession = () => {
    console.log("joinSession");

    OV.current = new OpenVidu();
    OVScreen.current = new OpenVidu();

    session.current = OV.current.initSession();
    sessionScreen.current = OVScreen.current.initSession();

    // On every new Stream received...
    session.current.on("streamCreated", (event) => {
      console.log(tag, "누가 접속했어요");

      console.log(event.stream.connection.data.split("%/%"));
      var tmp = event.stream.connection.data.split("%/%");
      var nickname = JSON.parse(tmp[0]).clientData;
      addUser({ nickname: nickname });

      console.log(nickname + "님이 접속");

      var subscriber = session.current.subscribe(event.stream, undefined);

      setSubscribers((subscribers) => [...subscribers, subscriber]);
    });

    // On every Stream destroyed...
    session.current.on("streamDestroyed", (event) => {
      console.log(tag, "누가 떠났어요");

      var tmp = event.stream.connection.data.split("%/%");
      var nickname = JSON.parse(tmp[0]).clientData;
      removeUser(nickname);

      console.log(nickname + "님이 떠남");

      deleteSubscriber(event.stream.streamManager);
    });

    // On every asynchronous exception...
    session.current.on("exception", (exception) => {
      console.warn(tag, exception);
    });

    // 채팅 수신
    session.current.on("signal:chat", (event) => {
      var username = JSON.parse(event.data).nickname;
      var content = JSON.parse(event.data).chatvalue;

      if (!(username == nickname && content == "님이 접속하였습니다!")) {
        setChatList((chatList) => [
          ...chatList,
          { username: username, content: content },
        ]);
      }
    });

    // 방장이 떠남
    session.current.on("signal:exit", (event) => {
      setChatList((chatList) => [
        ...chatList,
        { username: "관리자", content: "3초 후 스터디룸이 종료됩니다." },
      ]);

      setTimeout(() => {
        leaveSession();
      }, 3000);
    });

    // 녹화 시작 신호
    session.current.on("signal:rstart", (event) => {
      var username = JSON.parse(event.data).nickname;
      var content = JSON.parse(event.data).chatvalue;

      setChatList((chatList) => [
        ...chatList,
        { username: username, content: content },
      ]);

      // 녹화 시작 신호를 받을 경우 처리할 것
      if (username != nickname) {
        // 녹화시작 버튼을 누르지 않은 사람은 피드백 모달이 열리게 됨
        setFeedbackModal(true);
        // 내가 아닌 경우의 레이아웃 전환
      }

      // 버튼 비활성화
      // 방법은 생각을 ...
    });

    // 녹화 종료 신호
    session.current.on("signal:rend", (event) => {
      var username = JSON.parse(event.data).nickname;
      var content = JSON.parse(event.data).chatvalue;

      setChatList((chatList) => [
        ...chatList,
        { username: username, content: content },
      ]);

      // 녹화 종료 신호를 받을 경우 처리할 것
      if (username != nickname) {
        setFeedbackModal(false);
      }

      // 녹화 종료되면 결과 화면 발표자한테 보여주기
      if (username === nickname) {
        setResultScreen(true);
      }
      // 녹화 종료의 경우 여기서 한 번에 처리해도 가능할 듯?

      // 레이아웃 전환
      // 버튼 활성화
    });

    session.current
      .connect(ovToken, { clientData: nickname })
      .then(async () => {
        // --- 5) Get your own camera stream ---
        console.log("Session 연결중");

        let tmpPublisher = await OV.current.initPublisherAsync(undefined, {
          audioSource: undefined,
          videoSource: undefined,
          publishAudio: true,
          publishVideo: true,
          resolution: "640x480",
          frameRate: 30,
          insertMode: "APPEND",
          mirror: false,
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

        sendSignal("chat", "님이 접속하였습니다!");

        // currentVideoDevice: currentVideoDevice,
      })
      .catch((error) => {
        console.log("끄아아아앜");
        console.log(tag, error);
        leaveSession();
      });

    sessionScreen.current
      .connect(screenToken, { clientData: nickname + "//screen" })
      .then(async () => {})
      .catch((error) => {
        console.log(error);
      });
  };

  const leaveSession = () => {
    console.log(tag, "leaveSession");
    sendSignal("chat", "님이 퇴장하였습니다!");

    // managerId랑 내 Id랑 똑같으면
    if (room.managerId == userId) {
      sendSignal("exit", "종료");
    }

    leaveMeeting(
      token,
      { sessionId: room.sessionId, token: ovToken },
      (response) => {
        console.log(tag, response);
      },
      (error) => {
        console.log(tag, error);
      }
    );

    session.current.disconnect();
    session.current = null;
    OV.current = null;
    navigate("/study");
  };

  const deleteSubscriber = useCallback((streamManager) => {
    setSubscribers((prevSubscribers) => {
      const index = prevSubscribers.indexOf(streamManager);
      if (index > -1) {
        const newSubscribers = [...prevSubscribers];
        newSubscribers.splice(index, 1);
        return newSubscribers;
      } else {
        return prevSubscribers;
      }
    });
  }, []);

  // 채팅 전송
  const handleMessageSubmit = async (e) => {
    if (e.key !== "Enter") return;

    sendSignal("chat", chatvalue);
  };

  const sendSignal = (type, chatvalue) => {
    const signalOptions = {
      data: JSON.stringify({ chatvalue, nickname }),
      type: type,
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

  const [videoRecorder, setVideoRecorder] = useState(null);
  const videoStartTime = useRef(null);

  // 비디오 녹화 시작 함수
  const videoRecordingStart = () => {
    isVideoRecording.current = true;
    videoChunksRef.current = [];

    videoStartTime.current = new Date().getTime();

    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((stream) => {
        const vRecorder = new MediaRecorder(stream);
        setVideoRecorder(vRecorder);

        vRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            uploadVideo(e.data); // e.data : videoChunk
          }
        };

        vRecorder.start();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // 비디오 녹화 종료 함수
  const videoRecordingEnd = () => {
    isVideoRecording.current = false;

    if (videoRecorder && videoRecorder.state === "recording") {
      videoRecorder.stop();
    }
  };

  // 영상 보내기
  const uploadVideo = (data) => {
    var tmp = [];
    tmp.push(data);

    const videoFile = new Blob(tmp, { type: "video/webm" });
    // const vFormData = new FormData();
    // vFormData.append("videoFile", videoFile);
    // vFormData.append("speechId", speechId.current);

    var videoPlayTime = new Date().getTime() - videoStartTime.current;
    console.log("영상 길이 : " + videoPlayTime / 1000 + "(초)");

    // 아래는 임시로 다운로드 해보려고 작성함 추후 삭제
    const url = URL.createObjectURL(videoFile);

    if (confirm("녹화된 비디오를 다운로드하시겠습니까?")) {
      const a = document.createElement("a");
      document.body.appendChild(a);
      a.style = "display: none";
      a.href = url;
      a.download = "recordedVideo.webm";
      a.click();

      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } else {
      window.URL.revokeObjectURL(url);
      console.log("다운로드가 취소되었습니다.");
    }
    // 여기까지 삭제하고 S3 업로드 요청
  };

  // 녹화 종료 요청
  const speechEnd = () => {
    console.log("녹화 종료");
    isLast.current = true;
    // 녹화 중지 함수 실행
    stopRecording();
    videoRecordingEnd();
    sendSignal("rend", "님이 발표를 종료하였습니다.");

    endSpeech(
      token,
      {
        sessionId: room.sessionId,
        speechId: speechId.current,
        decibels: decibels.current,
      },
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );

    // 비동기 처리 헷갈리니까 5초 뒤에 하자
    setTimeout(() => {
      recordResult();
    }, 5000);
  };

  const recordResult = () => {
    getRecordResult(
      token,
      speechId.current,
      (response) => {
        console.log("결과 받음");
        console.log(response);
        dispatch(addRecordList(response.data));
        speechId.current = -1;
      },
      (error) => {
        console.log("결과 못 받음");
        speechId.current = -1;
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
  const feedbackPost = () => {
    if (e.key !== "Enter") return;

    postFeedback(
      token,
      {
        sessionId: room.sessionId,
        content: feedback,
      },
      (response) => {
        console.log(response);
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
    isLast.current = false;
    isRecording.current = true;
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

    console.log("평가요청 : " + speechId.current);

    const audioFile = new Blob(tmp, { type: "audio/wav" });
    const formData = new FormData();
    formData.append("audioFile", audioFile);
    formData.append("speechId", speechId.current);
    formData.append("isLast", isLast.current);

    console.log("평가 요청 : " + speechId.current);

    assessSpeech(
      token,
      formData,
      (response) => {
        // console.log(response.data);
      },
      (error) => {
        console.log("평가 실패");
        // console.log(error);
      }
    );
  };

  // 비디오 핸들러
  const toggleVideo = () => {
    console.log("비디오 상태 수정");

    const newVideo = !video;

    setVideo(newVideo); // 상태 업데이트
    if (publisher) {
      publisher.publishVideo(newVideo); // 비디오 상태 토글
    }
  };

  // 마이크 핸들러
  const toggleMic = () => {
    console.log("오디오 상태 수정");

    const newMic = !mic;

    setMic(newMic); // 상태 업데이트
    if (publisher) {
      publisher.publishAudio(newMic); // 마이크 상태 토글
    }
  };

  return (
    <div className="RoomPage">
      {/* <div className="RoomPage-top"> */}
      <div className={setClassRoomPageTOP()}>
        <div className="roompage-icon">
          <img src="/images/ploud_icon_bg.png" />
        </div>
        <div className="mode-select">
          <select
            name="mode"
            id="mode"
            onChange={(e) => setMode(e.target.value)}
          >
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        {/* 발표 화면 상단 구성 */}
        {mode == "2" && (
          <div className="mode2-top">
            <div className="mode2-top-left"></div>
            {/* 참가자 일렬로 작은 화면으로 나열 // 순서 : 발표자, 참여자... */}
            <div className="flex flex-row justify-center items-center space-x-2 w-full py-2">
              {/* sub 돌면서 발표자 닉네임과 같으면 첫화면으로 송출 */}
              {subscribers.map((sub, i) => {
                if (getUserNickname(sub) === presenter) {
                  console.log(sub);
                  return (
                    <div key={i} className="relative">
                      <div className="mode2-top-each">
                        <span className="nickname-overlay">
                          {getUserNickname(sub)}
                        </span>
                        <UserVideoComponent streamManager={sub} />
                      </div>
                    </div>
                  );
                }
              })}
              {/* {publisher !== mainStreamManager && ( */}
              {publisher && (
                <div className="relative">
                  <div className="mode2-top-each">
                    <span className="nickname-overlay">
                      {getUserNickname(publisher)}
                    </span>
                    <UserVideoComponent streamManager={publisher} />
                  </div>
                </div>
              )}
              {subscribers.map((sub, i) => {
                if (getUserNickname(sub) != "screen") {
                  console.log(sub);
                  return (
                    <div key={i} className="relative">
                      <div className="mode2-top-each">
                        <span className="nickname-overlay">
                          {getUserNickname(sub)}
                        </span>
                        <UserVideoComponent streamManager={sub} />
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        )}
        {mode == "3" && (
          <div className="mode2-top">
            <div className="mode2-top-left"></div>
            {/* 참가자 일렬로 작은 화면으로 나열 // 순서 : 참여자... */}
            <div className="flex flex-row justify-center items-center space-x-2 w-full py-2">
              {/* sub 돌면서 발표자를 제외한 나머지 사람들 송출 */}
              {subscribers.map((sub, i) => {
                if (
                  getUserNickname(sub) != "screen" &&
                  getUserNickname(sub) != presenter
                ) {
                  console.log(sub);
                  return (
                    <div key={i} className="relative">
                      <div className="mode2-top-each">
                        <span className="nickname-overlay">
                          {getUserNickname(sub)}
                        </span>
                        <UserVideoComponent streamManager={sub} />
                      </div>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        )}
      </div>

      {/* <div className="RoomPage-mid"> */}
      <div className={setClassRoomPageMID()}>
        {/* ---------------------------------------대기 화면 구성 -----------------------------------------------*/}
        {/* publisher - 나, subscriber - 그 외 */}
        {mode == "0" && (
          <div className={setClassName(subscribers)}>
            <div id="video-container" className={videoDivClass}>
              {publisher !== undefined ? (
                <div className="mode0-each col-md-6 col-xs-6">
                  <span className="nickname-overlay">
                    {getUserNickname(publisher)}
                  </span>
                  <UserVideoComponent streamManager={publisher} />
                </div>
              ) : null}
            </div>
            {subscribers.map((sub, i) => {
              if (sub !== publisher && getUserNickname(sub) != "screen") {
                return (
                  <div
                    key={sub.id}
                    className={`${videoDivClass} mode0-each col-md-6 col-xs-6`}
                  >
                    <span className="nickname-overlay">
                      {getUserNickname(sub)}
                    </span>
                    <UserVideoComponent streamManager={sub} />
                  </div>
                );
              }
            })}
          </div>
        )}

        {/* ---------------------------------------면접 화면 구성(발표자) -----------------------------------------------*/}
        {/* subscriber - 발표자 이외 */}
        {/* p - 발표자, s - 청자 */}
        {mode == "1" && mainStreamManager == publisher && (
          <div className="mode-1">
            <div
              className={`mode1-top ${
                subscribers.length <= 3 ? "single-row" : "multi-row"
              }`}
            >
              {subscribers.map((sub, i) => (
                <div key={i} className="relative">
                  <div className="mode1-each">
                  <span className="nickname-overlay">{getUserNickname(sub)}</span>
                  <UserVideoComponent streamManager={sub} />
                </div>
                </div>
              ))}
            </div>
            <div className="mode1-bottom">
              <div className="mode1-each">
                <span className="nickname-overlay">{getUserNickname(publisher)}</span>
                {publisher !== undefined ? (
                  <UserVideoComponent streamManager={publisher} />
                ) : null}
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------면접 화면 구성(청자) -----------------------------------------------*/}
        {/* Main - 발표자, sub - 참가자, pub - 참가자 */}
        {mode == "3" && (
          <div
            className={subscribers.length > 3 ? "video-flex-big" : "video-flex"}
          >
            {mainStreamManager !== undefined ? (
              <div id="main-video" className={videoDivClass}>
                <UserVideoComponent streamManager={mainStreamManager} />
              </div>
            ) : null}
          </div>
        )}

        {/* ---------------------------------------발표 화면 구성 -----------------------------------------------*/}
        {/* mainStreamManager - 발표자, publisherScreen - 공유화면, p - 참가자, subscribers - 참가자 */}
        {/* 발표 화면 구성 */}
        {mode == "2" && (
          <div className="mode2-main">
            {/* 메인 - 공유화면 크게 */}
            {subscribers.map((sub, i) => {
              if (getUserNickname(sub) === "screen") {
                console.log(sub);
                return (
                  // <div key={i} className="flex-1 w-full h-full">
                  //   <div className="w-full h-full max-w-4xl max-h-96 mx-auto">
                  //     <div className="aspect-w-4 aspect-h-3">
                  //       <UserVideoComponent streamManager={sub} />
                  //     </div>
                  //   </div>
                  // </div>
                  <div key={i} className="mode2-main-screen">
                    <UserVideoComponent streamManager={sub} />
                  </div>
                );
              }
            })}
          </div>
        )}
      </div>

      <div className="RoomPage-bottom">
        <div className="button-empty items-center space-x-4">
          <img
            onClick={(e) => {
              console.log(publisher);
              setUser(!user);
            }}
            src="/images/user_icon.png"
          />
        </div>
        <div className="flex items-center space-x-6">
          {mic ? (
            <img onClick={toggleMic} src="/images/micbutton.png" />
          ) : (
            <img onClick={toggleMic} src="/images/micbutton_disabled.png" />
          )}
          {video ? (
            <img onClick={toggleVideo} src="/images/videobutton.png" />
          ) : (
            <img onClick={toggleVideo} src="/images/videobutton_disabled.png" />
          )}

          {screenShare === false ? (
            <img onClick={handleScreenShare} src="/images/sharebutton.png" />
          ) : (
            <img
              onClick={handleScreenShare2}
              src="/images/sharebutton_disabled.png"
            />
          )}

          {!isLast.current ? (
            <img onClick={speechEnd} src="/images/recordbutton_activated.png" />
          ) : !recordForm ? (
            <img
              onClick={(e) => {
                setRecordForm(!recordForm);
              }}
              src="/images/recordbutton.png"
            />
          ) : (
            <img
              onClick={(e) => {
                setRecordForm(!recordForm);
              }}
              src="/images/recordbutton_disabled.png"
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
              onKeyDown={handleMessageSubmit}
              placeholder="댓글을 입력하세요."
            />
          </div>
        </Modal>
      )}
      {/* 발표자가 녹화종료를 눌렀을 때, 결과리스트에서 선택했을 때 결과 화면을 볼 수 있음 */}
      {resultScreen && (
        <StudyResult onClose={handleResultClose} speechId={speechId.current} />
      )}
      {result && <ResultList />}
      {report && <Report users={roomUsers} closeModal={closeModal} />}
      {recordForm && (
        <Modal
          title="녹화 정보 입력"
          onClose={(e) => setRecordForm(false)}
          className={"record-form"}
        >
          <form onSubmit={submitHandler}>
            <div>
              <p>
                제목 :
                <input
                  placeholder="제목 입력..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
              </p>
              <p>카테고리 : {categoryName()}</p>
              <p>분류 : 스터디</p>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}></div>
            <Button>녹화 시작</Button>
          </form>
        </Modal>
      )}
      {feedbackModal && (
        <Modal
          title="피드백 입력"
          // onClose={() => setFeedbackModal(false)}
          className="feedback-form"
        >
          <p>
            내용 :{" "}
            <input
              type="text"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              onKeyDown={feedbackPost}
            />
          </p>
        </Modal>
      )}
    </div>
  );
};
export default StudyRoomPage;