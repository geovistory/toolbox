import { ProInfoProjRel } from '@kleiolab/lib-sdk-lb4';
import { createModelReducers, ReducerConfig } from '../../_lib/crud-reducer-factory';
import { proFeatureKey } from "../pro.feature.key";

export const proInfoProjRelFeature = 'info_proj_rel'
export const proInfoProjRelReducerConfig: ReducerConfig<ProInfoProjRel> = {
  indexBy: {
    keyInStore: 'fk_project__fk_entity',
    indexByFn: (item) => item.fk_project.toString() + '_' + item.fk_entity.toString()
  }
}


export const proInfoProjRelReducers = createModelReducers(proFeatureKey, proInfoProjRelFeature, proInfoProjRelReducerConfig)


