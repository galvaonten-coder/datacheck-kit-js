'use strict';

/**
 * Checks whether a string is a syntactically valid http(s) URL.
 * @param {string} value
 * @returns {boolean}
 */
function isValidUrl(value) {
  if (typeof value !== 'string' || value.trim().length === 0) return false;
  try {
    const url = new URL(value.trim());
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

/**
 * Normalizes a URL: adds https:// if the protocol is missing,
 * lower-cases the host, and strips a trailing slash from the path.
 * Returns null if the input can't be turned into a valid URL.
 * @param {string} value
 * @returns {string|null}
 */
function normalizeUrl(value) {
  if (typeof value !== 'string' || value.trim().length === 0) return null;
  let candidate = value.trim();
  if (!/^https?:\/\//i.test(candidate)) {
    candidate = `https://${candidate}`;
  }
  try {
    const url = new URL(candidate);
    if (url.protocol !== 'http:' && url.protocol !== 'https:') return null;
    url.hostname = url.hostname.toLowerCase();
    let result = url.toString();
    if (result.endsWith('/') && url.pathname === '/' && !url.search && !url.hash) {
      result = result.slice(0, -1);
    }
    return result;
  } catch {
    return null;
  }
}

module.exports = { isValidUrl, normalizeUrl };
