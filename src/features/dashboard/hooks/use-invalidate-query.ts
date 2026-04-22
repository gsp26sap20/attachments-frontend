import { QUERY_KEYS } from '../constants';
import { useQueryClient, type QueryKey } from '@tanstack/react-query';

export function useInvalidateDashboardQuery() {
  const queryClient = useQueryClient();

  const invalidateQuery = function (queryKey: QueryKey) {
    return queryClient.invalidateQueries({ queryKey });
  };

  return {
    invalidateDashboard: () => invalidateQuery(QUERY_KEYS.dashboard()),
  };
}
