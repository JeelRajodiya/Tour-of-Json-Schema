I have tried several JSON schema validators and tested them for verbosity in errors both syntex and mis-match in the schema and data

## Error Verbosity

**Silent**: No error messages are displayed; errors are logged without any output to the user interface.

**Minimal**: Basic error messages are provided, typically indicating only the type of error without additional context or details.

**Standard**: Provides enough information to understand the error and its context, including the location of the error and a brief description.

**Verbose**: Offers detailed error messages with additional context, such as stack traces or relevant variable values, to aid in troubleshooting.

**Debug**: Provides extensive information useful for debugging purposes, including detailed diagnostic messages, verbose output, and additional logging.

| Validator                                                          | Syntax Error | Mismatch Error |
| ------------------------------------------------------------------ | ------------ | -------------- |
| [jsonschema](https://www.npmjs.com/package/jsonschema)             | ❌ Silent    | ✅ Verbose     |
| [ajv](https://www.npmjs.com/package/ajv)                           | ✅ Standard  | ✅ Verbpse     |
| [tv4](https://www.npmjs.com/package/tv4)                           | ❌ Silent    | ✅ Standard    |
| [djv](https://www.npmjs.com/package/djv)                           | ❌ Silent    | ✅ Minimal     |
| [jsen](https://www.npmjs.com/package/jsen)                         | ❌ Silent    | ✅ Minimal     |
| [is-my-json-valid](https://www.npmjs.com/package/is-my-json-valid) | ✅ Standard  | ✅ Minimal     |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema)  | ✅ Standard  | ❌ Silent      |
