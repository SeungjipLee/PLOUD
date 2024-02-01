import API from "../utils/Api";


export const getArticleList = (token, data, success, fail) => {
  return API(token)
    .post("article", data)
    .then(success)
    .catch(fail)
}


export const createArticle = (token, data, success, fail) => {
  return API(token)
    .post("article/create", data)
    .then(success)
    .catch(fail)
}


export const getArticleDetail = (token, articleId, success, fail) => {
  return API(token)
    .get(`article/${articleId}`)
    .then(success)
    .catch(fail)
}


export const putArticle = (token, articleId, data, success, fail) => {
  return API(token)
    .put(`article/${articleId}`, data)
    .then(success)
    .catch(fail)
}


export const deleteArticle = (token, articleId, success, fail) => {
  return API(token)
    .delete(`article/${articleId}`)
    .then(success)
    .catch(fail)
}


export const likeArticle = (token, articleId, success, fail) => {
  return API(token)
    .get(`article/like/${articleId}`)
    .then(success)
    .catch(fail)
}


export const getComment = (token, articleId, success, fail) => {
  return API(token)
    .get(`comment/${articleId}`)
    .then(success)
    .catch(fail)
}


export const postComment = (token, data, articleId, success, fail) => {
  return API(token)
    .get("comment", data)
    .then(success)
    .catch(fail)
}


export const deleteComment = (token, commentId, success, fail) => {
  return API(token)
    .delete(`comment/${commentId}`)
    .then(success)
    .catch(fail)
}
