import API from "../utils/Api";


export const startSpeech = async (token, data, success, fail) => {
  return await API(token)
    .get("speech/start", data)
    .then(success)
    .catch(fail)
}


export const endSpeech = async (token, data, success, fail) => {
  return await API(token)
    .get("speech/end", data)
    .then(success)
    .catch(fail)
}


export const assessSpeech = async (token, data, success, fail) => {
  return await API(token)
    .get("speech/assess", data)
    .then(success)
    .catch(fail)
}


export const postFeedback = async (token, data, success, fail) => {
  return await API(token)
    .get("speech/fb", data)
    .then(success)
    .catch(fail)
}


export const postComment = async (token, data, success, fail) => {
  return await API(token)
    .get("speech/comment", data)
    .then(success)
    .catch(fail)
}
