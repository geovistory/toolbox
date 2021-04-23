import {ReferenceObject, SchemaObject, SchemasObject} from '@loopback/rest';
import ajv from 'ajv';
import {path} from 'ramda';
import {GeovistoryApplication} from '../../application';
const toJsonSchema = require('@openapi-contrib/openapi-schema-to-json-schema');



interface TypeValidator<M> {validator: ajv.ValidateFunction, tsType: M}

/**
 * Validate the value against validator.
 * @param value - The data value.
 * @param schema - The JSON schema used to perform the validation.
 * @param globalSchemas - Schema references.
 */
export async function applyValidator<M>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
  validate: ajv.ValidateFunction
): Promise<M> {

  let validationErrors: ajv.ErrorObject[] = [];
  try {
    await validate(value);
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
export async function createValidator<M>(
  tsType: Function,
  app: GeovistoryApplication,
  options: {array?:true} = {}
): Promise<ajv.ValidateFunction> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const tsname = tsType.name
  const referenceObect: ReferenceObject = {$ref: '#/components/schemas/' + tsname}
  const globalSchemas = (await app.restServer.getApiSpec()).components?.schemas ?? {}

  const ajvInst = new ajv();

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
  validationErrors: ajv.ErrorObject[],
  value: unknown
) {
  return validationErrors.map(
    (e: ajv.ErrorObject) => {
      const givenValueAtPath = path([e.dataPath], value)
      return {
        path: e.dataPath,
        code: e.keyword,
        message: e.message ?? `must pass validation rule ${e.keyword}`,
        info: e.params,
        givenValueAtPath
      };
    },
  );
}

