'use strict';

/**
 * Validates a credit/debit card number using the Luhn checksum algorithm.
 * @param {string} value
 * @returns {boolean}
 */
function isValidCardNumber(value) {
  if (typeof value !== 'string') return false;
  const digits = value.replace(/[\s-]/g, '');
  if (!/^\d{12,19}$/.test(digits)) return false;

  let sum = 0;
  let shouldDouble = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = Number(digits[i]);
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
}

/**
 * Masks a card number, keeping only the last 4 digits visible,
 * e.g. "4111111111111111" -> "**** **** **** 1111".
 * @param {string} value
 * @returns {string|null}
 */
function maskCardNumber(value) {
  if (typeof value !== 'string') return null;
  const digits = value.replace(/[\s-]/g, '');
  if (!/^\d{12,19}$/.test(digits)) return null;
  const last4 = digits.slice(-4);
  const maskedLength = digits.length - 4;
  const groups = [];
  for (let i = 0; i < maskedLength; i += 4) {
    groups.push('*'.repeat(Math.min(4, maskedLength - i)));
  }
  groups.push(last4);
  return groups.join(' ');
}

module.exports = { isValidCardNumber, maskCardNumber };
