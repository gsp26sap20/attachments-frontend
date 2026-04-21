export function buildSelectWithDateTimeFields(selectedFieldIds: readonly string[]) {
  const expandedFieldIds = [...selectedFieldIds];
  const selectedFieldIdSet = new Set(selectedFieldIds);

  const addFieldIfMissing = function (fieldId: string) {
    if (selectedFieldIdSet.has(fieldId)) {
      return;
    }

    selectedFieldIdSet.add(fieldId);
    expandedFieldIds.push(fieldId);
  };

  if (selectedFieldIdSet.has('Erdat')) {
    addFieldIfMissing('Erzet');
  }

  if (selectedFieldIdSet.has('Erzet')) {
    addFieldIfMissing('Erdat');
  }

  if (selectedFieldIdSet.has('Aedat')) {
    addFieldIfMissing('Aezet');
  }

  if (selectedFieldIdSet.has('Aezet')) {
    addFieldIfMissing('Aedat');
  }

  return expandedFieldIds.join(',');
}
