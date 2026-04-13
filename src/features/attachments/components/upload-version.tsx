import * as React from 'react';
import { cn } from '@/libs/utils';
import { FilePreview } from './file-preview';
import { MAX_FILE_SIZE } from '@/app-constant';
import type { UploadedFileData } from '../types';
import { pushErrorMessages } from '@/libs/errors';
import '@ui5/webcomponents-icons/upload-to-cloud.js';
import { Icon } from '@ui5/webcomponents-react/Icon';
import { fileToUploadedFileData } from '../upload-file';
import { GoogleDrivePicker } from './google-drive-picker';
import { FlexBox } from '@ui5/webcomponents-react/FlexBox';
import { FileUploader, type FileUploaderPropTypes } from '@ui5/webcomponents-react/FileUploader';

interface UploadVersionProps {
  fileData: UploadedFileData | null;
  onFileDataChange: (fileData: UploadedFileData | null) => void;
  className?: string;
}

export function UploadVersion({ fileData, onFileDataChange, className }: UploadVersionProps) {
  const [loading, setLoading] = React.useState(false);

  const applySelectedFile = function (nextFileData: UploadedFileData) {
    onFileDataChange(nextFileData);
  };

  const handleChange: FileUploaderPropTypes['onChange'] = async function (event) {
    const file: File | undefined = event.target?.files?.[0];
    if (!file) return;

    onFileDataChange(null);

    try {
      setLoading(true);
      const payload = await fileToUploadedFileData(file, MAX_FILE_SIZE);
      applySelectedFile(payload);
    } catch (err) {
      console.error(err);
      pushErrorMessages([err instanceof Error ? err.message : "Can't read file"]);
    } finally {
      // Clear the input so selecting the same file again still fires onChange.
      if (event.target) {
        event.target.value = '';
      }
      setLoading(false);
    }
  };

  return (
    <FlexBox
      direction="Column"
      alignItems="Center"
      justifyContent="Center"
      style={{ gap: '1rem' }}
      className={cn('w-full', className)}
    >
      {!fileData && (
        <FileUploader hideInput onChange={handleChange} className="w-full" disabled={loading}>
          <div className="w-full min-h-[50dvh] rounded-xl border-2 border-dashed flex flex-col items-center justify-center cursor-pointer p-6">
            <div className="text-base text-center font-medium">
              <Icon className="size-10 text-primary" name="upload-to-cloud" />
              {loading ? (
                <p className="text-lg font-semibold text-muted-foreground">Processing...</p>
              ) : (
                <>
                  <p className="text-lg font-semibold">Drop file here</p>
                  <p className="text-muted-foreground text-sm">or click to choose</p>
                  <p className="text-muted-foreground text-sm">or from</p>
                  <GoogleDrivePicker
                    disabled={loading}
                    onPick={applySelectedFile}
                    onImportError={(message) => {
                      if (message) {
                        pushErrorMessages([message]);
                      }
                    }}
                    onLoadingChange={(nextLoading) => {
                      setLoading(nextLoading);
                      if (nextLoading) {
                        onFileDataChange(null);
                      }
                    }}
                    // TODO: re-check this logic
                  />
                </>
              )}
            </div>
            <p className="text-sm text-muted-foreground mt-2">Maximum size: {MAX_FILE_SIZE / 1024 / 1024}MB</p>
          </div>
        </FileUploader>
      )}
      {fileData && (
        <FilePreview
          mimeType={fileData.MimeType}
          fileContent={fileData.FileContent}
          fileName={fileData.FileName}
          className="p-2"
        />
      )}
    </FlexBox>
  );
}

// TODO: Rename to FilePicker
