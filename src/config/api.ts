import { requestHandler } from './interceptor';
import axios, { AxiosStatic } from 'axios';

let api: AxiosStatic;
const DEFAULT_URL = "/api";

const instanceApi = () => {

  if (!api) {
    axios.create({
      baseURL: process.env.API_URL || DEFAULT_URL
    })
  }

  api = requestHandler(api);

  return api;
}

export default instanceApi();