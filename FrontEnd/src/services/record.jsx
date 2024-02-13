import API from "../utils/Api"


export const getRecordResult = async (token, speechId, success, fail) => {
    return await API(token)
      .get(`record/${speechId}`)
      .then(success)
      .catch(fail)
}


export const recordResultList = async (token, data, success, fail) => {
    return await API(token)
      .post("record", data)
      .then(success)
      .catch(fail)
}


export const deleteRecord = async (token, success, fail) => {
    return await API(token)
      .delete("record")
      .then(success)
      .catch(fail)
}


export const RecordScore = async (token, success, fail) => {
    return await API(token)
      .post("record/score")
      .then(success)
      .catch(fail)
}