import { requestHandler } from './interceptor';
import axios, { AxiosInstance } from 'axios';

let api: AxiosInstance;

const DEFAULT_URL = process.env.REACT_APP_API_URL || "/api";

const instanceApi = () => {

  if (!api) {
    api = axios.create({
      baseURL: DEFAULT_URL
    })
  }
  api = requestHandler(api);

  return api;
}

export default instanceApi();