import { DfhClass } from '@kleiolab/lib-sdk-lb4';
import { createModelReducers, ReducerConfig } from '../../_lib/crud-reducer-factory';
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

export const dfhClassReducers = createModelReducers(dfhFeatureKey, dfhClassFeature, dfhClassReducerConfig)

