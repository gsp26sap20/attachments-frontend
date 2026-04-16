import * as React from 'react';
import { toast } from '@/libs/toast';
import { formatFileSize } from '@/libs/utils';
import type { ConfigFileItem } from '../types';
import { Bar } from '@ui5/webcomponents-react/Bar';
import { Input } from '@ui5/webcomponents-react/Input';
import { Text } from '@ui5/webcomponents-react/Text';
import { Label } from '@ui5/webcomponents-react/Label';
import { Dialog } from '@ui5/webcomponents-react/Dialog';
import { Button } from '@ui5/webcomponents-react/Button';
import { Select } from '@ui5/webcomponents-react/Select';
import { Option } from '@ui5/webcomponents-react/Option';
import { FlexBox } from '@ui5/webcomponents-react/FlexBox';
import { BusyIndicator } from '@/components/busy-indicator';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateConfigFileMutationOptions } from '../options/mutation';

function getInitialValues(configFile: ConfigFileItem) {
  return {
    mimeType: configFile.MimeType ?? '',
    maxBytes: String(configFile.MaxBytes ?? ''),
    description: configFile.Description ?? '',
    type: configFile.Type,
  };
}

type ConfigFileEditProps = {
  configFile: ConfigFileItem | null;
  open: boolean;
  onClose: () => void;
};

export function ConfigFileEdit({ configFile, open, onClose }: ConfigFileEditProps) {
  const queryClient = useQueryClient();
  const [values, setValues] = React.useState(() =>
    configFile
      ? getInitialValues(configFile)
      : {
          mimeType: '',
          maxBytes: '',
          description: '',
          type: 'DOCUMENT' as ConfigFileItem['Type'],
        },
  );

  const { mutate: updateConfigFile, isPending } = useMutation(
    updateConfigFileMutationOptions({
      fileExt: configFile?.FileExt ?? '',
      onSuccess: () => {
        toast('Configuration file updated successfully');
        queryClient.invalidateQueries({ queryKey: ['config-files'] });
        onClose();
      },
    }),
  );

  React.useEffect(() => {
    if (configFile) {
      setValues(getInitialValues(configFile));
    }
  }, [configFile, open]);

  const normalizedMimeType = values.mimeType.trim();
  const normalizedDescription = values.description.trim();
  const maxBytes = Number(values.maxBytes);
  const isSaveDisabled = !normalizedMimeType || !normalizedDescription || !Number.isFinite(maxBytes) || maxBytes <= 0;

  const handleClose = function () {
    if (isPending) {
      return;
    }

    onClose();
  };

  const handleSubmit = function () {
    if (!configFile) {
      return;
    }

    updateConfigFile({
      MimeType: normalizedMimeType,
      MaxBytes: maxBytes,
      Description: normalizedDescription,
      Type: values.type,
      IsActive: 'X', // TODO: check this
    });
  };

  return (
    <Dialog
      open={open && !!configFile}
      resizable
      draggable
      headerText="Edit Configuration File"
      className="md:min-w-2xl relative"
      footer={
        <Bar
          design="Footer"
          endContent={
            <React.Fragment>
              <Button design="Emphasized" onClick={handleSubmit} disabled={isSaveDisabled || isPending || !configFile}>
                Save
              </Button>
              <Button design="Transparent" onClick={handleClose} disabled={isPending}>
                Cancel
              </Button>
            </React.Fragment>
          }
        />
      }
      onClose={handleClose}
    >
      <div className="grid gap-4 p-2 md:grid-cols-2">
        <FlexBox direction="Column" className="gap-1">
          <Label showColon>File Extension</Label>
          <Input value={configFile?.FileExt ?? ''} disabled />
        </FlexBox>
        <FlexBox direction="Column" className="gap-1">
          <Label showColon required>
            Type
          </Label>
          <Select
            value={values.type}
            onChange={(event) => {
              setValues((prev) => ({
                ...prev,
                type: event.target.value as ConfigFileItem['Type'],
              }));
            }}
          >
            <Option value="DOCUMENT">Document</Option>
            <Option value="IMAGE">Image</Option>
          </Select>
        </FlexBox>
        <FlexBox direction="Column" className="gap-1">
          <Label showColon required>
            Max Bytes
          </Label>
          <FlexBox alignItems="Center" className="gap-2">
            <Input
              type="Number"
              value={values.maxBytes}
              placeholder="Enter max bytes"
              onInput={(event) => {
                setValues((prev) => ({
                  ...prev,
                  maxBytes: event.target.value,
                }));
              }}
            />
            <Text>{values.maxBytes.trim() ? formatFileSize(values.maxBytes) : '-'}</Text>
          </FlexBox>
        </FlexBox>
        <FlexBox direction="Column" className="gap-1 md:col-span-2">
          <Label showColon required>
            Mime Type
          </Label>
          <Input
            className="w-full"
            value={values.mimeType}
            placeholder="Enter MIME type"
            onInput={(event) => {
              setValues((prev) => ({
                ...prev,
                mimeType: event.target.value,
              }));
            }}
          />
        </FlexBox>
        <FlexBox direction="Column" className="gap-1 md:col-span-2">
          <Label showColon required>
            Description
          </Label>
          <Input
            value={values.description}
            className="w-full"
            placeholder="Enter description"
            onInput={(event) => {
              setValues((prev) => ({
                ...prev,
                description: event.target.value,
              }));
            }}
          />
        </FlexBox>
      </div>
      <BusyIndicator type="pending" show={isPending} />
    </Dialog>
  );
}
