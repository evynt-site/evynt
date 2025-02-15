import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: true, // ✅ Ensures cookies are sent/received
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  }
});

export default instance;
