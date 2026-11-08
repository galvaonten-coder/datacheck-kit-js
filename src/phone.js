'use strict';

/**
 * Checks whether a string is a plausible international phone number
 * (E.164-style: optional leading +, 8-15 digits).
 * @param {string} value
 * @returns {boolean}
 */
function isValidPhone(value) {
  if (typeof value !== 'string') return false;
  const digits = value.replace(/[\s\-().]/g, '');
  return /^\+?[1-9]\d{7,14}$/.test(digits);
}

/**
 * Formats a phone number into E.164 form (e.g. "+442071234567").
 * Assumes the number already includes a country code.
 * Returns null if the input isn't a plausible phone number.
 * @param {string} value
 * @returns {string|null}
 */
function formatPhoneE164(value) {
  if (!isValidPhone(value)) return null;
  const digits = value.replace(/[\s\-().]/g, '');
  return digits.startsWith('+') ? digits : `+${digits}`;
}

module.exports = { isValidPhone, formatPhoneE164 };
