import * as React from "react";
import { cn } from "@/libs/utils";
import { FileUploader } from "@ui5/webcomponents-react/FileUploader";
import { Button } from "@ui5/webcomponents-react/Button";
import { FlexBox } from "@ui5/webcomponents-react/FlexBox";
import { MessageStrip } from "@ui5/webcomponents-react/MessageStrip";
import { FilePreview } from "./file-preview";
import "@ui5/webcomponents-icons/add.js";
import "@ui5/webcomponents-icons/decline.js";
import type { UploadedFileData } from "../types";

const MAX_SIZE = 5 * 1024 * 1024; // 5MB

function getFileExtension(fileName: string) {
  const lastDot = fileName.lastIndexOf(".");
  if (lastDot === -1) return "";
  return fileName.slice(lastDot + 1);
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      const result = reader.result;
      if (typeof result !== "string") {
        reject(new Error("Cannot read file"));
        return;
      }

      const base64 = result.split(",")[1] ?? "";
      resolve(base64);
    };

    reader.onerror = () => reject(reader.error);
    reader.readAsDataURL(file);
  });
}

interface UploadVersionProps {
  className?: string;
  onUpload?: (fileData: UploadedFileData) => void;
  onCancel?: () => void;
}

export function UploadVersion({
  className,
  onUpload,
  onCancel,
}: UploadVersionProps) {
  const [fileData, setFileData] = React.useState<UploadedFileData | null>(null);
  const [error, setError] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = async (e: any) => {
    const file: File | undefined = e.target?.files?.[0];
    if (!file) return;

    setError(null);
    setFileData(null);

    if (file.size > MAX_SIZE) {
      setError("File exceeds 5MB, please select a smaller file.");
      return;
    }

    try {
      setLoading(true);
      const base64 = await fileToBase64(file);
      const payload: UploadedFileData = {
        FileName: file.name,
        FileExtension: getFileExtension(file.name),
        MimeType: file.type || "application/octet-stream",
        FileSize: file.size,
        FileContent: base64,
      };
      setFileData(payload);
      onUpload?.(payload);
    } catch (err) {
      console.error(err);
      setError("Can't read file");
    } finally {
      setLoading(false);
    }
  };

  return (
    <FlexBox
      direction="Column"
      alignItems="Center"
      justifyContent="Center"
      style={{ gap: "1rem" }}
      className={cn("w-full", className)}
    >
      {!fileData && (
        <FileUploader hideInput onChange={handleChange}>
          <Button disabled={loading} design="Positive" icon="add">
            {loading ? "Processing..." : "Choose file"}
          </Button>
        </FileUploader>
      )}
      {fileData && (
        <FlexBox
          direction="Row"
          alignItems="Center"
          justifyContent="SpaceBetween"
        >
          <Button
            design="Negative"
            icon="decline"
            onClick={() => {
              setFileData(null);
              setError(null);
              onCancel?.();
            }}
          >
            Cancel
          </Button>
        </FlexBox>
      )}
      {!fileData && (
        <MessageStrip design="Information">
          Upload a new version of the file. The file must be less than 5MB.
        </MessageStrip>
      )}
      {error && <MessageStrip design="Negative">{error}</MessageStrip>}
      {fileData && (
        <FilePreview
          mimeType={fileData.MimeType}
          fileContent={fileData.FileContent}
          fileName={fileData.FileName}
        />
      )}
    </FlexBox>
  );
}
