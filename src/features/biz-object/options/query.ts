import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { ODATA_SERVICE } from "@/app-constant";
import { axiosInstance } from "@/libs/axios-instance";
import { fetchCsrfToken, getCsrfToken } from "@/libs/helpers";
import { API } from "../constants";
import type {
  BizObjectLinkedAttachmentParams,
  BizObjectLinkedAttachmentResponse,
  BizObjectListParams,
  BizObjectListResponse,
} from "../types";

export function getBizObjectsQueryOptions(params: BizObjectListParams) {
  return queryOptions({
    queryKey: ["biz-objects", params],
    queryFn: () => {
      const res = axiosInstance.get<BizObjectListResponse>(
        `${ODATA_SERVICE.BIZ}${API.endpoint}`,
        {
          params,
        },
      );
      return res;
    },
    staleTime: 2 * 60 * 1000,
    gcTime: 5 * 60 * 1000,
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
}

export function getBizObjectLinkedAttachmentsQueryOptions(boId: string, params: BizObjectLinkedAttachmentParams) {
  return queryOptions({
    queryKey: ["biz-object-linked-attachments", boId, params],
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
            ...(token ? { "x-csrf-token": token } : {}),
            "accept-language": "en",
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