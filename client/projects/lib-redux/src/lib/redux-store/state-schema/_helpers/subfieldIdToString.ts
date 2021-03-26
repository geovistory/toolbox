import { GvFieldId } from '@kleiolab/lib-sdk-lb4';
import { keys, values } from 'ramda';
export function subfieldIdToString(x: GvFieldId): string {
  const source = Object.keys(x.source).map(key => `${key}-${x.source[key]}`).join('_')
  const property = Object.keys(x.property).map(key => `${key}-${x.property[key]}`).join('_')
  return `${source}_${property}_${x.isOutgoing ? 'out' : 'in'}_${keys(x.scope)[0]}_${values(x.scope)[0]}`
}
