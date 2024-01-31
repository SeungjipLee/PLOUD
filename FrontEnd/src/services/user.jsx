import API from "../utils/Api";


// data = { userId: String, password: String }
export const login = (data, success, fail) => {
  return API(null)
    .post("user/login", data)
    .then(success)
    .catch(fail)
}


export const signup = (data, success, fail) => {
  return API(null)
    .post("user/signup", data)
    .then(success)
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


// data = { nickname: String }
export const checkNickname = (data, success, fail) => {
  return API(null)
    .post("user/nickname", data)
    .then(success)
    .catch(fail)
}


export const getProfile = (token, success, fail) => {
  // console.log(`Bearer ${token.accessToken}`)
  // return API(`Bearer ${token.accessToken}`)
  return API(token)
    .get("user/profile")
    .then(success)
    .catch(fail)
}


// data = { token: credentialResponse.credential }
export const googleLogin = (data, success, fail) => {
  return API(null)
    .post("auth/google")
    .then(success)
    .catch(fail)
}


// data = { newValue : String }
export const patchNickname = (token, data, success, fail) => {
  return API(token)
    .patch("user/nickname", data)
    .then(success)
    .catch(fail)
}


// data = { newValue : String }
export const patchPassword = (token, data, success, fail) => {
  return API(token)
    .patch("user/pw", data)
    .then(success)
    .catch(fail)
}


// 수정해야 함
// header "Authorization": Bearer {access token}, "Content-Type": "multipart/form-data"
export const postProfileImage = (token, success, fail) => {
  return API(token)
    .post("user/img", data)
    .then(success)
    .catch(fail)
}


// data = { email: String, name: String }
export const findId = (data, success, fail) => {
  return API(null)
    .post("user/find-id", data)
    .then(success)
    .catch(fail)
}


// data = { userId: String, email: String }
export const findPw = (data, success, fail) => {
  return API(null)
    .post("user/find-pw", data)
    .then(success)
    .catch(fail)
}