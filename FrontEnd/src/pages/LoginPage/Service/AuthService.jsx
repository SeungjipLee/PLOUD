import axios from "axios";

const API_URL = "http://localhost:8000/api/user/";

const login = (id, password) => {
  return axios
    .post(
      API_URL + "login",
      {
        userId: id,
        password: password,
      },
      { withCredentials: true }
    )
    .then((response) => {
      console.log(response);

      if (response.data.status == 200) {
        localStorage.setItem("user", JSON.stringify(response.data)); // local에 userData 저장
        return response.data;
      } else {
        throw new Error("로그인 실패");
      }
    });
};

const logout = () => {
  localStorage.removeItem("user");
}

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

const AuthService = {
  login,
  getCurrentUser,
  logout
};

export default AuthService;
