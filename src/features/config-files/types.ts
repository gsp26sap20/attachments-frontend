export type ConfigFileItem = {
  FileExt: string;
  MimeType: string;
  MaxBytes: number;
  IsActive: string;
  Description: string;
  __EntityControl: {
    Deletable: boolean;
    Updatable: boolean;
  };
  SAP__Messages: Array<{
    code: string;
    message: string;
    target?: string;
  }>;
};

export type ConfigFileListResponse = {
  '@odata.context': string;
  '@odata.metadataEtag'?: string;
  value: ConfigFileItem[];
};

export type ConfigFileListParams = {
  'sap-client': number;
};

export type CreateConfigFilePayload = {
  MimeType: string;
  MaxBytes: number;
  IsActive: string;
  Description: string;
};

export type CreateConfigFileVariables = {
  fileExt: string;
  payload: CreateConfigFilePayload;
};

export type UpdateConfigFilePayload = {
  MimeType: string;
  MaxBytes: number;
  IsActive: string;
  Description: string;
};

export type DeleteConfigFileResponse = unknown;

