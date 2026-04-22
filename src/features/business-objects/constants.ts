export const API = {
  endpoint: '/BusinessObjects',
  linkAttachmentEndpoint: (boId: string) => `/BusinessObjects(BoId=${boId})/_Links`,
};

export const MUTATION_API = {
  linkAttachment: () => `/BusinessObjectAttachmentLinks`,
  unlinkAttachment: (boId: string, fileId: string) => `/BusinessObjectAttachmentLinks(BoId=${boId},FileId=${fileId})`,
};

export const BO_TYPES = ['PORDER', 'SORDER', 'INVOICE'] as const;
export const BO_STATUS = ['NEW', 'INPR', 'COMP'] as const;

export type BoType = (typeof BO_TYPES)[number];
export type BoStatus = (typeof BO_STATUS)[number];

export const QUERY_KEYS = {
  bizObjectList: () => ['business-objects', 'list'],
  bizObjectListWithParams: (params: unknown) => ['business-objects', 'list', params],
  bizObjectDetail: (boId: string) => ['business-objects', boId, 'detail'],
  bizObjectAttachmentLinks: (boId: string) => ['business-objects', boId, 'attachments'],
  // prettier-ignore
  bizObjectAttachmentLinksWithParams: (boId: string, params: unknown) => ['business-objects', boId, 'attachments', params],
};
