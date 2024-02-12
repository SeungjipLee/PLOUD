import React, { useState, useRef } from "react";
import Navbar from "../../components/Navbar";
import Page from "../../components/Page";
import Footer from "../../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import {
  startSpeech,
  endSpeech,
  assessSpeech,
  postFeedback,
  postComment,
} from "../../services/speech";

import Record from "./Record";
import SpeechResult from "./SpeechResult";

const TestPage = () => {
  const token = useSelector((state) => state.userReducer.token);
  const meetingInfo = useSelector(
    (state) => state.studyReducer.studyInfo.meetingInfo
  );

  // ---------- Variables Before Speech ----------
  const [title, setTitle] = useState("");

  // ---------- Variables During Speech ----------
  const [feedback, setFeedback] = useState("");
  const [comment, setComment] = useState("");

  const speechId = useRef(0);
  const isRecording = useRef(false); // 녹화 중
  const isLast = useRef(false);

  const [mediaRecorder, setMediaRecorder] = useState(null); // 녹음

  const [recordingTime, setRecordingTime] = useState(0); // 녹화 시간
  const [recordingInterval, setRecordingInterval] = useState(null);

  const audioChunksRef = useRef([]); // 음성 정보

  const decibels = useRef([]);

  // ---------- Variables After Speech ----------
  const [showComment, setShowComment] = useState(true);

  // ---------- Speech API Method ----------

  // 녹화 시작 요청
  const speechStart = () => {
    startSpeech(
      token,
      {
        title: title,
        personal: false,
        categoryId: 0,
        sessionId: "session0",
        // categoryId: meetingInfo.categoryId,
        // sessionId: meetingInfo.sessionId,
      },
      (response) => {
        // console.log("speechId : " + response.data.data);
        speechId.current = response.data.data;
        decibels.current = [];
        // 녹화 시작
        startRecording();

        console.log("speechId : " + speechId.current);
      },
      (error) => {
        console.log(error);
      }
    );
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
    <div className="Main">
      <Page header={<Navbar />} footer={<Footer />}>
        <div style={{ padding: "200px" }}>
          <input
            type="text"
            id="title"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
          <div style={{ marginTop: "20px" }}></div>
          <button
            style={{ border: "1px solid black", marginRight: "10px" }}
            onClick={speechStart}
            // disabled={isRecording.current}
          >
            녹음 시작
          </button>
          <button
            style={{ border: "1px solid black" }}
            onClick={speechEnd}
            // disabled={!isRecording.current}
          >
            녹음 종료
          </button>
          <div style={{ marginTop: "20px" }}></div>
          <input
            type="text"
            id="feedback"
            value={feedback}
            onChange={(e) => {
              setFeedback(e.target.value);
            }}
          />
          <div style={{ marginTop: "20px" }}></div>
          <button style={{ border: "1px solid black" }} onClick={feebackPost}>
            피드백 입력
          </button>
          <div style={{ marginTop: "20px" }}></div>
          {showComment && (
            <div>
              <input
                type="text"
                id="comment"
                onChange={(e) => {
                  setComment(e.target.value);
                }}
              />
              <div style={{ marginTop: "20px" }}></div>
              <button
                style={{ border: "1px solid black" }}
                onClick={commentPost}
              >
                코멘트 입력
              </button>
            </div>
          )}
        </div>
        <div style={{ marginTop: "20px" }}></div>
        <Record />
        <div style={{ marginTop: "20px" }}></div>
        <SpeechResult />
      </Page>
    </div>
  );
};

export default TestPage;
