import { twMerge } from 'tailwind-merge';
import clsx, { type ClassValue } from 'clsx';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

function formatFileSize(bytes: number | string | undefined, decimals = 2) {
  const numBytes = typeof bytes === 'string' ? Number(bytes) : bytes;
  if (!numBytes || isNaN(numBytes)) return '0 Bytes';

  const k = 1024;

  if (numBytes < k) {
    return numBytes + ' Bytes';
  }

  if (numBytes < k * k) {
    return (numBytes / k).toFixed(decimals) + ' KB';
  }

  return (numBytes / (k * k)).toFixed(decimals) + ' MB';
}

export { cn, formatFileSize };
