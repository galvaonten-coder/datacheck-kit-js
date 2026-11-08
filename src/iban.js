'use strict';

// Expected IBAN length per country, ISO 3166-1 alpha-2 keyed.
const IBAN_LENGTHS = {
  AT: 20, BE: 16, CH: 21, DE: 22, ES: 24, FI: 18, FR: 27,
  GB: 22, IT: 27, NL: 18, PL: 28, PT: 25, IE: 22, LU: 20,
};

/**
 * Validates an IBAN using the standard mod-97 checksum (ISO 7064).
 * @param {string} value
 * @returns {boolean}
 */
function isValidIban(value) {
  if (typeof value !== 'string') return false;
  const iban = value.replace(/\s+/g, '').toUpperCase();
  if (!/^[A-Z]{2}\d{2}[A-Z0-9]+$/.test(iban)) return false;

  const country = iban.slice(0, 2);
  const expectedLength = IBAN_LENGTHS[country];
  if (expectedLength && iban.length !== expectedLength) return false;

  // Move the first 4 characters to the end, then convert letters to numbers
  // (A=10, B=11, ... Z=35) and check the result mod 97 === 1.
  const rearranged = iban.slice(4) + iban.slice(0, 4);
  const numeric = rearranged.replace(/[A-Z]/g, (ch) => String(ch.charCodeAt(0) - 55));

  let remainder = 0;
  for (let i = 0; i < numeric.length; i += 7) {
    remainder = Number(String(remainder) + numeric.slice(i, i + 7)) % 97;
  }
  return remainder === 1;
}

/**
 * Formats an IBAN into groups of 4 characters for display,
 * e.g. "NL91ABNA0417164300" -> "NL91 ABNA 0417 1643 00".
 * @param {string} value
 * @returns {string}
 */
function formatIban(value) {
  const iban = String(value).replace(/\s+/g, '').toUpperCase();
  return iban.replace(/(.{4})/g, '$1 ').trim();
}

module.exports = { isValidIban, formatIban };
