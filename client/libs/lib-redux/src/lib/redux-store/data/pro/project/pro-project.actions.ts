import { ProProject } from '@kleiolab/lib-sdk-lb4';
import { CrudActionsFactory } from '../../_lib/crud-actions-factory';
import { proFeatureKey } from "../pro.feature.key";
import { proProjectFeature } from './pro-project.reducer';

export const proProjectActions = new CrudActionsFactory<ProProject>(proFeatureKey, proProjectFeature)
