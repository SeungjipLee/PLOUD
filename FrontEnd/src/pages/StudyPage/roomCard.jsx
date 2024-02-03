import { useEffect, useState } from "react";
import Card from "../../components/Card";

const RoomCard = ({data, onClick}) => {
  // const {
  //   categoryId,
  //   currentPeople,
  //   isPrivate,
  //   managerId,
  //   maxPeople,
  //   password,
  //   sessionId,
  //   speechId,
  //   title,
  // } = data.data;

  // const [categoryName, setCategoryId] = useState("");

  // useEffect(() => {
  //   const SetCategory = () => {
  //     switch (categoryId) {
  //       case 0:
  //         setCategoryId("전체");
  //         break;
  //       case 1:
  //         setCategoryId("발표");
  //       case 2:
  //         setCategoryId("면접");
  //       case 3:
  //         setCategoryId("기타");
  //     }
  //   };
  //   SetCategory()
  // }, [categoryId]);

  // return (
  //   <>
  //     <Card>
  //       <div className="card-study-room-info" onClick={onClick}>
  //         <div className="card-study-room-div1">
  //         <div>{categoryName}</div>
  //         {isPrivate && <div className="private-icon"><img src="images/private_icon.png"/></div>}
  //         </div>
  //         <h1>{title}</h1>
  //         <div>
  //           <p>{managerId}</p>
  //           <p>
  //             인원 {currentPeople} / {maxPeople}
  //           </p>
  //         </div>
  //       </div>
  //     </Card>
  //   </>
  // );
};

export default RoomCard;
