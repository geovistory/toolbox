
import {PropertyType, PropertyDefinition, property, TypeResolver} from '@loopback/repository';
import {MetadataInspector} from '@loopback/core';

export namespace property2 {
  export const ERR_PROP_NOT_ARRAY =
    '@property.array can only decorate array properties!';
  export const ERR_NO_ARGS = 'decorator received less than two parameters';

  /**
   *
   * @param itemType - The type of array items.
   * Examples: `number`, `Product`, `() => Order`.
   * @param definition - Optional PropertyDefinition object for additional
   * metadata
   */
  export function arrayOfArray(
    itemType: PropertyType,
    definition?: Partial<PropertyDefinition>,
  ) {
    return function (target: object, propertyName: string) {
      const propType = MetadataInspector.getDesignTypeForProperty(
        target,
        propertyName,
      );
      if (propType !== Array) {
        throw new Error(ERR_PROP_NOT_ARRAY);
      } else {
        const typeRes: TypeResolver<PropertyType> = () => {
          return Array
        }
        const def: Partial<PropertyDefinition> = {
          type: Array,
          itemType: typeRes
        }
        property(
          Object.assign(
            // {
            //   jsonSchema: {
            //     title: 'TableRows',
            //     type: 'array',
            //     items: {
            //       title: 'TableRow',
            //       type: 'array',
            //       items: {
            //         '$ref': '#/components/schemas/TableCell'
            //       }
            //     }
            //   }
            // },
            def,
            definition,
          ),
        )(target, propertyName);
      }
    };
  }
}
