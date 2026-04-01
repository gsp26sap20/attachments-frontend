import { mutationOptions } from '@tanstack/react-query';
import { ODATA_SERVICE } from '@/app-constant';
import { axiosInstance } from '@/libs/axios-instance';
import { fetchCsrfToken, getCsrfToken } from '@/libs/helpers';
import { API } from '../constants';
import type {
  ConfigFileItem,
  CreateConfigFileVariables,
  CreateConfigFilePayload,
  DeleteConfigFileResponse,
  UpdateConfigFilePayload,
} from '../types';

type CreateConfigFileMutationParams = {
  onSuccess?: (data: ConfigFileItem) => void;
  onError?: (error: Error) => void;
};

type UpdateConfigFileMutationParams = {
  fileExt: string;
  onSuccess?: (data: ConfigFileItem) => void;
  onError?: (error: Error) => void;
};

type DeleteConfigFileMutationParams = {
  onSuccess?: (data: DeleteConfigFileResponse) => void;
  onError?: (error: Error) => void;
};

function escapeODataString(value: string) {
  return value.replace(/'/g, "''");
}

async function ensureCsrfToken() {
  let token = getCsrfToken();

  if (!token) {
    await fetchCsrfToken(ODATA_SERVICE.CONFIG_FILE);
    token = getCsrfToken();
  }

  return token;
}

export function createConfigFileMutationOptions({ onSuccess, onError }: CreateConfigFileMutationParams) {
  return mutationOptions({
    mutationFn: async (variables: CreateConfigFileVariables) => {
      const { fileExt, payload } = variables;
      const token = await ensureCsrfToken();

      const res = await axiosInstance.post<ConfigFileItem, CreateConfigFilePayload & { FileExt: string }>(
        `${ODATA_SERVICE.CONFIG_FILE}${API.endpoint}?sap-client=324`,
        {
          FileExt: fileExt,
          ...payload,
        },
        {
          headers: {
            'accept-language': 'en',
            ...(token ? { 'x-csrf-token': token } : {}),
          },
        },
      );

      return res;
    },
    onSuccess,
    onError,
  });
}

export function updateConfigFileMutationOptions({ fileExt, onSuccess, onError }: UpdateConfigFileMutationParams) {
  return mutationOptions({
    mutationFn: async (payload: UpdateConfigFilePayload) => {
      const token = await ensureCsrfToken();

      const res = await axiosInstance.patch<ConfigFileItem, UpdateConfigFilePayload>(
        `${ODATA_SERVICE.CONFIG_FILE}${API.endpoint}(FileExt='${escapeODataString(fileExt)}')?sap-client=324`,
        payload,
        {
          headers: {
            'accept-language': 'en',
            ...(token ? { 'x-csrf-token': token } : {}),
          },
        },
      );

      return res;
    },
    onSuccess,
    onError,
  });
}

export function deleteConfigFileMutationOptions({ onSuccess, onError }: DeleteConfigFileMutationParams) {
  return mutationOptions({
    mutationFn: async (targetFileExt: string) => {
      const token = await ensureCsrfToken();

      const res = await axiosInstance.delete<DeleteConfigFileResponse>(
        `${ODATA_SERVICE.CONFIG_FILE}${API.endpoint}(FileExt='${escapeODataString(targetFileExt)}')?sap-client=324`,
        {
          headers: {
            'accept-language': 'en',
            ...(token ? { 'x-csrf-token': token } : {}),
          },
        },
      );

      return res;
    },
    onSuccess,
    onError,
  });
}
