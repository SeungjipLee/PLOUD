import axios from "axios";
// import { useDispatch } from "react-redux";
// import { getNewToken } from "../features/user/userSlice";

// const DOMAIN = "https://i10e207.p.ssafy.io";
const DOMAIN = "http://localhost:8000";
// const { refreshToken } = useSelector((state) => state.userReducer.token);

const API = (token) => {
  const instance = axios.create({
    baseURL: DOMAIN + "/api",
    headers: {
      Authorization: token ? `Bearer ${token.accessToken}` : null,
      withCredentials: true,
    },
  });
  //   const dispatch = useDispatch();

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error);
    }
  );

  // instance.interceptors.response.use(
  //   (response) => {
  //     // console.log("[intercept 성공]", response)
  //   return response},
  //   async (error) => {
  //     // console.log("[intercept 실패]", error)
  //     // console.log(token)
  //     const originalRequest = error.config;
  //     if (!originalRequest._retry) {
  //       originalRequest._retry = true;
  //       const refreshToken = token.refreshToken; // 리프레시 토큰을 어디서 가져올지에 대한 로직 필요
  //       // 리프레시 토큰으로 새 액세스 토큰 요청
  //       const response = await axios.get(`${DOMAIN}/api/auth/reissue`, {
  //         headers: { Authorization: `Bearer ${refreshToken}` }
  //       });
  //       // dispatch(getNewToken(response.data));
  //       const newAccessToken = response.data.accessToken;
  //       // 새로운 액세스 토큰으로 요청 헤더 업데이트
  //       instance.defaults.headers["Authorization"] = `Bearer ${newAccessToken}`;
  //       originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
  //       return instance(originalRequest); // 실패한 요청 재시도
  //     }
  //     return Promise.reject(error);
  //   }
  // );

  return instance;
};
export default API;

// accessToken 으로 접근 시 만료되었다는 response 를 받으면
// reissueToken 함수를 실행시켜야 함
// 어떻게 mapping 할 것인가?
// 액세스토큰 만료 요청을 받으면 분기해서 reissueToken으로 오게끔 만들기
// export const reissueToken = (token, success, fail) => {
//   return API(token)
//     .get("auth/reissue")
//     .then(success)
//     .catch(fail)
// }
