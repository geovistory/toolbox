import {ReferenceObject, SchemaObject, SchemasObject} from '@loopback/rest';
import Ajv, {ErrorObject, ValidateFunction} from 'ajv';
import {path} from 'ramda';
import {GeovistoryApplication} from '../../application';
const toJsonSchema = require('@openapi-contrib/openapi-schema-to-json-schema');



/**
 * Validate the value against validator.
 * @param value - The data value.
 * @param schema - The JSON schema used to perform the validation.
 * @param globalSchemas - Schema references.
 */
export async function applyValidator<M>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
  validate: ValidateFunction
): Promise<M> {

  let validationErrors: ErrorObject[] = [];
  try {
    validate(value);
    return value;
  } catch (error) {
    validationErrors = error.errors;
  }

  const error = `
  JSON schema validation failed:
  ${JSON.stringify(buildErrorDetails(validationErrors, value), null, 2)}
  `
  throw error;
}


/**
* Create a validate function for the given schema
* @param schema - JSON schema for the target
* @param globalSchemas - Global schemas
* @param ajvInst - An instance of Ajv
*/
export async function createValidator(
  tsType: Function,
  app: GeovistoryApplication,
  options: {array?: true} = {}
): Promise<ValidateFunction> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tsname = tsType.name
  const referenceObect: ReferenceObject = {$ref: '#/components/schemas/' + tsname}
  const globalSchemas = (await app.restServer.getApiSpec()).components?.schemas ?? {}

  const ajvInst = new Ajv({
    $data: true,
  })
  ajvInst.addKeyword('components');
  ajvInst.addKeyword('x-typescript-type');


  const jsonSchema = convertToJsonSchema(referenceObect);

  // Clone global schemas to set `$async: true` flag
  const schemas: SchemasObject = {};
  for (const name in globalSchemas) {
    // See https://github.com/strongloop/loopback-next/issues/4939
    schemas[name] = {...globalSchemas[name], $async: true};
  }
  const schemaWithRef = {components: {schemas}, ...jsonSchema};

  // See https://ajv.js.org/#asynchronous-validation for async validation
  schemaWithRef.$async = true;
  const validator = ajvInst.compile(schemaWithRef)
  return validator;
}
/**
* Convert an OpenAPI schema to the corresponding JSON schema.
* @param openapiSchema - The OpenAPI schema to convert.
*/
function convertToJsonSchema(openapiSchema: SchemaObject) {
  const jsonSchema = toJsonSchema(openapiSchema);
  delete jsonSchema['$schema'];
  return jsonSchema;
}

function buildErrorDetails(
  validationErrors: ErrorObject[],
  value: unknown
) {
  return validationErrors.map(
    (e: ErrorObject) => {
      const givenValueAtPath = path([e.schemaPath], value)
      return {
        path: e.schemaPath,
        code: e.keyword,
        message: e.message ?? `must pass validation rule ${e.keyword}`,
        info: e.params,
        givenValueAtPath
      };
    },
  );
}

