/**
 * A spec enhancer to add bearer token OpenAPI security entry to
 * `spec.component.securitySchemes`
 */

import {bind} from '@loopback/core';
import {asSpecEnhancer, ControllerSpec, getJsonSchema, jsonToSchemaObject, OASEnhancer, OpenApiSpec, SchemasObject} from '@loopback/rest';
const debug = require('debug')('geovistory:ModelSpecEnhancer');


@bind(asSpecEnhancer)
export class ModelSpecEnhancer implements OASEnhancer {
  name = 'tsTypeModels';
  static tsTypes: Function[] = [];

  // used for overriding Lb3 models with lb4 models (remove after complete lb migration)
  static overrideTypes: Function[] = [];

  modifySpec(spec: OpenApiSpec): OpenApiSpec {
    for (const tsType of ModelSpecEnhancer.tsTypes) {
      this.generateOpenAPISchema(spec, tsType);
    }

    for (const tsType of ModelSpecEnhancer.overrideTypes) {
      this.generateOpenAPISchema(spec, tsType, true);
    }

    return spec;
  }


  /**
  * Generate json schema for a given tsType
  * @param spec - Controller spec
  * @param tsType - TS Type
  */
  generateOpenAPISchema(spec: ControllerSpec, tsType: Function, override = false) {
    spec.components = spec.components ?? {};
    spec.components.schemas = spec.components.schemas ?? {};
    if (tsType.name in spec.components.schemas && override === false) {
      // Preserve user-provided definitions
      debug('    skipping type %j as already defined', tsType.name || tsType);
      return;
    }
    const jsonSchema = getJsonSchema(tsType);
    const openapiSchema = jsonToSchemaObject(jsonSchema);

    this.assignRelatedSchemas(spec, openapiSchema.definitions);
    delete openapiSchema.definitions;

    debug('    defining schema for %j: %j', tsType.name, openapiSchema);
    spec.components.schemas[tsType.name] = openapiSchema;
  }

  /**
 * Assign related schemas from definitions to the controller spec
 * @param spec - Controller spec
 * @param definitions - Schema definitions
 */
  assignRelatedSchemas(
    spec: ControllerSpec,
    definitions?: SchemasObject,
  ) {
    if (!definitions) return;
    debug(
      '    assigning related schemas: ',
      definitions && Object.keys(definitions),
    );
    spec.components = spec.components ?? {};
    spec.components.schemas = spec.components.schemas ?? {};
    const outputSchemas = spec.components.schemas;

    for (const key in definitions) {
      // Preserve user-provided definitions
      if (key in outputSchemas) continue;
      const relatedSchema = definitions[key];
      debug('    defining referenced schema for %j: %j', key, relatedSchema);
      outputSchemas[key] = relatedSchema;
    }
  }

}


/**
 * Converts a model to a JsonSchema7, registers schema on top level of
 * OpenApi v3 spec and returns path of the registered schema.
 *
 * This is usefull when referencing a Model in a jsonSchema with $ref.
 *
 * Example usage with @property() decorator:
 * `@property({
 *    jsonSchema: {
 *      title: 'TableRow',
 *      type: 'array',
 *      items: {
 *        type: 'array',
 *        items: {
 *          $ref: registerType(TableCell)
 *        },
 *      }
 *    }
 *  })
 * rows: TableCell[][]
 * `
 * In this example, the annotated member 'rows' is an array of array.
 * The items of the outer array are titled 'TableRow', the items of the inner
 * array will be named 'TableCell'.
 *
 * @param tsType Loopback 4 Model Class from which the type is generated
 * @returns the path to the schema definition in the OpenApi v3 spec
 */
export function registerType(tsType: Function): string {
  ModelSpecEnhancer.tsTypes.push(tsType)
  return `#/components/schemas/${tsType.name}`
}


export function overrideType(tsType: Function): string {
  ModelSpecEnhancer.overrideTypes.push(tsType)
  return `#/components/schemas/${tsType.name}`
}


