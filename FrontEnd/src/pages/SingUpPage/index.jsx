import React, { useState } from 'react';
import axios from 'axios';

function DataSubmitForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    nickname: '',
    userId: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/api/users/signup', formData, {withCredentials: true});
      console.log(response.data);
      // 추가적인 성공 처리 로직
    } catch (error) {
      console.error('Error sending data', error);
      // 에러 처리 로직
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Name" />
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="Password" />
      <input type="text" name="nickname" value={formData.nickname} onChange={handleChange} placeholder="Nickname" />
      <input type="text" name="userId" value={formData.userId} onChange={handleChange} placeholder="User ID" />
      <button type="submit">Submit</button>
    </form>
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