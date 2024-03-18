import axios from "axios";

const TOKEN = sessionStorage.getItem("auth_token");

export const api = axios.create({
  baseURL: "https://fitness-app-y9fc.onrender.com/",
  headers: {
    Authorization: `Token ${TOKEN}`,
  },
});
