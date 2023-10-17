import { InfDimension } from '@kleiolab/lib-sdk-lb4';
import { CrudReducerFactory, ReducerConfig } from '../../_helpers/crud-reducer-factory';
import { infRoot } from '../inf.config';

export const infDimensionFeature = 'dimension'
const infDimensionReducerConfig: ReducerConfig = {
  indexBy: {
    keyInStore: 'pk_entity',
    indexByFn: (item: InfDimension) => {
      return item.pk_entity.toString()
    }
  },
  groupBy: []
}


export const infDimensionReducers = new CrudReducerFactory(infRoot, { [infDimensionFeature]: infDimensionReducerConfig }).createReducers();


