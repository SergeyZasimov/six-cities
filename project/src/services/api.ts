import axios, { AxiosInstance } from 'axios';
import { BACKEND_URL, REQUEST_TIMEOUT } from '../const';

export const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });
  return api;
};
