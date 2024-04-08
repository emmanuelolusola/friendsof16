import axios from "axios";
const BASE_URL = "https://friendsof16api.up.railway.app/api";

const instance = axios.create({
  baseURL: BASE_URL,
});

export default instance;
