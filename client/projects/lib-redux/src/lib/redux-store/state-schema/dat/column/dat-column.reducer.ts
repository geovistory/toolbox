import { CrudReducerFactory, ReducerConfig } from '../../_helpers/crud-reducer-factory';
import { datFeatureKey } from "../dat.feature.key";

export const datColumnFeature = 'column'
export const datColumnReducerConfig: ReducerConfig = {
  indexBy: {
    keyInStore: 'pk_entity',
    indexByFn: (item) => item.pk_entity.toString()
  },
  groupBy: [
    {
      keyInStore: 'fk_digital',
      groupByFn: (item): string => item.fk_digital.toString()
    }
  ]
}


export const datColumnReducers = new CrudReducerFactory(datFeatureKey, { [datColumnFeature]: datColumnReducerConfig }).createReducers();


