import type { ConfigFileItem } from './types';

type ConfigFileListFieldKey = keyof Pick<ConfigFileItem, 'FileExt' | 'Type' | 'Description' | 'MaxBytes' | 'IsActive'>;

export type ConfigFileListFieldOption = {
  id: ConfigFileListFieldKey;
  label: string;
};

export const CONFIG_FILE_LIST_FIELDS = [
  { id: 'FileExt', label: 'File Extension' },
  { id: 'Type', label: 'Type' },
  { id: 'Description', label: 'Description' },
  { id: 'MaxBytes', label: 'Max Size' },
  { id: 'IsActive', label: 'Is Active' },
] as const satisfies readonly ConfigFileListFieldOption[];

export type ConfigFileListFieldId = (typeof CONFIG_FILE_LIST_FIELDS)[number]['id'];

export const CONFIG_LIST_SELECTED_FIELD_IDS: ConfigFileListFieldId[] = [
  'FileExt',
  'Type',
  'Description',
  'MaxBytes',
  'IsActive',
];
