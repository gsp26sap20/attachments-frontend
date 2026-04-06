import { keepPreviousData, queryOptions } from '@tanstack/react-query';
import { ODATA_SERVICE } from '@/app-constant';
import { axiosInstance } from '@/libs/axios-instance';
import { fetchCsrfToken, getCsrfToken } from '@/libs/helpers';
import { API } from '../constants';
import type { ConfigFileListParams, ConfigFileListResponse } from '../types';

export function getConfigFilesQueryOptions(params: ConfigFileListParams) {
  return queryOptions({
    queryKey: ['config-files', params],
    queryFn: async () => {
      let token = getCsrfToken();

      if (!token) {
        await fetchCsrfToken(ODATA_SERVICE.CONFIG_FILE);
        token = getCsrfToken();
      }

      const res = await axiosInstance.get<ConfigFileListResponse>(`${ODATA_SERVICE.CONFIG_FILE}${API.endpoint}`, {
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
