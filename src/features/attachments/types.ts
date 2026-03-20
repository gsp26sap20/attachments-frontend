export type AttachmentListItem = {
  FileId: string;
  Title: string;
  CurrentVersion: string;
  IsActive: boolean;
  Erdat: string;
  Ernam: string;
  __EntityControl: {
    Deletable: boolean;
    Updatable: boolean;
  };
};

export type AttachmentListResponse = {
  value: AttachmentListItem[];
  "@odata.count": string;
};

export type AttachmentListParams = {
  "sap-client": number;
  $count: boolean;
  $select: string;
  $skip: number;
  $top: number;
  $filter?: string;
};

export type AttachmentDetailParams = {
  "sap-client": number;
  $select: string;
  $expand?: string;
};

export type AttachmentDetailResponse = {
  FileId: string;
  Title: string;
  CurrentVersion: string;
  IsActive: boolean;
  Erdat: string;
  Ernam: string;
  __EntityControl: {
    Deletable: boolean;
    Updatable: boolean;
  };
  _CurrentVersion?: {
    FileName: string;
    MimeType: string;
    FileContent: string;
  };
};
