import { InfTimePrimitive } from '@kleiolab/lib-sdk-lb4';
import { createModelReducers, ReducerConfig } from '../../_lib/crud-reducer-factory';
import { infFeatureKey } from "../inf.feature.key";

export const infTimePrimitiveFeature = 'time_primitive'
export const infTimePrimitiveReducerConfig: ReducerConfig<InfTimePrimitive> = {
  indexBy: {
    keyInStore: 'pk_entity',
    indexByFn: (item: InfTimePrimitive) => {
      return item.pk_entity.toString()
    }
  },
  groupBy: []
}


export const infTimePrimitiveReducers = createModelReducers(infFeatureKey, infTimePrimitiveFeature, infTimePrimitiveReducerConfig)


