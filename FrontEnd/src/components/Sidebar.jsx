import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { getScriptList, getScriptDetail } from "../services/script";

const Side = styled.div`
  display: flex;
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

  useEffect(() => {
    getScriptList(
      token,
      1,
      (res) => {
        setList(res.data.data.scripts);
      },
      (err) => {
        console.log(err);
        alert("ScriptList 로딩 에러");
      }
    );
  }, []);

  return (
    <>
      <div>뉴스 페이지</div>
      {list.map((i) => {
        <div>1</div>;
      })}
    </>
  );
};

// Speech categoryid : 2
const SpeechPage = () => {
  const token = useSelector((state) => state.userReducer.token);

  return <div>연설 페이지</div>;
};

const Sidebar = () => {
  const [selectedMenu, setSelectedMenu] = useState(null);

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
      <p
        className="text-sky-950 font-bold text-2xl"
        style={{ paddingBottom: "20px" }}>
        목록
      </p>
      {renderSelectedComponent()}
    </div>
  );
};

export default Sidebar;
