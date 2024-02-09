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

  const categoryName = () => {
    switch(categoryId){
    case 0: return "전체"
    case 1: return "면접"
    case 2: return "발표"
    case 3: return "기타"
  }
  }

  return (
    <>
      <Card>
        <div className="card-study-room-info">
          <div className="card-study-title">
            <div className="overflow-ellipsis">{title}</div>
            {isPrivate && <img src="/images/private_icon.png" alt="" />}
          </div>
          <p>{managerId}</p>
          <div>{categoryName()}</div>
          <div className="pt-2" style={{"display":"flex", alignItems: "center"}}>
            <img src="images/person_emoji.png" alt="" align="left" style={{position: "static", "width":"20px", "height":"20px"}}/>        
            <span className="pl-3">  {currentPeople} / {maxPeople}</span>
          </div>
          {children}
        </div>
      </Card>
    </>
  );
};

export default RoomCard;
