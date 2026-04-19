import type { BizObjectItem } from '@/features/business-objects/types';

export type AttachmentListItem = {
  FileId: string;
  Title: string;
  CurrentVersion: string;
  IsActive: boolean;
  Erdat: string;
  Erzet?: string;
  Ernam: string;
  __EntityControl: {
    Deletable: boolean;
    Updatable: boolean;
  };
  __OperationControl?: {
    Reactivate: boolean;
  };
};

export type AttachmentSearchParams = AttachmentListParams;

export type AttachmentListResponse = {
  value: AttachmentListItem[];
  '@odata.count': number;
};

export type AttachmentListParams = {
  $count: boolean;
  $select: string;
  $skip: number;
  $top: number;
  $filter?: string;
  $search?: string;
  $orderby?: string;
};

export type AttachmentDetailParams = {
  $select?: string;
  $expand?: string;
};

export type AttachmentDetailResponse = {
  FileId: string;
  Title: string;
  CurrentVersion: string;
  IsActive: boolean;
  EditLock: boolean;
  Erdat: string;
  Erzet: string;
  Ernam: string;
  Aedat: string;
  Aezet: string;
  Aenam: string;
  __EntityControl: {
    Deletable: boolean;
    Updatable: boolean;
  };
  __OperationControl: {
    Reactivate: boolean;
  };
  _CurrentVersion?: {
    FileName: string;
    MimeType: string;
    FileContent: string;
    FileExtension: string;
  };
};

export type AttachmentVersionItem = {
  FileId: string;
  VersionNo: string;
  FileName: string;
  Erdat: string;
  Erzet: string;
  Ernam: string;
};

export type AttachmentVersionsResponse = {
  value: AttachmentVersionItem[];
  '@odata.count': number;
};

export type AttachmentVersionsParams = {
  $count: boolean;
  $select: string;
  $skip: number;
  $top: number;
};

export type AttachmentAuditItem = {
  FileId: string;
  Erdat: string;
  Erzet: string;
  Uname: string;
  Action: string;
  Note: string;
  Ernam: string;
};

export type AttachmentAuditsResponse = {
  '@odata.count': number;
  value: AttachmentAuditItem[];
};

export type AttachmentAuditsParams = {
  $count: boolean;
  $select: string;
  $skip: number;
  $top: number;
  $orderby?: string;
};

export type VersionDetail = {
  FileId: string;
  VersionNo: string;
  FileName: string;
  FileExtension: string;
  MimeType: string;
  FileSize: number;
  FileContent: string;
  Erdat: string;
  Erzet: string;
  Ernam: string;
};

export type VersionDetailParams = {
  $select: string;
};

export type AttachmentTitleResponse = {
  value: string;
};

export type RollbackVersionPayload = {
  CurrentVersion: string;
};

export type UploadedFileData = {
  FileName: string;
  FileExtension: string;
  MimeType: string;
  FileSize: number; // bytes
  FileContent: string; // base64
};

export type UploadVersionPayload = UploadedFileData & {
  FileId: string;
};

export type UploadVersionResponse = {
  FileId: string;
  VersionNo: string;
  FileName: string;
  FileExtension: string;
  MimeType: string;
  FileSize: number;
  Erdat: string;
  Erzet: string;
  Ernam: string;
};

export type CreateAttachmentPayload = {
  Title: string;
  EditLock: boolean;
};

export type UpdateAttachmentPayload = {
  Title: string;
  EditLock: boolean;
};

export type CreateAttachmentResponse = {
  FileId: string;
  Title: string;
  EditLock: boolean;
};

type AttachmentBizObject = {
  BoId: string;
  FileId: string;
  Erdat: string;
  Erzet: string;
  Ernam: string;
  _Bo: BizObjectItem;
};

export type AttachmentBizObjectsResponse = {
  value: AttachmentBizObject[];
  '@odata.count': number;
};

export type AttachmentBizObjectsParams = {
  $count?: boolean;
  $select?: string;
  $skip?: number;
  $top?: number;
  $expand?: string;
  $orderby?: string;
};

export type GooglePickerDocument = {
  id: string;
  serviceId: string;
  mimeType: string;
  name: string;
  description: string;
  type: string; // 'file' | 'folder'
  lastEditedUtc: number;
  iconUrl: string;
  url: string;
  embedUrl: string;
  driveSuccess: boolean;
  sizeBytes: number;
  parentId: string;
};

export type LinkedAttachment = AttachmentListItem;

export type AttachmentCurrentVersion = AttachmentTitleResponse;

export type LinkBoPayload = {
  BoId: string;
  FileId: string;
};

export type UnlinkBoPayload = LinkBoPayload;
