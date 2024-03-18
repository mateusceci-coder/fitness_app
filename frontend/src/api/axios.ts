import axios from "axios";

const TOKEN = sessionStorage.getItem("auth_token");

export const api = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  headers: {
    Authorization: `Token ${TOKEN}`,
  },
});
