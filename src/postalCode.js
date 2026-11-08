'use strict';

// A pragmatic (not exhaustive) set of postal code patterns for a handful
// of European countries.
const PATTERNS = {
  NL: /^\d{4}\s?[A-Z]{2}$/i,
  PL: /^\d{2}-\d{3}$/,
  DE: /^\d{5}$/,
  FR: /^\d{5}$/,
  IT: /^\d{5}$/,
  AT: /^\d{4}$/,
  CH: /^\d{4}$/,
  GB: /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i,
  ES: /^\d{5}$/,
  FI: /^\d{5}$/,
  US: /^\d{5}(-\d{4})?$/,
};

/**
 * Validates a postal/ZIP code against the pattern for a given
 * ISO 3166-1 alpha-2 country code.
 * @param {string} value
 * @param {string} countryCode e.g. "NL", "GB", "DE"
 * @returns {boolean}
 */
function isValidPostalCode(value, countryCode) {
  if (typeof value !== 'string' || typeof countryCode !== 'string') return false;
  const pattern = PATTERNS[countryCode.toUpperCase()];
  if (!pattern) return false;
  return pattern.test(value.trim());
}

/**
 * Returns the list of country codes this module has a pattern for.
 * @returns {string[]}
 */
function supportedCountries() {
  return Object.keys(PATTERNS);
}

module.exports = { isValidPostalCode, supportedCountries };
