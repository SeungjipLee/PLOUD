import axios from 'axios'

const API = axios.create({
    baseURL: "",
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
})

export default API

/*
    withCredentials : 기본값을 true값으로 변경하면,CORS 요청을 허용하게되고, 쿠키값을 전달 할 수 있게 됨

 */