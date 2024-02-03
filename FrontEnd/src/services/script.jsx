import API from "../utils/Api";


export const getCategoryList = async (token, success, fail) => {
  return await API(token)
    .get("script/list")
    .then(success)
    .catch(fail)
}


export const getScriptList = async (token, categoryId, success, fail) => {
  return await API(token)
    .get(`script/list/${categoryId}`)
    .then(success)
    .catch(fail)
  }


export const getScriptDetail = async (token, scriptId, success, fail) => {
  return await API(token)
    .get(`script/list/${scriptId}`)
    .then(success)
    .catch(fail)
}


//{ speechId: "int, 발표 번호", categoryId: "int, 카테고리 번호", title: "String, 대본 제목", 
// videoUrl: "String, 발표 원본 영상", content: "String, 대본 내용" }
export const registScript = async (token, data, success, fail) => {
  return await API(token)
    .post("script/regist", data)
    .then(success)
    .catch(fail)
}


// { categoryId: "int, 카테고리 번호", title: "String, 대본 제목", 
// videoUrl: "String, 발표 원본 영상", content: "String, 대본 내용" }
export const putScript = async (token, data, scriptId, success, fail) => {
  return await API(token)
    .put(`script/${scriptId}`, data)
    .then(success)
    .catch(fail)
}


export const deleteScript = async (token, scriptId, success, fail) => {
  return await API(token)
    .delete(`script/${scriptId}`)
    .then(success)
    .catch(fail)
}