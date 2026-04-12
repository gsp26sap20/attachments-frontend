import * as React from 'react';
import { toast } from '@/libs/toast';
import { useNavigate } from 'react-router';
import { pushErrorMessages } from '@/libs/errors';
import { Bar } from '@ui5/webcomponents-react/Bar';
import { Dialog } from '@ui5/webcomponents-react/Dialog';
import { Button } from '@ui5/webcomponents-react/Button';
import { BusyIndicator } from '@/components/busy-indicator';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createAttachmentMutationOptions } from '../options/mutation';
import { ToolbarButton } from '@ui5/webcomponents-react/ToolbarButton';
import { AttachmentForm, type AttachmentFormValues } from './attachment-form';

export function AttachmentCreate() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [open, setOpen] = React.useState(false);
  const [values, setValues] = React.useState<AttachmentFormValues>({
    title: '',
    editLock: false,
  });

  const { mutate: createAttachment, isPending } = useMutation(
    createAttachmentMutationOptions({
      onSuccess: (data) => {
        toast('Attachment created successfully');
        setOpen(false);
        queryClient.invalidateQueries({ queryKey: ['attachments'] });
        navigate(`/attachments/${data.FileId}`);
      },
    }),
  );

  const handleSubmit = function () {
    const trimmedTitle = values.title.trim();

    if (!trimmedTitle) {
      pushErrorMessages(['Title cannot be empty']);
      return;
    }

    createAttachment({
      Title: trimmedTitle,
      EditLock: values.editLock,
    });
  };

  return (
    <React.Fragment>
      <ToolbarButton design="Transparent" text="Create" onClick={() => setOpen(true)} />
      <Dialog
        open={open}
        resizable
        draggable
        headerText="Create Attachment"
        className="md:min-w-3xl relative"
        footer={
          <Bar
            design="Footer"
            endContent={
              <React.Fragment>
                <Button
                  design="Emphasized"
                  onClick={handleSubmit}
                  disabled={isPending || !values.title.trim()}
                  className="h-8"
                >
                  OK
                </Button>
                <Button design="Transparent" onClick={() => setOpen(false)} disabled={isPending} className="h-8">
                  Cancel
                </Button>
              </React.Fragment>
            }
          />
        }
      >
        <AttachmentForm value={values} onChange={setValues} inputClassName="md:w-full" />
        <BusyIndicator type="pending" show={isPending} />
      </Dialog>
    </React.Fragment>
  );
}
