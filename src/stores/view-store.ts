import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { BO_LIST_SELECTED_FIELD_IDS } from '@/features/business-objects/view-config';
import { ATTACHMENT_AUDIT_SELECTED_FIELD_IDS } from '@/features/attachments/view-config';
import { ATTACHMENT_BIZ_LIST_SELECTED_FIELD_IDS } from '@/features/attachments/view-config';
import { BIZ_OBJECT_LINKED_ATTACHMENT_SELECTED_FIELD_IDS } from '@/features/business-objects/view-config';
import { USER_LIST_SELECTED_FIELD_IDS, type AuthUserListFieldId } from '@/features/auth-users/view-config';
import type { AttachmentAuditFieldId, AttachmentBizListFieldId } from '@/features/attachments/view-config';
import type { AttachmentListFieldId, AttachmentVersionListFieldId } from '@/features/attachments/view-config';
import { CONFIG_LIST_SELECTED_FIELD_IDS, type ConfigFileListFieldId } from '@/features/config-files/view-config';
import { ATT_LIST_SELECTED_FIELD_IDS, VERSION_LIST_SELECTED_FIELD_IDS } from '@/features/attachments/view-config';
import { type BizObjectLinkedAttachmentFieldId, type BoListFieldId } from '@/features/business-objects/view-config';

export type ViewPreferencesState = {
  attachmentListVisibleFieldIds: AttachmentListFieldId[];
  versionListVisibleFieldIds: AttachmentVersionListFieldId[];
  attachmentAuditVisibleFieldIds: AttachmentAuditFieldId[];
  attachmentBizListVisibleFieldIds: AttachmentBizListFieldId[];
  boListVisibleFieldIds: BoListFieldId[];
  bizObjectLinkedAttachmentVisibleFieldIds: BizObjectLinkedAttachmentFieldId[];
  authUserListVisibleFieldIds: AuthUserListFieldId[];
  configFileListVisibleFieldIds: ConfigFileListFieldId[];
};

export type ViewPreferencesAction = {
  setAttachmentListVisibleFieldIds: (fieldIds: AttachmentListFieldId[]) => void;
  setVersionListVisibleFieldIds: (fieldIds: AttachmentVersionListFieldId[]) => void;
  setAttachmentAuditVisibleFieldIds: (fieldIds: AttachmentAuditFieldId[]) => void;
  setAttachmentBizListVisibleFieldIds: (fieldIds: AttachmentBizListFieldId[]) => void;
  setBoListVisibleFieldIds: (fieldIds: BoListFieldId[]) => void;
  setBizObjectLinkedAttachmentVisibleFieldIds: (fieldIds: BizObjectLinkedAttachmentFieldId[]) => void;
  setAuthUserListVisibleFieldIds: (fieldIds: AuthUserListFieldId[]) => void;
  setConfigFileListVisibleFieldIds: (fieldIds: ConfigFileListFieldId[]) => void;
};

export type ViewStore = ViewPreferencesState & ViewPreferencesAction;

export const useViewStore = create<ViewStore>()(
  devtools((set) => ({
    attachmentListVisibleFieldIds: ATT_LIST_SELECTED_FIELD_IDS,
    versionListVisibleFieldIds: VERSION_LIST_SELECTED_FIELD_IDS,
    attachmentAuditVisibleFieldIds: ATTACHMENT_AUDIT_SELECTED_FIELD_IDS,
    attachmentBizListVisibleFieldIds: ATTACHMENT_BIZ_LIST_SELECTED_FIELD_IDS,
    boListVisibleFieldIds: BO_LIST_SELECTED_FIELD_IDS,
    bizObjectLinkedAttachmentVisibleFieldIds: BIZ_OBJECT_LINKED_ATTACHMENT_SELECTED_FIELD_IDS,
    authUserListVisibleFieldIds: USER_LIST_SELECTED_FIELD_IDS,
    configFileListVisibleFieldIds: CONFIG_LIST_SELECTED_FIELD_IDS,
    setAttachmentListVisibleFieldIds: (attachmentListVisibleFieldIds) => set({ attachmentListVisibleFieldIds }),
    setVersionListVisibleFieldIds: (versionListVisibleFieldIds) => set({ versionListVisibleFieldIds }),
    setAttachmentAuditVisibleFieldIds: (attachmentAuditVisibleFieldIds) => set({ attachmentAuditVisibleFieldIds }),
    setAttachmentBizListVisibleFieldIds: (attachmentBizListVisibleFieldIds) =>
      set({ attachmentBizListVisibleFieldIds }),
    setBoListVisibleFieldIds: (boListVisibleFieldIds) => set({ boListVisibleFieldIds }),
    setBizObjectLinkedAttachmentVisibleFieldIds: (bizObjectLinkedAttachmentVisibleFieldIds) =>
      set({ bizObjectLinkedAttachmentVisibleFieldIds }),
    setAuthUserListVisibleFieldIds: (authUserListVisibleFieldIds) => set({ authUserListVisibleFieldIds }),
    setConfigFileListVisibleFieldIds: (configFileListVisibleFieldIds) => set({ configFileListVisibleFieldIds }),
  })),
);
