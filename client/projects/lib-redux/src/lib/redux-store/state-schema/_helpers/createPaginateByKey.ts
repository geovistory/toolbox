import { GvSubfieldPage } from '@kleiolab/lib-sdk-lb4';
import { keys, values } from 'ramda';
export function createPaginateByKey(x: GvSubfieldPage): string {
  return `${x.fkSourceEntity}_${x.fkProperty}_${x.isOutgoing ? 'out' : 'in'}_${x.targetClass}_${keys(x.scope)[0]}_${values(x.scope)[0]}`
}
