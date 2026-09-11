import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:3000/api", // backend URL
  withCredentials: true, // 🔥 important for cookies (login auth)
});

export default API;