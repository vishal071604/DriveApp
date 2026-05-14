import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000/api", // backend URL
  withCredentials: true, // 🔥 important for cookies (login auth)
});

export default API;