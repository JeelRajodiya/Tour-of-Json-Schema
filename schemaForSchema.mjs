// This File demonstrates how we can validate a user-provided schema against 
// validation schema and get meaningful errors using better-ajv-errors

import Ajv from "ajv/dist/2020.js";
import betterAjvErrors from "better-ajv-errors";

// Function to validate data against schema 
export function ajv(data, schema) {
    const ajv = new Ajv({ allErrors: true, verbose: true }); // options can be passed, e.g. {allErrors: true}

    const validate = ajv.compile(schema);
    const valid = validate(data);
    const errors = betterAjvErrors(schema, data, validate.errors);
    return { valid, errors };

}

// This is the schema that we will use to validate user-provided schema
// It will validate for an schema of array of numbers
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

// ----- Output -----
// REQUIRED must have required property 'type'

// > 1 | {"$schema":"https://json-schema.org/draft/2020-12/schema","type":"array","items":{}}
//     |                                                                                  ^ ☹️  type is missing here!