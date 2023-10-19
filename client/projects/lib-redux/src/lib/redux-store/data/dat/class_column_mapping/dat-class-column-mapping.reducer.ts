import { DatClassColumnMapping } from '@kleiolab/lib-sdk-lb4';
import { CrudReducerFactory, ReducerConfig } from '../../_lib/crud-reducer-factory';
import { datFeatureKey } from "../dat.feature.key";

export const datClassColumnMappingFeature = 'class_column_mapping'
export const datClassColumnMappingReducerConfig: ReducerConfig = {
  indexBy: {
    keyInStore: 'pk_entity',
    indexByFn: (item) => item.pk_entity.toString()
  },
  groupBy: [
    {
      keyInStore: 'fk_column',
      groupByFn: (item: DatClassColumnMapping): string => item.fk_column.toString()
    }
  ]
}


export const datClassColumnMappingReducers = new CrudReducerFactory(datFeatureKey, { [datClassColumnMappingFeature]: datClassColumnMappingReducerConfig }).createReducers();


