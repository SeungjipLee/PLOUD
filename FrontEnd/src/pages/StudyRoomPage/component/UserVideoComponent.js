import React, { Component } from "react";
import OpenViduVideoComponent from "./OvVideo";
import "./UserVideo.css";

const UserVideoComponent = ({ streamManager, isTyping }) => {
  return (
    <div>
      {streamManager !== undefined ? (
        <div className="relative">
          {isTyping && (
            <div className="typing">
              <img src="/images/typing.png" />
            </div>
          )}
          {streamManager.stream.videoActive ? (
            <OpenViduVideoComponent streamManager={streamManager} />
          ) : (
            <img
              style={{
                height: "140px",
                width: "auto",
              }}
              src="/images/videoimage_disabled.png"
            />
          )}
        </div>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;
