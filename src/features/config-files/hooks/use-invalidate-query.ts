import { QUERY_KEYS } from '../constants';
import { useQueryClient, type QueryKey } from '@tanstack/react-query';

export function useInvalidateConfigFileQuery() {
  const queryClient = useQueryClient();

  const invalidateQuery = function (queryKey: QueryKey) {
    return queryClient.invalidateQueries({ queryKey });
  };

  return {
    invalidateConfigFileList: () => invalidateQuery(QUERY_KEYS.configFileList()),
  };
}
