function CreateModal({ title, children, onClose, className }) {
  return (
    <div
      className={className}
      style={{
        position: "fixed",
        top: "35%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        borderRadius: "19px",
        color: "white",
        padding: "20px",
        zIndex: 1000,
        width: "450px",
        height: "300px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          fontSize: "20px",
        }}
      >
        <h1>{title}</h1>
        <button onClick={onClose} className="close"></button>
      </div>
      {children}
    </div>
  );
}

export default CreateModal;
