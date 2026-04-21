import { formatDate } from '@/libs/utils';

type SapDateTimeValue = string | null | undefined;

type DisplayDateTimeParams = {
  fallback: string;
  mode: 'date' | 'time';
  formatOptions: Intl.DateTimeFormatOptions;
};

function displayDateTime(date: SapDateTimeValue, time: SapDateTimeValue, params: DisplayDateTimeParams) {
  const { fallback, mode, formatOptions } = params;

  return formatDate({
    date,
    time,
    fallback,
    options: {
      mode,
      formatOptions,
    },
  });
}

function displayListDate(date?: SapDateTimeValue, time?: SapDateTimeValue) {
  return displayDateTime(date, time, {
    fallback: '',
    mode: 'date',
    formatOptions: { dateStyle: 'medium' },
  });
}

function displayDetailDate(date?: SapDateTimeValue, time?: SapDateTimeValue) {
  return displayDateTime(date, time, {
    fallback: '–',
    mode: 'date',
    formatOptions: { dateStyle: 'long' },
  });
}

function displayListTime(date?: SapDateTimeValue, time?: SapDateTimeValue) {
  return displayDateTime(date, time, {
    fallback: '',
    mode: 'time',
    formatOptions: { timeStyle: 'short' },
  });
}

function displayDetailTime(date?: SapDateTimeValue, time?: SapDateTimeValue) {
  return displayDateTime(date, time, {
    fallback: '–',
    mode: 'time',
    formatOptions: { timeStyle: 'medium' },
  });
}

export { displayListDate, displayDetailDate, displayListTime, displayDetailTime };
