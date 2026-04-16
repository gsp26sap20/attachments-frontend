import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/auth-store';
import { currentUserQueryOptions } from '../options/query';
import { pushApiErrorMessages, pushErrorMessages } from '@/libs/errors';

const ADMIN_ROLE = 'ADMIN';

export function AuthUserLoader() {
  const setIsAdmin = useAuthStore((state) => state.setIsAdmin);
  const setUsername = useAuthStore((state) => state.setUsername);
  const { data, isError, error } = useQuery(currentUserQueryOptions());

  React.useEffect(() => {
    if (isError) {
      pushApiErrorMessages(error);
      setIsAdmin(false);
      setUsername(null);
      return;
    }

    try {
      const role = data?.value[0].Role?.trim().toUpperCase();
      const username = data?.value[0].Uname;

      if (role === undefined) {
        return;
      }
      setUsername(username ?? null);
      setIsAdmin(role === ADMIN_ROLE);
    } catch {
      pushErrorMessages(['Failed to load current user information']);
      setIsAdmin(false);
      setUsername(null);
    }
  }, [isError, setIsAdmin, error, data, setUsername]);

  return null;
}
