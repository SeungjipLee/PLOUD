function Modal({ title, children, onClose }) {
  return (
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          backgroundColor: "#001356",
          borderRadius: "19px",
          color: "white",
          padding: "20px",
          zIndex: 1000,
          width: "450px",
          height: "300px",
        }}
      >
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: "30px",
          fontSize: "20px"}}>
          <h1>{title}</h1>
          <button onClick={onClose}>X</button>
        </div>
        {children}
      </div>
  );
}

export default Modal;
