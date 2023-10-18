import { CrudReducerFactory, ReducerConfig } from '../../_helpers/crud-reducer-factory';
import { proFeatureKey } from "../pro.feature.key";

export const proTableConfigFeature = 'table_config'
export const proTableConfigReducerConfig: ReducerConfig = {
  indexBy: {
    keyInStore: 'pk_entity',
    indexByFn: (item) => item.pk_entity.toString()
  },
  groupBy: [{
    keyInStore: 'fk_digital',
    groupByFn: (item) => item.fk_digital.toString()
  }],
}


export const proTableConfigReducers = new CrudReducerFactory(proFeatureKey, { [proTableConfigFeature]: proTableConfigReducerConfig }).createReducers();


