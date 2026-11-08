'use strict';

// Pragmatic (not fully RFC 5322-compliant) email check that catches the
// mistakes that actually show up in real-world form input.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * Checks whether a string looks like a valid email address.
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
  if (typeof email !== 'string') return false;
  const trimmed = email.trim();
  if (trimmed.length === 0 || trimmed.length > 254) return false;
  if (trimmed.includes('..')) return false;
  return EMAIL_RE.test(trimmed);
}

/**
 * Normalizes an email address: trims whitespace and lower-cases it.
 * Returns null for input that isn't a plausible email.
 * @param {string} email
 * @returns {string|null}
 */
function normalizeEmail(email) {
  if (!isValidEmail(email)) return null;
  return email.trim().toLowerCase();
}

module.exports = { isValidEmail, normalizeEmail };
