import { CrudReducerFactory, ReducerConfig } from '../../_helpers/crud-reducer-factory';
import { proFeatureKey } from "../pro.feature.key";

export const proInfoProjRelFeature = 'info_proj_rel'
export const proInfoProjRelReducerConfig: ReducerConfig = {
  indexBy: {
    keyInStore: 'fk_project__fk_entity',
    indexByFn: (item) => item.fk_project.toString() + '_' + item.fk_entity.toString()
  }
}


export const proInfoProjRelReducers = new CrudReducerFactory(proFeatureKey, { [proInfoProjRelFeature]: proInfoProjRelReducerConfig }).createReducers();


