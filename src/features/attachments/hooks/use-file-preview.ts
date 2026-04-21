import { useMemo } from 'react';
import * as helper from '../helpers/preview-file';

export function useFilePreview(mimeType?: string, fileContent?: string, fileName?: string) {
  return useMemo(() => {
    return {
      isEmpty: !helper.hasValue(fileContent),

      isImage: helper.isImagePreviewable(mimeType, fileContent),
      isPdf: helper.isPdfPreviewable(mimeType, fileContent),
      isText: helper.isTextPreviewable(mimeType, fileContent),
      isUnsupported: helper.isUnsupportedPreview(mimeType, fileContent),

      dataUrl: helper.toDataUrl(mimeType, fileContent),
      textContent: helper.toTextContent(mimeType, fileContent),
      pdfHtml: helper.toPdfHtml(mimeType, fileContent, fileName),
    };
  }, [mimeType, fileContent, fileName]);
}
