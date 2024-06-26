import { DatTextProperty } from '@kleiolab/lib-sdk-lb4';
import { createModelReducers, ReducerConfig } from '../../_lib/crud-reducer-factory';
import { datFeatureKey } from "../dat.feature.key";

export const datTextPropertyFeature = 'text_property'
export const datTextPropertyReducerConfig: ReducerConfig<DatTextProperty> = {
  indexBy: {
    keyInStore: 'pk_entity',
    indexByFn: (item) => item.pk_entity.toString()
  },
  groupBy: [
    {
      keyInStore: 'fk_entity__fk_system_type',
      groupByFn: (item: DatTextProperty): string => item.fk_entity + '_' + item.fk_system_type
    }
  ]
}
export const datTextPropertyReducers = createModelReducers(datFeatureKey, datTextPropertyFeature, datTextPropertyReducerConfig)


