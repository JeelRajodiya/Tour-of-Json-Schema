# Array of Numbers

In this section, we'll create a simple schema for array of numbers

Example data

```json
[1, 2, 3]
```

## Defining Schema

In JSON Schema, we use the `type` keyword to describe what kind of data each item in an array should be.

If we want our array to contain only numbers, we simply specify `number` as the type for each item through `items` field. This helps us make sure that our array is made up of numbers and nothing else.

```json
{
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "type": "array",
    "items": {
        "type": "number"
    }
}
```
