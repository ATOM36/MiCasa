/**
 * @summary Whenever a new page is loaded, then it's path will be registered so that
 * if can be used directly if the same page is refreshed
 * @param location The new path the will be used if the page is refreshed
 */
export const setLocation = (location: string): void => {
  if (localStorage.getItem('loc') != null) localStorage.removeItem('loc');
  localStorage.setItem('loc', location);
};

/**
 * @summary Retrieves the latest `path` used by the `router` so that on `refresh`, the same page will be reloaded
 * @returns The current path used by the router
 */
export const getLocation = (): string | null => localStorage.getItem('loc');
