import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { getScriptList, getScriptDetail } from "../../../services/script";
import { Link } from "react-router-dom";
import Level1 from "../../PracticeRoomPage/Level1";
import Level2 from "../../PracticeRoomPage/Level2";

const Side = styled.div`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 12%;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
`;

// 원한다면 각기 다른 컴포넌트로 분리 가능
// News categoryid : 1
const NewsPage = ({ setId }) => {
  const token = useSelector((state) => state.userReducer.token);
  const [list, setList] = useState([]);
  //console.log(token);

  const getNewsList = async () => {
    getScriptList(
      token,
      1,
      (res) => {
        setList(res.data.data.scripts);
        //console.log(res);
      },
      (err) => {
        console.log(err);
        alert("ScriptList 로딩 에러");
      }
    );
  };

  useEffect(() => {
    getNewsList();
  }, []);

  //console.log(list);

  return (
    <>
      {list.map((i, index) => (
        <div key={index}>
          <button
            onClick={() => {
              setId(i.scriptId);
            }}
            className="mb-2"
            style={{ textAlign: "left" }}>
            {i.scriptTitle}
          </button>
        </div>
      ))}
    </>
  );
};

// Speech categoryid : 2
const SpeechPage = ({ setId }) => {
  const token = useSelector((state) => state.userReducer.token);
  const [list, setList] = useState([]);
  //console.log(token);

  const getSpeechList = async () => {
    getScriptList(
      token,
      2,
      (res) => {
        setList(res.data.data.scripts);
        //console.log(res);
      },
      (err) => {
        console.log(err);
        alert("ScriptList 로딩 에러");
      }
    );
  };

  useEffect(() => {
    getSpeechList();
  }, []);

  return (
    <>
      {list.map((i, index) => (
        <div key={index}>
          <button
            onClick={() => {
              setId(i.scriptId);
            }}
            className="mb-2"
            style={{ textAlign: "left" }}>
            {i.scriptTitle}
          </button>
        </div>
      ))}
    </>
  );
};

const ScriptPage = ({ id, setTitle, setContent }) => {
  // id 바뀔 때 마다 렌더링 되야함(단 id값 정의되지 않았을떄는 렌더링x), 스크립트 부분
  const token = useSelector((state) => state.userReducer.token);
  const [list, setList] = useState([]);

  const getDetail = async () => {
    getScriptDetail(
      token,
      id,
      (res) => {
        setList(res.data.data);
        setTitle(res.data.data.title);
        setContent(res.data.data.content);
      },
      (err) => {
        console.log(err);
        alert("getScriptDetail 에러");
      }
    );
  };

  useEffect(() => {
    getDetail();
  }, [id]);

  return (
    <div>
      <div>
        <div className="text-sky-950 font-bold text-xl">{list.title}</div>
        <br />
        <div style={{ overflowWrap: "break-word", flex: "auto" }}>
          {list.content}
        </div>
        <br />
      </div>
      {/* {id != "" && level == 1 && (
        <Link
          className="bg-slate-300"
          to="/practice/Level1"
          state={{ content: content }}>
          녹화 페이지 이동
        </Link>
      )}
      {id != "" && level == 2 && (
        <Link
          className="bg-slate-300"
          to="/practice/Level2"
          state={{ content: content }}>
          녹화 페이지 이동
        </Link>
      )} */}
    </div>
  );
};

const Sidebar = ({ level }) => {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  const renderSelectedComponent = () => {
    switch (selectedMenu) {
      case "뉴스":
        return <NewsPage setId={setId} />;
      case "연설":
        return <SpeechPage setId={setId} />;
      default:
        return null;
    }
  };

  useEffect(() => {
    // console.log(id);
  }, [id]);

  return (
    <div style={{ height: "600px" }}>
      {/* 분류 */}
      <div className="pb-1 mb-3" style={{ borderBottom: "1px solid #0C134F" }}>
        <span
          className="text-sky-950 font-bold text-2xl"
          style={{ paddingBottom: "20px", marginRight: "20px" }}>
          분류
        </span>
        {["뉴스", "연설"].map((menu, index) => (
          <span
            key={index}
            style={{
              color: selectedMenu === menu ? "#F3704B" : "gray",
              textDecoration: "none",
              marginRight: "20px",
              cursor: "pointer",
              fontWeight: selectedMenu === menu ? "bold" : "normal",
            }}
            onClick={() => handleMenuClick(menu)}>
            {menu}
          </span>
        ))}
      </div>
      {/* 제목 목록, 스크립트 */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr" }}>
        <div style={{ borderRight: "1px solid #0C134F" }}>
          <p className="text-sky-950 font-bold text-2xl pb-3">목록</p>
          <div className="pe-2" style={{ height: "500px", overflowY: "auto" }}>
            {renderSelectedComponent()}
          </div>
        </div>
        <div className="p-2" style={{ height: "530px", overflowY: "auto" }}>
          {id != "" && <ScriptPage id={id} setTitle={setTitle} setContent={setContent} />}
        </div>
      </div>
      {/* 녹화 페이지 이동 */}
      <div
        align="right"
        className="mt-6"
        style={{ fontWeight: "bold", color: "#0C134F" }}>
        {id != "" && (
          <Link to="/practice/Level1" state={{ title: title, content: content }}>
            <span className="practice-startText">녹화 시작하기 ▶</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
