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
export function ajv(data: any, schema: any) {
    const ajv = new Ajv({ allErrors: true }); // options can be passed, e.g. {allErrors: true}

    const validate = ajv.compile(schema);
    const valid = validate(data);
    if (!valid) console.log(validate.errors);

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
    OutputUnit,
} from "@hyperjump/json-schema/draft-2020-12";
// import {BASIC} from "@hyperjump/json-schema/experimental"
import { VERBOSE, BASIC, DETAILED } from "@hyperjump/json-schema/experimental";
import * as Instance from "@hyperjump/json-schema/instance/experimental";
// @ts-ignore
import * as Schema from "@hyperjump/json-schema/schema/experimental";
setMetaSchemaOutputFormat(VERBOSE);
const getErrorMessage = async (outputUnit: OutputUnit, instance: any) => {
    if (outputUnit.keyword === "https://json-schema.org/keyword/required") {
        const schemaDocument = await Schema.get(
            outputUnit.absoluteKeywordLocation
        );
        const required = new Set(Schema.value(schemaDocument));
        const object = Instance.get(outputUnit.instanceLocation, instance);
        // @ts-ignore

        for (const propertyName of Instance.keys(object)) {
            required.delete(propertyName);
        }

        return `"${
            outputUnit.instanceLocation
        }" is missing required property(s): ${[
            // @ts-ignore
            ...required,
        ]}. Schema location: ${outputUnit.absoluteKeywordLocation}`;
    } else {
        // Default message
        return `"${outputUnit.instanceLocation}" fails schema constraint ${outputUnit.absoluteKeywordLocation}`;
    }
};

// These are probably not very useful for human readable messaging, so we'll skip them.
const skip = new Set([
    "https://json-schema.org/evaluation/validate",
    "https://json-schema.org/keyword/ref",
    "https://json-schema.org/keyword/properties",
    "https://json-schema.org/keyword/patternProperties",
    "https://json-schema.org/keyword/items",
    "https://json-schema.org/keyword/prefixItems",
    "https://json-schema.org/keyword/if",
    "https://json-schema.org/keyword/then",
    "https://json-schema.org/keyword/else",
]);
export const getHumanErrors = (output: any, value: any) => {
    if (output.valid) {
        return "Valid";
    }

    const instance = Instance.cons(value);
    const errorMessages = output.errors
        .filter((outputUnit: any) => !skip.has(outputUnit.keyword))
        .map((outputUnit: any) => getErrorMessage(outputUnit, instance));

    return Promise.all(errorMessages);
};
export async function hyperjumpValidate(data: any, schema: any) {
    registerSchema(schema, "http://example.com/schemas/string");
    try {
        const output = await validate(
            "http://example.com/schemas/string",
            data
        );
        const myOutput = {
            ...output,
            errors: await getHumanErrors(output, data),
        };
        return myOutput;
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
