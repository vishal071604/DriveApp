import axios from "axios";

const configuredUrl =
  process.env.REACT_APP_API_URL || "http://localhost:3000";

const normalizedUrl = configuredUrl.replace(/\/$/, "");

const API = axios.create({
  baseURL: normalizedUrl.endsWith("/api")
    ? normalizedUrl
    : `${normalizedUrl}/api`,
  withCredentials: true,
});

export default API;