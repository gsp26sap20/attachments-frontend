import type { BizObjectItem } from './types';

type BoListFieldKey = keyof Pick<
  BizObjectItem,
  'BoId' | 'BoTitle' | 'BoType' | 'Status' | 'Erdat' | 'Erzet' | 'Ernam' | 'Aedat' | 'Aezet' | 'Aenam'
>;

export type BoListFieldOption = {
  id: BoListFieldKey;
  label: string;
};

export const BO_LIST_FIELDS = [
  { id: 'BoId', label: 'ID' },
  { id: 'BoTitle', label: 'Title' },
  { id: 'BoType', label: 'Type' },
  { id: 'Status', label: 'Status' },
  { id: 'Erdat', label: 'Created On' },
  { id: 'Erzet', label: 'Created At' },
  { id: 'Ernam', label: 'Created By' },
  { id: 'Aedat', label: 'Changed On' },
  { id: 'Aezet', label: 'Changed At' },
  { id: 'Aenam', label: 'Changed By' },
] as const satisfies readonly BoListFieldOption[];

export type BoListFieldId = (typeof BO_LIST_FIELDS)[number]['id'];

export const BO_LIST_SELECTED_FIELD_IDS: BoListFieldId[] = ['BoId', 'BoTitle', 'BoType', 'Status', 'Erdat', 'Ernam'];

//====================================================================================================

export type BizObjectLinkedAttachmentFieldOption = {
  id: 'FileId' | 'Title' | 'CurrentVersion' | 'IsActive' | 'EditLock' | 'LinkErdat' | 'LinkErzet' | 'LinkErnam';
  label: string;
};

export const BIZ_OBJECT_LINKED_ATTACHMENT_FIELDS = [
  { id: 'FileId', label: 'File ID' },
  { id: 'Title', label: 'Title' },
  { id: 'CurrentVersion', label: 'Version' },
  { id: 'EditLock', label: 'Edit Lock' },
  { id: 'LinkErdat', label: 'Linked On' },
  { id: 'LinkErzet', label: 'Linked At' },
  { id: 'LinkErnam', label: 'Linked By' },
] as const satisfies readonly BizObjectLinkedAttachmentFieldOption[];

export type BizObjectLinkedAttachmentFieldId = (typeof BIZ_OBJECT_LINKED_ATTACHMENT_FIELDS)[number]['id'];

export const BIZ_OBJECT_LINKED_ATTACHMENT_SELECTED_FIELD_IDS: BizObjectLinkedAttachmentFieldId[] = [
  'FileId',
  'Title',
  'CurrentVersion',
  'LinkErdat',
  'LinkErnam',
];
