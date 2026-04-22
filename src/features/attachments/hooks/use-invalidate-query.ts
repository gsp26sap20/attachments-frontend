import { QUERY_KEYS } from '../constants';
import { useQueryClient, type QueryKey } from '@tanstack/react-query';

export function useInvalidateAttachmentQuery() {
  const queryClient = useQueryClient();

  const invalidateQuery = function (queryKey: QueryKey) {
    return queryClient.invalidateQueries({ queryKey });
  };

  return {
    invalidateAttachmentList: () => invalidateQuery(QUERY_KEYS.attachmentList()),
    invalidateAttachmentDetail: (fileId: string) => invalidateQuery(QUERY_KEYS.attachmentDetail(fileId)),
    invalidateAttachmentVersions: (fileId: string) => invalidateQuery(QUERY_KEYS.attachmentVersions(fileId)),
    invalidateAttachmentAudit: (fileId: string) => invalidateQuery(QUERY_KEYS.attachmentAudit(fileId)),
    invalidateAttachmentVersionDetail: (fileId: string, versionNo: string) =>
      invalidateQuery(QUERY_KEYS.attachmentVersionDetail(fileId, versionNo)),
    invalidateAttachmentTitle: (fileId: string) => invalidateQuery(QUERY_KEYS.attachmentTitle(fileId)),
    invalidateAttachmentCurrentVersion: (fileId: string) =>
      invalidateQuery(QUERY_KEYS.attachmentCurrentVersion(fileId)),
    invalidateAttachmentBoLinks: (fileId: string) => invalidateQuery(QUERY_KEYS.attachmentBoLinks(fileId)),
  };
}
