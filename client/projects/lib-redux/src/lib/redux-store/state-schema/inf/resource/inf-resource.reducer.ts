import { InfResource } from '@kleiolab/lib-sdk-lb4';
import { CrudReducerFactory, ReducerConfig } from '../../_helpers/crud-reducer-factory';
import { infRoot } from '../inf.config';

export const infResourceFeature = 'resource'
const infResourceReducerConfig: ReducerConfig = {
  indexBy: {
    keyInStore: 'pk_entity',
    indexByFn: (item: InfResource) => {
      return item.pk_entity.toString()
    }
  },
  groupBy: [
    {
      keyInStore: 'fk_class',
      groupByFn: (d: InfResource): string => d.fk_class.toString()
    }
  ]
}


export const infResourceReducers = new CrudReducerFactory(infRoot, { [infResourceFeature]: infResourceReducerConfig }).createReducers();


