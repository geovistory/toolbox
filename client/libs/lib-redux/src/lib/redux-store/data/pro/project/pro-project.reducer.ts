import { ProProject } from '@kleiolab/lib-sdk-lb4';
import { createModelReducers, ReducerConfig } from '../../_lib/crud-reducer-factory';
import { proFeatureKey } from "../pro.feature.key";

export const proProjectFeature = 'project'
export const proProjectReducerConfig: ReducerConfig<ProProject> = {
  indexBy: {
    keyInStore: 'pk_entity',
    indexByFn: (item) => {
      return item.pk_entity.toString()
    }
  },
  groupBy: []
}


export const proProjectReducers = createModelReducers(proFeatureKey, proProjectFeature, proProjectReducerConfig)


