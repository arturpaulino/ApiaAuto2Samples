import axios from "axios";
import { API_ENDPOINT } from "../constants/rest";

const api = axios.create({
  baseURL: API_ENDPOINT,
});

export default api;
