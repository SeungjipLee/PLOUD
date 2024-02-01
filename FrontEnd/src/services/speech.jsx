import API from "../utils/Api";


export const startSpeech = (token, data, success, fail) => {
  return API(token)
    .get("speech/start", data)
    .then(success)
    .catch(fail)
}


export const endSpeech = (token, data, success, fail) => {
    return API(token)
      .get("speech/end", data)
      .then(success)
      .catch(fail)
}


export const assessSpeech = (token, data, success, fail) => {
    return API(token)
      .get("speech/assess", data)
      .then(success)
      .catch(fail)
}


export const postFeedback = (token, data, success, fail) => {
    return API(token)
      .get("speech/fb", data)
      .then(success)
      .catch(fail)
}


export const postComment = (token, data, success, fail) => {
    return API(token)
      .get("speech/comment", data)
      .then(success)
      .catch(fail)
}
