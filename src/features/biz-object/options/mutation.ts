import { mutationOptions } from '@tanstack/react-query';
import { ODATA_SERVICE } from '@/app-constant';
import { axiosInstance } from '@/libs/axios-instance';
import { fetchCsrfToken, getCsrfToken } from '@/libs/helpers';
import { API } from '../constants';
import type { CreateBizObjectPayload, CreateBizObjectResponse } from '../types';

type CreateBizObjectMutationParams = {
  onSuccess?: (data: CreateBizObjectResponse) => void;
  onError?: (error: Error) => void;
};

export function createBizObjectMutationOptions({ onSuccess, onError }: CreateBizObjectMutationParams) {
  return mutationOptions({
    mutationFn: async (payload: CreateBizObjectPayload) => {
      let token = getCsrfToken();

      if (!token) {
        await fetchCsrfToken();
        token = getCsrfToken();
      }

      const res = await axiosInstance.post<CreateBizObjectResponse>(
        `${ODATA_SERVICE.BIZ}${API.endpoint}?sap-client=324`,
        payload,
        {
          headers: {
            'accept-language': 'en',
            ...(token ? { 'x-csrf-token': token } : {}),
          },
        },
      );

      return res;
    },
    onSuccess,
    onError,
  });
}