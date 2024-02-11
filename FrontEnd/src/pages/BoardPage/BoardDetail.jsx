import { useSelector,useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Page from "../../components/Page";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteboard, getboardDetail, likeboard, postComment } from "../../services/board";


const BoardDetail = () => {
  
  const { token }  = useSelector((state) => state.userReducer);
  const { boardId } = useParams();
  const [ nickname, setNickname ] = useState("")
  const [ title, setTitle ] = useState("")
  const [ content, setContent ] = useState("")
  const [ likeCount, setLikeCount ] = useState(0)
  const [ registerTime, setRegisterTime ] = useState("")
  const [ videoPath, setVideoPath ] = useState("")
  const [ isLiked, setIsLiked ] = useState(false)
  const [ comment, setComment ] = useState('')
  const navigate = useNavigate()
  

  useEffect(()=> {
    const getBoard = async() => {
      try {
        const response = await getboardDetail (
          token,
          boardId,
          (res) => {
            console.log(res.data.data)
            setTitle(res.data.data.title)
            setNickname(res.data.data.nickname)
            setLikeCount(res.data.data.likeCount)
            setRegisterTime(res.data.data.registerTime)
            setVideoPath(res.data.data.videoPath)
            setContent(res.data.data.content)
            setIsLiked(res.data.data.liked)
          },
          (err) => console.log(err)
        )
      } catch(error){
        console.log(error);
      }
    }
    getBoard();
  }, [boardId, token]);

 
  const handleDelete = (e) => {
    e.preventDefault()

    deleteboard(
      token,
      boardId,
      (res) => {
        navigate('/board')
        alert('글이 성공적으로 삭제되었습니다.')
      },
      (err) => console.log(err)
    )
  }

  const handleLike = async (e) => {
    e.preventDefault(); // 버튼 클릭 시 페이지 리로드 방지

    try {
        const response = await likeboard(token, { boardId: boardId });
        console.log(response);
        // 좋아요 상태를 토글합니다.
        setIsLiked(!isLiked);
        // 좋아요 상태에 따라 좋아요 수를 조정합니다.
        setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    } catch (error) {
        console.log(error);
    }
  }

  const handleComment = async (e) => {
    e.preventDefault()
    console.log(boardId)
    
    const response = await postComment(
      token,
      {
        speechId:boardId,
        comment:comment
      },
      (res) => console.log(res),
      (err) => console.log(err)
    )
  }

  return (
      <div className="mypage bg-white w-full">
      <Page header={<Navbar />} footer={<Footer />}>
        <div className="flex justify-center w-full mt-24 Detail">
          <div className="creBoaOut">
            <div className="text-center">
              <h2 className="font-extrabold text-2xl">발표 게시판</h2>
            </div>

          <div className="border-2 border-black mx-20 px-10 mt-5 my-2 rounded-xl">
            <div className="mt-5 mb-2 text-2xl font-bold">{title}</div>
            <div className="flex text-sm mb-3">
              <div className="me-4">{registerTime.split("T")[0]}</div>
              <div className="me-1"><img src="images/Profile.png" className="w-5 h-5"/></div>
              <div className="me-4">{nickname}</div>
              <div className="my-0.5">좋아요 : {likeCount}</div>
              {isLiked&&<button className="my-0.5 ms-20" onClick={handleLike}>❤️</button>}
              {!isLiked&&<button className="my-0.5 ms-20" onClick={handleLike}>🤍</button>}
            </div>
            <div className="flex items-start space-x-2 flex-wrap">
            <div className="flex-none" style={{ maxWidth: '200px' }}>
            <div>
              {/* 여기에 video 태그를 추가합니다. */}
              {videoPath && (
                  <video className="w-full h-auto" controls>
                      <source src={videoPath} type="video/mp4" />
                      Your browser does not support the video tag.
                  </video>
              )}
            </div>
                <div className="flex my-2">
                  <button 
                    className="mx-2 text-white border bg-sky-400 rounded-md py-1 px-2"
                    onClick={() => navigate('/createboard', { state: { isCreate: false, boardId: boardId } })}
                    >수정</button>
                  <button className="mx-2 text-white border bg-red-500 rounded-md py-1 px-2" onClick={handleDelete}>삭제</button>
                    <Link to={"/board"}><button className="mx-2 text-white border bg-gray-400 rounded-md py-1 px-2">목록</button></Link>

                </div>
                </div>
                <div className="flex-grow">
                    <div
                      className="w-full m-2 h-52 px-5 py-2 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600">
                        {content}
                    </div>                
                </div>
            </div>
          </div>
          <div className="border-2 border-black mx-20 px-10 mt-10 rounded-xl">
            <div className="my-5 text-2xl font-bold">댓글</div>

            <div className="grid grid-cols-12 gap-4 Comment rounded-2xl p-7 mt-7 mb-5">
                <div className="flex items-center col-span-2 px-3">
                    <img src="images/Profile.PNG" className="w-10 h-10 rounded-2xl"/>
                </div>
                <div className="col-span-8">
                    <textarea 
                      className="w-full me-2 h-20 px-5 py-2 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                      cols="30" rows="5" placeholder="댓글 입력"
                      onChange={(e) => setComment(e.target.value)}
                      ></textarea>
                </div>
                <div className="col-span-2 flex items-center">
                    <button className="mx-2 text-white border bg-blue-500 rounded-md py-1 px-2" onClick={handleComment}>댓글<br/>작성</button>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-4 border rounded-2xl p-2 my-3 bg-sky-100">
                <img src="images/Profile.PNG" className="w-7 h-7 rounded-2xl col-span-1"/>
                <div className="col-span-2">Tony</div>
                <div className="col-span-6">솔직한 평가 감사합니다.</div>
                <div className="col-span-3">2024.02.06</div>
            </div>
          </div>
          </div>
        </div>
      </Page>
    </div>
  );
};

export default BoardDetail;