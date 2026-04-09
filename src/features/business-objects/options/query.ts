import { infiniteQueryOptions, keepPreviousData, queryOptions } from '@tanstack/react-query';
import { ODATA_SERVICE } from '@/app-constant';
import { axiosInstance } from '@/libs/axios-instance';
import { fetchCsrfToken, getCsrfToken } from '@/libs/helpers';
import { API } from '../constants';
import type { BizObjectDetailParams, BizObjectItem } from '../types';
import type { BizObjectListParams, BizObjectListResponse } from '../types';
import type { BizObjectLinkedAttachmentParams, BizObjectLinkedAttachmentResponse } from '../types';

export function bizObjectsQueryOptions(params: BizObjectListParams) {
  return infiniteQueryOptions({
    queryKey: ['biz-objects', params],
    initialPageParam: params.$skip ?? 0,
    queryFn: ({ pageParam }) => {
      const res = axiosInstance.get<BizObjectListResponse>(`${ODATA_SERVICE.BIZ}${API.endpoint}`, {
        params: {
          ...params,
          $skip: pageParam,
          $top: params.$top,
        },
      });
      return res;
    },
    getNextPageParam: (lastPage, allPages) => {
      const totalCount = Number(lastPage['@odata.count'] ?? 0);
      const fetchedCount = allPages.reduce((total, page) => total + page.value.length, 0);
      const pageSize = params.$top ?? lastPage.value.length;

      if (fetchedCount >= totalCount || lastPage.value.length < pageSize) {
        return undefined;
      }

      return (params.$skip ?? 0) + fetchedCount;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
}

export function bizObjectDetailQueryOptions(boId: string, params: BizObjectDetailParams) {
  return queryOptions({
    queryKey: ['biz-objects', boId, params],
    queryFn: () => {
      const res = axiosInstance.get<BizObjectItem>(`${ODATA_SERVICE.BIZ}${API.endpoint}(${boId})`, {
        params,
      });
      return res;
    },
    enabled: !!boId,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 2 * 60 * 1000, // 2 minutes
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
}

export function getBizObjectLinkedAttachmentsQueryOptions(boId: string, params: BizObjectLinkedAttachmentParams) {
  return queryOptions({
    queryKey: ['biz-object-linked-attachments', boId, params],
    queryFn: async () => {
      let token = getCsrfToken();

      if (!token) {
        await fetchCsrfToken(ODATA_SERVICE.BIZ);
        token = getCsrfToken();
      }

      const res = await axiosInstance.get<BizObjectLinkedAttachmentResponse>(
        `${ODATA_SERVICE.BIZ}${API.endpoint}(BoId=${boId})`,
        {
          params,
          headers: {
            ...(token ? { 'x-csrf-token': token } : {}),
            'accept-language': 'en',
          },
        },
      );

      return res;
    },
    enabled: !!boId,
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
}
