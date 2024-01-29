import React from 'react'
import Navbar from "../../components/Navbar";
import Page from "../../components/Page";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import PracticePage from "../PracticePage";
import StudyPage from "../StudyPage";
import API from '../../services/Api';
import axios from 'axios'


export const login = async (code) => {
    const { data } = await API.post('url',
          JSON.stringify(code)
    );
    return data;
}

class TestPage extends React.Component {
  constructor() {
    super();
    this.state = {
      depositProducts: '',
    };
  }


  render() {
    return (
      <div className="Main">
        <Page header={<Navbar />} footer={<Footer />}>
          <h1>테스트페이지</h1>
        </Page>
      </div>
    );
  }
}



export default TestPage;
