function Modal({ title, children, onClose, className }) {
  return (
      <div className={className}>
        <div className="modal-top">
          <h1>{title}</h1>
          <button onClick={onClose} className="close"></button>
        </div>
        {children}
      </div>
  );
}

export default Modal;
