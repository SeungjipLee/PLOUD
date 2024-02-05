import React, { useState } from "react";
import styled from "styled-components";

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

const NewsPage = () => <div>뉴스 페이지</div>;
const SpeechPage = () => <div>연설 페이지</div>;

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
