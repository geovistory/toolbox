import { InfLanguage } from '@kleiolab/lib-sdk-lb4';
import { CrudReducerFactory, ReducerConfig } from '../../_helpers/crud-reducer-factory';
import { infRoot } from '../inf.config';

export const infLanguageFeature = 'language'
const infLanguageReducerConfig: ReducerConfig = {
  indexBy: {
    keyInStore: 'pk_entity',
    indexByFn: (item: InfLanguage) => {
      return item.pk_entity.toString()
    }
  },
  groupBy: []
}


export const infLanguageReducers = new CrudReducerFactory(infRoot, { [infLanguageFeature]: infLanguageReducerConfig }).createReducers();


