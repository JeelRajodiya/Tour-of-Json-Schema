import { ajv, hyperjumpValidate } from "@/lib/validators";

export async function handleValidation(
    setValidity: any,
    setIsInvalid: any,
    code: string | undefined
) {
    try {
        const data = [1, 2, 3];
        const schema = JSON.parse(code!);

        const output = await hyperjumpValidate(data, schema);

        const avjErrors = ajv(data, schema).errors;
        if (output?.valid) {
            setValidity(
                "Great!\nLet's learn about $schema and specifications in the next step."
            );

            // Manual checking of types and items properties can be avoided,
            // if we use validation Schema to validate the (user provided) schema itself.
            // for more information view schemaForSchema.mjs file located at the root of the project

            if (!schema.type) {
                setIsInvalid(true);
                setValidity(
                    "Invalid Schema: Please specify the type of the data with the 'type' property."
                );
                return;
            } else if (!schema.items) {
                setIsInvalid(true);
                setValidity(
                    "Invalid Schema: Please specify the items property."
                );
                return;
            }
            setIsInvalid(false);
        } else {
            setValidity(avjErrors);

            setIsInvalid(true);
        }
    } catch (e) {
        setValidity(JSON.stringify((e as Error).message));
        setIsInvalid(true);
    }
}
