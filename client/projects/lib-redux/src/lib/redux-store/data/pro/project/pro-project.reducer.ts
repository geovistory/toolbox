import { CrudReducerFactory, ReducerConfig } from '../../_lib/crud-reducer-factory';
import { proFeatureKey } from "../pro.feature.key";

export const proProjectFeature = 'project'
export const proProjectReducerConfig: ReducerConfig = {
  indexBy: {
    keyInStore: 'pk_entity',
    indexByFn: (item) => {
      return item.pk_entity.toString()
    }
  },
  groupBy: []
}


export const proProjectReducers = new CrudReducerFactory(proFeatureKey, { [proProjectFeature]: proProjectReducerConfig }).createReducers();


