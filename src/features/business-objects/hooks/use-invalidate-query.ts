import { QUERY_KEYS } from '../constants';
import { useQueryClient, type QueryKey } from '@tanstack/react-query';

export function useInvalidateBizObjectQuery() {
  const queryClient = useQueryClient();

  const invalidateQuery = function (queryKey: QueryKey) {
    return queryClient.invalidateQueries({ queryKey });
  };

  return {
    invalidateBizObjectList: () => invalidateQuery(QUERY_KEYS.bizObjectList()),
    invalidateBizObjectDetail: (boId: string) => invalidateQuery(QUERY_KEYS.bizObjectDetail(boId)),
    invalidateBizObjectAttachmentLinks: (boId: string) => invalidateQuery(QUERY_KEYS.bizObjectAttachmentLinks(boId)),
  };
}
