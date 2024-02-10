function Modal({ title, children, className }) {
  return (
      <div className={className}>
        <div className="modal-top mt-5 mb-5 font-extrabold" style={{display:"flex", justifyContent:"center"}}>
          <h1 className="text-3xl">{title}</h1>
        </div>
        {children}
      </div>
  );
}

export default Modal;
