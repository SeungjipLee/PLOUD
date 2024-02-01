import { useSelector,useDispatch } from "react-redux";
import React, { useState } from "react";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Page from "../../components/Page";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import { refreshAccessToken, updateNickname } from "../../features/user/userSlice";




const PatchInfoPage = () => {
//   const { isLogined, nickname } = useSelector((state) => state.userReducer);
//   const dispatch = useDispatch();
//   const [ newNickname, setNewNickname ] = useState(nickname)
//   const navigate = useNavigate();
//   const { token } = useSelector((state) => state.userReducer);


//   const changeHandler = (e) => {
//     setNewNickname(e.target.value)
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
  //   try {
  //     const formData = { newValue: newNickname };
  //     const response = await axios.patch(
  //       "http://localhost:8000/api/user/nickname",
  //       formData,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token.accessToken}`
  //         },
  //         withCredentials: true
  //       }
  //     );
  
  //     if (response.data.status === 200) {
  //       alert("닉네임이 변경되었습니다.");
  //       dispatch(updateNickname(newNickname));
  //       navigate('/mypage');
  //     } else {
  //       alert("이미 사용 중인 닉네임입니다.");
  //     }
  //   } catch (error) {
  //     console.log(error)
  //     await dispatch(refreshAccessToken()).unwrap();
  //     handleSubmit(e); // 토큰 갱신 후 다시 시도
  //   }
  // };


  return (
    <div className="mypage">
      <Page header={<Navbar />} footer={<Footer />}>
        <h1>회원 정보 수정</h1>
        {/* <img src="images/Profile.PNG" alt="Main1.png" />
        <br />
        <Button>프로필 사진 변경</Button>
        <br />
        <form onSubmit={handleSubmit}>
          닉네임 :
          <input
              type="text"
              id="nickname"
              value={newNickname}
              onChange={changeHandler}
          />
        <Button>수정하기</Button>
        </form>
        
        <br />
        <Button><Link to="/resetpw">비밀번호 재설정</Link></Button>
        <Button><Link to="/mypage">마이페이지</Link></Button> */}

      </Page>
    </div>
  );
};

export default PatchInfoPage;