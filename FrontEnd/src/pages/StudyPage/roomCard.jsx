import Card from "../../components/Card";

const RoomCard = ({ data, children }) => {
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
          <div className="card-study-title">
            <h1>{title}</h1>
            {isPrivate && <img src="./images/private_icon.PNG" alt="" />}
          </div>
          <div>
            <p>{managerId}</p>
            <p>
              {currentPeople} / {maxPeople}
            </p>
          </div>
          <div>{categoryId === 1 ? "발표" : "면접"}</div>
          {children}
        </div>
      </Card>
    </>
  );
};

export default RoomCard;
