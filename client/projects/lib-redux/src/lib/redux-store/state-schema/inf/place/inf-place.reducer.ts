import { InfPlace } from '@kleiolab/lib-sdk-lb4';
import { CrudReducerFactory, ReducerConfig } from '../../_helpers/crud-reducer-factory';
import { infFeatureKey } from "../inf.feature.key";

export const infPlaceFeature = 'place'
export const infPlaceReducerConfig: ReducerConfig = {
  indexBy: {
    keyInStore: 'pk_entity',
    indexByFn: (item: InfPlace) => {
      return item.pk_entity.toString()
    }
  },
  groupBy: []
}


export const infPlaceReducers = new CrudReducerFactory(infFeatureKey, { [infPlaceFeature]: infPlaceReducerConfig }).createReducers();


