import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Page from "../../components/Page";
import Footer from "../../components/Footer";
import Button from "../../components/Button";
import PostItem from "./PostItem";
import { useSelector,useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";


const BoardPage = () => {
  // const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState("");

  const handlePostChange = (event) => {
    setNewPost(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
  };

  const handlePostAdd = () => {
    if (!newPost) return;
    setPosts([...posts, newPost]);
    setNewPost("");
  };

  const posts = [
    {
      id: 1,
      title: "리액트 18 소개",
      author: "홍길동",
      likes: 10,
      views: 150,
      date: "2024-01-25",
    },
    {
      id: 2,
      title: "리액트와 타입스크립트",
      author: "이순신",
      likes: 20,
      views: 200,
      date: "2024-01-24",
    },
  ];

  return (
    <div className="mypage bg-white w-full min-h-screen">
      <Page header={<Navbar />} footer={<Footer />}>
      <div className="mt-32 place-self-center flex justify-center">
          <h2 className="font-extrabold text-2xl">발표 게시판</h2>
      </div>

      {/* 완전 밖 */}
      <div className="OutBox flex justify-center relative bg-gray-100 rounded-md outline2 mx-auto mt-10">
      <table className="table-auto text-center bg-white">
        <thead className="underLine">
          <tr>
            <th className="w-4">No</th>
            <th className="w-56">제목</th>
            <th className="w-6">작성자</th>
            <th className="w-6">좋아요</th>
            <th className="w-6">조회수</th>
            <th className="w-6">등록일</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>10</td>
            <td>
              <Link to={"/board-detail"}>제목10</Link>
            </td>
            <td>Tony</td>
            <td>11</td>
            <td>35</td>
            <td>2024.02.04</td>
          </tr>
          <tr>
            <td>9</td>
            <td>제목 9</td>
            <td>Tony</td>
            <td>0</td>
            <td>1</td>
            <td>2024.01.31</td>
          </tr><tr>
            <td>8</td>
            <td>제목 8</td>
            <td>Sam</td>
            <td>3</td>
            <td>12</td>
            <td>2024.01.27</td>
          </tr><tr>
            <td>7</td>
            <td>제목 7</td>
            <td>Tony</td>
            <td>1</td>
            <td>1</td>
            <td>2023.12.31</td>
          </tr><tr>
            <td>6</td>
            <td>제목 6</td>
            <td>Tony</td>
            <td>1</td>
            <td>1</td>
            <td>2023.12.31</td>
          </tr><tr>
            <td>5</td>
            <td>제목 5</td>
            <td>Tony</td>
            <td>1</td>
            <td>1</td>
            <td>2023.12.31</td>
          </tr><tr>
            <td>4</td>
            <td>제목 4</td>
            <td>Edward</td>
            <td>1</td>
            <td>1</td>
            <td>2023.12.31</td>
          </tr><tr>
            <td>3</td>
            <td>제목 3</td>
            <td>Nana</td>
            <td>1</td>
            <td>1</td>
            <td>2023.12.31</td>
          </tr><tr>
            <td>2</td>
            <td>제목 2</td>
            <td>kky</td>
            <td>1</td>
            <td>1</td>
            <td>2023.12.31</td>
          </tr><tr className="underLine">
            <td>1</td>
            <td>제목 1</td>
            <td>wnsgud</td>
            <td>1</td>
            <td>1</td>
            <td>2023.12.31</td>
          </tr>
        </tbody>
        </table>
      </div>
      <div className="relative">
        <div className="searchForm">
          <input type="text"
              className="block rounded-md py-1 px-4 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 me-3 my-5"
              placeholder="검색"/>
        </div>
        <button className="absolute border searchBtn p-1 rounded-md bg-sky-300 writeBtn">찾기</button>
        <Link to={"/createboard"}>
        <button className="absolute write top-16 border writeBtn rounded-md py-1 px-4">글쓰기</button>
        </Link>
      </div>
      <div className="w-full h-32 bg-white"></div>
      </Page>
    </div>
  );
};

export default BoardPage;
