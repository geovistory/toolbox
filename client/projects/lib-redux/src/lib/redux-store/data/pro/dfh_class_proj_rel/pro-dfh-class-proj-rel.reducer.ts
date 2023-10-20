import { ProDfhClassProjRel } from '@kleiolab/lib-sdk-lb4';
import { createModelReducers, ReducerConfig } from '../../_lib/crud-reducer-factory';
import { proFeatureKey } from "../pro.feature.key";

export const proDfhClassProjRelFeature = 'dfh_class_proj_rel'
export const proDfhClassProjRelReducerConfig: ReducerConfig = {
  indexBy: {
    keyInStore: 'fk_project__fk_class',
    indexByFn: (item: ProDfhClassProjRel) => item.fk_project + '_' + item.fk_class
  },
  groupBy: [
    {
      keyInStore: 'fk_project__enabled_in_entities',
      groupByFn: (d: ProDfhClassProjRel): string => d.fk_project + '_' + d.enabled_in_entities
    },
    {
      keyInStore: 'fk_project',
      groupByFn: (d: ProDfhClassProjRel): string => d.fk_project.toString()
    }
  ],
}


export const proDfhClassProjRelReducers = createModelReducers(proFeatureKey, proDfhClassProjRelFeature, proDfhClassProjRelReducerConfig)


