import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Page from "../../components/Page";
import Footer from "../../components/Footer";
import Button from "../../components/Button";
import PostItem from "./PostItem";
import { useSelector,useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getboardList } from "../../services/board";


const BoardPage = () => {
  const [ page, setPage ] = useState(0)
  const { token } = useSelector((state) => state.userReducer)
  const [ showList, setShowList ] = useState([])


  useEffect(()=> {
    const getBoard = async() => {
      try {
        const response = await getboardList(
          token,
          {
            page:page,
            size:10,
            sort:["id", "desc"]
          },
          (res) => {
            console.log(res.data.data)
            setShowList(res.data.data)
          },
          (err) => console.log(err)
        )
      } catch(error){
        console.log(error);
      }
    }
    getBoard();
  }, [token, page]);

  return (
    <div className="mypage bg-white w-full">
      <Page header={<Navbar />} footer={<Footer />}>
      <div className="mt-24 place-self-center flex justify-center">
          <h2 className="font-extrabold text-2xl">발표 게시판</h2>
      </div>

      {/* 완전 밖 */}
      <div className="OutBox rounded-md outline2 mx-auto mt-5">

      <div className="study-main-search flex justify-center mb-3">
        <img src="./images/search_icon.PNG"/>
        <input type="text"
          className="search-room-input"
          placeholder="게시글 제목으로 검색"/>
        <button className="border searchBtn p-1 ms-3 rounded-md bg-sky-300 writeBtn">검색</button>
      </div>

      <table className="table-auto text-center bg-white h-44">
        <thead className="underLine">
          <tr>
            <th className="w-6" style={{backgroundColor:"#EBEAFA"}}>No</th>
            <th className="w-56" style={{backgroundColor:"#EBEAFA"}}>제목</th>
            <th className="w-6" style={{backgroundColor:"#EBEAFA"}}>작성자</th>
            <th className="w-6" style={{backgroundColor:"#EBEAFA"}}>좋아요</th>
            <th className="w-6" style={{backgroundColor:"#EBEAFA"}}>등록일</th>
          </tr>
        </thead>
        <tbody>
          {showList.map((s, index) => (
            <tr key={index} className="h-12">
              <td>{showList.length - index}</td> {/* 페이지 내 역순 번호 할당 */}
              <td>
                <Link to={`/board/${s.id}`}>{s.title}</Link>
              </td>
              <td>{s.nickname}</td>
              <td>{s.likeCount}</td>
              <td>{s.registerTime.split("T")[0]}</td>
            </tr>
          ))}
        </tbody>
        </table>

        
        <div align="right">
          <Link to={"/createboard"}>
            <button className="write border writeBtn rounded-md py-1 px-4 mt-4">글쓰기</button>
          </Link>
        </div>
        <div align="center" className="mt-3 mb-3">
            1 2 3 4 5(페이지 처리)
        </div>
      </div>

      </Page>
    </div>
  );
};

export default BoardPage;
