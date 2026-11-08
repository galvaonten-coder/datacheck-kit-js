'use strict';

const { isValidEmail, normalizeEmail } = require('./email');
const { isValidUrl, normalizeUrl } = require('./url');
const { isValidPhone, formatPhoneE164 } = require('./phone');
const { isValidIban, formatIban } = require('./iban');
const { isValidCardNumber, maskCardNumber } = require('./creditCard');
const { isValidPostalCode, supportedCountries } = require('./postalCode');
const { slugify } = require('./slug');

module.exports = {
  isValidEmail,
  normalizeEmail,
  isValidUrl,
  normalizeUrl,
  isValidPhone,
  formatPhoneE164,
  isValidIban,
  formatIban,
  isValidCardNumber,
  maskCardNumber,
  isValidPostalCode,
  supportedCountries,
  slugify,
};
