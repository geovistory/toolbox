import { ProInfoProjRel } from '@kleiolab/lib-sdk-lb4';
import { CrudActionsFactory } from '../../_lib/crud-actions-factory';
import { proFeatureKey } from "../pro.feature.key";
import { proInfoProjRelFeature } from './pro-info-proj-rel.reducer';

export const proInfoProjRelActions = new CrudActionsFactory<ProInfoProjRel>(proFeatureKey, proInfoProjRelFeature)
