import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:3000", // พอร์ต backend เธอ
});

export default API;