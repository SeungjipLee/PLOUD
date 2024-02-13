import React, { useEffect, useState } from 'react';

const TimerComponent = ({ isActive, resetTimer }) => {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let interval = null;

    if (isActive) {
      interval = setInterval(() => {
        setTime(time + 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }

    return () => clearInterval(interval);
  }, [isActive, time]);

  useEffect(() => {
    if (resetTimer) {
      setTime(0); // 시간 초기화
    }
  }, [resetTimer]);

  const formatTime = () => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes} : ${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  return <div className='timer'>{formatTime()}</div>;
};

export default TimerComponent;
