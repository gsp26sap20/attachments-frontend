import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type AuthState = {
  isAdmin: boolean;
  csrfToken: string | null;
  googleAccessToken: string | null;
};

export type AuthAction = {
  setIsAdmin: (_isAdmin: boolean) => void;
  setCsrfToken: (_csrfToken: string) => void;
  setGoogleAccessToken: (_googleAccessToken: string | null) => void;
};

export type AuthStore = AuthState & AuthAction;

export const useAuthStore = create<AuthStore>()(
  devtools((set) => ({
    isAdmin: false,
    csrfToken: null,
    googleAccessToken: null,
    setIsAdmin: (isAdmin) => set({ isAdmin }),
    setCsrfToken: (csrfToken) => set({ csrfToken }),
    setGoogleAccessToken: (googleAccessToken) => set({ googleAccessToken }),
  })),
);
