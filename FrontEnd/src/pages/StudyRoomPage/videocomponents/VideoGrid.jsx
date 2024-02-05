const VideoGrid = ({ participants }) => {
  // 참가자 수에 따른 그리드 클래스 결정
  // 참가자 명단 받아오기
  const gridClasses = () => {
    if (participants.length <= 2) return "grid-cols-1";
    if (participants.length <= 4) return "grid-cols-2";
    return "grid-cols-3";
  };

  return (
    <div className={`grid gap-4 ${gridClasses()} p-4`}>
      {participants.map((participant, index) => (
        <div key={index} className="bg-gray-200 p-2">
          <video /* 스트림 소스 */></video>
          <p>{participant.name}</p>
        </div>
      ))}
    </div>
  );
};

export default VideoGrid;
