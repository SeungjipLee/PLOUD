import React from "react";

const LoadingScreen2 = () => {
  return (
    <div className="flex justify-center items-center">
      <div
        className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-blue-500"
        style={{ borderTopColor: "transparent" }}
      ></div>
    </div>
  );
};

export default LoadingScreen2;
