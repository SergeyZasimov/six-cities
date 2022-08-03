import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import { BACKEND_URL, REQUEST_TIMEOUT } from '../const';
import { getToken } from './token';
import { StatusCodes } from 'http-status-codes';
import { toast } from 'react-toastify';

const errorStatusCodeSet = new Set([
  StatusCodes.BAD_REQUEST,
  StatusCodes.UNAUTHORIZED,
  StatusCodes.NOT_FOUND,
]);

const displayError = (response: AxiosResponse) =>
  errorStatusCodeSet.has(response.status);

export const createApi = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  api.interceptors.request.use((config: AxiosRequestConfig) => {
    const token = getToken();

    if (token) {
      config.headers['x-token'] = token;
    }

    return config;
  });

  api.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      if (error.response && displayError(error.response)) {
        toast.warn(error.response.data.error);
      }
    },
  );

  return api;
};
