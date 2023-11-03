import { InfLangString } from '@kleiolab/lib-sdk-lb4';
import { createModelReducers, ReducerConfig } from '../../_lib/crud-reducer-factory';
import { infFeatureKey } from "../inf.feature.key";

export const infLangStringFeature = 'lang_string'
export const infLangStringReducerConfig: ReducerConfig = {
  indexBy: {
    keyInStore: 'pk_entity',
    indexByFn: (item: InfLangString) => {
      return item.pk_entity.toString()
    }
  },
  groupBy: []
}


export const infLangStringReducers = createModelReducers(infFeatureKey, infLangStringFeature, infLangStringReducerConfig)


