I have tried several JSON schema validators and tested them for verbosity in errors both syntex and mis-match in the schema and data

> View [this file](https://github.com/JeelRajodiya/Tour-of-Json-Schema/blob/main/validatorTest.mjs) to see the testing code
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

## Standared Compliance

I tried searching the web for the standard compliance of the validators but could not find any latest information. The one I found was [this](https://github.com/ebdrup/json-schema-benchmark) which is 4 years old and does not include the latest 2020-12 drafts. So I have decided to consider hyperjump as the most compliant according to the [bowtie report](https://bowtie.report/#/?language=javascript&language=typescript)