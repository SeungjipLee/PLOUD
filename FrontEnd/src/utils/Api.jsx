import axios from "axios";
// import { useDispatch } from "react-redux";
// import { getToken } from "../features/user/userSlice";

// const DOMAIN = "https://i10e207.p.ssafy.io";
const DOMAIN = "http://localhost:8000";

const API = (token) => {
  // const dispatch = useDispatch();

  const instance = axios.create({
    baseURL: DOMAIN + "/api",
    headers: {
      Authorization: token ? `Bearer ${token.accessToken}` : null,
      withCredentials: true,
    },
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      // console.log(error);
      if (error.response.data.message === "JWT token expired") {
        alert("로그아웃 후 다시 로그인해 주세요!");

        return Promise.reject(error);
      } else {
        // JWT 외의 에러는 그냥 반환
        return Promise.reject(error);
      }
    }
  );
  return instance;
};

export default API;
