import { ProDfhProfileProjRel } from '@kleiolab/lib-sdk-lb4';
import { CrudReducerFactory, ReducerConfig } from '../../_lib/crud-reducer-factory';
import { proFeatureKey } from "../pro.feature.key";

export const proDfhProfileProjRelFeature = 'dfh_profile_proj_rel'
export const proDfhProfileProjRelReducerConfig: ReducerConfig = {
  indexBy: {
    keyInStore: 'fk_project__fk_profile',
    indexByFn: (item: ProDfhProfileProjRel) => item.fk_project + '_' + item.fk_profile
  },
  groupBy: [
    {
      keyInStore: 'fk_project__enabled',
      groupByFn: (d: ProDfhProfileProjRel): string => d.fk_project + '_' + d.enabled
    },
    {
      keyInStore: 'fk_project',
      groupByFn: (d: ProDfhProfileProjRel): string => d.fk_project.toString()
    }
  ],
}


export const proDfhProfileProjRelReducers = new CrudReducerFactory(proFeatureKey, { [proDfhProfileProjRelFeature]: proDfhProfileProjRelReducerConfig }).createReducers();


