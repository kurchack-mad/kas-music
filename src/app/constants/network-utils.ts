export const getSettingFromStorageOrQueryParam = (key: string) => {
  const queryParams = new URLSearchParams(window.location.search);
  const queryValue = queryParams.get(key);
  if (queryValue !== null) {
    return queryValue;
  }
  const storedValue = localStorage.getItem(key);
  if (storedValue !== null) {
    return storedValue;
  }
  return null;
};
