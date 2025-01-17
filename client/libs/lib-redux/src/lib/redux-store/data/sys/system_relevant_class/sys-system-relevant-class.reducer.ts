import { SysSystemRelevantClass } from '@kleiolab/lib-sdk-lb4';
import { createModelReducers, ReducerConfig } from '../../_lib/crud-reducer-factory';
import { sysFeatureKey } from "../sys.feature.key";

export const sysSystemRelevantClassFeature = 'system_relevant_class'
export const sysSystemRelevantClassReducerConfig: ReducerConfig<SysSystemRelevantClass> = {
  indexBy: {
    keyInStore: 'pk_entity',
    indexByFn: (item) => {
      return item.pk_entity.toString()
    }
  },
  groupBy: [
    {
      keyInStore: 'fk_class',
      groupByFn: (d: SysSystemRelevantClass): string => d.fk_class.toString()
    },
    {
      keyInStore: 'required_by_sources',
      groupByFn: (d: SysSystemRelevantClass): string => d.required_by_sources.toString()
    },
    {
      keyInStore: 'required',
      groupByFn: (d: SysSystemRelevantClass): string => (d.required_by_sources || d.required_by_entities || d.required_by_basics) ? 'true' : 'false'
    }
  ]
}
export const sysSystemRelevantClassReducers = createModelReducers(sysFeatureKey, sysSystemRelevantClassFeature, sysSystemRelevantClassReducerConfig)

