import { CrudReducerFactory, ReducerConfig } from '../../_helpers/crud-reducer-factory';
import { infRoot } from '../inf.config';

export const infAppellationFeature = 'appellation'
const infAppellationReducerConfig: ReducerConfig = {
  indexBy: {
    keyInStore: 'pk_entity',
    indexByFn: (item) => {
      return item.pk_entity.toString()
    }
  },
  groupBy: []
}


export const infAppellationReducers = new CrudReducerFactory(infRoot, { [infAppellationFeature]: infAppellationReducerConfig }).createReducers();


