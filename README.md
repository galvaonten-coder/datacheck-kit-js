# datacheck-kit

A small, zero-dependency toolkit for validating and formatting the kinds of
data that show up in almost every form or import script: email addresses,
phone numbers, URLs, IBANs, credit card numbers, postal codes and slugs.

It exists because most projects end up copy-pasting the same handful of
regexes and checksum functions from Stack Overflow over and over. This
package collects the ones I keep reaching for into one place, with tests,
no runtime dependencies, and both CommonJS and plain function exports.

## Install

```bash
npm install datacheck-kit
```

## Usage

```js
const dk = require('datacheck-kit');

dk.isValidEmail('user@example.com');       // true
dk.normalizeEmail('  User@Example.COM ');  // 'user@example.com'

dk.isValidUrl('example.com');              // false (no protocol)
dk.normalizeUrl('example.com/path/');      // 'https://example.com/path/'

dk.isValidPhone('+44 20 7123 4567');       // true
dk.formatPhoneE164('+44 20 7123 4567');    // '+442071234567'

dk.isValidIban('NL91ABNA0417164300');      // true
dk.formatIban('NL91ABNA0417164300');       // 'NL91 ABNA 0417 1643 00'

dk.isValidCardNumber('4111 1111 1111 1111'); // true (Luhn check)
dk.maskCardNumber('4111111111111111');       // '**** **** **** 1111'

dk.isValidPostalCode('1011 AB', 'NL');     // true
dk.supportedCountries();                   // ['NL', 'PL', 'DE', ...]

dk.slugify('Café Müller & Söhne');         // 'cafe-muller-sohne'
```

## API

### Email
- `isValidEmail(value: string): boolean`
- `normalizeEmail(value: string): string | null`

### URL
- `isValidUrl(value: string): boolean`
- `normalizeUrl(value: string): string | null`

### Phone
- `isValidPhone(value: string): boolean` — accepts E.164-style numbers
  (optional leading `+`, 8-15 digits, common separators allowed).
- `formatPhoneE164(value: string): string | null`

### IBAN
- `isValidIban(value: string): boolean` — validates the mod-97 (ISO 7064)
  checksum and checks length against the issuing country when known.
- `formatIban(value: string): string` — groups the IBAN into 4-character
  blocks for display.

### Credit card
- `isValidCardNumber(value: string): boolean` — Luhn algorithm.
- `maskCardNumber(value: string): string | null` — keeps only the last 4
  digits visible.

### Postal code
- `isValidPostalCode(value: string, countryCode: string): boolean` —
  supports NL, PL, DE, FR, IT, AT, CH, GB, ES, FI, US.
- `supportedCountries(): string[]`

### Slug
- `slugify(value: string): string` — lower-cases, strips common Latin
  diacritics, and collapses everything else into hyphens.

## Why not a bigger validation library?

Libraries like `validator.js` cover far more ground, and are a better fit
if you need everything they offer. `datacheck-kit` is for the common case:
you need five or six of these checks, you don't want a large dependency
tree for them, and you'd rather read the source in a couple of minutes
than look up documentation.

## Testing

```bash
npm test
```

Runs the suite with Node's built-in test runner (`node:test`) — no test
framework dependency required.

## License

MIT © see [LICENSE](./LICENSE)
