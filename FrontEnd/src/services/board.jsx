import API from "../utils/Api";

export const login = (id, password) => {
  return API(null)
    .post("user/login",
      {
        userId: id,
        password: password,
      })
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