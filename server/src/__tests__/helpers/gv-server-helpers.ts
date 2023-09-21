import {ReferenceObject, SchemaObject, SchemasObject} from '@loopback/rest';
import {Client, createRestAppClient, givenHttpServerConfig} from '@loopback/testlab';
import Ajv, {ErrorObject, ValidateFunction} from 'ajv';
import {path} from 'ramda';
import {GeovistoryApplication} from '../../application';
import {testdb} from './testdb';
const toJsonSchema = require('@openapi-contrib/openapi-schema-to-json-schema');

export async function setupApplication(): Promise<AppWithClient> {
  const restConfig = givenHttpServerConfig({
    // Customize the server configuration here.
    // Empty values (undefined, '') will be ignored by the helper.
    //
    // host: process.env.HOST,
    // port: +process.env.PORT,
  });

  const server = new GeovistoryApplication({
    rest: restConfig,
  });

  await server.boot();
  await server.start();

  const client = createRestAppClient(server);

  return {server, client};
}

export interface AppWithClient {
  server: GeovistoryApplication;
  client: Client;
}



export function pgNotify(channel: string, value: string) {
  return testdb.execute(`SELECT pg_notify($1, $2)`, [channel, value])
}


/**
 * Validate the value against the given loopback model.
 * @param value value/object to validate
 * @param tsType the model, e.g. ProAnalysis (must be part of OpenApiSpec/decorated with @model())
 * @param server GeovistoryApplication from which the OpenApiSpec will be extracted by this function
 */
export async function validateAgainstSchema<M>(value: M, tsType: Function, server: GeovistoryApplication) {
  const referenceObect: ReferenceObject = {$ref: '#/components/schemas/' + tsType.name}
  const globalSchemas = await server.restServer.getApiSpec()
  try {
    await validateValueAgainstSchema(value, referenceObect, globalSchemas.components?.schemas)
  } catch (error) {
    throw new Error(error);
  }
}


/**
 * Validate the value against JSON schema.
 * @param value - The data value.
 * @param schema - The JSON schema used to perform the validation.
 * @param globalSchemas - Schema references.
 */
async function validateValueAgainstSchema(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any,
  schema: SchemaObject | ReferenceObject,
  globalSchemas: SchemasObject = {},
) {

  const ajvInst = new Ajv();
  const validate = createValidator(schema, globalSchemas, ajvInst);
  let validationErrors: ErrorObject[] = [];
  try {
    const validationResult = validate(value);
    return validationResult;
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
function createValidator(
  schema: SchemaObject,
  globalSchemas: SchemasObject = {},
  ajvInst: Ajv,
): ValidateFunction {
  const jsonSchema = convertToJsonSchema(schema);

  // Clone global schemas to set `$async: true` flag
  const schemas: SchemasObject = {};
  for (const name in globalSchemas) {
    // See https://github.com/strongloop/loopback-next/issues/4939
    schemas[name] = {...globalSchemas[name], $async: true};
  }
  const schemaWithRef = {components: {schemas}, ...jsonSchema};

  // See https://ajv.js.org/#asynchronous-validation for async validation
  schemaWithRef.$async = true;

  return ajvInst.compile(schemaWithRef);
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

