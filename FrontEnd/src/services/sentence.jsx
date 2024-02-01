import API from "../utils/Api";


export const getSentence = (token, success, fail) => {
  return API(token)
    .get("sentence")
    .then(success)
    .catch(fail)
}


// data = { sentence: String }
export const postSentence = (token, data, success, fail) => {
    return API(token)
      .post("sentence", data)
      .then(success)
      .catch(fail)
}


export const deleteSentence = (token, sentenceId, success, fail) => {
    return API(token)
      .delete(`sentence/${sentenceId}`)
      .then(success)
      .catch(fail)
}
  