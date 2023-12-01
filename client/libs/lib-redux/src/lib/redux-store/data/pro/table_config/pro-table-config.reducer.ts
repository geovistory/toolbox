import { ProTableConfig } from '@kleiolab/lib-sdk-lb4';
import { createModelReducers, ReducerConfig } from '../../_lib/crud-reducer-factory';
import { proFeatureKey } from "../pro.feature.key";

export const proTableConfigFeature = 'table_config'
export const proTableConfigReducerConfig: ReducerConfig<ProTableConfig> = {
  indexBy: {
    keyInStore: 'pk_entity',
    indexByFn: (item) => item.pk_entity.toString()
  },
  groupBy: [{
    keyInStore: 'fk_digital',
    groupByFn: (item) => item.fk_digital.toString()
  }],
}


export const proTableConfigReducers = createModelReducers(proFeatureKey, proTableConfigFeature, proTableConfigReducerConfig)


