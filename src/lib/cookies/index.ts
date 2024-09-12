import Cookies from 'js-cookie';

/**
 * Set a cookie
 * @param {string} key - The name of the cookie.
 * @param {string} value - The value to be stored in the cookie.
 * @param {Cookies.CookieAttributes} options - Options cookies attribute.
 */
export const setCookie = (key: string, value: string, options?: Cookies.CookieAttributes): void => {
  Cookies.set(key, value, { ...options, expires: options?.expires ?? 7 });
};

/**
 * Get a cookie by name
 * @param {string} key - The name of the cookie to retrieve.
 * @returns {string | undefined} - The value of the cookie, or undefined if not found.
 */
export const getCookie = (key: string): string | undefined => {
  return Cookies.get(key);
};

/**
 * Get all cookies
 * @returns {Record<string, string>} - An object containing all cookies.
 */
export const getCookies = (): Record<string, string> => {
  return Cookies.get();
};

/**
 * Check if a cookie exists
 * @param {string} key - The name of the cookie to check.
 * @returns {boolean} - True if the cookie exists, false otherwise.
 */
export const isCookieExist = (key: string): boolean => {
  return Cookies.get(key) !== undefined;
};

/**
 * Remove a cookie by name
 * @param {string} key - The name of the cookie to remove.
 */
export const removeCookie = (key: string): void => {
  Cookies.remove(key);
};
