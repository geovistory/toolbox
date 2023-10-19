import { CrudReducerFactory, ReducerConfig } from '../../_lib/crud-reducer-factory';
import { proFeatureKey } from "../pro.feature.key";

export const proAnalysisFeature = 'analysis'
export const proAnalysisReducerConfig: ReducerConfig = {
  indexBy: {
    keyInStore: 'pk_entity',
    indexByFn: (item) => {
      return item.pk_entity.toString()
    }
  },
  groupBy: []
}


export const proAnalysisReducers = new CrudReducerFactory(proFeatureKey, { [proAnalysisFeature]: proAnalysisReducerConfig }).createReducers();


