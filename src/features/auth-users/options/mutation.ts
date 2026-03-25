import { mutationOptions } from '@tanstack/react-query';
import { ODATA_SERVICE } from '@/app-constant';
import { axiosInstance } from '@/libs/axios-instance';
import { fetchCsrfToken, getCsrfToken } from '@/libs/helpers';
import { API } from '../constants';
import type {
  CreateAuthUserPayload,
  CreateAuthUserResponse,
  DeleteAuthUserResponse,
  UpdateAuthUserPayload,
  UpdateAuthUserResponse,
} from '../types';

type CreateAuthUserMutationParams = {
  onSuccess?: (data: CreateAuthUserResponse) => void;
  onError?: (error: Error) => void;
};

type UpdateAuthUserMutationParams = {
  onSuccess?: (data: UpdateAuthUserResponse) => void;
  onError?: (error: Error) => void;
};

type DeleteAuthUserMutationParams = {
  onSuccess?: (data: DeleteAuthUserResponse) => void;
  onError?: (error: Error) => void;
};

const CSRF_BLOCKED_MESSAGE = 'Sign in with role ADMIN to update roles or delete users.';

export function createAuthUserMutationOptions({ onSuccess, onError }: CreateAuthUserMutationParams) {
  return mutationOptions({
    mutationFn: async (payload: CreateAuthUserPayload) => {
      let token = getCsrfToken();

      if (!token) {
        try {
          await fetchCsrfToken(ODATA_SERVICE.AUTH);
          token = getCsrfToken();
        } catch {
          throw new Error(CSRF_BLOCKED_MESSAGE);
        }
      }

      if (!token) {
        throw new Error(CSRF_BLOCKED_MESSAGE);
      }

      try {
        const res = await axiosInstance.post<CreateAuthUserResponse>(
          `${ODATA_SERVICE.AUTH}${API.endpoint}?sap-client=324`,
          payload,
          {
            headers: {
              'accept-language': 'en',
              'x-csrf-token': token,
            },
          },
        );

        return res;
      } catch (error) {
        if (error instanceof Error) {
          throw error;
        }

        throw new Error('Cannot create user');
      }
    },
    onSuccess,
    onError,
  });
}

export function updateAuthUserMutationOptions({ onSuccess, onError }: UpdateAuthUserMutationParams) {
  return mutationOptions({
    mutationFn: async (variables: { uname: string; payload: UpdateAuthUserPayload }) => {
      const { uname, payload } = variables;
      let token = getCsrfToken();

      if (!token) {
        try {
          await fetchCsrfToken(ODATA_SERVICE.AUTH);
          token = getCsrfToken();
        } catch {
          throw new Error(CSRF_BLOCKED_MESSAGE);
        }
      }

      if (!token) {
        throw new Error(CSRF_BLOCKED_MESSAGE);
      }

      const res = await axiosInstance.put<UpdateAuthUserResponse>(
        `${ODATA_SERVICE.AUTH}${API.endpoint}(Uname='${uname}')?sap-client=324`,
        payload,
        {
          headers: {
            'accept-language': 'en',
            'x-csrf-token': token,
          },
        },
      );

      return res;
    },
    onSuccess,
    onError,
  });
}

export function deleteAuthUserMutationOptions({ onSuccess, onError }: DeleteAuthUserMutationParams) {
  return mutationOptions({
    mutationFn: async (variables: { uname: string }) => {
      const { uname } = variables;
      let token = getCsrfToken();

      if (!token) {
        try {
          await fetchCsrfToken(ODATA_SERVICE.AUTH);
          token = getCsrfToken();
        } catch {
          throw new Error(CSRF_BLOCKED_MESSAGE);
        }
      }

      if (!token) {
        throw new Error(CSRF_BLOCKED_MESSAGE);
      }

      const res = await axiosInstance.delete<DeleteAuthUserResponse>(
        `${ODATA_SERVICE.AUTH}${API.endpoint}(Uname='${uname}')?sap-client=324`,
        {
          headers: {
            'accept-language': 'en',
            'x-csrf-token': token,
          },
        },
      );

      return res;
    },
    onSuccess,
    onError,
  });
}
