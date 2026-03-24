import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import { ODATA_SERVICE } from '@/app-constant';
import { axiosInstance } from '@/libs/axios-instance';
import { fetchCsrfToken, getCsrfToken } from '@/libs/helpers';
import { API } from '../constants';
import type { AuthUserListParams, AuthUserListResponse } from '../types';

export function getAuthUsersQueryOptions(params: AuthUserListParams) {
  return queryOptions({
    queryKey: ['auth-users', params],
    queryFn: async () => {
      let token = getCsrfToken();

      if (!token) {
        await fetchCsrfToken(ODATA_SERVICE.AUTH);
        token = getCsrfToken();
      }

      const res = await axiosInstance.get<AuthUserListResponse>(`${ODATA_SERVICE.AUTH}${API.endpoint}`, {
        params,
        headers: {
          ...(token ? { 'x-csrf-token': token } : {}),
          'accept-language': 'en',
        },
      });

      return res;
    },
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
}
