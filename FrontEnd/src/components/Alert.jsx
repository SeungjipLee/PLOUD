const Alert = ({content, onClose}) => {
    return(
        <div className="alert">
            <div className="text-xl text-white my-12">
                {content}
            </div>
            <button onClick={onClose} className="bg-white rounded-md px-2 py-0.5 mt-4">
                확인
            </button>
        </div>
    )
}

export default Alert;