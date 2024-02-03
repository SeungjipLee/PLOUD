import API from "../utils/Api";


export const getArticleList = async (token, data, success, fail) => {
  return await API(token)
    .post("article", data)
    .then(success)
    .catch(fail)
}


export const createArticle = async (token, data, success, fail) => {
  return await API(token)
    .post("article/create", data)
    .then(success)
    .catch(fail)
}


export const getArticleDetail = async (token, articleId, success, fail) => {
  return await API(token)
    .get(`article/${articleId}`)
    .then(success)
    .catch(fail)
}


export const putArticle = async (token, articleId, data, success, fail) => {
  return await API(token)
    .put(`article/${articleId}`, data)
    .then(success)
    .catch(fail)
}


export const deleteArticle = async (token, articleId, success, fail) => {
  return await API(token)
    .delete(`article/${articleId}`)
    .then(success)
    .catch(fail)
}


export const likeArticle = async (token, articleId, success, fail) => {
  return await API(token)
    .get(`article/like/${articleId}`)
    .then(success)
    .catch(fail)
}


export const getComment = async (token, articleId, success, fail) => {
  return await API(token)
    .get(`comment/${articleId}`)
    .then(success)
    .catch(fail)
}


export const postComment = async (token, data, articleId, success, fail) => {
  return await API(token)
    .get("comment", data)
    .then(success)
    .catch(fail)
}


export const deleteComment = async (token, commentId, success, fail) => {
  return await API(token)
    .delete(`comment/${commentId}`)
    .then(success)
    .catch(fail)
}
