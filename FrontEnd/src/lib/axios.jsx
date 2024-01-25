import axios from 'axios'

const DOMAIN = "http://localhost:8000"
axios.defaults.withCredentials = true // 쿠키 데이터를 전송받기 위헤
export const request = (method, url, data) => {
    return axios({
        method,
        url: DOMAIN + url,
        data,
    })
    .then((res) => res.data)
    .catch((error) => console.log(error))
}