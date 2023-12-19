import { InfPlace } from '@kleiolab/lib-sdk-lb4';
import { createModelReducers, ReducerConfig } from '../../_lib/crud-reducer-factory';
import { infFeatureKey } from "../inf.feature.key";

export const infPlaceFeature = 'place'
export const infPlaceReducerConfig: ReducerConfig<InfPlace> = {
  indexBy: {
    keyInStore: 'pk_entity',
    indexByFn: (item: InfPlace) => {
      return item.pk_entity.toString()
    }
  },
  groupBy: []
}


export const infPlaceReducers = createModelReducers(infFeatureKey, infPlaceFeature, infPlaceReducerConfig)


