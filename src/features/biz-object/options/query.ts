import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { ODATA_SERVICE } from "@/app-constant";
import { axiosInstance } from "@/libs/axios-instance";
import { API } from "../constants";
import type { BizObjectListParams, BizObjectListResponse } from "../types";

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