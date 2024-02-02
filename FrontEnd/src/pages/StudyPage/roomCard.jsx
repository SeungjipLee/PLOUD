import Card from "../../components/Card";

const RoomCard = ({ data }) => {
  const {
    categoryId,
    currentPeople,
    isPrivate,
    managerId,
    maxPeople,
    password,
    sessionId,
    speechId,
    title,
  } = data;
  
  return (
    <>
      <Card>
        <div className="card-study-room-info">
          <h1>{title}</h1>
          <div>
          <p>{managerId}</p>
          <p>{currentPeople} / {maxPeople}</p>
          </div>
          <div>
            {categoryId === 1 ? "발표" : "면접"}
          </div>
        </div>
      </Card>
    </>
  );
};

export default RoomCard;
