import { GvFieldId } from '@kleiolab/lib-sdk-lb4';
import { keys, values } from 'ramda';
export function subfieldIdToString(x: GvFieldId): string {
  return `${x.fkSourceEntity}_${x.fkProperty}_${x.isOutgoing ? 'out' : 'in'}_${keys(x.scope)[0]}_${values(x.scope)[0]}`
}
