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
            sort:["id"]
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
      <div className="OutBox flex justify-center relative bg-gray-100 rounded-md outline2 mx-auto mt-5">
      <table className="table-auto text-center bg-white h-44">
        <thead className="underLine">
          <tr>
            <th className="w-6">No</th>
            <th className="w-56">제목</th>
            <th className="w-6">작성자</th>
            <th className="w-6">좋아요</th>
            <th className="w-6">등록일</th>
          </tr>
        </thead>
        <tbody>
          {showList.map((s, index) => (
            <tr key={index} className="h-12">
              <td>{page * 10 + (10 - index)}</td>
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
      </div>
      <div className="relative">
        <div className="searchForm">
          <input type="text"
              className="block rounded-md py-1 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 me-3 my-12"
              placeholder="검색"/>
        </div>
        <button className="absolute border searchBtn p-1 rounded-md bg-sky-300 writeBtn">찾기</button>
        <Link to={"/createboard"}>
        <button className="absolute top-24 write top-16 border writeBtn rounded-md py-1 px-4">글쓰기</button>
        </Link>
      </div>
      <div className="w-full h-44 bg-white"></div>
      </Page>
    </div>
  );
};

export default BoardPage;
