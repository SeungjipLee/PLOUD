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

  const isRecording = useRef(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  // const [audioURL, setAudioURL] = useState(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [recordingInterval, setRecordingInterval] = useState(null);
  const audioChunksRef = useRef([]);
  const [totalRecordingTime, setTotalRecordingTime] = useState(0);

  const [script, setScript] = useState("");
  const [totalCnt, setTotalCnt] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [requestCount, setRequestCount] = useState(0);
  const [showDiv, setShowDiv] = useState(false);

  const [decibel, setDecibel] = useState(0);

  const startRecording = () => {
    setShowDiv(false);
    setScript("");
    setTotalCnt(0);
    setTotalScore(0);
    console.log("녹음 시작")
    isRecording.current = true; 
    audioChunksRef.current = []; // 오디오 청크를 새 배열로 초기화
    setRecordingTime(0);

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

        recorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            uploadAudio(e.data);
          }
        };

        recorder.onstop = () => {
          stream.getTracks().forEach(track => track.stop());
          if (isRecording.current) {
            startRecording(); // 자동으로 다시 녹음 시작
          }
        };

        recorder.start();

        function analyzeAudio(){
          if (!isRecording.current) {
            return;  // 녹음이 중지되면 분석 중지
          }

          const storedData = new Uint8Array(analyzer.frequencyBinCount);
          analyzer.getByteFrequencyData(storedData);
          
          var sum = 0;
          for (let i = 0; i < storedData.length; i++) {
            sum += storedData[i];
          }
          
          var average = sum / storedData.length;

          setDecibel(Math.max(Math.round(38 * Math.log10(average)), 0));
          // 배열에 푸시하고
          // decibel[]
          //
          // const decibels = 38 * Math.log10(average);

          setTimeout(analyzeAudio, 100);
        }
            
        analyzeAudio();

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

  const stopRecording = () => {
    setShowDiv(true);
    console.log("녹음 중지");
    isRecording.current = false; // useRef를 사용하여 상태 업데이트
    if (mediaRecorder && mediaRecorder.state === "recording") {
      mediaRecorder.stop();
    }

    clearInterval(recordingInterval); // 타이머 중지
    setTotalRecordingTime(recordingTime); // 총 녹음 시간 업데이트
  
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

      formData.append("audioFile", audioBlob, name);

      const serverURL = "http://localhost:8000/api/speech/cl";
      const response = await axios.post(serverURL, formData);

      console.log(response.data.data);

      // 응답 데이터 처리
      const { script: newScript, scriptCnt: newCnt, score: newScore } = response.data.data;
      setScript(prevScript => prevScript + (prevScript ? "\n" : "") + newScript);
      setTotalCnt(prevCnt => prevCnt + newCnt);
      setTotalScore(prevScore => prevScore + newScore);
      setRequestCount(prevCount => prevCount + 1);
    } catch (error) {
      console.error("오류 발생:", error);
    } finally {
      setIsUploading(false);
    }
  };

  // 평균 점수 계산
  const averageScore = requestCount > 0 ? (totalScore / requestCount).toFixed(2) : 0;

  return (
    <div className="Main">
      <Page header={<Navbar />} footer={<Footer />}>
      <Link to="/test2">테스트 2</Link>
      <div style={{margin: "20px"}}>
      <h1>음성 녹음 및 업로드</h1>
      <h3>녹음 시간: {recordingTime} 초</h3>
      <h1>데시벨: {decibel}</h1>
      <div>
      <button style={{marginRight: "10px"}} onClick={startRecording} disabled={isRecording.current}>
        녹음 시작
      </button>
      <button style={{marginRight: "10px"}} onClick={stopRecording} disabled={!isRecording.current}>
        녹음 중지
      </button>
        {/* {audioURL && (
          <div>
            <h3>녹음된 오디오</h3>
            <audio src={audioURL} controls />
          </div>
        )} */}
        {isUploading && <p>업로드 중...</p>}
      </div>
      <div>
      <div>
          <h3>결과</h3>
        {/* {script.split("\n").map	((line, index) => (
          <p key={index}>{line}</p>
        ))} */}
        </div>
        {showDiv &&
                <div>
                    <h3>음절 : {totalCnt}개 / 시간 : {totalRecordingTime}초 / 평균 점수 : {averageScore}점</h3>
                </div>
            }
      </div>
    </div>
      </Page>
    </div>
  );
};

export default TestPage;
