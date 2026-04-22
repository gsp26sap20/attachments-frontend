type FormatShortIdOptions = {
  head?: number;
  tail?: number;
  fallback?: string;
};

const PLAIN_UUID_REGEX = /^[0-9a-fA-F]{32}$/;
const HYPHENATED_UUID_REGEX = /^[0-9a-fA-F]{8}-(?:[0-9a-fA-F]{4}-){3}[0-9a-fA-F]{12}$/;

export function normalizeUuid(value?: string | null) {
  const normalized = value?.trim();

  if (!normalized) {
    return null;
  }

  if (HYPHENATED_UUID_REGEX.test(normalized)) {
    return normalized.toLowerCase();
  }

  if (!PLAIN_UUID_REGEX.test(normalized)) {
    return null;
  }

  return [
    normalized.slice(0, 8),
    normalized.slice(8, 12),
    normalized.slice(12, 16),
    normalized.slice(16, 20),
    normalized.slice(20),
  ]
    .join('-')
    .toLowerCase();
}

export function formatShortId(value?: string | null, options?: FormatShortIdOptions) {
  const normalized = value?.trim();
  const head = options?.head ?? 4;
  const tail = options?.tail ?? 8;
  const fallback = options?.fallback ?? '-';

  if (!normalized) {
    return fallback;
  }

  if (normalized.length <= head + tail) {
    return normalized;
  }

  return `${normalized.slice(0, head)}...${normalized.slice(-tail)}`;
}
