export const API = {
  endpoint: "/Attachments",
  select:
    "CurrentVersion,Erdat,Ernam,FileId,IsActive,Title,__EntityControl/Deletable,__EntityControl/Updatable",
  versionsEndpoint: (fileId: string) => `/Attachments(${fileId})/_Versions`,
  auditEndpoint: (fileId: string) => `/Attachments(${fileId})/_Audit`,
};
