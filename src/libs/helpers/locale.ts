function getAcceptLanguage() {
  const locale = navigator.language?.trim();

  if (!locale) {
    return 'en';
  }
  return locale.split('-')[0] || 'en';
}

export { getAcceptLanguage };
