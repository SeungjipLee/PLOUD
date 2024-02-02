import React, { useState, useRef } from "react";
import Navbar from "../../components/Navbar";
import Page from "../../components/Page";
import Footer from "../../components/Footer";
import axios from "axios";
import { Link } from "react-router-dom";

const TestPage = () => {
  const[isLogined, setIsLogined] = useState(false)

  const onClickHandler = () => {
    setIsLogined(!isLogined)
    // console.log(isLogined)
  }

  // 녹화 중
  const isRecording = useRef(false);

  // 녹음 기능 제공하는 class (영상도 제공함)
  const [mediaRecorder, setMediaRecorder] = useState(null);

  // 녹화 시간 및 측정
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordingInterval, setRecordingInterval] = useState(null);

  // 오디오 데이터 정보
  const audioChunksRef = useRef([]);

  // 점수 (10s 마다 받는)
  const [score, setScore] = useState(0);

  // 데시벨
  const [decibels, setDecibels] = useState([]);
  /// 데시벨 추가
  const addDecibel = (newDecibel) => {
    setDecibels([...decibels, newDecibel]);
  };

  // 요청 객체
  const req = {
    speechId: 1,
    audioFile: audioBlob,
    isLast: false
  }


  // 녹화 시작 버튼
  const startRecording = () => {
    console.log("녹음 시작")
    isRecording.current = true; 
    audioChunksRef.current = []; // 오디오 청크를 새 배열로 초기화
    setRecordingTime(0);

    // recordTime 측정
    const interval = setInterval(() => {
      setRecordingTime((prevTime) => prevTime + 1);
    }, 1000);
    setRecordingInterval(interval);

    navigator.mediaDevices.getUserMedia({ audio: true })
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
          stream.getTracks().forEach(track => track.stop());
          if (isRecording.current) {
            startRecording(); // 자동으로 다시 녹음 시작
          }
        };

        recorder.start();

        // 데시벨 측정
        function analyzeAudio(){
          if (!isRecording.current) {
            return;  // 녹음이 중지되면 분석 중지
          }

          const storedData = new Uint8Array(analyzer.frequencyBinCount);
          analyzer.getByteFrequencyData(storedData);
          
          const sum = 0;
          for (let i = 0; i < storedData.length; i++) {
            sum += storedData[i];
          }
          
          const average = sum / storedData.length;
          const decibel = Math.max(Math.round(38 * Math.log10(average)), 0);

          // 배열의 뒤에 추가
          addDecibel(decibel);

          setTimeout(analyzeAudio, 100);
        }
            
        analyzeAudio();

        // 일정 주기마다 중지&재시작
        setTimeout(() => {
          if (recorder.state === "recording") {
            recorder.stop();
          }
        }, 3000);
      })
      .catch((error) => {
        console.error("오디오 스트림을 가져오는 중 오류 발생:", error);
      });
  };

  // 중지 버튼
  const stopRecording = () => {
    console.log("녹음 중지");
    isRecording.current = false; // useRef를 사용하여 상태 업데이트
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
    }

    clearInterval(recordingInterval); // 타이머 중지
  
    // 타이머 상태를 null로 초기화하여 다음 녹음에 영향을 주지 않도록 함
    setRecordingInterval(null);
  };
  
  // 서버로 오디오 데이터 전송 함수
  const uploadAudio= async (data) => {
    setIsUploading(true);

    try {
      var tmp = [];
      tmp.push(data);

      const audioBlob = new Blob(tmp, { type: "audio/wav" });
      const formData = new FormData();

      var name = "tset" + new Date().getMinutes + new Date().getSeconds();

      formData.append("audioFile", req, name);

      const serverURL = "http://localhost:8000/api/speech/cl";
      const response = await axios.post(serverURL, formData);

      console.log(response.data);

      // 응답 데이터 처리
    } catch (error) {
      console.error("오류 발생:", error);
    }
  };

  return (
    <div className="Main">
      <Page header={<Navbar />} footer={<Footer />}>
      {/* <Link to="/test2">테스트 2</Link> */}
      <div style={{padding: "100px"}}>
        <div>
          <h1>음성 녹음 및 업로드</h1>
          <h3>녹음 시간: {recordingTime} 초</h3>
          <div>
            <button style={{ border: '1px solid black', marginRight:"10px" }} onClick={startRecording} disabled={isRecording.current}>
              녹음 시작
            </button>
            <button style={{ border: '1px solid black'}} onClick={stopRecording} disabled={!isRecording.current}>
              녹음 중지
            </button>
          </div>
        </div>
        <div>
          <h3>결과</h3>
          <div>
            <h3>평균 점수 : {score}점</h3>
          </div>
        </div>
      </div>
      </Page>
    </div>
  );
};

export default TestPage;
