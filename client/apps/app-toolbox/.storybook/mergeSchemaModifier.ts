import { GvSchemaModifier } from '@kleiolab/lib-sdk-lb4';
import { concat, mergeDeepWith } from 'ramda';

/**
 * Deep merges the two given objects and returns a clone with the result
 * @param new
 */
export function mergeSchemaModifier(old: GvSchemaModifier, _new: Partial<GvSchemaModifier>) {
  return mergeDeepWith(concat, old, _new)
}
