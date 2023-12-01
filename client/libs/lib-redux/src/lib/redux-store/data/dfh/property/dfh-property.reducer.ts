import { DfhProperty } from '@kleiolab/lib-sdk-lb4';
import { createModelReducers, ReducerConfig } from '../../_lib/crud-reducer-factory';
import { dfhFeatureKey } from "../dfh.feature.key";

export const dfhPropertyFeature = 'property'
export const dfhPropertyReducerConfig: ReducerConfig<DfhProperty> = {
  indexBy: {
    keyInStore: 'pk_property__has_domain__has_range',
    indexByFn: (item: DfhProperty) => item.pk_property + '_' + item.has_domain + '_' + item.has_range
  },
  groupBy: [
    {
      keyInStore: 'pk_property',
      groupByFn: (d: DfhProperty): string => d.pk_property.toString()
    },
    {
      keyInStore: 'has_domain',
      groupByFn: (d: DfhProperty): string => d.has_domain.toString()
    },
    {
      keyInStore: 'has_range',
      groupByFn: (d: DfhProperty): string => d.has_range.toString()
    },
    {
      keyInStore: 'is_has_type_subproperty',
      groupByFn: (d: DfhProperty): string => d.parent_properties.includes(2) ? 'true' : undefined
    }
  ]
}

export const dfhPropertyReducers = createModelReducers(dfhFeatureKey, dfhPropertyFeature, dfhPropertyReducerConfig)

