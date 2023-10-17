import { InfLangString } from '@kleiolab/lib-sdk-lb4';
import { CrudReducerFactory, ReducerConfig } from '../../_helpers/crud-reducer-factory';
import { infRoot } from '../inf.config';

export const infLangStringFeature = 'lang_string'
const infLangStringReducerConfig: ReducerConfig = {
  indexBy: {
    keyInStore: 'pk_entity',
    indexByFn: (item: InfLangString) => {
      return item.pk_entity.toString()
    }
  },
  groupBy: []
}


export const infLangStringReducers = new CrudReducerFactory(infRoot, { [infLangStringFeature]: infLangStringReducerConfig }).createReducers();


