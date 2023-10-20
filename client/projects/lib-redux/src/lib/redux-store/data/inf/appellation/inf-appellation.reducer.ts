import { createModelReducers, ReducerConfig } from '../../_lib/crud-reducer-factory';
import { infFeatureKey } from "../inf.feature.key";

export const infAppellationFeature = 'appellation'
export const infAppellationReducerConfig: ReducerConfig = {
  indexBy: {
    keyInStore: 'pk_entity',
    indexByFn: (item) => {
      return item.pk_entity.toString()
    }
  },
  groupBy: []
}


export const infAppellationReducers = createModelReducers(infFeatureKey, infAppellationFeature, infAppellationReducerConfig)


