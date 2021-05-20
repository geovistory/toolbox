/* eslint-disable @typescript-eslint/no-explicit-any */
import {AnyObject, Entity, Options} from '@loopback/repository';

export class GvLoopbackEntity extends Entity {
  /**
   * converts a GvLoopbackEntity to a plain DataObject containing only the
   * properties defined by the GvLoopbackEntity.
   *
   * This is usefull to remove navigational properties (related models) from
   * a GvLoopbackEntity instance.
   */
  toDataObject(): GvLoopbackEntity {
    const def = (this.constructor as typeof GvLoopbackEntity).definition;
    const obj: AnyObject = {};

    const props = def.properties;
    const keys = Object.keys(props);

    for (const i in keys) {
      const propertyName = keys[i];
      const val = (this as AnyObject)[propertyName];

      if (val === undefined) continue;
      obj[propertyName] = asObject(val, undefined);
    }

    return obj as GvLoopbackEntity;
  }
}
/**
 * Convert a value to a plain object as DTO.
 *
 * - The prototype of the value in primitive types are preserved,
 *   like `Date`, `ObjectId`.
 * - If the value is an instance of custom model, call `toObject` to convert.
 * - If the value is an array, convert each element recursively.
 *
 * @param value the value to convert
 * @param options the options
 */
function asObject(value: any, options?: Options): any {
  if (value == null) return value;
  if (typeof value.toObject === 'function') {
    return value.toObject(options);
  }
  if (Array.isArray(value)) {
    return value.map(item => asObject(item, options));
  }
  return value;
}
