import { axiosInstance } from '../axios-instance';
import { useAuthStore } from '@/stores/auth-store';

function getCsrfToken() {
  return useAuthStore.getState().csrfToken;
}

function setCsrfToken(csrfToken: string) {
  useAuthStore.getState().setCsrfToken(csrfToken);
}

function clearCsrfToken() {
  useAuthStore.getState().setCsrfToken(null);
}

function fetchCsrfToken(serviceRoot: string) {
  return axiosInstance.get(`${serviceRoot}/$metadata`, {
    headers: {
      'x-csrf-token': 'Fetch',
    },
  });
}

export { getCsrfToken, setCsrfToken, clearCsrfToken, fetchCsrfToken };
