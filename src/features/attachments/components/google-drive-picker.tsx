import * as React from 'react';
import { toast } from '@/libs/toast';
import { pushErrorMessages } from '@/libs/errors';
import { useAuthStore } from '@/stores/auth-store';
import { GoogleDriveIcon } from '@/components/icons';
import { GOOGLE_APP_ID, GOOGLE_CLIENT_ID } from '@/app-env';
import { googleDriveFileToUploadedFileData } from '../upload-file';
import type { UploadedFileData, GooglePickerDocument } from '../types';
import { Button, type ButtonPropTypes } from '@ui5/webcomponents-react/Button';
import { DrivePicker, DrivePickerDocsView, type DrivePickerEventHandlers } from '@googleworkspace/drive-picker-react';

interface GoogleDrivePickerProps {
  disabled?: boolean;
  onPick?: (fileData: UploadedFileData) => void | Promise<void>;
  onLoadingChange?: (loading: boolean) => void;
}

export function GoogleDrivePicker({ disabled, onPick, onLoadingChange }: GoogleDrivePickerProps) {
  const [open, setOpen] = React.useState(false);
  const googleAccessToken = useAuthStore((state) => state.googleAccessToken);
  const setGoogleAccessToken = useAuthStore((state) => state.setGoogleAccessToken);

  const handleButtonClick: ButtonPropTypes['onClick'] = function (e) {
    e.preventDefault();
    e.stopPropagation();
    if (disabled) return;
    setOpen(true);
  };

  const handleOAuthError: DrivePickerEventHandlers['onOauthError'] = function (e) {
    setOpen(false);
    onLoadingChange?.(false);
    setGoogleAccessToken(null);

    const errorType = e.detail.type;
    if (errorType === 'popup_failed_to_open') {
      pushErrorMessages(['Popup failed to open. Please allow popups for this website.']);
    } else if (errorType === 'popup_closed') {
      toast('Popup closed by user or browser.');
    } else {
      pushErrorMessages(['An unexpected error occurred. Please try again.']);
    }
  };

  const handleOAuthResponse: DrivePickerEventHandlers['onOauthResponse'] = function (e) {
    setGoogleAccessToken(e.detail.access_token);
  };

  const handleCanceled: DrivePickerEventHandlers['onCanceled'] = function () {
    setOpen(false);
    onLoadingChange?.(false);
  };

  const handleFilePicked: DrivePickerEventHandlers['onPicked'] = async function (e) {
    setOpen(false);
    const selectedDocument = e.detail.docs?.[0] as GooglePickerDocument | undefined;

    if (!selectedDocument?.id) {
      pushErrorMessages(['No Google Drive file was selected.']);
      return;
    }

    if (!googleAccessToken) {
      pushErrorMessages(['Google Drive authorization is unavailable. Please try again.']);
      return;
    }

    try {
      onLoadingChange?.(true);
      const fileData = await googleDriveFileToUploadedFileData({
        accessToken: googleAccessToken,
        file: selectedDocument,
      });
      await onPick?.(fileData);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Cannot import file from Google Drive.';
      pushErrorMessages([message]);
    } finally {
      onLoadingChange?.(false);
    }
  };

  return (
    <React.Fragment>
      <Button onClick={handleButtonClick} className="inline-flex items-center" design="Transparent" disabled={disabled}>
        <GoogleDriveIcon className="inline-block mr-1 size-5" />
        <span className="text-sm">Google Drive</span>
      </Button>
      {open && (
        <DrivePicker
          app-id={GOOGLE_APP_ID}
          client-id={GOOGLE_CLIENT_ID}
          oauth-token={googleAccessToken ?? undefined}
          max-items={1}
          onCanceled={handleCanceled}
          onPicked={handleFilePicked}
          onOauthError={handleOAuthError}
          onOauthResponse={handleOAuthResponse}
        >
          <DrivePickerDocsView include-folders="true" select-folder-enabled="false" />
          <DrivePickerDocsView include-folders="true" select-folder-enabled="false" owned-by-me="true" />
          <DrivePickerDocsView include-folders="true" select-folder-enabled="false" enable-drives="true" />
        </DrivePicker>
      )}
    </React.Fragment>
  );
}
