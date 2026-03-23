import { ODATA_SERVICE } from '@/app-constant';
import { axiosInstance } from './axios-instance';

export function getCsrfToken() {
  return sessionStorage.getItem('x-csrf-token');
}

export function fetchCsrfToken() {
  return axiosInstance.get(`${ODATA_SERVICE.ATTACHMENT}/$metadata`, {
    headers: {
      'x-csrf-token': 'Fetch',
    },
  });
}
