import axios from 'axios'

const DOMAIN = "http://localhost:8000"

const API = (token) => axios.create({
    baseURL: DOMAIN+"/api",
    headers: {
        Authorization: token,
        withCredentials: true,
    }
})

export default API