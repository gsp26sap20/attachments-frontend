import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

export type AppState = {
  viewMode: 'table' | 'grid';
  currentUserRole: 'ADMIN' | 'USER' | '';
};

export type AppAction = {
  setViewMode: (_viewMode: AppState['viewMode']) => void;
  setCurrentUserRole: (_role: AppState['currentUserRole']) => void;
};

export type AppStore = AppState & AppAction;

function getStoredCurrentUserRole(): AppState['currentUserRole'] {
  const value = sessionStorage.getItem('current-user-role');

  return value === 'ADMIN' ? 'ADMIN' : value === 'USER' ? 'USER' : '';
}

export const useAppStore = create<AppStore>()(
  devtools((set) => ({
    viewMode: 'table',
    currentUserRole: getStoredCurrentUserRole(),
    setViewMode: (viewMode) => set({ viewMode }),
    setCurrentUserRole: (currentUserRole) => {
      sessionStorage.setItem('current-user-role', currentUserRole);
      set({ currentUserRole });
    },
  })),
);
