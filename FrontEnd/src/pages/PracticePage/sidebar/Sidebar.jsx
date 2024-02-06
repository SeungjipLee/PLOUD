import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { getScriptList, getScriptDetail } from "../../../services/script";

const Side = styled.div`
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 15%;
`;

const Menu = styled.div`
  display: flex;
  flex-direction: column;
`;

// 원한다면 각기 다른 컴포넌트로 분리 가능
// News categoryid : 1
const NewsPage = () => {
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
          <div>{i.scriptTitle}</div>
        </div>
      ))}
    </>
  );
};

// Speech categoryid : 2
const SpeechPage = () => {
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
          <div>{i.scriptTitle}</div>
        </div>
      ))}
    </>
  );
};

const Sidebar = () => {
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [id, setId] = useState("");

  const handleMenuClick = (menu) => {
    setSelectedMenu(menu);
  };

  const renderSelectedComponent = () => {
    switch (selectedMenu) {
      case "뉴스":
        return <NewsPage />;
      case "연설":
        return <SpeechPage />;
      default:
        return null;
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <Side>
        <p
          className="text-sky-950 font-bold text-2xl"
          style={{ paddingBottom: "20px" }}
        >
          분류
        </p>
        <Menu className="grid-cols-3">
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
              onClick={() => handleMenuClick(menu)}
            >
              {menu}
            </div>
          ))}
        </Menu>
      </Side>
      <div style={{ flexDirection: "column", width: "15%" }}>
        <p
          className="text-sky-950 font-bold text-2xl"
          style={{ paddingBottom: "20px" }}
        >
          목록
        </p>
        {renderSelectedComponent()}
      </div>
      <div>대본 제목이랑 대본 내용 출력되야함</div>
    </div>
  );
};

export default Sidebar;
