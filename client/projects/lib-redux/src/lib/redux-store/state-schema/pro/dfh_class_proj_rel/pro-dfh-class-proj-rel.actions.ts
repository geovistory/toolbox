import { ProDfhClassProjRel } from '@kleiolab/lib-sdk-lb4';
import { CrudActionsFactory } from '../../_helpers/crud-actions-factory';
import { proFeatureKey } from "../pro.feature.key";
import { proDfhClassProjRelFeature } from './pro-dfh-class-proj-rel.reducer';

export const proDfhClassProjRelActions = new CrudActionsFactory<ProDfhClassProjRel>(proFeatureKey, proDfhClassProjRelFeature)
