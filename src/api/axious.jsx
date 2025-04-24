import axios from "axios";
import { API_URL } from "./config";

const instance = axios.create({
  baseURL: API_URL,
  params: {
    api_key: import.meta.env.VITE_API_KEY,
    language: "ko-KR",
  },
});

export default instance;
