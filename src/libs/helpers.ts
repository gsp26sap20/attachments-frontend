import { axiosInstance } from './axios-instance';
import { ODATA_BASE_URL, ODATA_SERVICE } from '@/app-constant';

export function getCsrfToken() {
  return sessionStorage.getItem('x-csrf-token');
}

export function fetchCsrfToken() {
  return axiosInstance.get(`${ODATA_BASE_URL}${ODATA_SERVICE.ATTACHMENT}/$metadata`, {
    headers: {
      'x-csrf-token': 'Fetch',
    },
  });
}
