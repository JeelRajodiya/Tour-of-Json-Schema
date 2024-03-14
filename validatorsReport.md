I have tried several JSON schema validators and tested them for verbosity in errors both syntex and mis-match in the schema and data

## Error Verbosity

**Silent**: No error messages are displayed.

**Minimal**: Basic error messages are provided, typically indicating only the type of error without additional context or details.

**Standard**: Provides enough information to understand the error and its context, including the location of the error and a brief description.

**Verbose**: Offers detailed error messages with additional context, such as stack traces or relevant variable values, to aid in troubleshooting.

| Validator                                                          | Syntax Error | Mismatch Error |
| ------------------------------------------------------------------ | ------------ | -------------- |
| [jsonschema](https://www.npmjs.com/package/jsonschema)             | ❌ Silent    | ✅ Verbose     |
| [ajv](https://www.npmjs.com/package/ajv)                           | ✅ Standard  | ✅ Minimal     |
| [tv4](https://www.npmjs.com/package/tv4)                           | ❌ Silent    | ✅ Minimal     |
| [djv](https://www.npmjs.com/package/djv)                           | ❌ Silent    | ✅ Minimal     |
| [jsen](https://www.npmjs.com/package/jsen)                         | ❌ Silent    | ✅ Minimal     |
| [is-my-json-valid](https://www.npmjs.com/package/is-my-json-valid) | ✅ Standard  | ✅ Standard    |
| [hyperjump](https://www.npmjs.com/package/@hyperjump/json-schema)  | ✅ Standard  | ❌ Silent      |
