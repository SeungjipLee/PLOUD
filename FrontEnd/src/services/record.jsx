import API from "../utils/Api"


export const getRecordResult = (token, speechId, success, fail) => {
    return API(token)
      .get(`record/${speechId}`)
      .then(success)
      .catch(fail)
}


export const recordResultList = (token, data, success, fail) => {
    return API(token)
      .post("record", data)
      .then(success)
      .catch(fail)
}


export const deleteRecord = (token, success, fail) => {
    return API(token)
      .delete("record")
      .then(success)
      .catch(fail)
}


export const RecordScore = (token, success, fail) => {
    return API(token)
      .post("record/score")
      .then(success)
      .catch(fail)
}