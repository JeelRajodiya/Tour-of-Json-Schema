# Creating A Simple Schema

In this tutorial, we'll create a simple schema for array of number type

Example data

```json
[1, 2, 3, 5]
```

## You can define it's schema in the following manner

```json
{
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "type": "array",
    "items": {
        "type": "number"
    }
}
```