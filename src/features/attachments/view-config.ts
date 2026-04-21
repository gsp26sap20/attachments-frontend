import type { AttachmentAuditItem, AttachmentItem, AttachmentVersionItem } from './types';

type AttachmentListFieldKey = keyof Pick<
  AttachmentItem,
  'FileId' | 'Title' | 'CurrentVersion' | 'Erdat' | 'Erzet' | 'Ernam' | 'Aedat' | 'Aezet' | 'Aenam' | 'EditLock'
>;

export type AttachmentListFieldOption = {
  id: AttachmentListFieldKey;
  label: string;
};

export const ATTACHMENT_LIST_FIELDS = [
  { id: 'FileId', label: 'File ID' },
  { id: 'Title', label: 'Title' },
  { id: 'CurrentVersion', label: 'Version' },
  { id: 'Erdat', label: 'Created On' },
  { id: 'Erzet', label: 'Created At' },
  { id: 'Ernam', label: 'Created By' },
  { id: 'Aedat', label: 'Changed On' },
  { id: 'Aezet', label: 'Changed At' },
  { id: 'Aenam', label: 'Changed By' },
  { id: 'EditLock', label: 'Edit Lock' },
] as const satisfies readonly AttachmentListFieldOption[];

export type AttachmentListFieldId = (typeof ATTACHMENT_LIST_FIELDS)[number]['id'];

export const ATT_LIST_SELECTED_FIELD_IDS: AttachmentListFieldId[] = [
  'FileId',
  'Title',
  'CurrentVersion',
  'Erdat',
  'Ernam',
];

//====================================================================================================

type AttachmentVersionListFieldKey = keyof Pick<
  AttachmentVersionItem,
  'VersionNo' | 'FileName' | 'FileExtension' | 'MimeType' | 'FileSize' | 'Erdat' | 'Erzet' | 'Ernam'
>;

export type AttachmentVersionListFieldOption = {
  id: AttachmentVersionListFieldKey;
  label: string;
};

export const VERSION_LIST_FIELDS = [
  { id: 'VersionNo', label: 'Version' },
  { id: 'FileName', label: 'File Name' },
  { id: 'FileExtension', label: 'File Extension' },
  { id: 'MimeType', label: 'MIME Type' },
  { id: 'FileSize', label: 'File Size' },
  { id: 'Erdat', label: 'Created On' },
  { id: 'Erzet', label: 'Created At' },
  { id: 'Ernam', label: 'Created By' },
] as const satisfies readonly AttachmentVersionListFieldOption[];

export type AttachmentVersionListFieldId = (typeof VERSION_LIST_FIELDS)[number]['id'];

export const VERSION_LIST_SELECTED_FIELD_IDS: AttachmentVersionListFieldId[] = [
  'VersionNo',
  'FileName',
  'Erdat',
  'Erzet',
  'Ernam',
];

//====================================================================================================

type AttachmentAuditFieldKey = keyof Pick<
  AttachmentAuditItem,
  'Action' | 'Note' | 'Erdat' | 'Erzet' | 'Uname' | 'Ernam'
>;

export type AttachmentAuditFieldOption = {
  id: AttachmentAuditFieldKey;
  label: string;
};

export const ATTACHMENT_AUDIT_FIELDS = [
  { id: 'Action', label: 'Action' },
  { id: 'Note', label: 'Note' },
  { id: 'Erdat', label: 'Performed On' },
  { id: 'Erzet', label: 'Performed At' },
  { id: 'Ernam', label: 'Performed By' },
] as const satisfies readonly AttachmentAuditFieldOption[];

export type AttachmentAuditFieldId = (typeof ATTACHMENT_AUDIT_FIELDS)[number]['id'];

export const ATTACHMENT_AUDIT_SELECTED_FIELD_IDS: AttachmentAuditFieldId[] = [
  'Action',
  'Note',
  'Erdat',
  'Erzet',
  'Ernam',
];

//====================================================================================================

export type AttachmentBizListFieldOption = {
  id: 'BoId' | 'BoTitle' | 'BoType' | 'Status' | 'LinkErdat' | 'LinkErzet' | 'LinkErnam';
  label: string;
};

export const ATTACHMENT_BIZ_LIST_FIELDS = [
  { id: 'BoId', label: 'BO ID' },
  { id: 'BoTitle', label: 'BO Title' },
  { id: 'BoType', label: 'BO Type' },
  { id: 'Status', label: 'BO Status' },
  { id: 'LinkErdat', label: 'Linked On' },
  { id: 'LinkErzet', label: 'Linked At' },
  { id: 'LinkErnam', label: 'Link By' },
] as const satisfies readonly AttachmentBizListFieldOption[];

export type AttachmentBizListFieldId = (typeof ATTACHMENT_BIZ_LIST_FIELDS)[number]['id'];

export const ATTACHMENT_BIZ_LIST_SELECTED_FIELD_IDS: AttachmentBizListFieldId[] = [
  'BoId',
  'BoTitle',
  'BoType',
  'Status',
  'LinkErdat',
  'LinkErnam',
];
