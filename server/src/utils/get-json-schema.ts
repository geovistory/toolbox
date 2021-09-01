import {getNavigationalPropertyForRelation, isArrayType, JsonSchema, JsonSchemaOptions, metaToJsonProperty} from '@loopback/openapi-v3';
import {isBuiltinType, ModelDefinition, ModelMetadataHelper, resolveType} from '@loopback/repository';
import {inspect} from 'util';

/**
 * Converts a TypeScript class into a JSON Schema using TypeScript's
 * reflection API
 * @param ctor - Constructor of class to convert from
 */
export function modelToJsonSchema<T extends object>(
  ctor: Function & {prototype: T},
  jsonSchemaOptions: JsonSchemaOptions<T> = {},
): JsonSchema {
  const options = {...jsonSchemaOptions};
  options.visited = options.visited ?? {};
  options.optional = options.optional ?? [];
  const partial = options.partial && !options.optional.length;

  if (options.partial && !partial) {
    delete options.partial;
  }


  const modelDef = ModelMetadataHelper.getModelMetadata(ctor);

  // returns an empty object if metadata is an empty object
  if (modelDef == null || Object.keys(modelDef).length === 0) {
    return {};
  }

  const meta = modelDef as ModelDefinition;


  const title = buildSchemaTitle(ctor, meta, options);
  if (options.visited[title]) return options.visited[title];

  const result: JsonSchema = {title};
  options.visited[title] = result;

  result.type = 'object';

  const descriptionSuffix = getDescriptionSuffix(ctor.name, options);

  if (meta.description) {
    const formatSuffix = descriptionSuffix ? ` ${descriptionSuffix}` : '';

    result.description = meta.description + formatSuffix;
  } else if (descriptionSuffix) {
    result.description = descriptionSuffix;
  }

  for (const p in meta.properties) {
    if (options.exclude?.includes(p as keyof T)) {
      continue;
    }

    if (meta.properties[p].type == null) {
      // Circular import of model classes can lead to this situation
      throw new Error(
        `Property ${ctor.name}.${p} does not have "type" in its definition`,
      );
    }

    result.properties = result.properties ?? {};
    result.properties[p] = result.properties[p] || {};

    const metaProperty = Object.assign({}, meta.properties[p]);

    // populating "properties" key
    result.properties[p] = metaToJsonProperty(metaProperty);

    // handling 'required' metadata
    const optional = options.optional.includes(p as keyof T);

    if (metaProperty.required && !(partial || optional)) {
      result.required = result.required ?? [];
      result.required.push(p);
    }

    // populating JSON Schema 'definitions'
    // shimks: ugly type casting; this should be replaced by logic to throw
    // error if itemType/type is not a string or a function
    const resolvedType = resolveType(metaProperty.type) as string | Function;
    const referenceType = isArrayType(resolvedType)
      ? // shimks: ugly type casting; this should be replaced by logic to throw
      // error if itemType/type is not a string or a function
      resolveType(metaProperty.itemType as string | Function)
      : resolvedType;

    if (typeof referenceType !== 'function' || isBuiltinType(referenceType)) {
      continue;
    }

    const propOptions = {...options};
    if (propOptions.partial !== 'deep') {
      // Do not cascade `partial` to nested properties
      delete propOptions.partial;
    }
    if (propOptions.includeRelations === true) {
      // Do not cascade `includeRelations` to nested properties
      delete propOptions.includeRelations;
    }
    // `title` is the unique identity of a schema,
    // it should be removed from the `options`
    // when generating the relation or property schemas
    delete propOptions.title;

    const propSchema = modelToJsonSchema(referenceType, propOptions);

    // JSONSchema6Definition allows both boolean and JSONSchema6 types
    if (typeof result.properties[p] !== 'boolean') {
      const prop = result.properties[p] as JsonSchema;
      const propTitle = propSchema.title ?? referenceType.name;
      const targetRef = {$ref: `#/definitions/${propTitle}`};

      if (prop.type === 'array' && prop.items) {
        // Update $ref for array type
        prop.items = targetRef;
      } else {
        result.properties[p] = targetRef;
      }

      includeReferencedSchema(propTitle, propSchema);
    }
  }

  result.additionalProperties = meta.settings.strict === false;

  if (options.includeRelations) {
    for (const r in meta.relations) {
      result.properties = result.properties ?? {};
      const relMeta = meta.relations[r];
      const targetType = resolveType(relMeta.target);

      // `title` is the unique identity of a schema,
      // it should be removed from the `options`
      // when generating the relation or property schemas
      const targetOptions = {...options};
      delete targetOptions.title;

      const targetSchema = modelToJsonSchema(targetType, targetOptions);
      const targetRef = {$ref: `#/definitions/${targetSchema.title}`};
      const propDef = getNavigationalPropertyForRelation(relMeta, targetRef);

      result.properties[relMeta.name] =
        result.properties[relMeta.name] || propDef;
      includeReferencedSchema(targetSchema.title!, targetSchema);
    }
  }

  function includeReferencedSchema(name: string, schema: JsonSchema) {
    if (!schema || !Object.keys(schema).length) return;

    // promote nested definition to the top level
    if (result !== schema?.definitions) {
      for (const key in schema.definitions) {
        if (key === title) continue;
        result.definitions = result.definitions ?? {};
        result.definitions[key] = schema.definitions[key];
      }
      delete schema.definitions;
    }

    if (result !== schema) {
      result.definitions = result.definitions ?? {};
      result.definitions[name] = schema;
    }
  }

  if (meta.jsonSchema) {
    Object.assign(result, meta.jsonSchema);
  }
  return result;
}


