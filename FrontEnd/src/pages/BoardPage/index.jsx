import React from "react";
import Navbar from "../../components/Navbar";

class BoardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <>
        <Navbar />
        <h1>게시판</h1>
      </>
    );
  }
}

export default BoardPage;
