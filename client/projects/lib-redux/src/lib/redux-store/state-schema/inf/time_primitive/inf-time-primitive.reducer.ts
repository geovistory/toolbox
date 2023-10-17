import { InfTimePrimitive } from '@kleiolab/lib-sdk-lb4';
import { CrudReducerFactory, ReducerConfig } from '../../_helpers/crud-reducer-factory';
import { infRoot } from '../inf.config';

export const infTimePrimitiveFeature = 'time_primitive'
const infTimePrimitiveReducerConfig: ReducerConfig = {
  indexBy: {
    keyInStore: 'pk_entity',
    indexByFn: (item: InfTimePrimitive) => {
      return item.pk_entity.toString()
    }
  },
  groupBy: []
}


export const infTimePrimitiveReducers = new CrudReducerFactory(infRoot, { [infTimePrimitiveFeature]: infTimePrimitiveReducerConfig }).createReducers();


