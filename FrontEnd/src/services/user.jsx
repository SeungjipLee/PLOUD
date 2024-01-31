import API from "../utils/Api";
import axios from "axios";

export const login = (id, password) => {
  return API(null)
    .post("user/login", {
      userId: id,
      password: password,
    })
    .then((res) => {
      console.log(res);
      if (res.data.status == 200) {
        localStorage.setItem("user", JSON.stringify(res.data)); // local에 userData 저장
        return res.data;
      } else {
        throw new Error("로그인 실패");
      }
    });
};


export const signup = (data, sucess, fail) => {
  return API(null)
    .post("user/signup", data)
    .then(sucess)
    .catch(fail);
};


export const checkId = (data, success, fail) => {
  return API(null)
    .post("user/userId", data)
    .then(success)
    .catch(fail)
}


export const checkEmail = (data, success, fail) => {
  return API(null)
    .post("user/email", data)
    .then(success)
    .catch(fail)
}


export const verifyEmail = (data, success, fail) => {
  return API(null)
    .post("user/verify-email", data)
    .then(success)
    .catch(fail)
}


export const checkNickname = (data, success, fail) => {
  return API(null)
    .post("user/nickname", data)
    .then(success)
    .catch(fail)
}


export const getProfile = (token, success, fail) => {
  console.log(`Bearer ${token.accessToken}`)
  // return API(`Bearer ${token.accessToken}`)
  //   .get("user/profile")
  //   .then(success)
  //   .catch(fail)
  return axios.get(
    "http://localhost:8000/api/user/profile",
    {headers: { Authorization: `Bearer ${token.accessToken}`,
    withCredentials: true}}
  )
}
// {headers: { Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTcwNjY5MDQ0MiwiZXhwIjoxNzA2Njk0MDQyfQ.cJBQ85-twWxnbz4L8Bin37RrsfAyImE9fKG2Mgpg2UI"}}
