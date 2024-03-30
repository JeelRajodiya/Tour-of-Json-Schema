// This File demonstrates how we can validate a user-provided schema against validation schema using AJV to throw meaningful errors .


import Ajv from "ajv/dist/2020.js";
// @ts-ignore
import betterAjvErrors from "better-ajv-errors";
export function ajv(data, schema) {
    const ajv = new Ajv({ allErrors: true, verbose: true }); // options can be passed, e.g. {allErrors: true}

    const validate = ajv.compile(schema);
    const valid = validate(data);
    const errors = betterAjvErrors(schema, data, validate.errors);
    return { valid, errors };

}


const validationSchema = {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "type": "object",
  "properties": {
    "$schema": {
      "type": "string",
      "const": "https://json-schema.org/draft/2020-12/schema"
    },
    "type": {
      "const": "array"
    },
    "items": {
      "type": "object",
      "properties": {
        "type": {
          "const": "number"
        }
      },
      "required": ["type"],
      "additionalProperties": false
    }
  },
  "required": ["$schema", "type", "items"],
  "additionalProperties": false
};

const data = [1, 2, 3];

// userProvidedSchema will be entered by user in the editor
const userProvidedSchema = {
    $schema: "https://json-schema.org/draft/2020-12/schema",
	type: "array",
	items: {}
	
};

console.log(ajv(userProvidedSchema, validationSchema).errors);
