import { createModelReducers, ReducerConfig } from '../../_lib/crud-reducer-factory';
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


export const datColumnReducers = createModelReducers(datFeatureKey, datColumnFeature, datColumnReducerConfig)


