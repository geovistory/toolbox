import { ProDfhProfileProjRel } from '@kleiolab/lib-sdk-lb4';
import { CrudActionsFactory } from '../../_lib/crud-actions-factory';
import { proFeatureKey } from "../pro.feature.key";
import { proDfhProfileProjRelFeature } from './pro-dfh-profile-proj-rel.reducer';

export const proDfhProfileProjRelActions = new CrudActionsFactory<ProDfhProfileProjRel>(proFeatureKey, proDfhProfileProjRelFeature)
