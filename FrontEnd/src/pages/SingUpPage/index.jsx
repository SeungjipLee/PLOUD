import React, { useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";


function DataSubmitForm() {
  const [formData, setFormData] = useState({
    userId: undefined,
    email: undefined,
    emailCode : undefined,
    nickname: undefined,
    password: undefined,
    password_check: undefined,
    birthYear: undefined,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password === formData.password_check) {
      try {
        const response = await axios.post('http://localhost:8000/api/user/signup', formData, {withCredentials: true});
        console.log(response.data);
        // 추가적인 성공 처리 로직
      } catch (error) {
        console.error('Error sending data', error);
        // 에러 처리 로직
      }
    } else {
      alert('비밀번호와 비밀번호 확인이 일치하지 않습니다.');
    }

  };

  // const checkUserId = {userId : formData.userId}


const handleCheckId = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:8000/api/user/userId', {userId : formData.userId}, {withCredentials: true});
    console.log(response.data.status);
    // 추가적인 성공 처리 로직
    if (response.data.status == "200") {
      alert('사용 가능한 아이디입니다.');
    } else {
      alert('이미 사용 중인 아이디입니다.');
    }
  } catch (error) {
    console.error('Error sending data', error);
    alert('이미 사용 중인 아이디입니다.');
    // 에러 처리 로직
  }
}

const handleCheckEmail = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:8000/api/user/email', {email : formData.email}, {withCredentials: true});
    console.log(response);
    // 추가적인 성공 처리 로직
    if (response.data.status == "200") {
      alert('가입 가능한 이메일입니다. 메일로 인증번호를 보냈습니다.');
    } else if (response.data.status == "409") {
      alert('이미 가입된 이메일입니다.');
    }
  } catch (error) {
    console.error('Error sending data', error);
    alert('이미 가입된 이메일입니다.');
    // 에러 처리 로직
  }
}

const handleCheckEmailCode = async (e) => {
  e.preventDefault();
  try {
    const response = await axios.post('http://localhost:8000/api/user/verify-email', {email : formData.email, code: formData.emailCode}, {withCredentials: true});
    console.log(response);
    // 추가적인 성공 처리 로직
    if (response.data.status == "200") {
      alert('이메일 인증이 완료되었습니다.');
    } else if (response.data.status == "400") {
      alert('코드를 다시 확인해주세요.');
    }
  } catch (error) {
    console.error('Error sending data', error);
    alert('코드를 다시 확인해주세요.');
    // 에러 처리 로직
  }
}



  return (
    <>
    <Link to="/">PLOUD</Link>
    <h1>회원가입</h1>
    <form onSubmit={handleSubmit}>
      아이디 : 
      <input type="text" minLength="4" maxLength="15" name="userId" value={formData.userId} onChange={handleChange} placeholder=" ex) ssafy" />
      <div onClick={handleCheckId}>중복확인</div>
      <br /><br /> 이메일 :
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder=" ex) ssafy@ssafy.com" />
      <div onClick={handleCheckEmail}>중복확인</div>
      <br /><br /> 이메일 코드 확인:
      <input type="text" name="emailcode" value={formData.emailCode} onChange={handleChange} placeholder=" ex) xAdsXZ" />
      <div onClick={handleCheckEmailCode}>이메일 인증</div>
      <br /><br /> 닉네임 :
      <input type="text" minLength="2" maxLength="8" name="nickname" value={formData.nickname} onChange={handleChange} placeholder=" ex) 김싸피" />
      <br /><br /> 비밀번호 : 
      <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="*********" />
      <br /><br /> 비밀번호 확인 :
      <input type="password" name="password_check" value={formData.password_check} onChange={handleChange} placeholder="*********" />
      <br /><br /> 출생연도 :
      <input type="number" name="birthYear" value={formData.birthYear} onChange={handleChange} placeholder=" ex) 1996" />
      <br />
      <br />
      <button type="submit">회원가입</button>
    </form>
  </>
  );
}

export default DataSubmitForm;


// import axios from 'axios'

// const DOMAIN = "http://localhost:8000"
// axios.defaults.withCredentials = true // 쿠키 데이터를 전송받기 위헤
// export const request = (method, url, data) => {
//     return axios({
//         method,
//         url: DOMAIN + url,
//         data,
//     })
//     .then((res) => res.data)
//     .catch((error) => console.log(error))
// }