import axios, { AxiosInstance } from "axios";
import { configure } from "axios-hooks";
import { useLogin } from "../utils/login";

const DEFAULT_URL = process.env.REACT_APP_API_URL || "/api/v1";

const api: AxiosInstance = axios.create({
  baseURL: DEFAULT_URL,
});

api.interceptors.request.use(async (config: any) => {
  const { getToken } = useLogin();
  const loginToken = getToken();
  if (loginToken) {
    config.headers.Authorization = `Bearer ${loginToken}`;
  }
  return config;
});

configure({ axios: api });

export default api;
