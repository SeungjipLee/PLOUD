function Modal({ title, children, onClose, buttonName }) {
  return (
    <div>
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "white",
          padding: "20px",
          zIndex: 1000,
        }}
      >
        <button onClick={onClose}>x</button>
        <h1>{title}</h1>
        {children}
        <button>{buttonName}</button>
      </div>
    </div>
  );
}

export default Modal;
