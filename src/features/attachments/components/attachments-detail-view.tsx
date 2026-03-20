import { useParams } from "react-router";
import { ObjectPage } from "@ui5/webcomponents-react/ObjectPage";
import { ObjectPageHeader } from "@ui5/webcomponents-react/ObjectPageHeader";
import { ObjectPageTitle } from "@ui5/webcomponents-react/ObjectPageTitle";
import { ObjectPageSection } from "@ui5/webcomponents-react/ObjectPageSection";
import { Toolbar } from "@ui5/webcomponents-react/Toolbar";
import { ToolbarButton } from "@ui5/webcomponents-react/ToolbarButton";
import { Breadcrumbs } from "@ui5/webcomponents-react/Breadcrumbs";
import { BreadcrumbsItem } from "@ui5/webcomponents-react/BreadcrumbsItem";
import { Title } from "@ui5/webcomponents-react/Title";
import { FlexBox } from "@ui5/webcomponents-react/FlexBox";
import { Label } from "@ui5/webcomponents-react/Label";
import { Text } from "@ui5/webcomponents-react/Text";
// import { Form } from "@ui5/webcomponents-react/Form";
// import { FormGroup } from "@ui5/webcomponents-react/FormGroup";
// import { FormItem } from "@ui5/webcomponents-react/FormItem";
import { Button } from "@ui5/webcomponents-react/Button";
import "@ui5/webcomponents-icons/decline.js";
import "@ui5/webcomponents-icons/share.js";
import { useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { getAttachmentDetailQueryOptions } from "../options/query";
import { BusyIndicator } from "@ui5/webcomponents-react/BusyIndicator";
import { FilePreview } from "./file-preview";
import { AttachmentAudit } from "./attachment-audit";
import { AttachmentVersion } from "./attachment-version";

export function AttachmentsDetailView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: attachment, isLoading } = useQuery(
    getAttachmentDetailQueryOptions(id!, {
      "sap-client": 324,
      $select:
        "CurrentVersion,Erdat,Ernam,FileId,IsActive,Title,__EntityControl/Deletable,__EntityControl/Updatable",
      $expand:
        "_CurrentVersion($select=FileContent,FileId,FileName,MimeType,VersionNo)",
    }),
  );

  return (
    <ObjectPage
      headerArea={
        <ObjectPageHeader>
          <FlexBox
            alignItems="Center"
            justifyContent="SpaceBetween"
            wrap="Wrap"
            className="p-2"
          >
            <FlexBox direction="Column" className="w-1/2">
              <Label>Current Version</Label>
              <Text>{attachment?.CurrentVersion}</Text>
            </FlexBox>
            <FlexBox direction="Column" className="w-1/2">
              <Label>Is Active</Label>
              <Text>
                {attachment ? (attachment?.IsActive ? "Yes" : "No") : ""}
              </Text>
            </FlexBox>
          </FlexBox>
          <FlexBox
            alignItems="Center"
            justifyContent="SpaceBetween"
            wrap="Wrap"
            className="p-2"
          >
            <FlexBox direction="Column" className="w-1/2">
              <Label>Created On</Label>
              <Text>{attachment?.Erdat}</Text>
            </FlexBox>
            <FlexBox direction="Column" className="w-1/2">
              <Label>Created By</Label>
              <Text>{attachment?.Ernam}</Text>
            </FlexBox>
          </FlexBox>
        </ObjectPageHeader>
      }
      image={
        <FilePreview
          mimeType={attachment?._CurrentVersion?.MimeType}
          fileContent={attachment?._CurrentVersion?.FileContent}
          fileName={attachment?._CurrentVersion?.FileName}
          className="aspect-square"
          onlyImage={true}
        />
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
                text="Edit"
                disabled={!attachment?.__EntityControl?.Updatable}
              />
              <ToolbarButton
                design="Transparent"
                text="Delete"
                disabled={!attachment?.__EntityControl?.Deletable}
              />
            </Toolbar>
          }
          breadcrumbs={
            <Breadcrumbs onItemClick={() => navigate("/Attachments")}>
              <BreadcrumbsItem>Attachments</BreadcrumbsItem>
              <BreadcrumbsItem>
                {isLoading
                  ? "Loading..."
                  : attachment?.Title || "Unnamed Object"}
              </BreadcrumbsItem>
            </Breadcrumbs>
          }
          header={
            <Title level="H2">
              {isLoading ? "Loading..." : attachment?.Title || "Unnamed Object"}
            </Title>
          }
          subHeader={
            isLoading ? "Loading..." : attachment?.FileId || "Unnamed Object"
          }
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
    >
      {isLoading && (
        <FlexBox
          alignItems="Center"
          justifyContent="Center"
          style={{ padding: "1rem", minHeight: "50dvh" }}
        >
          <BusyIndicator delay={0} active size="L" />
        </FlexBox>
      )}
      <ObjectPageSection
        aria-label="Versions"
        id="versions"
        titleText="Versions"
        style={{ display: isLoading ? "none" : "block" }}
      >
        <AttachmentVersion fileId={id!} />
      </ObjectPageSection>
      <ObjectPageSection
        aria-label="Audit"
        id="audit"
        titleText="Audit"
        style={{ display: isLoading ? "none" : "block" }}
      >
        <AttachmentAudit fileId={id!} />
      </ObjectPageSection>
      {/* <ObjectPageSection
        aria-label="Goals"
        id="goals"
        titleText="Goals"
        style={{ display: isLoading ? "none" : "block" }}
      >
        <Form labelSpan="S12 M12 L12 XL12" layout="S1 M2 L3 XL3">
          <FormItem
            labelContent={
              <Label showColon>
                Evangelize the UI framework across the company
              </Label>
            }
          >
            <Text>4 days overdue - Cascaded</Text>
          </FormItem>
          <FormItem
            labelContent={
              <Label showColon>
                Get trained in development management direction
              </Label>
            }
          >
            <Text>Due Nov, 21</Text>
          </FormItem>
          <FormItem
            labelContent={<Label showColon>Mentor junior developers</Label>}
          >
            <Text>Due Dec, 31 - Cascaded</Text>
          </FormItem>
        </Form>
      </ObjectPageSection>
      <ObjectPageSection
        aria-label="Personal"
        id="personal"
        titleText="Personal"
        style={{ display: isLoading ? "none" : "block" }}
      >
        <Form
          style={{
            alignItems: "baseline",
          }}
        >
          <FormGroup headerText="Phone Numbers">
            <FormItem labelContent={<Label showColon>Home</Label>}>
              <Text>+1 234-567-8901</Text>
              <Text>+1 234-567-5555</Text>
            </FormItem>
          </FormGroup>
          <FormGroup headerText="Social Accounts">
            <FormItem labelContent={<Label showColon>LinkedIn</Label>}>
              <Text>/DeniseSmith</Text>
            </FormItem>
            <FormItem labelContent={<Label showColon>Twitter</Label>}>
              <Text>@DeniseSmith</Text>
            </FormItem>
          </FormGroup>
          <FormGroup headerText="Addresses">
            <FormItem labelContent={<Label showColon>Home Address</Label>}>
              <Text>2096 Mission Street</Text>
            </FormItem>
            <FormItem labelContent={<Label showColon>Mailing Address</Label>}>
              <Text>PO Box 32114</Text>
            </FormItem>
          </FormGroup>
          <FormGroup headerText="Mailing Address">
            <FormItem labelContent={<Label showColon>Work</Label>}>
              <Text>DeniseSmith@sap.com</Text>
            </FormItem>
          </FormGroup>
        </Form>
      </ObjectPageSection> */}
      <ObjectPageSection
        aria-label="File Preview"
        id="file-preview"
        titleText="File Preview"
        style={{ display: isLoading ? "none" : "block" }}
      >
        <div className="p-2 rounded-lg bg-background">
          <FilePreview
            mimeType={attachment?._CurrentVersion?.MimeType}
            fileContent={attachment?._CurrentVersion?.FileContent}
            fileName={attachment?._CurrentVersion?.FileName}
          />
        </div>
      </ObjectPageSection>
    </ObjectPage>
  );
}
