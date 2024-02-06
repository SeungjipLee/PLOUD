import API from "../utils/Api";

/**
 * @param data title, personal, categoryId, sessionId, scriptId
 * @returns speechId
 */
export const startSpeech = async (token, data, success, fail) => {
  console.log(token);
  return await API(token)
    .post("speech/start", data)
    .then(success)
    .catch(fail)
}

/**
 * @param data sessionId, speechId, decibels[]
 * @returns ok
 */
export const endSpeech = async (token, data, success, fail) => {
  console.log(token);
  return await API(token)
    .post("speech/end", data)
    .then(success)
    .catch(fail)
}

/**
 * @param {FormData} formData audioFile, speechId, !isRecording
 * @returns clearity
 */
export const assessSpeech = async (token, formData, success, fail) => {
  return await API(token)
    .post("speech/assess", formData)
    .then(success)
    .catch(fail)
}

/**
 * @param data sessionId, content
 * @returns ok
 */
export const postFeedback = async (token, data, success, fail) => {
  return await API(token)
    .post("speech/fb", data)
    .then(success)
    .catch(fail)
}

/**
 * @param data speechId, comment
 * @returns ok
 */
export const postComment = async (token, data, success, fail) => {
  return await API(token)
    .post("speech/comment", data)
    .then(success)
    .catch(fail)
}
