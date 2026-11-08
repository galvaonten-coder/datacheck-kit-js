'use strict';

// Basic Latin diacritic map, enough for common Western/Northern European text.
const DIACRITICS = {
  á: 'a', à: 'a', â: 'a', ä: 'a', ã: 'a', å: 'a',
  é: 'e', è: 'e', ê: 'e', ë: 'e',
  í: 'i', ì: 'i', î: 'i', ï: 'i',
  ó: 'o', ò: 'o', ô: 'o', ö: 'o', õ: 'o',
  ú: 'u', ù: 'u', û: 'u', ü: 'u',
  ñ: 'n', ç: 'c', ý: 'y', ß: 'ss',
};

/**
 * Converts a string into a URL-friendly slug:
 * lower-cases, strips diacritics, and replaces non-alphanumeric
 * runs with a single hyphen.
 * @param {string} value
 * @returns {string}
 */
function slugify(value) {
  if (typeof value !== 'string') return '';
  const deaccented = value
    .toLowerCase()
    .split('')
    .map((ch) => DIACRITICS[ch] ?? ch)
    .join('');

  return deaccented
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

module.exports = { slugify };
