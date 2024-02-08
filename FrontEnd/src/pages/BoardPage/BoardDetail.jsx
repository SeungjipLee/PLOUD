import { useSelector,useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import Button from "../../components/Button";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Page from "../../components/Page";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
// import { refreshAccessToken, updateNickname } from "../../features/user/userSlice";


const BoardDetail = () => {
  
  const { token, nickname }  = useSelector((state) => state.userReducer);
  const { boardId } = useParams();
  const [board, setBoard] = useState({
    nickname: "",
    title: "", 
    content: "",
  });

  useEffect(()=> {
    console.log(boardId)
    const fetchBoard = async() => {
      try {
        const response = await axios.get(`http://localhost:3000/api/board/${boardId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        const { nickname, title, content } = response.data;
        setBoard({  // 이 부분을 setboard가 아닌 setBoard로 수정
          nickname,
          title,
          content,
        });
      } catch(error){
        console.log(error);
      }
    }
    fetchBoard();
  }, [boardId, token]);
  
  

  const [selectedFile, setSelectedFile] = useState();
  const [preview, setPreview] = useState();
  
  const isImage = (file) => {
    return file && file['type'].split('/')[0] === 'image';
  };
  
  const isVideo = (file) => {
    return file && file['type'].split('/')[0] === 'video';
  };

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      if (isImage(file)) {
        reader.readAsDataURL(file);
      } else if (isVideo(file)) {
        // 비디오의 경우 FileReader 대신 URL.createObjectURL을 사용
        setPreview(URL.createObjectURL(file));
      }
    }
  };

  return (
      <div className="mypage bg-white w-full">
      <Page header={<Navbar />} footer={<Footer />}>
        <div className="flex justify-center w-full mt-24 Detail">
          <div className="creBoaOut">
            <div className="text-center">
              <h2 className="font-extrabold text-2xl">발표 게시판</h2>
            </div>

          <div className="border-2 border-black mx-20 px-10 mt-5 my-2 rounded-xl">
            <div className="mt-5 mb-2 text-2xl font-bold">{board.title}</div>
            <div className="flex text-sm mb-3">
              <div className="me-4">2024.01.24 Wed</div>
              <div className="me-1"><img src="images/Profile.png" className="w-5 h-5"/></div>
              <div className="me-4">Tony</div>
              <div className="me-4 my-0.5">조회수 : 35</div>
              <div className="my-0.5">좋아요 : 11</div>
            </div>
            <div className="flex items-start space-x-2 flex-wrap">
            <div className="flex-none" style={{ maxWidth: '200px' }}>
            {preview && isImage(selectedFile) && (
            <img src={preview} alt="Preview" className="w-full h-auto"/>
            )}
            {preview && isVideo(selectedFile) && (
              <video className="w-full h-auto" controls>
                <source src={preview} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            )}
            {!preview && <img src="images/Profile.png" className="w-full h-36 my-2"/>}
                <input
                  type="file"
                  accept="image/*, video/*"
                  onChange={handleFileInput}
                  className="text-xs w-full ms-5"
                />
                <div className="flex my-2">
                    <button className="mx-2 text-white border bg-blue-500 rounded-md py-1 px-2">수정</button>
                    <button className="mx-2 text-white border bg-red-500 rounded-md py-1 px-2">삭제</button>
                    <Link to={"/board"}><button className="mx-2 text-white border bg-gray-400 rounded-md py-1 px-2">목록</button></Link>
                </div>
                </div>
                <div className="flex-grow">
                    <textarea
                      className="w-full m-2 h-52 px-5 py-2 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                    />
                
                </div>
            </div>
          </div>

          <div className="border-2 border-black mx-20 px-10 mt-10 rounded-xl">
            <div className="my-5 text-2xl font-bold">댓글</div>

            <div className="grid grid-cols-12 gap-4 border rounded-2xl p-2 my-3 bg-sky-100">
                <img src="images/Profile.PNG" className="w-7 h-7 rounded-2xl col-span-1"/>
                <div className="col-span-2">Tony</div>
                <div className="col-span-6">솔직한 평가 감사합니다.</div>
                <div className="col-span-3">2024.02.06</div>
            </div>
            <div className="grid grid-cols-12 gap-4 border rounded-2xl p-2 my-3 bg-sky-100">
                <img src="images/Profile.PNG" className="w-7 h-7 rounded-2xl col-span-1"/>
                <div className="col-span-2">Nana</div>
                <div className="col-span-6">발음만 조금 더 교정하면 좋겠어요.</div>
                <div className="col-span-3">2024.02.01</div>
            </div>
            <div className="grid grid-cols-12 gap-4 border rounded-2xl p-2 my-3 bg-sky-100">
                <img src="images/Profile.PNG" className="w-7 h-7 rounded-2xl col-span-1"/>
                <div className="col-span-2">Edward</div>
                <div className="col-span-6">잘하셨네요.</div>
                <div className="col-span-3">2024.01.26</div>
            </div>

            <div className="grid grid-cols-12 gap-4 Comment rounded-2xl p-7 mt-7 mb-5">
                <div className="flex items-center col-span-2 px-3">
                    <img src="images/Profile.PNG" className="w-10 h-10 rounded-2xl"/>
                </div>
                <div className="col-span-8">
                    <textarea className="w-full me-2 h-20 px-5 py-2 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600" cols="30" rows="5" placeholder="댓글 입력"></textarea>
                </div>
                <div className="col-span-2 flex items-center">
                    <button className="mx-2 text-white border bg-blue-500 rounded-md py-1 px-2">댓글<br/>작성</button>
                </div>
            </div>
            
            
          </div>
          
          </div>
        </div>
      </Page>
    </div>
  );
};

export default BoardDetail;