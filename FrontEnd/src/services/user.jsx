import API from "../utils/Api";


// data = { userId: String, password: String }
export const login = async (data, success, fail) => {
  return await API(null)
    .post("user/login", data)
    .then(success)
    .catch(fail)
}


export const signup = async (data, success, fail) => {
  return await API(null)
    .post("user/signup", data)
    .then(success)
    .catch(fail);
};


export const checkId = async (data, success, fail) => {
  return await API(null)
    .post("user/userId", data)
    .then(success)
    .catch(fail)
}


export const checkEmail = async (data, success, fail) => {
  return await API(null)
    .post("user/email", data)
    .then(success)
    .catch(fail)
}


export const verifyEmail = async (data, success, fail) => {
  return await API(null)
    .post("user/verify-email", data)
    .then(success)
    .catch(fail)
}


// data = { nickname: String }
export const checkNickname = async (data, success, fail) => {
  return await API(null)
    .post("user/nickname", data)
    .then(success)
    .catch(fail)
}


export const getProfile = async (token, success, fail) => {
  return await API(token)
    .get("user/profile")
    .then(success)
    .catch(fail)
}


// data = { token: credentialResponse.credential }
export const googleLogin = async (data, success, fail) => {
  return await API(null)
    .post("auth/google", data)
    .then(success)
    .catch(fail)
}


// data = { newValue : String }
export const patchNickname = async (token, data, success, fail) => {
  return await API(token)
    .patch("user/nickname", data)
    .then(success)
    .catch(fail)
}


// data = { oldValue: String, newValue : String }
export const patchPassword = async (token, data, success, fail) => {
  return await API(token)
    .patch("user/pw", data)
    .then(success)
    .catch(fail)
}


// 수정해야 함
// header "Authorization": Bearer {access token}, "Content-Type": "multipart/form-data"
export const postProfileImage = async (token, success, fail) => {
  return await API(token)
    .post("user/img", data)
    .then(success)
    .catch(fail)
}


// data = { email: String, name: String }
export const findId = async (data, success, fail) => {
  return await API(null)
    .post("user/find-id", data)
    .then(success)
    .catch(fail)
}


// data = { userId: String, email: String }
export const findPw = async (data, success, fail) => {
  return await API(null)
    .post("user/find-pw", data)
    .then(success)
    .catch(fail)
}

// data = { userNickname: String, content: String }
export const reportUser = async (token, data, success, fail) => {
  return await API(token)
    .post("complain", data)
    .then(success)
    .catch(fail)
}