import API from "../utils/Api";

export const getSpeechList = async (token, success, fail) => {
    return await API(token)
    .post("record")
    .then(success)
    .cathch(fail)
};