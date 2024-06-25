import { ProAnalysis } from '@kleiolab/lib-sdk-lb4';
import { createModelReducers, ReducerConfig } from '../../_lib/crud-reducer-factory';
import { proFeatureKey } from "../pro.feature.key";

export const proAnalysisFeature = 'analysis'
export const proAnalysisReducerConfig: ReducerConfig<ProAnalysis> = {
  indexBy: {
    keyInStore: 'pk_entity',
    indexByFn: (item) => {
      return item.pk_entity.toString()
    }
  },
  groupBy: []
}


export const proAnalysisReducers = createModelReducers(proFeatureKey, proAnalysisFeature, proAnalysisReducerConfig)


