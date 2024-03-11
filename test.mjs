import { Validator } from "jsonschema";
var v = new Validator();

var instance = 'sdf';
var schema = {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com/product.schema.json",
  "title": "Product",
  "description": "A product in the catalog",
  "type": "objdect"
};
const validateRes = v.validate(instance, schema,{
	
	nestedErrors: true
});

console.log(validateRes.valid);

// or ESM/TypeScript import
// import Ajv from "ajv"
// // Node.js require:


// const ajv = new Ajv({allErrors:true}) // options can be passed, e.g. {allErrors: true}

// const schema = {
//   type: "object",
//   properties: {
//     foo: {type: "inteeger"},
//     bar: {type: "string"},
//   },
//   required: ["foo"],
//   additionalProperties: false,
// }

// const data = {
//   foo: 1,
//   bar: "abc",
// }

// const validate = ajv.compile(schema)
// const valid = validate(data)
// if (!valid) console.log(validate.errors)