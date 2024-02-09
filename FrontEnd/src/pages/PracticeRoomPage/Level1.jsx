import { useEffect, useCallback, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Modal from "../../components/Modal";
import Button from "../../components/Button";
import StudyResult from "../StudyRoomPage/component/StudyResult";
import {  
  startSpeech,
  endSpeech,
  assessSpeech,
  postComment,
} from "../../services/speech";

const Level1 = () => {
  const { token } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();

  const location = useLocation();
  const content = location.state.content;

  const videoRef = useRef(null);

  const leaveSession = () => {
    navigate("/practice");
  };

  //
  const [screenShare, setScreenShare] = useState(false);
  const [resultScreen, setResultScreen] = useState(false);

  // -----------------   녹화 관련 함수 -----------------
  const [title, setTitle] = useState("");
  const [recordForm, setRecordForm] = useState(false);
  const speechId = useRef(-1);

  const isRecording = useRef(false);
  const isLast = useRef(true);

  const [mediaRecorder, setMediaRecorder] = useState(null); // 녹음

  const decibels = useRef([]);

  // 비디오 녹화 관련 함수
  const isVideoRecording = useRef(false);
  const videoChunksRef = useRef([]);
  const [videoRecorder, setVideoRecorder] = useState(null);

  const [recordingTime, setRecordingTime] = useState(0);
  const [recordingInterval, setRecordingInterval] = useState(null);

  // 시작 버튼 누르면
  const speechStart = (e) => {
    e.preventDefault();

    console.log("녹음 시작");

    const params = {
      title: title,
      personal: true,
      categoryId: 0,
      sessionId: "",
    };

    startSpeech(
      token,
      params,
      (res) => {
        speechId.current = res.data.data.speechId;

        console.log("발표 시작 : " + speechId.current);

        startRecording();
        videoRecordingStart();
      },
      (err) => console.log(err)
    );

    // 폼 변경
    setRecordForm(false);
  };

  // 녹화 종료 버튼 누르면
  const speechEnd = () => {
    console.log("녹화 종료");
    isLast.current = true;
    // 녹화 중지 함수 실행
    stopRecording();
    videoRecordingEnd();

    endSpeech(
      token,
      {
        sessionId: "",
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
    }, 3000);
  };

  const recordResult = () => {
    setResultScreen(true);
  };

  // 평가 시작
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

  const addDecibel = (newDecibel) => {
    decibels.current.push(newDecibel);
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

  // 비디오 녹화 시작
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

  // 화면 공유 시작
  const handleScreenShare = async () => {
    setScreenShare(true);
  };

  // 화면 공유 종료
  const handleScreenShare2 = async () => {
    setScreenShare(false);
  };

  // 결과 창 닫기
  const handleResultClose = () => {
    setResultScreen(false);
    speechId.current = -1;
  };

  return (
    <div className="RoomPage">
      <div className="PracticeRoomPage-mid">
        <div style={{ width: "50%", height: "600px" }}>
          <video ref={videoRef} autoPlay />
        </div>
        <div
          style={{
            width: "50%",
            height: "600px",
            overflowWrap: "break-word",
            flex: "auto",
            overflowY: "auto",
            backgroundColor: "#E6E4DC",
          }}
        >
          {content}
        </div>
      </div>

      {/* Bottom - 버튼 */}
      <div className="RoomPage-bottom">
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
        {screenShare === false ? (
          <img onClick={handleScreenShare} src="/images/sharebutton.png" />
        ) : (
          <img
            onClick={handleScreenShare2}
            src="/images/sharebutton_disabled.png"
          />
        )}
        <img onClick={leaveSession} src="/images/exitbutton.png" alt="" />
      </div>

      {/* 녹화 폼 */}
      {recordForm && (
        <Modal
          title="녹화 정보 입력"
          onClose={(e) => setRecordForm(false)}
          className={"record-form"}
        >
          <form onSubmit={speechStart}>
            <div>
              <p>
                제목 :
                <input
                  placeholder="제목 입력..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
              </p>
              <p>카테고리 : 전체</p>
              <p>분류 : 개인</p>
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end" }}></div>
            <Button>녹화 시작</Button>
          </form>
        </Modal>
      )}
      {/* 녹화 결과 폼 */}
      {resultScreen && (
        <StudyResult onClose={handleResultClose} speechId={speechId.current} />
      )}
    </div>
  );
};

export default Level1;

// import { useEffect, useCallback, useRef } from "react";
// import { useLocation } from "react-router-dom";

// const Level1 = () => {
//   const location = useLocation();
//   const content = location.state.content;

//   const videoRef = useRef(null);

//   const getMediaPermission = useCallback(async () => {
//     try {
//       const audioConstraints = { audio: true };
//       const videoConstraints = {
//         audio: false,
//         video: true,
//       };

//       // 미디어 스트림 사용 및 연결(비디오 및 오디오에 접근 권한 받음)
//       const audioStream = await navigator.mediaDevices.getUserMedia(
//         audioConstraints
//       );
//       const videoStream = await navigator.mediaDevices.getUserMedia(
//         videoConstraints
//       );

//       if (videoRef.current) {
//         videoRef.current.srcObject = videoStream;
//       }

//       const combinedStream = new MediaStream([
//         ...videoStream.getVideoTracks(),
//         ...audioStream.getAudioTracks(),
//       ]);

//       const recorder = new MediaRecorder(combinedStream, {
//         mimeType: "video/webm",
//       });

//       recorder.ondataavailable = (e) => {
//         if (typeof e.data === "undefined") return;
//         if (e.data.size === 0) return;
//         videoChunks.current.push(e.data);
//       };

//       mediaRecorder.current = recorder;
//     } catch (err) {
//       console.log(err);
//     }
//   }, []);

//   useEffect(() => {
//     getMediaPermission();
//   }, []);

//   return (
//     <div className="RoomPage">
//       <div className="PracticeRoomPage-mid">
//         <div style={{ width: "50%", height: "600px" }}>
//           <video ref={videoRef} autoPlay />
//         </div>
//         <div
//           style={{
//             width: "50%",
//             height: "600px",
//             overflowWrap: "break-word",
//             flex: "auto",
//             overflowY: "auto",
//             backgroundColor: "#E6E4DC",
//           }}>
//           {content}
//         </div>
//       </div>

//       <div className="RoomPage-bottom"></div>
//     </div>
//   );
// };

// export default Level1;
