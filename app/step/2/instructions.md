# Array of Numbers

In this section, we'll create a simple schema for array of numbers

Example data

```json
[1, 2, 3]
```

## Defining Schema

In JSON Schema, we use the `type` keyword to describe the type of data we expect. In this case, we want an array of numbers. We can specify this by setting the `type` to `array` and defining the type of items in the array using the `items` keyword.

```json
{
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "type": "array",
    "items": {
        "type": "number"
    }
}
```
