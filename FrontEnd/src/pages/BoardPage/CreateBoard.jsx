import { useSelector,useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Page from "../../components/Page";
import { Link, useNavigate } from "react-router-dom";
import Modal from "react-modal";
import { createboard } from "../../services/board";
import { userVideos } from "../../services/user";
// import { refreshAccessToken, updateNickname } from "../../features/user/userSlice";


const CreateBoard = () => {
  // 로직
  const navigate = useNavigate();
  const [ userVideoList, setUserVideoList ] = useState([])
<<<<<<< HEAD
  const [ isSelectedVideo, setIsSelectedVideo ] = useState(false)
  const [ selectedVideoTitle, setSelectedVideoTitle ] = useState("");
  const [ postVideoId, setPostVideoId] = useState(0)

=======
>>>>>>> 19764a914789842ee506a9dbe1c61738de5d0715
  
  const [formData, setFormData] = useState({
    title: "", 
    content: "",
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await userVideos(
          token,
          (res) => {
            console.log(res.data.data)
            setUserVideoList(res.data.data)
          },
          (err) => console.log(err)
        )
      } catch (error) {
        console.log(error)
      }
    }
    getData()
  },[])

  // const dispatch = useDispatch();
  const token  = useSelector((state) => state.userReducer.token);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    
    const inputData = {
      title: formData.title,
      content: formData.content,
      videoId: postVideoId
    }
  
    if (formData.title === "" || formData.content === "") {
      alert("제목과 내용을 모두 입력해주세요.");
    } else {
      createboard(
        token,
        inputData, 
        (response) => {
          navigate('/board')
        }, 
        (error) => {
          console.log(error);
        }
      )
    }
  }
  

  const formatDate = (date) => {
    const year = date.substr(0,2);
    const month = date.substr(2,2);
    const day = date.substr(4,2);

    return `${year}년 ${month}월 ${day}일`;
  }

  const handleVideoSelect = (video) => {
    setPostVideoId(video.videoId);
    setSelectedVideoTitle(video.title);
    setIsSelectedVideo(true)
    setIsModalOpen(false)
  };


  return (
      <div className="mypage bg-white w-full min-h-screen">
      <Page header={<Navbar />} footer={<Footer />}>
        <div className="flex justify-center w-full mt-24">
          <div className="creBoaOut">
            <div className="text-center">
              <h2 className="font-extrabold text-2xl">게시글 작성</h2>
            </div>
          <div className=" border-2 border-black mx-20 px-10 my-5 rounded-xl">
            <div className="mt-5 mb-2 text-xl">제목</div>
            <div>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1 pl-5 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
            </div>
            <div className="mt-5 mb-2 text-xl">내용</div>
            <div className=" border rounded-md mb-10">
<<<<<<< HEAD
            <div className="flex">
              <button className="bg-white h-7" onClick={handleOpenModal}><img src="images/createBoard.png" className="h-full pl-2"/> </button>
              {isSelectedVideo&&<div className="pt-0.5">선택된 동영상 : {selectedVideoTitle}</div>}
            </div>
            <Modal className="createmodal" isOpen={isModalOpen} onRequestClose={handleCloseModal} ariaHideApp={false}>
              <div className="text-center text-2xl font-bold">발표 선택</div>
              <ul>
                {userVideoList.map((video, index) => (
                  <li key={index} className="grid grid-col-12 text-center px-5 py-2 my-5 modalList" onClick={() =>handleVideoSelect(video)}>
                    <div className="col-4 mx-2 text-xl font-bold">{video.title}</div>
                    <div className="col-2 mx-2 pt-0.5">{video.playTime}분</div>
                    <div className="col-6 pt-1 text-sm ">{formatDate(video.recordTime)}</div>
=======
            <button className="relative bg-white h-7" onClick={handleOpenModal}><img src="images/createBoard.png" className="h-full pl-2"/></button>
            <Modal className="createmodal" isOpen={isModalOpen} onRequestClose={handleCloseModal}>
              <button onClick={handleCloseModal}>Close</button>
              <ul>
                {userVideoList.map((video, index) => (
                  <li key={index}>
                    <div>Title: {video.title}</div>
                    <div>Play Time: {video.playTime}</div>
                    <div>Record Time: {video.recordTime}</div>
>>>>>>> 19764a914789842ee506a9dbe1c61738de5d0715
                  </li>
                ))}
              </ul>
            </Modal>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              className=" block w-full h-80 border-0 py-1 pl-5 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            </div>
          </div>
          <div className="createBtn px-60">
        <button onClick={handleSubmit} className="border writeBtn rounded-md py-1 px-4 mx-10">등록</button>
        <button className="border writeBtn1 rounded-md py-1 px-4 mx-10"><Link to={"/board"}>취소</Link></button>
          </div>
          </div>
        </div>
      </Page>
    </div>
  );
};

export default CreateBoard;