function buildSchemaTitle<T extends object>(
  ctor: Function & {prototype: T},
  meta: ModelDefinition,
  options: JsonSchemaOptions<T>,
) {
  if (options.title) return options.title;
  const title = meta.title || ctor.name;
  return title + getTitleSuffix(options);
}

/**
 * Checks the options and generates a descriptive suffix using compatible chars
 * @param options json schema options
 */
function getTitleSuffix<T extends object>(options: JsonSchemaOptions<T> = {}) {
  let suffix = '';

  if (options.optional?.length) {
    suffix += `Optional_${options.optional.join('-')}_`;
  } else if (options.partial) {
    suffix += 'Partial';
  }
  if (options.exclude?.length) {
    suffix += `Excluding_${options.exclude.join('-')}_`;
  }
  if (options.includeRelations) {
    suffix += 'WithRelations';
  }

  return suffix;
}

/**
 * Checks the options and generates a descriptive suffix that contains the
 * TypeScript type and options
 * @param typeName - TypeScript's type name
 * @param options - json schema options
 */
function getDescriptionSuffix<T extends object>(
  typeName: string,
  rawOptions: JsonSchemaOptions<T> = {},
) {
  const options = {...rawOptions};

  delete options.visited;
  if (options.optional && !options.optional.length) {
    delete options.optional;
  }

  const type = typeName;
  let tsType = type;
  if (options.includeRelations) {
    tsType = `${type}WithRelations`;
  }
  if (options.partial) {
    tsType = `Partial<${tsType}>`;
  }
  if (options.exclude) {
    const excludedProps = options.exclude.map(p => `'${p}'`);
    tsType = `Omit<${tsType}, ${excludedProps.join(' | ')}>`;
  }
  if (options.optional) {
    const optionalProps = options.optional.map(p => `'${p}'`);
    tsType = `@loopback/repository-json-schema#Optional<${tsType}, ${optionalProps.join(
      ' | ',
    )}>`;
  }

  return !isEmptyJson(options)
    ? `(tsType: ${tsType}, schemaOptions: ${stringifyOptions(options)})`
    : '';
}

function stringifyOptions(modelSettings: object = {}) {
  return inspect(modelSettings, {
    depth: Infinity,
    maxArrayLength: Infinity,
    breakLength: Infinity,
  });
}

function isEmptyJson(obj: object) {
  return !(obj && Object.keys(obj).length);
}
