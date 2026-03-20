import { API } from "../constants";
import { ODATA_SERVICE } from "@/app-constant";
import { axiosInstance } from "@/libs/axios-instance";
import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import type { AttachmentListParams, AttachmentListResponse } from "../types";
import type {
  AttachmentDetailParams,
  AttachmentDetailResponse,
} from "../types";

export function getAttachmentsQueryOptions(params: AttachmentListParams) {
  return queryOptions({
    queryKey: ["attachments", params],
    queryFn: () => {
      const res = axiosInstance.get<AttachmentListResponse>(
        `${ODATA_SERVICE.ATTACHMENT}/${API.endpoint}`,
        {
          params,
        },
      );
      return res;
    },
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
}

export function getAttachmentDetailQueryOptions(
  id: string,
  params: AttachmentDetailParams,
) {
  return queryOptions({
    queryKey: ["attachments", id, params],
    queryFn: () => {
      const res = axiosInstance.get<AttachmentDetailResponse>(
        `${ODATA_SERVICE.ATTACHMENT}/${API.endpoint}(${id})`,
        {
          params,
        },
      );
      return res;
    },
    enabled: !!id,
    staleTime: 2 * 60 * 1000, // 2 minutes
    gcTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
    placeholderData: keepPreviousData,
  });
}
