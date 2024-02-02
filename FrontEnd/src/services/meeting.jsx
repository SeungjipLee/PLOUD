import API from "../utils/Api";


// { categoryId: int, word: String }
export const getMeetingList = (token, data, success, fail) => {
  return API(token)
    .post("meeting/list", data)
    .then(success)
    .catch(fail)
}


// { sessionId: String }
export const getMeetingDetail = (token, data, success, fail) => {
  return API(token)
    .post("meeting/detail", data)
    .then(success)
    .catch(fail)
}


// { managerId: String, categoryId: int, title: String. maxPeople: int, 
// isPrivate: Boolean , password: String }
export const createMeeting = (token, data, success, fail) => {
  return API(token)
    .post("meeting/create", data)
    .then(success)
    .catch(fail)
}


// { userId: String, sessionId: String, token: String }
export const leaveMeeting = (token, data, success, fail) => {
  return API(token)
    .post("meeting/leave", data)
    .then(success)
    .catch(fail)
}


// { userId: String, sessionId: String, password: String }
export const joinMeeting = (token, data, success, fail) => {
  return API(token)
    .post("meeting/join", data)
    .then(success)
    .catch(fail)
}