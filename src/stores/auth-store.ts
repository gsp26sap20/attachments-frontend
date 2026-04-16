import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type AuthState = {
  isAdmin: boolean;
  username: string | null;
  csrfToken: string | null;
  googleAccessToken: string | null;
};

export type AuthAction = {
  setIsAdmin: (isAdmin: boolean) => void;
  setUsername: (username: string | null) => void;
  setCsrfToken: (csrfToken: string | null) => void;
  setGoogleAccessToken: (googleAccessToken: string | null) => void;
};

export type AuthStore = AuthState & AuthAction;

export const useAuthStore = create<AuthStore>()(
  devtools((set) => ({
    isAdmin: false,
    username: null,
    csrfToken: null,
    googleAccessToken: null,
    setIsAdmin: (isAdmin) => set({ isAdmin }),
    setUsername: (username) => set({ username }),
    setCsrfToken: (csrfToken) => set({ csrfToken }),
    setGoogleAccessToken: (googleAccessToken) => set({ googleAccessToken }),
  })),
);
