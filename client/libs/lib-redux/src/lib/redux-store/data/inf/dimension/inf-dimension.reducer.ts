import { InfDimension } from '@kleiolab/lib-sdk-lb4';
import { createModelReducers, ReducerConfig } from '../../_lib/crud-reducer-factory';
import { infFeatureKey } from "../inf.feature.key";

export const infDimensionFeature = 'dimension'
export const infDimensionReducerConfig: ReducerConfig = {
  indexBy: {
    keyInStore: 'pk_entity',
    indexByFn: (item: InfDimension) => {
      return item.pk_entity.toString()
    }
  },
  groupBy: []
}


export const infDimensionReducers = createModelReducers(infFeatureKey, infDimensionFeature, infDimensionReducerConfig)


