import { useSelector,useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Page from "../../components/Page";
import { getProfile } from "../../services/user";
import { Link, useNavigate } from "react-router-dom";
import { checkNickname, patchNickname } from "../../services/user";
import { updateNickname } from "../../features/user/userSlice";
import axios from "axios";




const PatchInfoPage = () => {
  // 로직
  const token = useSelector((state) => state.userReducer.token)
  const [selectedFile, setSelectedFile] = useState();
  const [ profile, setProfile ] = useState({})
  const [preview, setPreview] = useState();
  const [isNicknameValid, setIsNicknameValid] = useState(false);
  const [ newNickname, setNewNickname ] = useState('')
  const validateNickname = () => /^[A-Za-z0-9가-힣]{2,8}$/.test(newNickname);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const profileImgPath = `${profile.profileImg}`

  useEffect(() => {
    const fetchData = () => {
      try {
        const response = getProfile(
          token,
          (res) => {
            console.log(res.data.data)
            setProfile(res.data.data)
          },
          (err) => console.log(err)
        );
      } catch (error) {
        console.error("Profile fetch failed:", error);
      }
    };
    fetchData();
  }, []);
  


  const CheckNickname = (e) => {    
    e.preventDefault();
    if (validateNickname()) {
    checkNickname(
      {nickname: newNickname},
      (res) => {
        alert('사용가능한 닉네임입니다.')
        setIsNicknameValid(true)
      },
      (err) => alert('사용 중인 닉네임입니다.')
      )
    } else {
      alert('닉네임이 유효하지 않습니다.')
    }
  } 

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isNicknameValid&&validateNickname()) {
      patchNickname(
        token,
        {newValue: newNickname},
        (res)=> {
          alert('닉네임이 변경되었습니다!')
          dispatch(updateNickname(newNickname))
          navigate('/mypage')
        },
        (err) => alert('닉네임이 변경되지 않았습니다.')
      )
    } else {
      alert('닉네임 중복확인 해주시길 바랍니다.')
    }
    
  }

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  const handleSubmitImg = (e) => {
    e.preventDefault();
    const formData = new FormData();

    if (selectedFile) {
      formData.append('image', selectedFile);
    } else {
      alert("사진을 선택해주세요!")
      return;
    }
    try {
      // axios로 POST 요청 보내기
      const response = axios.post(
        'https://i10e207.p.ssafy.io/api/user/img', // 서버 업로드 URL
        formData, // 요청 본문
        {
          headers: {
            // 'Content-Type': 'multipart/form-data'는 axios에서 자동으로 설정해줍니다.
            'Authorization': `Bearer ${token.accessToken}`
          }
        }
      );
  
      // 요청 성공 처리
      console.log(response.data);
      alert('이미지가 성공적으로 업로드되었습니다.');
      navigate('/mypage')
    } catch (error) {
      // 요청 실패 처리
      console.error('이미지 업로드 실패:', error);
      alert('이미지를 업로드하는데 실패하였습니다.');
    }
  }

  return (
      <div className="mypage bg-white w-full min-h-screen">
      <Page header={<Navbar />} footer={<Footer />}>
      <div className="mt-28 place-self-center flex justify-center">
          <h2 className="font-extrabold text-2xl">회원 정보 수정</h2>
      </div>

      {/* 완전 밖 */}
      <div className="flex justify-center relative bg-white rounded-md outline1 mx-auto my10">
        <div className="outline1 pt-5 pb-10">
          {/* 사진이랑 버튼 */}
          <div className="flex fetImg ">
            <div className="w-48 h-48 p-2 border rounded-xl">
              {preview && (
                <div>
                  <img src={preview} alt="Preview" className="w-44 h-44" style={{objectFit:"cover", weight:"100%", height:"100%"}}/>
                </div>
              )}
              {!preview && !profile.profileImg && <img src="images/Profile.PNG" style={{objectFit:"cover", weight:"100%", height:"100%"}}/>}
              {!preview && profile.profileImg && <img src={`${profileImgPath}`} style={{objectFit:"cover", weight:"100%", height:"100%"}} />}
              <br />
              <input type="file" accept="image/*" onChange={handleFileInput} className="mb-3" required />
            </div>
              <button 
                onClick={handleSubmitImg}
                className="custom-btn btn-1 rounded-md ps-2 pe-2 p-1 mx-7 mt-16">
                사진 변경
              </button>
          </div>
          {/* 닉네임이랑 수정하기 버튼 */}
          <div className="flex justify-center my-3">
            <form action="" className="flex mx-1">
              <input 
                type="text" 
                className="w-56 block rounded-md border-0 py-1 pl-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 mx-auto my-5"
                placeholder={profile.nickname}
                onChange={(e)=> {
                  setNewNickname(e.target.value);
                }}
                />
                <button onClick={handleSubmit} className="custom-btn btn-1  rounded-md ps-2 pe-2 p-1 mx-3 my-5">수정하기</button>
            </form>
            </div>
          {/* 비밀번호, 마이페이지 버튼 */}
          <div className="flex justify-center m-10">
              <Link to="/resetpw" className="mainBlueF rounded-md px-3 py-1 mx-3 my-3">비밀번호 재설정</Link>
              <Link to="/mypage" className="mainBlueF rounded-md px-3 py-1 mx-3 my-3">마이페이지로 돌아가기</Link>
          </div>
          <span 
            className="checkPatch text-gray-400"
            onClick={CheckNickname}>
              중복확인
          </span>
        </div>
      </div>

      </Page>
    </div>
  );
};

export default PatchInfoPage;