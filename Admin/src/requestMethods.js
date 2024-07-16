import axios from "axios";

const BASE_URL = process.env.REACT_APP_BACKEND_URL
const user = JSON.parse(localStorage.getItem("persist:root")) ?
    JSON.parse(JSON.parse(localStorage.getItem("persist:root")).user) : ''
const TOKEN = user.userToken;

export const publicRequest = axios.create({
    baseURL: BASE_URL,
})

export const userRequest = axios.create({
    baseURL: BASE_URL,
    headers: {
        token: TOKEN
    }
})