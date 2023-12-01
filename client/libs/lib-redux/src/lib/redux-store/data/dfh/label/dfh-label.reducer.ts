import { DfhLabel } from '@kleiolab/lib-sdk-lb4';
import { createModelReducers, ReducerConfig } from '../../_lib/crud-reducer-factory';
import { dfhFeatureKey } from "../dfh.feature.key";

export const dfhLabelByFksKey = (item: Partial<DfhLabel>) => `${item.type || null}_${item.language || null}_${item.fk_class || null}_${item.fk_profile || null}_${item.fk_property || null}_${item.fk_project || null}`;
export const dfhLabelFeature = 'label'
export const dfhLabelReducerConfig: ReducerConfig<DfhLabel> = {
  indexBy: {
    keyInStore: 'fks',
    indexByFn: dfhLabelByFksKey
  },
  groupBy: [
    {
      keyInStore: 'fk_class__type',
      groupByFn: (d: DfhLabel): string => !d.fk_class ? undefined : `${d.fk_class}_${d.type}`
    },
    {
      keyInStore: 'fk_property__type',
      groupByFn: (d: DfhLabel): string => !d.fk_property ? undefined : `${d.fk_property}_${d.type}`
    },
    {
      keyInStore: 'fk_profile__type',
      groupByFn: (d: DfhLabel): string => !d.fk_profile ? undefined : `${d.fk_profile}_${d.type}`
    }
  ]
}
export const dfhLabelReducers = createModelReducers(dfhFeatureKey, dfhLabelFeature, dfhLabelReducerConfig)

