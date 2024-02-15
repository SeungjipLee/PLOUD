function CreateModal({ title, children, onClose }) {
    return (
        <div
        className="create-room"
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
            marginTop: "10px",
            marginBottom: "30px",
            fontSize: "20px"}}>
            <h1 style={{fontWeight:"bold"}}>{title}</h1>
            <button onClick={onClose} className="close"></button>
          </div>
          {children}
        </div>
    );
  }
  
  export default CreateModal;
  