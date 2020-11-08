import axios, { AxiosInstance } from "axios";
import { configure } from "axios-hooks";

const DEFAULT_URL = process.env.REACT_APP_API_URL;

const api: AxiosInstance = axios.create({
  baseURL: DEFAULT_URL,
});

configure({ axios: api });

export default api;
