# Introduction

Hi, Welcome to the tour of JSON schema. In this tour, we will learn about json schema and how to use it to validate json data.

## What is JSON Schema?

JSON Schema is a vocabulary that allows you to annotate and validate JSON documents. It is a specification that provides a way to describe the structure of JSON data for validation, documentation, and interaction control. It is a powerful tool for validating the structure of JSON data.

## In This Section ...

We'll write any JSON schema and check if it's valid or not

## Example

```json
{
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "$id": "https://example.com/product.schema.json",
    "title": "Product",
    "description": "A product in the catalog",
    "type": "object"
}
```

### The following json data is valid against the above schema

```json
{
    "title": "A product",
    "description": "A product in the catalog",
    "type": "object"
}
```
