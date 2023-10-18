import { DfhClass } from '@kleiolab/lib-sdk-lb4';
import { CrudReducerFactory, ReducerConfig } from '../../_helpers/crud-reducer-factory';
import { dfhFeatureKey } from "../dfh.feature.key";

export const dfhClassFeature = 'klass'
export const dfhClassReducerConfig: ReducerConfig = {
  indexBy: {
    keyInStore: 'pk_class',
    indexByFn: (item: DfhClass) => item.pk_class.toString(),
  },
  groupBy: [
    {
      keyInStore: 'basic_type',
      groupByFn: (d: DfhClass): string => d.basic_type.toString()
    },
  ]
}

export const dfhClassReducers = new CrudReducerFactory(dfhFeatureKey, { [dfhClassFeature]: dfhClassReducerConfig }).createReducers();

