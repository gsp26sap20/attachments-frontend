function normalizeBase64(value?: string): string {
  return typeof value === 'string' ? value.replace(/\s+/g, '').replace(/-/g, '+').replace(/_/g, '/') : '';
}

function hasValue(value?: string): boolean {
  return !!normalizeBase64(value);
}

function isMimeType(mimeType?: string, pattern?: RegExp): boolean {
  return typeof mimeType === 'string' && !!pattern?.test(mimeType);
}

function toDataUrl(mimeType?: string, fileContent?: string): string {
  const normalized = normalizeBase64(fileContent);

  if (!mimeType || !normalized) return '';

  return `data:${mimeType};base64,${normalized}`;
}

function decodeBase64ToText(fileContent?: string): string {
  const normalized = normalizeBase64(fileContent);
  if (!normalized) return '';

  try {
    const binary = atob(normalized);
    const bytes = new Uint8Array(binary.length);

    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }

    if (window.TextDecoder) {
      return new TextDecoder('utf-8').decode(bytes);
    }

    let escaped = '';
    for (let i = 0; i < bytes.length; i++) {
      escaped += '%' + ('00' + bytes[i].toString(16)).slice(-2);
    }

    return decodeURIComponent(escaped);
  } catch {
    return '';
  }
}

function escapeHtml(value?: string): string {
  return String(value || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// ===== preview type checks =====

function isImagePreviewable(mime?: string, content?: string) {
  return hasValue(content) && isMimeType(mime, /^image\//i);
}

function isPdfPreviewable(mime?: string, content?: string) {
  return hasValue(content) && isMimeType(mime, /^application\/pdf$/i);
}

function isTextPreviewable(mime?: string, content?: string) {
  return hasValue(content) && isMimeType(mime, /^(text\/|application\/(?:json|xml|javascript|xhtml\+xml))/i);
}

function isUnsupportedPreview(mime?: string, content?: string) {
  return (
    hasValue(content) &&
    !isImagePreviewable(mime, content) &&
    !isPdfPreviewable(mime, content) &&
    !isTextPreviewable(mime, content)
  );
}

// ===== render helpers =====

function toPdfHtml(mime?: string, content?: string, fileName?: string) {
  const src = toDataUrl(mime, content);

  if (!src || !isPdfPreviewable(mime, content)) return '';

  return `
    <div style="height:70vh;min-height:28rem;">
      <iframe 
        src="${src}#toolbar=1&navpanes=0"
        title="${escapeHtml(fileName || 'PDF preview')}"
        style="width:100%;height:100%;border:none;background:#fff;"
      ></iframe>
    </div>
  `;
}

function toTextContent(mime?: string, content?: string) {
  if (!isTextPreviewable(mime, content)) return '';
  return decodeBase64ToText(content);
}

export {
  hasValue,
  toDataUrl,
  isImagePreviewable,
  isPdfPreviewable,
  isTextPreviewable,
  isUnsupportedPreview,
  toPdfHtml,
  toTextContent,
};
