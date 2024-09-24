import { authSelectors } from '@/modules/auth/auth.store';
import axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';

const api: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const user = authSelectors.user();
    if (user) {
      config.headers['Authorization'] = `Bearer ${user.token}`;
    }

    return config;
  },
  (error) => Promise.reject(new Error(error)),
);

api.interceptors.response.use(
  async (response) => {
    // handle logic ...
    
    return response;
  },
  async (error) => {
    // handle logic ...

    return Promise.reject(new Error(error));
  },
);

export default api;
