import React from 'react'
import Navbar from '../../components/Navbar';

class PracticePage extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <>
        <Navbar />
        <h1>연습페이지</h1>
      </>
    );
  }
}

export default PracticePage;
