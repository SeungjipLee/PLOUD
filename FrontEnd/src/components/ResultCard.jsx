const ResultCard = ({speechMode, title}) => {
    return (
        <>
            <div className="w-32 h-40 mx-4 my-5 drop-shadow-xl border-2 text-center Recard">
                <p className="my-1.5 font-bold">{speechMode}</p>
                <p className="my-3 mb-12">{title}</p>
            </div>
        </>
    )
}
export default ResultCard;