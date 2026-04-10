export const API = {
  endpoint: '/BizObject',
  linkAttachmentEndpoint: (boId: string) => `/BizObject(BoId=${boId})/_Links`,
  select:
    'BoId,BoType,BoTitle,Status,Erdat,Erzet,Ernam,Aedat,Aezet,Aenam,__EntityControl/Deletable,__EntityControl/Updatable,__OperationControl/link_attachment',
};

export const MUTATION_API = {
  linkAttachment: (fileId: string) => `/Attachment(FileId=${fileId})/SAP__self.LinkToBO?sap-client=324`,
  unlinkAttachment: (boId: string, fileId: string) =>
    `/BizObjectAttachmentLink(BoId=${boId},FileId=${fileId})?sap-client=324`,
};
