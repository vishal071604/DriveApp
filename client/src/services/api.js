import axios from "axios";

const API_URL =
    process.env.REACT_APP_API_URL ||
    "http://localhost:3000";

const API = axios.create({
    baseURL: `${API_URL}/api`,
    withCredentials: true
});

export default API;