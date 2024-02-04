function JoinConfirmModal({ title, children, onClose }) {
  return (
      <div className="join-confirm-modal">
        <div className="join-confirm-modal-div1">
          <h1>{title}</h1>
          <button onClick={onClose} className="close"></button>
        </div>
        {children}
      </div>
  );
}

export default JoinConfirmModal;
