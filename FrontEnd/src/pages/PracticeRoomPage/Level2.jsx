import { useLocation } from "react-router-dom";

const Level2 = () => {
  const location = useLocation();
  const content = location.state.content;
  console.log(content);

  return (
    <div className="RoomPage">
      <div className="PracticeRoomPage-mid">
        <div style={{ width: "50%", height: "600px" }}>
          으아으아으아으아으아으아으아으아으아으아으아으아
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

export default Level2;
