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
            }}>
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

  //console.log(list);

  return (
    <>
      {list.map((i, index) => (
        <div key={index}>
          <button
            onClick={() => {
              setId(i.scriptId);
            }}>
            {i.scriptTitle}
          </button>
        </div>
      ))}
    </>
  );
};

const ScriptPage = ({ id, level }) => {
  // id 바뀔 때 마다 렌더링 되야함(단 id값 정의되지 않았을떄는 렌더링x), 스크립트 부분
  const token = useSelector((state) => state.userReducer.token);
  const [list, setList] = useState([]);
  const [content, setContent] = useState("");

  const getDetail = async () => {
    getScriptDetail(
      token,
      id,
      (res) => {
        setList(res.data.data);
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
      <div
        style={{ maxWidth: "1000px", overflowY: "auto", maxHeight: "500px" }}>
        <div>제목 : {list.title}</div>
        <br />
        <div style={{ overflowWrap: "break-word", flex: "auto" }}>
          내용 : {list.content}
        </div>
        <br />
      </div>
      {id != "" && level == 1 && (
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
      )}
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
    <div style={{ display: "flex" }}>
      <Side>
        <Menu className="grid-cols-3">
          <p
            className="text-sky-950 font-bold text-2xl"
            style={{ paddingBottom: "20px" }}>
            분류
          </p>
          {["뉴스", "연설"].map((menu, index) => (
            <div
              key={index}
              style={{
                color: "gray",
                textDecoration: "none",
                marginBottom: "20px",
                cursor: "pointer",
                fontWeight: selectedMenu === menu ? "bold" : "normal",
              }}
              onClick={() => handleMenuClick(menu)}>
              {menu}
            </div>
          ))}
        </Menu>
      </Side>
      <div style={{ flexDirection: "column", width: "15%" }}>
        <p
          className="text-sky-950 font-bold text-2xl"
          style={{ paddingBottom: "20px" }}>
          목록
        </p>
        {renderSelectedComponent()}
      </div>
      <div style={{ paddingLeft: "30px" }}>
        <p
          className="text-sky-950 font-bold text-2xl"
          style={{ paddingBottom: "20px" }}>
          스크립트
        </p>
        {id != "" && <ScriptPage id={id} level={level} />}
      </div>
    </div>
  );
};

export default Sidebar;
