import React, { Component } from "react";
import OpenViduVideoComponent from "./OvVideo";
import "./UserVideo.css";

const UserVideoComponent = ({ streamManager, isTyping }) => {
  return (
    <div>
      {streamManager !== undefined ? (
        <div className="relative">
          {isTyping && <div className="typing"><img src="/images/typing.png"/></div>}
          <OpenViduVideoComponent streamManager={streamManager} />
        </div>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;
