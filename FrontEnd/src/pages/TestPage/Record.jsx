import React, { useState } from "react";

const Record = () => {
  const [title, setTitle] = useState("");

  return (
    <div style={{
      width: "300px",
      height: "100px",
      backgroundColor: "white",
      padding: "10px",
    
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "column",
    }}>
      <div style={{textAlign: "center"}}>
        제목 : <input placeholder="제목 입력..."></input>
        
        {/* 제목 입력 받기 */}

        {/* 필요하면 다른 정보도 보여주기 */}

        {/* 녹화 시작하기 */}
      </div>
      <div style={{textAlign: "center", marginTop: "10px"}}>
        <button>녹화 시작</button>
      </div>
    </div>
  );
};

export default Record;
