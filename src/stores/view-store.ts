import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { BO_LIST_SELECTED_FIELD_IDS, type BoListFieldId } from '@/features/business-objects/view-config';
import { USER_LIST_SELECTED_FIELD_IDS, type AuthUserListFieldId } from '@/features/auth-users/view-config';
import { ATT_LIST_SELECTED_FIELD_IDS, type AttachmentListFieldId } from '@/features/attachments/view-config';
import { CONFIG_LIST_SELECTED_FIELD_IDS, type ConfigFileListFieldId } from '@/features/config-files/view-config';

export type ViewPreferencesState = {
  attachmentListVisibleFieldIds: AttachmentListFieldId[];
  boListVisibleFieldIds: BoListFieldId[];
  authUserListVisibleFieldIds: AuthUserListFieldId[];
  configFileListVisibleFieldIds: ConfigFileListFieldId[];
};

export type ViewPreferencesAction = {
  setAttachmentListVisibleFieldIds: (fieldIds: AttachmentListFieldId[]) => void;
  setBoListVisibleFieldIds: (fieldIds: BoListFieldId[]) => void;
  setAuthUserListVisibleFieldIds: (fieldIds: AuthUserListFieldId[]) => void;
  setConfigFileListVisibleFieldIds: (fieldIds: ConfigFileListFieldId[]) => void;
};

export type ViewStore = ViewPreferencesState & ViewPreferencesAction;

export const useViewStore = create<ViewStore>()(
  devtools((set) => ({
    attachmentListVisibleFieldIds: ATT_LIST_SELECTED_FIELD_IDS,
    boListVisibleFieldIds: BO_LIST_SELECTED_FIELD_IDS,
    authUserListVisibleFieldIds: USER_LIST_SELECTED_FIELD_IDS,
    configFileListVisibleFieldIds: CONFIG_LIST_SELECTED_FIELD_IDS,
    setAttachmentListVisibleFieldIds: (attachmentListVisibleFieldIds) => set({ attachmentListVisibleFieldIds }),
    setBoListVisibleFieldIds: (boListVisibleFieldIds) => set({ boListVisibleFieldIds }),
    setAuthUserListVisibleFieldIds: (authUserListVisibleFieldIds) => set({ authUserListVisibleFieldIds }),
    setConfigFileListVisibleFieldIds: (configFileListVisibleFieldIds) => set({ configFileListVisibleFieldIds }),
  })),
);
