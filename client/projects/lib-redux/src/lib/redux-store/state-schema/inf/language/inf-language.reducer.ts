import { InfLanguage } from '@kleiolab/lib-sdk-lb4';
import { CrudReducerFactory, ReducerConfig } from '../../_helpers/crud-reducer-factory';
import { infFeatureKey } from "../inf.feature.key";

export const infLanguageFeature = 'language'
export const infLanguageReducerConfig: ReducerConfig = {
  indexBy: {
    keyInStore: 'pk_entity',
    indexByFn: (item: InfLanguage) => {
      return item.pk_entity.toString()
    }
  },
  groupBy: []
}


export const infLanguageReducers = new CrudReducerFactory(infFeatureKey, { [infLanguageFeature]: infLanguageReducerConfig }).createReducers();


