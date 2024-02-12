import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Page from "../../components/Page";
import Footer from "../../components/Footer";
import { useSelector,useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { getboardList, searchBoard } from "../../services/board";


const BoardPage = () => {
  const [ page, setPage ] = useState(0)
  const { token } = useSelector((state) => state.userReducer)
  const [ showList, setShowList ] = useState([])
  const navigate = useNavigate()
  const [ searchForm, setSearchForm ] = useState('')
  const [ isSearchMode, setIsSearchMode ] = useState(false)


  useEffect(() => {
    if (!isSearchMode) {
      // 전체 목록을 불러오는 로직
      const response = getboardList(
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
    }
  }, [token, page, isSearchMode]);



  const handleSearch = async () => {
    if (searchForm.trim() === '') {
      setIsSearchMode(false);
      setPage(0); 
    } else {
      setIsSearchMode(true);
      try {
        const response = await searchBoard(
          token,
          {
            title: searchForm,
            page: 0, 
            size: 10,
            sort: "title"
          }
        );
        console.log(response);
        setShowList(response.data.data); 
      } catch (err) {
        console.log(err);
      }
    }
  };

  
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
          placeholder="게시글 제목으로 검색"
          onChange={(e) => setSearchForm(e.target.value)}/>
        <button className="border searchBtn p-1 ms-3 rounded-md bg-sky-300 writeBtn" onClick={handleSearch}>검색</button>
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
      </div>

      <div className="outline2 mx-auto">
        <div align="right">
          <button className="write border writeBtn rounded-md py-1 px-4 mt-4"
          onClick={() => navigate('/createboard', { state: { isCreate: true, boardId:-1} })}>글쓰기</button>
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
