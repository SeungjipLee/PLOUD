import React from 'react'
const Tag = "Main"

class MainPage extends React.Component {
  constructor() {
    super();
    this.state = {};
    console.log(Tag)
  }

  render() {
    return (
      <>
        <h1>메인페이지</h1>
      </>
    );
  }
}

export default MainPage;
