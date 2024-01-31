import React from 'react'
import Navbar from "../../components/Navbar";
import Page from "../../components/Page";
import Footer from "../../components/Footer";
import { Link } from "react-router-dom";
import PracticePage from "../PracticePage";
import StudyPage from "../StudyPage";
import API from '../../services/Api';
// 메인페이지

// 로그인 전과 후로 나뉘며
// 로그인 토큰을 가지고 있을 시 
// Navbar에 
// 닉네임 마이페이지 로그아웃이 활성화되고
// 로그인 회원가입 버튼이 비활성화된다
// 로그인 되어 있지 않으면 게시판, 연습, 스터디로 가는 버튼이
// 로그인페이지로 향하게 된다

export const login = async (code) => {
    const { data } = await API.post('url',
          JSON.stringify(code)
    );
    return data;
}

// export const getDeposit = function () {
//   axios({
//     method: "get",
//     url: "http://127.0.0.1:8000/finance/deposits",
//   })
//     .then((response) => {
//       this.setState({
//         depositProducts: response.data
//       })
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// };

class MainPage extends React.Component {
  constructor() {
    super();
    this.state = {
      depositProducts: '',
    };
  }

  // componentDidMount() {
  //   getDeposit();
  // }


  render() {
    return (
      <div className="Main">
        <Page header={<Navbar />} footer={<Footer />}>
          <div className="Main1">
            <img src="images/Main1.png" alt="Main1.png" className='w-full h-full object-cover'/>
          </div>
          <div className="Main2">
            <div className="video mx-16 ms-36 me-12">
              <video src="videos/cat.mp4" autoPlay loop />
            </div>
          <div className='Main2Container'>
            <div className="mainBlueB text-white card mx-16 me-36 ms-12 text-center pt-5">Carousel</div>
            <div className="mainBlueB text-white card mx-16 me-36 ms-12 text-center pt-5">오늘의 발표 수</div>
          </div>
          </div>
          <div className="Main3">
            <h2 className='text-6xl text-center pt-24'>스피치 실력을 키워볼까요?</h2>
            <div className="notcard">
              <Link to="/practice" element={<PracticePage />}>
                혼자연습
              </Link>
            </div>
            <div className="notcard">
              <Link to="/study" element={<StudyPage />}>
                함께연습
              </Link>
            </div>
          </div>
          <div className="Main4">
            <img src="images/Main2.png" alt="" />
          </div>
          <div className="Main5">
            {this.state.depositProducts}
          </div>
        </Page>
      </div>
    );
  }
}



export default MainPage;
