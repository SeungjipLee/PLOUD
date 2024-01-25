import React from 'react'
import Navbar from '../../components/Navbar';

class StudyPage extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <>
        <Navbar />
        <h1>스터디메인</h1>
      </>
    );
  }
}

export default StudyPage;
