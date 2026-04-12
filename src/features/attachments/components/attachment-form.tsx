import * as React from 'react';
import { cn } from '@/libs/utils';
import { Input } from '@ui5/webcomponents-react/Input';
import { Label } from '@ui5/webcomponents-react/Label';
import { CheckBox } from '@ui5/webcomponents-react/CheckBox';

export type AttachmentFormValues = {
  title: string;
  editLock: boolean;
};

interface AttachmentFormProps {
  value: AttachmentFormValues;
  onChange: (_nextValue: AttachmentFormValues) => void;
  className?: string;
  fieldClassName?: string;
  inputClassName?: string;
}

export function AttachmentForm({ value, onChange, className, fieldClassName, inputClassName }: AttachmentFormProps) {
  const id = React.useId();

  return (
    <div className={cn('space-y-2', className)}>
      <div className={cn('flex flex-col', fieldClassName)}>
        <Label showColon required for={`${id}-title`}>
          Title
        </Label>
        <Input
          id={`${id}-title`}
          required
          className={cn('w-full md:w-8/10', inputClassName)}
          value={value.title}
          onInput={(event) =>
            onChange({
              ...value,
              title: event.target.value,
            })
          }
        />
      </div>
      <div className={cn('flex flex-col', fieldClassName)}>
        <Label for={`${id}-edit-lock`} showColon>
          Edit Lock
        </Label>
        <CheckBox
          id={`${id}-edit-lock`}
          checked={value.editLock}
          text="Enable edit lock"
          onChange={(event) =>
            onChange({
              ...value,
              editLock: event.target.checked ?? false,
            })
          }
        />
      </div>
    </div>
  );
}
