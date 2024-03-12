
const schema = {
	"$schema": "https://json-schema.org/draft/2020-12/schema",
	
    "type": "array",
    "items": {
		"type": "string"
    },
	"$id": "https://json-schema.org/draft/2020-12"
}


const data = [1, 2, 3, 5]
// ----------------------------------------------
import { Validator } from "jsonschema";

function jsonschema(data, schema) {
	var v = new Validator();
	const validateRes = v.validate(data, schema);

	console.log(validateRes.errors);

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

}
// ----------------------------------------------
import Ajv from "ajv/dist/2020.js"
function ajv(data, schema){ 
	const ajv = new Ajv({allErrors:true}) // options can be passed, e.g. {allErrors: true}

	const validate = ajv.compile(schema)
	const valid = validate(data)
	if (!valid) console.log(validate.errors)

	//   {
	//     instancePath: '/1',
	//     schemaPath: '#/items/type',
	//     keyword: 'type',
	//     params: { type: 'string' },
	//     message: 'must be string'
	//   },

}
// ----------------------------------------------


import tv4 from "tv4"


tv4.setErrorReporter(function (error, data, schema) {
	  console.log(error);
});

function tv4Validate(data, schema){
	var valid = tv4.validate(data, schema);

	console.log(valid);
}
//  gives a long error 
// Error
//     at new ValidationError (d:\languages\web\projects\Tour-of-Json-Schema\node_modules\tv4\tv4.js:1461:12)
//     at ValidatorContext.createError (d:\languages\web\projects\Tour-of-Json-Schema\node_modules\tv4\tv4.js:359:14) 
//     at ValidatorContext.validateType (d:\languages\web\projects\Tour-of-Json-Schema\node_modules\tv4\tv4.js:751:14)
//     at ValidatorContext.validateBasic (d:\languages\web\projects\Tour-of-Json-Schema\node_modules\tv4\tv4.js:721:19)
//     at ValidatorContext.validateAll (d:\languages\web\projects\Tour-of-Json-Schema\node_modules\tv4\tv4.js:599:19) 
//     at ValidatorContext.validateArrayItems (d:\languages\web\projects\Tour-of-Json-Schema\node_modules\tv4\tv4.js:947:21)
//     at ValidatorContext.validateArray (d:\languages\web\projects\Tour-of-Json-Schema\node_modules\tv4\tv4.js:880:11)
//     at ValidatorContext.validateAll (d:\languages\web\projects\Tour-of-Json-Schema\node_modules\tv4\tv4.js:602:11) 
//     at Object.validate (d:\languages\web\projects\Tour-of-Json-Schema\node_modules\tv4\tv4.js:1573:24)
//     at tv4Validate (file:///d:/languages/web/projects/Tour-of-Json-Schema/validatorTest.mjs:64:18) {
//   params: { type: 'number', expected: 'string' },
//   code: 0,
//   dataPath: '',
//   schemaPath: '',
//   subErrors: null
// }


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
}


// errors { keyword: 'type', dataPath: "'+i1+'", schemaPath: '#/items/type' }

// ----------------------------------------------
import jsen from "jsen"

function jsenValidate(data, schema){
const validate = jsen(schema)
const valid = validate(data)
console.log(validate.errors)
}
//error: [ { path: '0', keyword: 'type' } ]


// ----------------------------------------------
import validator from 'is-my-json-valid'

function isMyJsonValid(data, schema){
	const validate = validator(schema)

	console.log(validate(data,{verbose:true}))
	console.log(validate.errors);
}
// output: 
// [
//   { field: 'data.0', message: 'is the wrong type' },
//   { field: 'data.1', message: 'is the wrong type' },
//   { field: 'data.2', message: 'is the wrong type' },
//   { field: 'data.3', message: 'is the wrong type' }
// ]


// ----------------------------------------------

import { validate,registerSchema, } from "@hyperjump/json-schema/draft-2020-12"
// import {BASIC} from "@hyperjump/json-schema/experimental"

async function hyperjumpValidate(data, schema, BASIC){
	registerSchema ("http://example.com/schemas/string", schema);
	const output = await validate("http://example.com/schemas/string", data, BASIC);
	// console.log(BASIC);
	console.log(output);
}
