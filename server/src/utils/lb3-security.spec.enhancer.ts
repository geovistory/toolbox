import {bind} from '@loopback/core';
import {
  asSpecEnhancer,
  mergeOpenAPISpec,
  OASEnhancer,
  OpenApiSpec,
  ReferenceObject,
  SecuritySchemeObject
} from '@loopback/openapi-v3';

export type SecuritySchemeObjects = {
  [securityScheme: string]: SecuritySchemeObject | ReferenceObject;
};

export const OPERATION_SECURITY_SPEC = [
  {
    // secure all endpoints with 'accesstoken'
    accesstoken: [],
  },
];

export const SECURITY_SCHEME_SPEC: SecuritySchemeObjects = {
  accesstoken: {
    description: 'Authorization for Loopback 3 API\'s',
    type: 'apiKey',
    in: 'header',
    name: 'authorization',
  },
};

/**
 * A spec enhancer to add bearer token OpenAPI security entry to
 * `spec.component.securitySchemes`
 */
@bind(asSpecEnhancer)
export class Lb3SecuritySpecEnhancer implements OASEnhancer {
  name = 'accesstoken';

  modifySpec(spec: OpenApiSpec): OpenApiSpec {
    const patchSpec = {
      components: {
        securitySchemes: SECURITY_SCHEME_SPEC,
      },
      security: OPERATION_SECURITY_SPEC,
    };
    const mergedSpec = mergeOpenAPISpec(spec, patchSpec);
    return mergedSpec;
  }
}
