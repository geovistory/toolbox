import { ReducerConfigCollection } from '../_helpers/reducer-factory';
import { SysSystemRelevantClass } from '@kleiolab/lib-sdk-lb3';

export const sysRoot = 'sys';

export const sysDefinitions: ReducerConfigCollection = {
  system_relevant_class: {
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
  },
  config: {
    indexBy: {
      keyInStore: 'main',
      indexByFn: () => 'main'
    }
  }
}
