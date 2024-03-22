## Specifications of JSON Schema

JSON Schema is an evolving standard that undergoes periodic updates to enhance its capabilities and address community feedback. Here are some notable versions:

-   **Draft 2020-12 (latest):** This is the most recent version, introducing new features and improvements over previous iterations.

-   **Draft 2019-09:** A recent version offering enhancements and adjustments to the schema specification.

-   **Draft-07:** This version introduced significant changes and improvements, refining the schema syntax and adding new features.

-   **Draft-06:** An iteration that brought about changes to improve clarity and functionality in JSON Schema definitions.

-   **Draft-05:** An earlier version with its own set of features and capabilities.

When writing a JSON Schema, it's crucial to specify the targeted specification version. This ensures compatibility and helps both humans and machines understand the intended structure and rules of the schema. The `$schema` keyword within the JSON Schema document indicates the targeted version, allowing validators and other tools to interpret the schema correctly. By specifying the version, you ensure consistent application of your JSON Schema across different platforms and implementations.

### Example

```json
"$schema": "https://json-schema.org/draft/2020-12/schema"
```

Instead of hardcoding the version number (e.g., "draft-2020-12"), a URL is used for the `$schema` keyword. The reason behind using a URL is to provide a canonical and authoritative reference for the schema version. By using a URL, the schema can be fetched and validated against the official specification hosted at that location. This approach ensures consistency and makes it easier to reference and obtain the latest version of the schema specification.

Additionally, the use of a URL allows for version control and potential updates to the schema specification in the future. Instead of hardcoding a version number, which might become outdated, the URL can be updated to point to the latest version or a specific version as needed.
