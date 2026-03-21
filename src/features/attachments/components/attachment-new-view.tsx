import * as React from "react";
import { useNavigate } from "react-router";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ObjectPage } from "@ui5/webcomponents-react/ObjectPage";
import { ObjectPageHeader } from "@ui5/webcomponents-react/ObjectPageHeader";
import { ObjectPageTitle } from "@ui5/webcomponents-react/ObjectPageTitle";
import { Breadcrumbs } from "@ui5/webcomponents-react/Breadcrumbs";
import { BreadcrumbsItem } from "@ui5/webcomponents-react/BreadcrumbsItem";
import { Toolbar } from "@ui5/webcomponents-react/Toolbar";
import { ToolbarButton } from "@ui5/webcomponents-react/ToolbarButton";
import { Title } from "@ui5/webcomponents-react/Title";
import { FlexBox } from "@ui5/webcomponents-react/FlexBox";
import { Label } from "@ui5/webcomponents-react/Label";
import { Button } from "@ui5/webcomponents-react/Button";
import { Input } from "@ui5/webcomponents-react/Input";
import { CheckBox } from "@ui5/webcomponents-react/CheckBox";
import { Toast } from "@ui5/webcomponents-react/Toast";
import { BusyIndicator } from "@ui5/webcomponents-react/BusyIndicator";
import { createAttachmentMutationOptions } from "../options/mutation";
import type { CreateAttachmentPayload } from "../types";
import "@ui5/webcomponents-icons/decline.js";

export function AttachmentNewView() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [formData, setFormData] = React.useState<CreateAttachmentPayload>({
    Title: "",
    EditLock: false,
  });
  const [toastVisible, setToastVisible] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState("");

  const { mutate: createAttachment, isPending: isCreating } = useMutation(
    createAttachmentMutationOptions({
      onSuccess: (data) => {
        queryClient.invalidateQueries({
          queryKey: ["attachments"],
        });
        navigate(`/Attachments/${data.FileId}`);
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        setToastMessage(error?.response?.data?.error?.message || error.message);
        setToastVisible(true);
      },
    }),
  );

  const handleCreate = () => {
    const trimmedTitle = formData.Title.trim();

    if (!trimmedTitle) {
      setToastMessage("Title cannot be empty");
      setToastVisible(true);
      return;
    }

    createAttachment({
      Title: trimmedTitle,
      EditLock: formData.EditLock,
    });
  };

  return (
    <div className="relative">
      <ObjectPage
        headerArea={
          <ObjectPageHeader>
            <FlexBox
              alignItems="End"
              justifyContent="Start"
              wrap="Wrap"
              className="p-2"
              style={{ gap: "1rem" }}
            >
              <FlexBox
                direction="Column"
                style={{ minWidth: "20rem", flex: 1 }}
              >
                <Label>Title</Label>
                <Input
                  value={formData.Title}
                  placeholder="Enter attachment title"
                  onInput={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      Title: e.target.value,
                    }))
                  }
                  style={{ width: "50%" }}
                />
              </FlexBox>
              <FlexBox direction="Column" style={{ minWidth: "12rem" }}>
                <Label>Edit Lock</Label>
                <CheckBox
                  checked={formData.EditLock}
                  text="Enable edit lock"
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      EditLock: e.target.checked ?? false,
                    }))
                  }
                />
              </FlexBox>
            </FlexBox>
          </ObjectPageHeader>
        }
        mode="Default"
        onBeforeNavigate={function fQ() {}}
        hidePinButton={true}
        onSelectedSectionChange={function fQ() {}}
        onToggleHeaderArea={function fQ() {}}
        titleArea={
          <ObjectPageTitle
            actionsBar={
              <Toolbar design="Transparent" style={{ height: "auto" }}>
                <ToolbarButton
                  design="Emphasized"
                  text="Create"
                  onClick={handleCreate}
                  disabled={isCreating || !formData.Title.trim()}
                />
                <ToolbarButton
                  design="Transparent"
                  text="Cancel"
                  onClick={() => navigate("/Attachments")}
                  disabled={isCreating}
                />
              </Toolbar>
            }
            breadcrumbs={
              <Breadcrumbs onItemClick={() => navigate("/Attachments")}>
                <BreadcrumbsItem>Attachments</BreadcrumbsItem>
                <BreadcrumbsItem>New Attachment</BreadcrumbsItem>
              </Breadcrumbs>
            }
            header={<Title level="H2">New Attachment</Title>}
            navigationBar={
              <Button
                accessibleName="Close"
                design="Transparent"
                icon="decline"
                tooltip="Close"
                onClick={() => navigate("/Attachments")}
              />
            }
          />
        }
      />
      <Toast
        open={toastVisible}
        onClose={() => setToastVisible(false)}
        duration={2000}
        className="py-1 px-2"
      >
        {toastMessage}
      </Toast>
      {isCreating && (
        <FlexBox
          alignItems="Center"
          justifyContent="Center"
          style={{
            padding: "1rem",
            minHeight: "50dvh",
            position: "absolute",
            inset: 0,
          }}
        >
          <BusyIndicator delay={0} active size="L" />
        </FlexBox>
      )}
    </div>
  );
}
