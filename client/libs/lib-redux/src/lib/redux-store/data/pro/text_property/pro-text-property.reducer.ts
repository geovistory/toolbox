import { ProTextProperty } from '@kleiolab/lib-sdk-lb4';
import { createModelReducers, ReducerConfig } from '../../_lib/crud-reducer-factory';
import { proFeatureKey } from "../pro.feature.key";

export const textPropertyByFksKey = (d: Partial<ProTextProperty>) => `${d.fk_project || null}_${d.fk_system_type || null}_${d.fk_language || null}_${d.fk_dfh_class || null}_${d.fk_dfh_property || null}_${d.fk_dfh_property_domain || null}_${d.fk_dfh_property_range || null}_${d.fk_pro_project || null}`
export const textPropertyByFksWithoutLang = (d: Partial<ProTextProperty>): string => `${d.fk_project || null}_${d.fk_system_type || null}_${d.fk_dfh_class || null}_${d.fk_dfh_property || null}_${d.fk_dfh_property_domain || null}_${d.fk_dfh_property_range || null}_${d.fk_pro_project || null}`;

export const proTextPropertyFeature = 'text_property'
export const proTextPropertyReducerConfig: ReducerConfig<ProTextProperty> = {
  indexBy: {
    keyInStore: 'fks',
    indexByFn: textPropertyByFksKey
  },
  groupBy: [
    {
      keyInStore: 'fks_without_lang',
      groupByFn: textPropertyByFksWithoutLang
    }
  ]
}


export const proTextPropertyReducers = createModelReducers(proFeatureKey, proTextPropertyFeature, proTextPropertyReducerConfig)

