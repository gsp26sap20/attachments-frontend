import qs from 'qs';
import axios, { type AxiosRequestConfig } from 'axios';
import { ODATA_BASE_URL, ODATA_SAP_CLIENT } from '@/app-constant';
import { setCsrfToken, clearCsrfToken } from './helpers/csrf-token';

declare module 'axios' {
  export interface AxiosRequestConfig {
    requiresAuth?: boolean;
  }
}

const api = axios.create({
  baseURL: ODATA_BASE_URL,
  timeout: 30000,
  paramsSerializer: (params) =>
    qs.stringify(params, {
      encode: false,
    }),
});

api.interceptors.request.use(
  (config) => {
    config.headers = config.headers ?? {};
    if (!config.headers['Content-Type'] && config.data && !(config.data instanceof FormData)) {
      config.headers['Content-Type'] = 'application/json';
    }
    config.params = {
      ...(config.params ?? {}),
      'sap-client': ODATA_SAP_CLIENT,
    };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

api.interceptors.response.use(
  (response) => {
    const token = response?.headers?.['x-csrf-token'];
    if (token) {
      setCsrfToken(token);
    }
    return response.data;
  },
  async (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 403) {
      const message = String(error.response.headers?.['x-csrf-token'] ?? '');
      if (message.toLowerCase() === 'required') {
        clearCsrfToken();
      }
    }
    return Promise.reject(error);
  },
);

type HttpClient = {
  get<T = unknown>(_url: string, _config?: AxiosRequestConfig): Promise<T>;
  delete<T = unknown>(_url: string, _config?: AxiosRequestConfig): Promise<T>;
  post<T = unknown, D = unknown>(_url: string, _data?: D, _config?: AxiosRequestConfig): Promise<T>;
  put<T = unknown, D = unknown>(_url: string, _data?: D, _config?: AxiosRequestConfig): Promise<T>;
  patch<T = unknown, D = unknown>(_url: string, _data?: D, _config?: AxiosRequestConfig): Promise<T>;
};

export const axiosInstance: HttpClient = {
  get: (url, config) => api.get(url, config),
  delete: (url, config) => api.delete(url, config),
  post: (url, data, config) => api.post(url, data, config),
  put: (url, data, config) => api.put(url, data, config),
  patch: (url, data, config) => api.patch(url, data, config),
};
