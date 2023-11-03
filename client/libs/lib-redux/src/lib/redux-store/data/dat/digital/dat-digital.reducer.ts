import { DatDigital } from '@kleiolab/lib-sdk-lb4';
import { createModelReducers, ReducerConfig } from '../../_lib/crud-reducer-factory';
import { datFeatureKey } from "../dat.feature.key";

export const datDigitalFeature = 'digital'
export const datDigitalReducerConfig: ReducerConfig = {
  equals: (newItem: DatDigital, oldItem: DatDigital) => {
    if (!oldItem.quill_doc && newItem.quill_doc) return false;
    return (
      newItem.pk_entity === oldItem.pk_entity &&
      newItem.entity_version === oldItem.entity_version
    )
  },
  indexBy: {
    keyInStore: 'pk_entity__entity_version',
    indexByFn: (item) => item.pk_entity.toString() + '_' + item.entity_version.toString()
  },
  groupBy: [
    {
      keyInStore: 'pk_entity',
      groupByFn: (item): string => item.pk_entity.toString()
    },
    {
      keyInStore: 'pk_text',
      groupByFn: (item): string => item.pk_text.toString()
    }
  ]
}


export const datDigitalReducers = createModelReducers(datFeatureKey, datDigitalFeature, datDigitalReducerConfig)


