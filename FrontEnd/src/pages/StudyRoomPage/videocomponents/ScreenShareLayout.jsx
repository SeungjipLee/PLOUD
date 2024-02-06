const ScreenShareLayout = ({ screenShareStream, participants }) => {
    return (
      <div className="flex flex-col items-center">
        <div className="w-full flex overflow-x-auto">
          {participants.map((participant, index) => (
            <div key={index} className="w-20 h-20">
              <video /* 스트림 소스 */></video>
            </div>
          ))}
        </div>
        <div className="w-full flex justify-center p-4">
          <video className="w-3/4" /* 스크린 공유 스트림 소스 */></video>
        </div>
      </div>
    );
  };


export default ScreenShareLayout