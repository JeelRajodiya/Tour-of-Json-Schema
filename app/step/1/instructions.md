# Introduction

Hi, Welcome to the tour of JSON schema. In this tour, we will learn about json schema and how to use it to validate json data.

## What is JSON Schema?

Imagine a rulebook for JSON documents. Just like how a rulebook tells you what's allowed and what's not in a game, JSON Schema tells you what's allowed and what's not in your JSON data. It helps ensure that your JSON data follows a specific structure and meets certain criteria. So, if you have a JSON document, JSON Schema helps you define what the document should look like and what kind of data it should contain. It's like having a set of guidelines to keep your JSON data organized and consistent.

## In This Section ...

We'll write JSON schema (Draft 2020-12) for any JSON data and check if it's valid or not

## Example

### Schema (Rules that JSON data should follow)

```json
{
    "$schema": "https://json-schema.org/draft/2020-12/schema",
    "type": "object",
    "properties": {
        "name": {
            "type": "string"
        }
    }
}
```

### JSON Data

```json
{
    "name": "John"
}
```
