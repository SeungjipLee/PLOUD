import React from 'react'
import Page from "../../components/Page";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import MainPage from "../MainPage";
import SignUpPage from "../SingUpPage";
import Button from '@mui/material/Button';
import SignIn from "./LoginMain";
import Logo from './Logo';
import SocialLogin from './SocialLogin';

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Page header={<Link to="/"><Logo /></Link>} footer={<Footer />}>
        <SignIn />
        <SocialLogin />
      </Page>
    );
  }
}

export default LoginPage;

