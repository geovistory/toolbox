import { InfLanguage } from '@kleiolab/lib-sdk-lb4';
import { createModelReducers, ReducerConfig } from '../../_lib/crud-reducer-factory';
import { infFeatureKey } from "../inf.feature.key";

export const infLanguageFeature = 'language'
export const infLanguageReducerConfig: ReducerConfig<InfLanguage> = {
  indexBy: {
    keyInStore: 'pk_entity',
    indexByFn: (item: InfLanguage) => {
      return item.pk_entity.toString()
    }
  },
  groupBy: []
}


export const infLanguageReducers = createModelReducers(infFeatureKey, infLanguageFeature, infLanguageReducerConfig)


