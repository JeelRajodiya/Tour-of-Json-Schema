

// ----------------------------------------------
import { Validator,SchemaError } from "jsonschema";

function jsonschema(data, schema) {
	var v = new Validator();

	const validateRes = v.validate(data, schema,{nestedErrors:true,throwError:true,throwAll:true});
	console.log(validateRes.valid);

	console.log(validateRes.errors);
	
	// ----- Error on Wrong type -----
	//   ValidationError {
	//     path: [ 3 ],
	//     property: 'instance[3]',
	//     message: 'is not of a type(s) string',
	//     schema: { type: 'string' },
	//     instance: 5,
	//     name: 'type',
	//     argument: [ 'string' ],
	//     stack: 'instance[3] is not of a type(s) string'
	//   }

	//  ----- Syntax Error -----
	// Does not throw error

}
// ----------------------------------------------
import Ajv from "ajv/dist/2020.js"
function ajv(data, schema){ 
	const ajv = new Ajv({allErrors:true}) // options can be passed, e.g. {allErrors: true}

	const validate = ajv.compile(schema)
	const valid = validate(data)
	console.log("valid:",valid);
	console.log(validate.errors);

	// ----- Error on Wrong type -----
	//   {
	//     instancePath: '/1',
	//     schemaPath: '#/items/type',
	//     keyword: 'type',
	//     params: { type: 'string' },
	//     message: 'must be string'
	//   },

	//  ----- Syntax Error -----
	// Error: strict mode: unknown keyword: "$schemaadf"
	//  gives a comprehensive error

}
// ----------------------------------------------


import tv4 from "tv4"


tv4.setErrorReporter(function (error, data, schema) {
	  console.log(error);
});

function tv4Validate(data, schema){
	var valid = tv4.validate(data, schema);

	console.log(valid);
	//  ---- Error on Wrong type -----
	// {
	//   params: { type: 'number', expected: 'string' },
	//   code: 0,
	//   dataPath: '',
	//   schemaPath: '',
	//   subErrors: null
	// }

	
	//  ----- Syntax Error -----
	// Does not throw a relevant  error
}



// ----------------------------------------------
// Can not test it for some reason 

// import ZSchema from "z-schema"
// const validator = new ZSchema()
// import request from 'request'

// var requiredUrl = "https://json-schema.org/draft/2020-12/schema"
// request(requiredUrl, function (error, response, body) {

//     validator.setRemoteReference(requiredUrl, JSON.parse(body));

//     var valid = validator.validate(data, schema);
//     var errors = validator.getLastErrors();
// 	console.log(errors);
// 	console.log(valid);
//     // valid === true
//     // errors === undefined

// })

// ---------------------------------------------------
import djv from "djv"

function djvValidate(data, schema){
	const env = new djv()
	env.addSchema('test', schema)
	const errors = env.validate('test', data)
	console.log(errors);
	// ---- Error on Wrong type -----
	// errors { keyword: 'type', dataPath: "'+i1+'", schemaPath: '#/items/type' }
	// ----- Syntax Error -----
	// It throws an error when there is a syntax error, but the error is completely irrelevant

	// The error is:

	// 	undefined:19
	// if (()) return {
	//      ^

	// SyntaxError: Unexpected token ')'
	//     at new Function (<anonymous>)
}



// ----------------------------------------------
import jsen from "jsen"

function jsenValidate(data, schema){
	const validate = jsen(schema)
	const valid = validate(data)
	console.log(validate);
	console.log(validate.errors)
	// ---- Error on Wrong type -----
	//error: [ { path: '0', keyword: 'type' } ]
	// ----- Syntax Error -----
	// does not throw an error
}


// ----------------------------------------------
import validator from 'is-my-json-valid'

function isMyJsonValid(data, schema){
	const validate = validator(schema)

	console.log(validate(data,{verbose:true}))
	console.log(validate.errors);
	return validate
	// ---- Error on Wrong type -----
	// output: 
	// [
	//   { field: 'data.0', message: 'is the wrong type' },
	//   { field: 'data.1', message: 'is the wrong type' },
	//   { field: 'data.2', message: 'is the wrong type' },
	//   { field: 'data.3', message: 'is the wrong type' }
	// ]

	// ----- Syntax Error -----
	// 	          throw new Error('Unknown type: ' + t)
	//                 ^

	// Error: Unknown type: strisng
}


// ----------------------------------------------

import { validate,registerSchema,setMetaSchemaOutputFormat, } from "@hyperjump/json-schema/draft-2020-12"
// import {BASIC} from "@hyperjump/json-schema/experimental"
import { BASIC } from "@hyperjump/json-schema/experimental";
setMetaSchemaOutputFormat(BASIC)
async function hyperjumpValidate(data, schema){
	registerSchema ( schema,"http://example.com/schemas/string");
	const output = await validate("http://example.com/schemas/string", data);
	// console.log(BASIC);
	console.log(output);
	// ----- Wrong type Error -----
	// Does not throw an error, it just returns a valid false
	// 	{
	//   keyword: 'https://json-schema.org/evaluation/validate',
	//   absoluteKeywordLocation: 'http://example.com/schemas/string#',
	//   instanceLocation: '#',
	//   valid: false,
	//   errors: []
	// }

	// ---- Syntax Errors -----
	// 	      throw new InvalidSchemaError(metaResults);
	//             ^

	// InvalidSchemaError: Invalid Schema
	// other error is:
	// Unable to determine a dialect for the schema. The dialect can be declared in a number of ways, but the recommended way is to use the '$schema' keyword in your schema.


}

const schema = {
	"$schema": "https://json-schema.org/draft/2020-12/schema",
	
    "type": "array",
    "items": {
		"type": "string"
    },
}


const data = [1, 2, 3, 5]
const schema2 = JSON.stringify(schema)+ "adf"
// jsonschema(data, schema)
// ajv(data, schema2)
// tv4Validate(data, schema)

// djvValidate(data, schema)
// jsenValidate(data, schema)
// isMyJsonValid(data, schema)
JSON.parse(schema2)
hyperjumpValidate(data, schema2)

