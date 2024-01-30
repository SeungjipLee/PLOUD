import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Page from "../../components/Page";
import Footer from "../../components/Footer";
import Button from "../../components/Button";
import PostItem from "./PostItem";

// 게시판 설명

// 게시글 조회
// 게시글 검색
// 게시글 생성
// 게시글 상세조회
// 페이지네이션

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
    <div className="Board">
      <Page header={<Navbar />} footer={<Footer />}>
        <h1>발표 게시판</h1>
        <table>
          <thead>
            <tr>
              <th>번호</th>
              <th>제목</th>
              <th>작성자</th>
              <th>좋아요</th>
              <th>조회수</th>
              <th>등록일</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <PostItem key={post.id} post={post} />
            ))}
          </tbody>
        </table>
        <button onClick={handlePostAdd}>게시글 추가</button>
        <form onSubmit={onSubmit}>
          <input type="text" placeholder="검색" />
          <Button type="submit">찾기</Button>
        </form>
        <Button>글쓰기</Button>
      </Page>
    </div>
  );
};

export default BoardPage;
