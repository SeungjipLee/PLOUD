import React from 'react'
import Navbar from '../../components/Navbar';

class SkeletonPage extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <>
        <Navbar />
        <h1>페이지</h1>
      </>
    );
  }
}

export default SkeletonPage;
