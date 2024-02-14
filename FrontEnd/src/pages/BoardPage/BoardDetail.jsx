import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import Page from "../../components/Page";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteComment,
  deleteboard,
  getComment,
  getboardDetail,
  likeboard,
  postComment,
} from "../../services/board";
import MyAlert from "../../components/MyAlert";
import { right } from "@popperjs/core";

const BoardDetail = () => {
  // 알림 창 상태
  const [message, setMessage] = useState("");
  const [alert, setAlert] = useState(false);
  const [alert2, setAlert2] = useState(false);

  const { token } = useSelector((state) => state.userReducer);
  const username = useSelector((state) => state.userReducer.nickname);

  const { boardId } = useParams();
  const [nickname, setNickname] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [likeCount, setLikeCount] = useState(0);
  const [registerTime, setRegisterTime] = useState("");
  const [videoPath, setVideoPath] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getBoard = async () => {
      try {
        const response = await getboardDetail(
          token,
          boardId,
          (res) => {
            setTitle(res.data.data.title);
            setNickname(res.data.data.nickname);
            setProfileImg(res.data.data.profileImg);
            setLikeCount(res.data.data.likeCount);
            setRegisterTime(res.data.data.registerTime);
            setVideoPath(res.data.data.videoPath);
            setContent(res.data.data.content);
            setIsLiked(res.data.data.liked);
          },
          (err) => console.log(err)
        );

        const response2 = await getComment(
          token,
          boardId,
          (res) => {
            setCommentList(res.data.data);
          },
          (err) => console.log(err)
        );
      } catch (error) {
        console.log(error);
      }
    };
    getBoard();
  }, [boardId, token]);

  const handleDelete = (e) => {
    e.preventDefault();

    console.log(boardId);

    deleteboard(
      token,
      boardId,
      async (res) => {
        await setMessage("글이 성공적으로 삭제되었습니다.");
        setAlert2(true);
      },
      (err) => console.log(err)
    );
  };

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
  };

  const handleComment = async (e) => {
    e.preventDefault(); // 브라우저의 기본 동작을 방지

    try {
      const response = await postComment(token, {
        boardId: boardId,
        comment: comment,
      });
      // await setMessage("댓글이 작성되었습니다.")
      // setAlert(true)
      // 새 댓글 데이터를 포함하여 상태 업데이트
      setCommentList((list) => [...list, response.data]); // 이 부분에서 response.data의 구조를 확인해야 함

      setComment(""); // 댓글 입력창 초기화
    } catch (err) {
      console.log(err);
      // await setMessage("댓글 작성에 실패했습니다.")
      // setAlert(true)
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(token, commentId); // await 사용 확인
      await setMessage("댓글이 성공적으로 삭제되었습니다.");
      setAlert(true);
      setCommentList(commentList.filter((c) => c.id !== commentId)); // 댓글 목록 업데이트
    } catch (error) {
      console.error(error);
      await setMessage("댓글 삭제에 실패했습니다.");
      setAlert(true);
    }
  };

  return (
    <>
      <div className="bg-white w-full min-h-screen">
        <Page header={<Navbar />} footer={<Footer />}>
          <div className="mt-28">
            <div className="text-center font-extrabold text-2xl mainBlueF mb-10">
              발표 게시판
            </div>
            <div className="mx-60 mb-24 bg-gray-100 p-10 border border-black rounded-2xl">
              {/* 게시글 */}
              <div>
                <div className="mb-2 text-2xl font-bold">{title}</div>
                {/* info */}
                <div
                  className="flex text-sm mb-3"
                  style={{ justifyContent: "space-between" }}>
                  <div className="flex">
                    작성자:
                    <div className="mx-2">{nickname}</div>
                    <div className="me-1">
                      <img
                        src={profileImg ? profileImg : "/images/Profile.PNG"}
                        className="w-5 h-5"
                      />
                    </div>
                  </div>
                  <div className="flex">
                    <div className="mr-4">좋아요 : {likeCount}</div>
                    {/* {isLiked&&<button className="my-0.5 ms-20" onClick={handleLike}>❤️</button>}
              {!isLiked&&<button className="my-0.5 ms-20" onClick={handleLike}>🤍</button>} */}
                    <div>등록일: {registerTime.split("T")[0]}</div>
                  </div>
                </div>
                <div>
                  {/* <div className="flex-none" style={{ maxWidth: '200px' }}> */}
                  <div>
                    {/* 여기에 video 태그를 추가합니다. */}
                    {videoPath && (
                      <video className="w-full h-auto" controls>
                        <source src={videoPath} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    )}
                  </div>
                  <div className="flex-grow">
                    <div className="rounded-2xl w-full mt-2 h-52 px-5 py-2 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600">
                      {content}
                    </div>
                  </div>
                  <div
                    className="flex mt-3 my-2"
                    style={{ justifyContent: "center" }}>
                    <button
                      className="mx-2 text-white border bg-sky-400 rounded-md py-1 px-2"
                      onClick={() =>
                        navigate("/createboard", {
                          state: { isCreate: false, boardId: boardId },
                        })
                      }>
                      수정
                    </button>
                    <button
                      className="mx-2 text-white border bg-red-500 rounded-md py-1 px-2"
                      onClick={handleDelete}>
                      삭제
                    </button>
                    <Link to={"/board"}>
                      <button className="mx-2 text-white border bg-gray-400 rounded-md py-1 px-2">
                        목록
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* 댓글 */}
              <div>
                <div
                  className="flex"
                  style={{ justifyContent: "space-between" }}>
                  <div className="flex">
                    <div className="px-3 text-2xl font-bold">댓글</div>
                    <span
                      className="text-2xl"
                      style={{ verticalAlign: "middle" }}>
                      {commentList.length}
                    </span>
                  </div>
                  {isLiked && (
                    <button className="my-0.5 text-2xl" onClick={handleLike}>
                      ❤️
                    </button>
                  )}
                  {!isLiked && (
                    <button className="my-0.5 text-2xl" onClick={handleLike}>
                      🤍
                    </button>
                  )}
                </div>

                <div className="flex mt-3">
                  <textarea
                    className="rounded flex-grow h-20 px-3 py-2 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600"
                    cols="30"
                    rows="5"
                    placeholder="댓글을 입력해주세요"
                    onChange={(e) => setComment(e.target.value)}></textarea>
                  <div className="flex item-center">
                    <button
                      className="ms-3  px-3 text-white border bg-blue-500 rounded-md"
                      onClick={handleComment}>
                      작성
                      <br />
                      완료
                    </button>
                  </div>
                </div>

                {commentList &&
                  commentList.map((s, index) => (
                    // <div key={index} className="grid grid-cols-12 gap-4 border rounded-2xl p-2 my-3 bg-sky-100">
                    <div key={index} className="flex mt-3 mx-2">
                      <img
                        src={
                          s.profileImg ? s.profileImg : "/images/Profile.PNG"
                        }
                        className="w-10 h-10 rounded-2xl col-span-1"
                      />
                      <div className="flex-1 pl-3">
                        <span className="text-xl col-span-2 font-bold">
                          {s.nickname}
                        </span>{" "}
                        {/* 작성자 닉네임 */}
                        <span className="ml-3" style={{ color: "#808080" }}>
                          {registerTime ? registerTime.split(" ")[0] : ""}
                        </span>{" "}
                        {/* 등록 날짜 */}
                        <span>
                          {/* 현재 사용자의 닉네임과 댓글 작성자의 닉네임이 일치할 때만 삭제 버튼을 보여줌 */}
                          {username === s.nickname && (
                            <button
                              className="col-span-2 text-red-500 border bg-transparent rounded-md mx-3"
                              onClick={() => handleDeleteComment(s.id)}
                              style={{ align: "right" }}>
                              삭제
                            </button>
                          )}
                        </span>
                        {/* <div className="flex" style={{flexWrap:'wrap'}}> */}
                        <div
                          style={{ maxWidth: "100%", wordBreak: "break-all" }}>
                          {s.comment}
                        </div>{" "}
                        {/* 댓글 내용 */}
                        {/* </div> */}
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </Page>
      </div>
      {alert && (
        <MyAlert
          content={message}
          onClose={() => {
            setAlert(false);
          }}
        />
      )}
      {alert2 && (
        <MyAlert
          content={message}
          onClose={() => {
            setAlert2(false);
            navigate("/board");
          }}
        />
      )}
    </>
  );
};

export default BoardDetail;
