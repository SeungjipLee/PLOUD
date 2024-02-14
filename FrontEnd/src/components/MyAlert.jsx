const MyAlert = ({ content, onClose }) => {
  return (
    <div className="alert">
      <div className="text-xl">{content}</div>
      <div className="alert-button">
        <button
          onClick={onClose}
          className="rounded-md mt-4"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default MyAlert;
