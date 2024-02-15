import API from "../utils/Api";


export const getSentence = async (token, success, fail) => {
  return await API(token)
    .get("sentence")
    .then(success)
    .catch(fail)
}


// data = { sentence: String }
export const postSentence = async (token, data, success, fail) => {
    return await API(token)
      .post("sentence", data)
      .then(success)
      .catch(fail)
}


export const deleteSentence = async (token, sentenceId, success, fail) => {
    return await API(token)
      .delete(`sentence/${sentenceId}`)
      .then(success)
      .catch(fail)
}
  