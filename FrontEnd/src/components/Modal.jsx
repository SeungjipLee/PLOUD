function Modal({ title, children, className }) {
  return (
      <div className={className}>
        <div className="modal-top m-10 font-extrabold">
          <h1 className="text-3xl">{title}</h1>
        </div>
        {children}
      </div>
  );
}

export default Modal;
