// Returns the editable file name by removing the extension suffix (if present).
// This is typically used for UI input fields where users should only edit
// the base name without the file extension.
function getEditableFileName(fileName: string, extension: string) {
  if (!extension) return fileName;

  const suffix = `.${extension}`;

  if (fileName.length > suffix.length && fileName.toLowerCase().endsWith(suffix.toLowerCase())) {
    return fileName.slice(0, -suffix.length);
  }

  return fileName;
}

// Builds the full file name by ensuring the correct extension is appended.
// If the file name already ends with the given extension (case-insensitive),
// it will not be duplicated.
function buildFileName(fileName: string, extension: string) {
  if (!extension) return fileName;

  const suffix = `.${extension}`;

  if (fileName.toLowerCase().endsWith(suffix.toLowerCase())) {
    return fileName;
  }

  return `${fileName}${suffix}`;
}

export { getEditableFileName, buildFileName };
