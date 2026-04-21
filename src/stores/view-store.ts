import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { DEFAULT_LIST_SELECTED_FIELD_IDS, type AttachmentListFieldId } from '@/features/attachments/view-config';

export type ViewPreferencesState = {
  attachmentListVisibleFieldIds: AttachmentListFieldId[];
};

export type ViewPreferencesAction = {
  setAttachmentListVisibleFieldIds: (fieldIds: AttachmentListFieldId[]) => void;
  resetAttachmentListVisibleFieldIds: () => void;
};

export type ViewStore = ViewPreferencesState & ViewPreferencesAction;

export const useViewStore = create<ViewStore>()(
  devtools((set) => ({
    attachmentListVisibleFieldIds: DEFAULT_LIST_SELECTED_FIELD_IDS,
    setAttachmentListVisibleFieldIds: (attachmentListVisibleFieldIds) => set({ attachmentListVisibleFieldIds }),
    resetAttachmentListVisibleFieldIds: () =>
      set({
        attachmentListVisibleFieldIds: DEFAULT_LIST_SELECTED_FIELD_IDS,
      }),
  })),
);
