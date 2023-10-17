import { InfPlace } from '@kleiolab/lib-sdk-lb4';
import { CrudReducerFactory, ReducerConfig } from '../../_helpers/crud-reducer-factory';
import { infRoot } from '../inf.config';

export const infPlaceFeature = 'place'
const infPlaceReducerConfig: ReducerConfig = {
  indexBy: {
    keyInStore: 'pk_entity',
    indexByFn: (item: InfPlace) => {
      return item.pk_entity.toString()
    }
  },
  groupBy: []
}


export const infPlaceReducers = new CrudReducerFactory(infRoot, { [infPlaceFeature]: infPlaceReducerConfig }).createReducers();


