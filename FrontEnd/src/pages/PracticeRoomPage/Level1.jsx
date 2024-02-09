import { useEffect, useCallback, useRef } from "react";
import { useLocation } from "react-router-dom";

const Level1 = () => {
  const location = useLocation();
  const content = location.state.content;

  const videoRef = useRef(null);

  const getMediaPermission = useCallback(async () => {
    try {
      const audioConstraints = { audio: true };
      const videoConstraints = {
        audio: false,
        video: true,
      };

      // 미디어 스트림 사용 및 연결(비디오 및 오디오에 접근 권한 받음)
      const audioStream = await navigator.mediaDevices.getUserMedia(
        audioConstraints
      );
      const videoStream = await navigator.mediaDevices.getUserMedia(
        videoConstraints
      );

      if (videoRef.current) {
        videoRef.current.srcObject = videoStream;
      }

      const combinedStream = new MediaStream([
        ...videoStream.getVideoTracks(),
        ...audioStream.getAudioTracks(),
      ]);

      const recorder = new MediaRecorder(combinedStream, {
        mimeType: "video/webm",
      });

      recorder.ondataavailable = (e) => {
        if (typeof e.data === "undefined") return;
        if (e.data.size === 0) return;
        videoChunks.current.push(e.data);
      };

      mediaRecorder.current = recorder;
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getMediaPermission();
  }, []);

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
          }}>
          {content}
        </div>
      </div>

      <div className="RoomPage-bottom"></div>
    </div>
  );
};

export default Level1;
