const ResultCard = ({speechMode, title, startsAt}) => {
    return (
        <>
            <div className="w-32 h-40 mx-4 my-5 drop-shadow-xl border-2 text-center Recard">
                <p className="my-3 font-bold">{speech}</p>
                <p className="mt-3 mb-12 font-extrabold">{title}</p>
                <p className="my-3 text-xs">{startsAt}</p>
            </div>
        </>
    )
}
export default ResultCard;