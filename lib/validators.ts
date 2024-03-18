import { Validator } from "jsonschema";

export function jsonschema(data: any, schema: any) {
    var v = new Validator();
    const validateRes = v.validate(data, schema);

    return validateRes;

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

import Ajv from "ajv/dist/2020.js";
// @ts-ignore
import betterAjvErrors from "better-ajv-errors";
export function ajv(data: any, schema: any) {
    const ajv = new Ajv({ allErrors: true, verbose: true }); // options can be passed, e.g. {allErrors: true}

    const validate = ajv.compile(schema);
    const valid = validate(data);
    const errors = betterAjvErrors(schema, data, validate.errors);
    return { valid, errors };

    //   {
    //     instancePath: '/1',
    //     schemaPath: '#/items/type',
    //     keyword: 'type',
    //     params: { type: 'string' },
    //     message: 'must be string'
    //   },
}
import tv4, { error } from "tv4";

tv4.setErrorReporter(function (error: any, data: any, schema: any) {
    console.log(error);
    return error;
});

export function tv4Validate(data: any, schema: any) {
    var valid = tv4.validate(data, schema);

    console.log(error);
    return valid;
}

import djv from "djv";

export function djvValidate(data: any, schema: any) {
    const env = new djv();
    env.addSchema("test", schema);
    const errors = env.validate("test", data);
    console.log(errors);
}

import jsen from "jsen";

export function jsenValidate(data: any, schema: any) {
    const validate = jsen(schema);
    const valid = validate(data);
    console.log(validate.errors);
}

import validator from "is-my-json-valid";

export function isMyJsonValid(data: any, schema: any) {
    const validate = validator(schema);

    const output = validate(data, { verbose: true });

    return { valid: output, errors: validate.errors };
}
import {
    validate,
    registerSchema,
    setMetaSchemaOutputFormat,
    unregisterSchema,
} from "@hyperjump/json-schema/draft-2020-12";
// import {BASIC} from "@hyperjump/json-schema/experimental"
import { VERBOSE, BASIC, DETAILED } from "@hyperjump/json-schema/experimental";
setMetaSchemaOutputFormat(VERBOSE);

export async function hyperjumpValidate(data: any, schema: any) {
    registerSchema(schema, "http://example.com/schemas/string");
    try {
        const output = await validate(
            "http://example.com/schemas/string",
            data
        );
        return output;
    } catch (e) {
        throw e;
    } finally {
        unregisterSchema("http://example.com/schemas/string");
    }
    // console.log(BASIC);
}
import { Validator as cfValidator } from "@cfworker/json-schema";
export function cfworkerValidate(data: any, schema: any) {
    const validate = new cfValidator(schema, "2020-12", true);
    const valid = validate.validate(data);
    return valid;

    // ---- Error on Wrong type -----
    // 	    {
    //       instanceLocation: '#/0',
    //       keyword: 'type',
    //       keywordLocation: '#/items/type',
    //       error: 'Instance type "number" is invalid. Expected "string".'
    //     }
}
